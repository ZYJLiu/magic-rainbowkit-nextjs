import { useEffect, useState } from "react"
import { EthNetworkConfiguration, Magic } from "magic-sdk"
import { Networks } from "../utils/networks"
import useLocalStorage from "../utils/useLocalStorage"
import { useMagicContext } from "../context/magic-context"

export const useMagic = () => {
  const { magic, setMagicInstance, selectedNetwork } = useMagicContext()
  // const [network] = useLocalStorage("network")

  const formattedNetwork = (): EthNetworkConfiguration => {
    switch (selectedNetwork) {
      case Networks.Optimism:
        return {
          rpcUrl: process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL as string,
          chainId: 420,
        }
      case Networks.Polygon:
        return {
          rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL as string,
          chainId: 80001,
        }
      default:
        return {
          rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL as string,
          chainId: 5,
        }
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMagicInstance(
        new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY as string, {
          network: formattedNetwork(),
        })
      )
    }
    console.log("SELECTED NETWORK", selectedNetwork)
  }, [selectedNetwork])

  // return magic
}
