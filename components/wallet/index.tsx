import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Divider from "../ui/divider"
import Loading from "public/loading.svg"
import Network from "../network"
import CardLabel from "../ui/card-label"
import Card from "../ui/card"
import CardHeader from "../ui/card-header"
import { Networks } from "../../utils/networks"
import { useWeb3Context } from "@/context/web3-context"
import { useAccount, useNetwork } from "wagmi"
import { disconnect } from "@wagmi/core"

const UserInfo = () => {
  const { web3 } = useWeb3Context()
  const { address } = useAccount()
  const { chain } = useNetwork()

  const [balance, setBalance] = useState("...")
  const [copied, setCopied] = useState("Copy")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const tokenSymbol = chain?.id === 80001 ? "MATIC" : "ETH"

  useEffect(() => {
    refresh()
  }, [web3])

  useEffect(() => {
    setBalance("...")
  }, [web3])

  const handleDisconnect = async () => {
    await disconnect()
  }

  const copy = useCallback(() => {
    if (address && copied === "Copy") {
      setCopied("Copied!")
      navigator.clipboard.writeText(address)
      setTimeout(() => {
        setCopied("Copy")
      }, 1000)
    }
  }, [])

  const getBalance = useCallback(async () => {
    if (address && web3) {
      const balance = await web3.eth.getBalance(address)
      setBalance(web3.utils.fromWei(balance))
      console.log("BALANCE: ", balance)
    }
  }, [web3])

  const refresh = useCallback(async () => {
    setIsRefreshing(true)
    await getBalance()
    setTimeout(() => {
      setIsRefreshing(false)
    }, 500)
  }, [web3])

  return (
    <Card>
      <CardHeader id="wallet">Wallet</CardHeader>
      <CardLabel
        leftHeader="Status"
        rightAction={<div onClick={handleDisconnect}>Disconnect</div>}
        isDisconnect
      />
      <div className="flex-row">
        <div className="green-dot" />
        <div className="connected">Connected</div>
      </div>
      <Divider />
      <CardLabel leftHeader="Network" />
      <Network />
      <Divider />
      <CardLabel
        leftHeader="Address"
        rightAction={<div onClick={copy}>{copied}</div>}
      />
      <div className="code">{address}</div>
      <Divider />
      <CardLabel
        style={{ height: "20px" }}
        leftHeader="Balance"
        rightAction={
          isRefreshing ? (
            <div className="loading-container">
              <Image className="loading" alt="loading" src={Loading} />
            </div>
          ) : (
            <div onClick={refresh}>Refresh</div>
          )
        }
      />
      <div className="code">
        {balance.substring(0, 7)} {tokenSymbol}
      </div>
    </Card>
  )
}

export default UserInfo
