import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { MagicContext } from "@/context/magic-context"
import { Magic } from "magic-sdk"
import { useState } from "react"
import { Networks } from "../utils/networks"

export default function App({ Component, pageProps }: AppProps) {
  const [magic, setMagic] = useState<Magic | null>(null)
  const [selectedNetwork, setSelectedNetwork] = useState<Networks | null>(null)
  return (
    <MagicContext.Provider
      value={{
        magic,
        setMagicInstance: setMagic,
        selectedNetwork,
        setSelectedNetwork,
      }}
    >
      <Component {...pageProps} />
    </MagicContext.Provider>
  )
}
