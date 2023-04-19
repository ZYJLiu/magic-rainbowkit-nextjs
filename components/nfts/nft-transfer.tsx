import React, { useCallback, useEffect, useState } from "react"
import FormButton from "../ui/form-button"
import FormInput from "../ui/form-input"
import CardLabel from "../ui/card-label"
import ErrorText from "../ui/error"
import { getNftContract } from "../../utils/contracts"
import { useWeb3Context } from "@/context/web3-context"
import { useAccount } from "wagmi"

const NftTransfer = () => {
  const { web3 } = useWeb3Context()
  const { address } = useAccount()
  const [tokenId, setTokenId] = useState("")
  const [toAddress, setToAddress] = useState("")
  const [disabled, setDisabled] = useState(!tokenId || !toAddress)
  const [toAddressError, setToAddressError] = useState(false)
  const [tokenIdError, setTokenIdError] = useState(false)
  const contract = getNftContract(web3!)

  useEffect(() => {
    setDisabled(!toAddress || !tokenId)
    setTokenIdError(false)
    setToAddressError(false)
  }, [tokenId, toAddress])

  const mintNFT = useCallback(() => {
    if (!web3?.utils.isAddress(toAddress)) {
      return setToAddressError(true)
    }
    if (isNaN(Number(tokenId))) {
      return setTokenIdError(true)
    }
    setDisabled(true)
    contract.methods
      .transferFrom(address, toAddress, tokenId)
      .send({ from: address })
      .on("transactionHash", (hash: string) => {
        console.log("Transaction hash:", hash)
      })
      .then((receipt: any) => {
        setToAddress("")
        setTokenId("")
        console.log("Transaction receipt:", receipt)
      })
      .catch((error: any) => {
        setDisabled(false)
        console.error(error)
      })
  }, [web3])

  return (
    <div>
      <CardLabel leftHeader="Transfer NFT" />
      <FormInput
        value={toAddress}
        onChange={(e: any) => setToAddress(e.target.value)}
        placeholder="Receiving Address"
      />
      {toAddressError ? <ErrorText>Invalid address</ErrorText> : null}
      <FormInput
        value={tokenId}
        onChange={(e: any) => setTokenId(e.target.value)}
        placeholder="Token Id"
      />
      {tokenIdError ? (
        <ErrorText className="error">Invalid token ID</ErrorText>
      ) : null}
      <FormButton
        onClick={mintNFT}
        disabled={!toAddress || !tokenId || disabled}
      >
        Transfer
      </FormButton>
    </div>
  )
}

export default NftTransfer
