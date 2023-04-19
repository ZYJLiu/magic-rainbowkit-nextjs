import React, { useEffect } from "react"
import TableOfContents from "../table-of-contents"
import AppHeader from "../app-header"
import Wallet from "../wallet"
import WalletMethods from "../wallet-methods"
import SigningMethods from "../signing"
import SendTransaction from "../send-transaction"
import Erc20Tokens from "../erc20-tokens"
import SmartContracts from "../contracts"
import NFTs from "../nfts"
import Links from "../links"
import Spacer from "../ui/spacer"
import HomePageBackground from "public/main.svg"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useSigner, useAccount } from "wagmi"
import { useWeb3Context } from "@/context/web3-context"
import Web3 from "web3"

export default function Home() {
  const { isConnected } = useAccount()
  const { data: signer } = useSigner()
  const { web3, setWeb3 } = useWeb3Context()

  useEffect(() => {
    if (signer) {
      const web3 = new Web3((signer.provider as any).provider)
      setWeb3(web3)
    }
  }, [signer])

  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url(${HomePageBackground})`,
      }}
    >
      <AppHeader />
      <Spacer size={15} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ConnectButton />
      </div>
      <Links />
      <Spacer size={95} />
      <TableOfContents web3={web3!} />
      {isConnected && web3 && (
        <div className="cards-container">
          <Wallet />
          <WalletMethods />
          <SendTransaction />
          <Erc20Tokens />
          <NFTs />
          <SmartContracts />
          <SigningMethods />
          <Spacer size={15} />
          <Links dark />
          <Spacer size={30} />
        </div>
      )}
    </div>
  )
}
