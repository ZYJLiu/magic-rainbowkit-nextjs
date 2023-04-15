import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { MagicContext } from "@/context/magic-context"
import { Magic } from "magic-sdk"
import { useState } from "react"
import { Networks } from "../utils/networks"
import { formattedNetwork } from "../libs/magic"

export default function App({ Component, pageProps }: AppProps) {
  const [magic, setMagic] = useState<Magic | null>(null)
  const [selectedNetwork, setSelectedNetwork] = useState<Networks | null>(null)

  const updateMagicInstance = (network: Networks) => {
    console.log("updateMagicInstance", network)
    setSelectedNetwork(network)
    setMagic(
      new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY as string, {
        network: formattedNetwork(network),
      })
    )
  }

  return (
    <MagicContext.Provider
      value={{
        magic,
        updateMagicInstance,
        selectedNetwork,
      }}
    >
      <Component {...pageProps} />
    </MagicContext.Provider>
  )
}

// export default function App({ Component, pageProps }: AppProps) {
//   const [magic, setMagic] = useState<Magic | null>(null)
//   const [selectedNetwork, setSelectedNetwork] = useState<Networks | null>(null)
//   return (
//     <MagicContext.Provider
//       value={{
//         magic,
//         setMagicInstance: setMagic,
//         selectedNetwork,
//         setSelectedNetwork,
//       }}
//     >
//       <Component {...pageProps} />
//     </MagicContext.Provider>
//   )
// }
