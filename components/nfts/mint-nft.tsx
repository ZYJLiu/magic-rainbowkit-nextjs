import React, { useCallback, useEffect, useState } from "react"
import FormButton from "../ui/form-button"
import FormInput from "../ui/form-input"
import CardLabel from "../ui/card-label"
import { getNftContract } from "../../utils/contracts"
import { useWeb3Context } from "@/context/web3-context"
import { useAccount } from "wagmi"

const MintNft = () => {
  const { web3 } = useWeb3Context()
  const { address } = useAccount()
  const [name, setName] = useState("")
  const [disabled, setDisabled] = useState(!name)
  const contract = getNftContract(web3!)

  useEffect(() => {
    setDisabled(!name)
  }, [name])

  const mintNFT = useCallback(async () => {
    try {
      setDisabled(true)
      const gas = await contract.methods
        .mint(name)
        .estimateGas({ from: address })
      contract.methods
        .mint(name)
        .send({
          from: address,
          gas,
        })
        .on("transactionHash", (hash: string) => {
          console.log("Transaction hash:", hash)
        })
        .then((receipt: any) => {
          setName("")
          console.log("Transaction receipt:", receipt)
        })
        .catch((error: any) => {
          setDisabled(false)
          console.error(error)
        })
    } catch (error) {
      setDisabled(false)
      console.error(error)
    }
  }, [web3])

  return (
    <div>
      <CardLabel leftHeader="Mint a new NFT" />
      <FormInput
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        placeholder="NFT name"
      />
      <FormButton onClick={mintNFT} disabled={!name || disabled}>
        Mint
      </FormButton>
    </div>
  )
}

export default MintNft
