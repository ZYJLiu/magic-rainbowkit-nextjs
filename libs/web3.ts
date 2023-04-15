import { useMemo } from "react"
import Web3 from "web3"
import { useMagicContext } from "../context/magic-context"

export const useWeb3Instance = (): Web3 | null => {
  const { magic } = useMagicContext()

  const web3Instance = useMemo(() => {
    if (magic) {
      return new Web3((magic as any).rpcProvider)
    }
    return null
  }, [magic])

  return web3Instance
}
