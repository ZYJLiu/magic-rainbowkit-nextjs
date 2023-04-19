import React, { useCallback, useEffect, useState } from "react"
import Divider from "../ui/divider"
import FormButton from "../ui/form-button"
import FormInput from "../ui/form-input"
import CardLabel from "../ui/card-label"
import ErrorText from "../ui/error"
import { getStorageContract } from "../../utils/contracts"
import { useAccount } from "wagmi"
import { useWeb3Context } from "@/context/web3-context"

const StorageContract = () => {
  const { web3 } = useWeb3Context()
  const { address } = useAccount()
  const [newNumber, setNewNumber] = useState("")
  const [storedNumber, setStoredNumber] = useState("")
  const [disabled, setDisabled] = useState(!newNumber)
  const [newNumberError, setNewNumberError] = useState(false)
  const contract = getStorageContract(web3!)

  useEffect(() => {
    setDisabled(!newNumber)
    setNewNumberError(false)
  }, [newNumber])

  useEffect(() => {
    getStoredNumber()
  }, [contract])

  const getStoredNumber = async () => {
    const number = await contract.methods.number().call()
    setStoredNumber(number)
  }

  const updateNumber = () => {
    if (isNaN(Number(newNumber))) return setNewNumberError(true)
    setDisabled(true)
    contract.methods
      .store(Number(newNumber))
      .send({ from: address })
      .on("transactionHash", (hash: string) => {
        console.log("Transaction hash:", hash)
      })
      .then((receipt: any) => {
        setNewNumber("")
        setDisabled(false)
        getStoredNumber()
        console.log("Transaction receipt:", receipt)
      })
      .catch((error: any) => {
        console.error(error)
        setDisabled(false)
      })
  }

  return (
    <div>
      <CardLabel leftHeader="Number stored in contract" />
      <div className="code">{storedNumber}</div>
      <Divider />
      <CardLabel leftHeader="Update number stored in contract" />
      <FormInput
        value={newNumber}
        onChange={(e: any) => setNewNumber(e.target.value)}
        placeholder="New number"
      />
      {newNumberError ? <ErrorText>Invalid number</ErrorText> : null}
      <FormButton onClick={updateNumber} disabled={!newNumber || disabled}>
        Call Contract
      </FormButton>
    </div>
  )
}

export default StorageContract
