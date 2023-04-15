import Web3 from "web3"
import { useMagic } from "./magic"

const magic = useMagic()

export const web3 = magic ? new Web3((magic as any).rpcProvider) : null
