import Login from "../components/login"
import Home from "../components/home"
import { useAccount } from "wagmi"

export default function App() {
  const { isConnected } = useAccount()
  console.log(isConnected)
  return isConnected ? <Home /> : <Login />
}
