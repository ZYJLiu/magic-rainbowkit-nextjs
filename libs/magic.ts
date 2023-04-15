import { EthNetworkConfiguration, Magic } from "magic-sdk"
import { Networks } from "../utils/networks"
import { useMagicContext } from "../context/magic-context"
import { useCallback } from "react"

export const formattedNetwork = (
  selectedNetwork: Networks
): EthNetworkConfiguration => {
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

// export const useInitializeMagic = () => {
//   const { setMagicInstance } = useMagicContext()

//   const initializeMagic = useCallback(
//     (network: Networks) => {
//       if (typeof window !== "undefined") {
//         setMagicInstance(
//           new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY as string, {
//             network: formattedNetwork(network),
//           })
//         )
//       }
//     },
//     [setMagicInstance]
//   )

//   return initializeMagic
// }
