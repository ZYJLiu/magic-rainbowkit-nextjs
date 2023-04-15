// utils/useLocalStorage.ts

import { useState, useEffect } from "react"

const useLocalStorage = (
  key: string,
  initialValue: string | null = null
): [string | null, (value: string | null) => void] => {
  const [storedValue, setStoredValue] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(key) || initialValue
    }
    return initialValue
  })

  const setValue = (value: string | null) => {
    if (typeof window !== "undefined") {
      if (value === null) {
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.setItem(key, value)
      }
      setStoredValue(value)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newValue = window.localStorage.getItem(key)
      if (newValue !== storedValue) {
        setStoredValue(newValue)
      }
    }
  }, [])

  return [storedValue, setValue]
}

export default useLocalStorage
