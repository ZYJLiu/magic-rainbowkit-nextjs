import React, { useCallback, useState } from "react"
import DownArrow from "public/down-arrow.svg"
import Check from "public/check.svg"
import { Networks } from "../../utils/networks"
import Image from "next/image"
import { useWeb3Context } from "@/context/web3-context"
import { useNetwork, useSwitchNetwork } from "wagmi"

type ChainIdToNameType = { [key: number]: Networks }

const Network = () => {
  const networkChainIds = {
    [Networks.Ethereum]: 5,
    [Networks.Polygon]: 80001,
    [Networks.Optimism]: 420,
  }

  const chainIdToName = Object.entries(
    networkChainIds
  ).reduce<ChainIdToNameType>((acc, [key, value]) => {
    acc[value] = key as Networks
    return acc
  }, {})

  const [isOpen, setIsOpen] = useState(false)
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const handleNetworkSelected = useCallback(
    (networkOption: Networks) => {
      const selectedChainId = networkChainIds[networkOption]

      if (selectedChainId && selectedChainId !== chain?.id) {
        switchNetwork?.(selectedChainId)
        console.log("SELECTED NETWORK: ", networkOption)
      }
    },
    [chain, switchNetwork]
  )

  const toggleDropdown = () => setIsOpen(!isOpen)
  const selectedChainId = chain?.id
  const selectedNetwork = chainIdToName[selectedChainId!]

  return (
    <div className="network-dropdown" onClick={toggleDropdown}>
      <div className="active-network">
        {selectedNetwork}
        <Image
          src={DownArrow}
          alt="down-arrow"
          className={isOpen ? "rotate" : ""}
        />
      </div>
      {isOpen && (
        <div className="network-options">
          {Object.values(Networks).map((networkOption) => (
            <div
              key={networkOption}
              className="network-dropdown-option"
              onClick={() => handleNetworkSelected(networkOption)}
            >
              <Image src={Check} alt="check" style={{ marginRight: "10px" }} />
              {networkOption}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Network
