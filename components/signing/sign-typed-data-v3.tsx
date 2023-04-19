import React, { useCallback, useState } from "react"
import {
  recoverTypedSignature,
  SignTypedDataVersion,
} from "@metamask/eth-sig-util"
import FormButton from "../ui/form-button"
import CardLabel from "../ui/card-label"
import { signTypedDataV3Payload } from "../../utils/signTypedData-payload"
import { useWeb3Context } from "@/context/web3-context"
import { useAccount } from "wagmi"
import { useProvider } from "wagmi"

const SignTypedDataV3 = () => {
  const { address, connector: activeConnector } = useAccount()
  //@ts-ignore
  const magic = activeConnector.magic
  const [disabled, setDisabled] = useState(false)

  const signTypedDataV3 = useCallback(async () => {
    try {
      setDisabled(true)
      const params = [address, signTypedDataV3Payload]
      const method = "eth_signTypedData_v3"
      const signature = await magic.rpcProvider.request({
        method,
        params,
      })
      console.log("signature", signature)
      const recoveredAddress = recoverTypedSignature({
        data: signTypedDataV3Payload as any,
        signature,
        version: SignTypedDataVersion.V3,
      })
      console.log("recoveredAddress", recoveredAddress.toLocaleLowerCase())
      console.log("address", address?.toLocaleLowerCase())
      console.log(
        recoveredAddress.toLocaleLowerCase() === address?.toLocaleLowerCase()
          ? "Signing success!"
          : "Signing failed!"
      )
      setDisabled(false)
    } catch (error) {
      setDisabled(false)
      console.error(error)
    }
  }, [activeConnector])

  return (
    <div>
      <CardLabel leftHeader="Sign Typed Data v3" />
      <FormButton onClick={signTypedDataV3} disabled={disabled}>
        Sign
      </FormButton>
    </div>
  )
}

export default SignTypedDataV3
