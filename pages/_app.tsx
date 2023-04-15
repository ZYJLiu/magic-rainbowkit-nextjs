import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useCallback, useEffect, useState, useMemo } from "react"
import { Magic } from "magic-sdk"
import { MagicContext } from "@/context/magic-context"
import { Networks, formattedNetwork } from "../utils/networks"
import Web3 from "web3"

export default function App({ Component, pageProps }: AppProps) {
  const [magic, setMagic] = useState<Magic | null>(null)
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [selectedNetwork, setSelectedNetwork] = useState<Networks | null>(null)

  const updateMagicInstance = useCallback((network: Networks) => {
    setSelectedNetwork(network)
    const magicInstance = new Magic(
      process.env.NEXT_PUBLIC_MAGIC_API_KEY as string,
      {
        network: formattedNetwork(network),
      }
    )
    setMagic(magicInstance)
    setWeb3(new Web3((magicInstance as any).rpcProvider))
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedNetwork =
        (localStorage.getItem("network") as Networks | null) ||
        Networks.Ethereum
      setSelectedNetwork(storedNetwork)
      updateMagicInstance(storedNetwork)
    }
  }, [])

  return (
    <MagicContext.Provider
      value={{
        magic,
        web3,
        updateMagicInstance,
        selectedNetwork,
      }}
    >
      <Component {...pageProps} />
    </MagicContext.Provider>
  )
}
