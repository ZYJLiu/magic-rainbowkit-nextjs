import React, { useCallback, useEffect, useState } from "react"
import Divider from "../ui/divider"
import FormButton from "../ui/form-button"
import FormInput from "../ui/form-input"
import CardLabel from "../ui/card-label"
import ErrorText from "../ui/error"
import { getStorageContract } from "../../utils/contracts"
import { useMagicContext } from "@/context/magic-context"

const StorageContract = () => {
  const { web3 } = useMagicContext()
  const [newNumber, setNewNumber] = useState("")
  const [storedNumber, setStoredNumber] = useState("")
  const [disabled, setDisabled] = useState(!newNumber)
  const [newNumberError, setNewNumberError] = useState(false)
  const publicAddress = localStorage.getItem("user")
  const contract = getStorageContract(web3!)

  useEffect(() => {
    setDisabled(!newNumber)
    setNewNumberError(false)
  }, [newNumber])

  useEffect(() => {
    getStoredNumber()
  }, [web3])

  const getStoredNumber = useCallback(async () => {
    const number = await contract.methods.number().call()
    setStoredNumber(number)
  }, [web3])

  const updateNumber = useCallback(() => {
    if (isNaN(Number(newNumber))) return setNewNumberError(true)
    setDisabled(true)
    contract.methods
      .store(Number(newNumber))
      .send({ from: publicAddress })
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
  }, [web3])

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
