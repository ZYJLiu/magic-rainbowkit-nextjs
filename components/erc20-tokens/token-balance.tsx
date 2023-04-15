import React, { useEffect, useState } from "react"
import Image from "next/image"
import Loading from "public/loading.svg"
import CardLabel from "../ui/card-label"
import { getTestTokenContract } from "../../utils/contracts"
import { useMagicContext } from "@/context/magic-context"

const TokenBalance = () => {
  const { web3 } = useMagicContext()
  const [balance, setBalance] = useState("0")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const publicAddress = localStorage.getItem("user")
  const contract = getTestTokenContract(web3!)

  const getTestTokenBalance = async () => {
    if (!isRefreshing && web3) {
      const balance = await contract.methods.balanceOf(publicAddress).call()
      setBalance(web3.utils.fromWei(balance))
    }
  }

  useEffect(() => {
    getTestTokenBalance()
  }, [web3])

  return (
    <div>
      <CardLabel
        style={{ height: "20px" }}
        leftHeader="Balance"
        rightAction={
          isRefreshing ? (
            <div className="loading-container">
              <Image className="loading" alt="loading" src={Loading} />
            </div>
          ) : (
            <div
              onClick={() => {
                setIsRefreshing(true)
                setTimeout(() => {
                  setIsRefreshing(false)
                }, 500)
                getTestTokenBalance()
              }}
            >
              Refresh
            </div>
          )
        }
      />
      <div className="code">{balance.substring(0, 7)} MTT</div>
    </div>
  )
}

export default TokenBalance
