import React, { useEffect, useState } from "react"
import DownArrow from "public/down-arrow.svg"
import Check from "public/check.svg"
import { Networks } from "../../utils/networks"
import Image from "next/image"
import { useMagicContext } from "@/context/magic-context"
// import { useInitializeMagic } from "@/libs/magic"

const Network = () => {
  const networkOptions = [
    Networks.Ethereum,
    Networks.Polygon,
    Networks.Optimism,
  ]
  const [isOpen, setIsOpen] = useState(false)
  const [network, setNetwork] = useState("")
  const { updateMagicInstance } = useMagicContext()
  // const { setSelectedNetwork } = useMagicContext()
  // const initializeMagic = useInitializeMagic()

  useEffect(() => {
    const initialNetwork = localStorage.getItem("network") || Networks.Ethereum
    updateMagicInstance(initialNetwork as Networks)
    setNetwork(initialNetwork as Networks)
  }, [])

  const handleNetworkSelected = (networkOption: Networks) => {
    if (networkOption !== network) {
      setNetwork(networkOption)
      localStorage.setItem("network", networkOption)
      updateMagicInstance(networkOption)
      // setSelectedNetwork(networkOption)
      // initializeMagic(networkOption)
    }
  }

  const toggleDropdown = () => setIsOpen(!isOpen)

  return (
    <div className="network-dropdown" onClick={toggleDropdown}>
      <div className="active-network">
        {network}
        <Image
          src={DownArrow}
          alt="down-arrow"
          className={isOpen ? "rotate" : ""}
        />
      </div>
      {isOpen && (
        <div className="network-options">
          {networkOptions.map((networkOption) => (
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
