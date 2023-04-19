import { MagicConnectConnector } from "wagmi-magic-connect"

// Create and export a function that initializes the Magic Connect connector
export const magicConnectConnector = ({ chains }: any) => ({
  // Data displayed in the wallet selector modal UI
  id: "magic",
  name: "Magic Connect",
  iconUrl: "https://svgshare.com/i/iJK.svg",
  iconBackground: "#fff",

  // Function to create and return the Magic Connect connector instance
  createConnector: () => {
    const connector = new MagicConnectConnector({
      chains: chains,
      options: {
        apiKey: process.env.NEXT_PUBLIC_MAGIC_API_KEY!,
        magicSdkConfiguration: {
          network: {
            rpcUrl: chains[0].rpcUrls.default.http[0],
            chainId: chains[0].id,
          },
        },
      },
    })

    // Return the instantiated connector
    return {
      connector,
    }
  },
})
