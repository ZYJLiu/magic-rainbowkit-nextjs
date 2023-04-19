import { createContext, useContext, useState } from "react"
import Web3 from "web3"

export type Web3ContextType = {
  web3: Web3 | null
  setWeb3: (web3: Web3 | null) => void
}

const Web3Context = createContext<Web3ContextType>({
  web3: null,
  setWeb3: () => {},
})

export const useWeb3Context = () => useContext(Web3Context)

const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [web3Instance, setWeb3Instance] = useState<Web3 | null>(null)

  return (
    <Web3Context.Provider
      value={{
        web3: web3Instance,
        setWeb3: setWeb3Instance,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export default Web3Provider
