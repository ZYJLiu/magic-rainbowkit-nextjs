import React, { useState, useCallback } from "react"
import FormButton from "../ui/form-button"
import { getTestTokenContract } from "../../utils/contracts"
import { useWeb3Context } from "@/context/web3-context"
import { useAccount } from "wagmi"

const MintToken = () => {
  const { web3 } = useWeb3Context()
  const { address } = useAccount()
  const [disabled, setDisabled] = useState(false)
  const contract = getTestTokenContract(web3!)

  const mintTestTokens = useCallback(() => {
    setDisabled(true)
    contract.methods
      .mint(web3?.utils.toWei("10"))
      .send({ from: address })
      .on("transactionHash", (hash: string) => {
        console.log("Transaction hash:", hash)
      })
      .then((receipt: any) => {
        setDisabled(false)
        console.log("Transaction receipt:", receipt)
      })
      .catch((error: any) => {
        setDisabled(false)
        console.error(error)
      })
  }, [web3])

  return (
    <FormButton onClick={mintTestTokens} disabled={disabled}>
      Mint 10 Magic Test Tokens
    </FormButton>
  )
}

export default MintToken
