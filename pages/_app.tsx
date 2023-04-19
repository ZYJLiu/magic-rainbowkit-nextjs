import "@/styles/globals.css"
import type { AppProps } from "next/app"
import "@rainbow-me/rainbowkit/styles.css"
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit"
import { argentWallet, trustWallet } from "@rainbow-me/rainbowkit/wallets"
import { magicConnectConnector } from "../connector/magicConnect"
import { createClient, configureChains, WagmiConfig } from "wagmi"
import { goerli, optimismGoerli, polygonMumbai } from "wagmi/chains"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import Web3Provider from "@/context/web3-context"

type ChainIdToRpcUrl = {
  [key: number]: string
}

// Custom RPC Endpoints
const chainIdToRpcUrl: ChainIdToRpcUrl = {
  420: process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL!,
  80001: process.env.NEXT_PUBLIC_POLYGON_RPC_URL!,
  5: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL!,
}

const { chains, provider, webSocketProvider } = configureChains(
  [goerli, optimismGoerli, polygonMumbai],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: chainIdToRpcUrl[chain.id],
      }),
    }),
  ]
)

// Rainbowkit default wallets
const { wallets } = getDefaultWallets({
  appName: "RainbowKit Mint NFT Demo",
  chains,
})

const demoAppInfo = {
  appName: "RainbowKit Mint NFT Demo",
}

// Include Magic Connect to the list of wallets to display in wallet selector modal
const connectors = connectorsForWallets([
  {
    groupName: "Magic",
    wallets: [magicConnectConnector({ chains })],
  },
  ...wallets,
  {
    groupName: "Other",
    wallets: [argentWallet({ chains }), trustWallet({ chains })],
  },
])

console.log(chains[0])

const wagmiClient = createClient({
  autoConnect: true, // autoconnect not working correctly with Magic Connect
  connectors,
  provider,
  webSocketProvider,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </Web3Provider>
  )
}
