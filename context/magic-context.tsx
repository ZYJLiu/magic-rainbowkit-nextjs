import { createContext, useContext } from "react"
import { Magic } from "magic-sdk"
import { Networks } from "../utils/networks"
import Web3 from "web3"

export type MagicContextType = {
  magic: Magic | null
  web3: Web3 | null
  updateMagicInstance: (network: Networks) => void
  selectedNetwork: Networks | null
}

export const MagicContext = createContext<MagicContextType>({
  magic: null,
  web3: null,
  updateMagicInstance: () => {},
  selectedNetwork: null,
})

export const useMagicContext = () => useContext(MagicContext)
