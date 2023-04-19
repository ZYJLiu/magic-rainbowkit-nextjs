import React, { useState, useCallback } from "react"
import AppHeader from "../app-header"
import Links from "../links"
import Network from "../network"
import Spacer from "../ui/spacer"
import LoginPageBackground from "public/login.svg"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const Login = () => {
  const [disabled, setDisabled] = useState(false)

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${LoginPageBackground})`,
      }}
    >
      <AppHeader />
      <Spacer size={32} />
      {/* <Network /> */}
      <Spacer size={20} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ConnectButton />
      </div>
      <Links footer />
    </div>
  )
}

export default Login
