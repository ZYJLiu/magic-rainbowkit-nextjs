import { Networks } from "./networks"
import { magicTestTokenAbi, nftAbi, storageContractAbi } from "./contract-abis"
import Web3 from "web3"
import { useNetwork } from "wagmi"

const getStorageContractAddress = () => {
  const { chain } = useNetwork()
  const id = chain?.id
  switch (id) {
    case 80001:
      return "0xB7e7313C95b4dB35aB50760c31f29d1AA4679452"
    case 420:
      return "0xB7e7313C95b4dB35aB50760c31f29d1AA4679452"
    default:
      return "0xb57a27201b207E01c2b6781AB18fe1faA924f5CC"
  }
}

export const getStorageContract = (web3: Web3) => {
  const contractAddress = getStorageContractAddress()
  console.log("contractAddress", contractAddress)
  return new web3.eth.Contract(storageContractAbi, contractAddress)
}

const getNftContractAddress = () => {
  const { chain } = useNetwork()
  const id = chain?.id
  switch (id) {
    case 80001:
      return "0xfdBa8E462e9442b6077B1FC7B230205CAece2033"
    case 420:
      return "0xb57a27201b207E01c2b6781AB18fe1faA924f5CC"
    default:
      return "0x5Dfec61174fbC58C2b265044F90EE12418FA011c"
  }
}

export const getNftContract = (web3: Web3) => {
  const contractAddress = getNftContractAddress()
  return new web3.eth.Contract(nftAbi, contractAddress)
}

const getTokenContractAddress = () => {
  const { chain } = useNetwork()
  const id = chain?.id
  switch (id) {
    case 80001:
      return "0x96d71155fcA2eD56Da251591F59E1DC5ff4095e4"
    case 420:
      return "0x5Dfec61174fbC58C2b265044F90EE12418FA011c"
    default:
      return "0xB7e7313C95b4dB35aB50760c31f29d1AA4679452"
  }
}

export const getTestTokenContract = (web3: Web3) => {
  const contractAddress = getTokenContractAddress()
  return new web3.eth.Contract(magicTestTokenAbi, contractAddress)
}
