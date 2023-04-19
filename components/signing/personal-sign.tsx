import React, { useCallback, useEffect, useState } from "react"
import { Buffer } from "buffer"
import { recoverPersonalSignature } from "@metamask/eth-sig-util"
import FormButton from "../ui/form-button"
import FormInput from "../ui/form-input"
import CardLabel from "../ui/card-label"
import { useWeb3Context } from "@/context/web3-context"
import { useAccount } from "wagmi"

const PersonalSign = () => {
  const { web3 } = useWeb3Context()
  const { address } = useAccount()
  const [message, setMessage] = useState("")
  const [disabled, setDisabled] = useState(!message)

  useEffect(() => {
    setDisabled(!message)
  }, [message])

  const personalSign = useCallback(async () => {
    try {
      if (address && web3) {
        setDisabled(true)
        const signedMessage = await web3.eth.personal.sign(message, address, "")
        console.log("signedMessage:", signedMessage)
        const recoveredAddress = recoverPersonalSignature({
          data: message,
          signature: signedMessage,
        })
        console.log(
          recoveredAddress.toLocaleLowerCase() === address?.toLocaleLowerCase()
            ? "Signing success!"
            : "Signing failed!"
        )
        setMessage("")
        setDisabled(false)
      }
    } catch (error) {
      setDisabled(false)
      console.error(error)
    }
  }, [web3])

  return (
    <div>
      <CardLabel leftHeader="Personal Sign" />
      <FormInput
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
        placeholder="My message"
      />
      <FormButton onClick={personalSign} disabled={!message || disabled}>
        Sign
      </FormButton>
    </div>
  )
}

export default PersonalSign
