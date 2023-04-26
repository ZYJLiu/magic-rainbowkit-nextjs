import React, { useCallback, useState } from "react"
import Loading from "public/loading.svg"
import Image from "next/image"
import { useAccount } from "wagmi"

// this won't work, connected via wagmi
const Disconnect = () => {
  const { connector: activeConnector } = useAccount()
  //@ts-ignore
  const magic = activeConnector.magic
  // console.log(magic)

  const [disabled, setDisabled] = useState(false)

  const disconnect = useCallback(async () => {
    if (!magic) return
    try {
      setDisabled(true)
      await magic.wallet.disconnect()
      setDisabled(false)
    } catch (error) {
      setDisabled(false)
      console.error(error)
    }
  }, [magic])

  return (
    <div className="wallet-method-container">
      <button
        className="wallet-method"
        onClick={disconnect}
        disabled={disabled}
      >
        {disabled ? (
          <div className="loadingContainer" style={{ width: "115px" }}>
            <Image className="loading" alt="loading" src={Loading} />
          </div>
        ) : (
          "disconnect()"
        )}
      </button>
      <div className="wallet-method-desc">Disconnects user from dApp.</div>
    </div>
  )
}

export default Disconnect
