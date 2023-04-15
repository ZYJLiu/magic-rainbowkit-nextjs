import React from "react"
import AppHeader from "../app-header"
import Wallet from "../wallet"
import WalletMethods from "../wallet-methods"
import SigningMethods from "../signing"
import SmartContracts from "../contracts"
import NFTs from "../nfts"
import Links from "../links"
import Spacer from "../ui/spacer"
import HomePageBackground from "public/main.svg"

interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string | null>>
}

export default function Home({ setAccount }: Props) {
  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url(${HomePageBackground})`,
      }}
    >
      <AppHeader />
      <Spacer size={32} />
      <Links />
      <Spacer size={120} />
      <div className="cards-container">
        <Spacer size={285} />
        <Wallet setAccount={setAccount} />
        <WalletMethods setAccount={setAccount} />
        <SigningMethods />
        <SmartContracts />
        <NFTs />
        <Spacer size={15} />
        <Links dark />
        <Spacer size={30} />
      </div>
    </div>
  )
}
