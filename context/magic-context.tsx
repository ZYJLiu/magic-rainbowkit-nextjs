import { createContext, useContext } from "react"
import { Magic } from "magic-sdk"
import { Networks } from "../utils/networks"

export type MagicContextType = {
  magic: Magic | null
  updateMagicInstance: (network: Networks) => void
  selectedNetwork: Networks | null
}

export const MagicContext = createContext<MagicContextType>({
  magic: null,
  updateMagicInstance: () => {},
  selectedNetwork: null,
})

export const useMagicContext = () => useContext(MagicContext)

// import { createContext, useContext } from "react"
// import { Magic } from "magic-sdk"
// import { Networks } from "../utils/networks"

// export type MagicContextType = {
//   magic: Magic | null
//   setMagicInstance: (magic: Magic | null) => void
//   selectedNetwork: Networks | null
//   setSelectedNetwork: (network: Networks | null) => void
// }

// export const MagicContext = createContext<MagicContextType>({
//   magic: null,
//   setMagicInstance: () => {},
//   selectedNetwork: null,
//   setSelectedNetwork: () => {},
// })

// export const useMagicContext = () => useContext(MagicContext)
