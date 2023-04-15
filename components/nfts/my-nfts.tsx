import React, { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Loading from "public/loading.svg"
import nftImageOne from "public/nft-one.svg"
import nftImageTwo from "public/nft-two.svg"
import nftImageThree from "public/nft-three.svg"
import Spacer from "../ui/spacer"
import CardLabel from "../ui/card-label"
import { getNftContract } from "../../utils/contracts"
import { useMagicContext } from "@/context/magic-context"

const NFTDisplay = ({ id, name }: { id: string; name: string }) => {
  const getNftImage = () => {
    switch (Number(id) % 3) {
      case 1:
        return nftImageOne
      case 2:
        return nftImageTwo
      default:
        return nftImageThree
    }
  }

  return (
    <div className="nft code">
      <div className="flex-row" style={{ justifyContent: "flex-start" }}>
        <Image src={getNftImage()} alt="nft-logo" />
        <div style={{ marginLeft: "12px" }}>
          <div className="nft-name">{name}</div>
          <Spacer size={5} />
          <div>Token ID: {id}</div>
        </div>
      </div>
    </div>
  )
}

interface NftDataType {
  tokenId: string
  tokenURI: string
}

const MyNfts = () => {
  const { web3 } = useMagicContext()
  const [nftData, setNftData] = useState<NftDataType[] | undefined>()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const contract = getNftContract(web3!)
  const publicAddress = localStorage.getItem("user")

  useEffect(() => {
    refresh()
  }, [web3])

  useEffect(() => {
    console.log("nftData", nftData)
    if (!nftData) {
      getOwnedNfts()
    }
  }, [])

  const formatNftMetadata = (nftIds: string[], tokenURIs: string[]) => {
    return nftIds.map((nftId: string, i: number) => {
      return {
        tokenId: nftId,
        tokenURI: tokenURIs[i],
      }
    })
  }

  const getOwnedNfts = useCallback(async () => {
    if (!isRefreshing) {
      try {
        const nftIds = await contract.methods
          .getNftsByAddress(publicAddress)
          .call()
        const tokenURIPromises = nftIds.map(async (nftId: string) => {
          return await contract.methods.tokenURI(nftId).call()
        })
        const tokenURIs = await Promise.all(tokenURIPromises)
        const nftMetadata = formatNftMetadata(nftIds, tokenURIs)
        setNftData(nftMetadata)
      } catch (error) {
        console.error(error)
      }
    }
  }, [web3])

  const refresh = useCallback(async () => {
    setIsRefreshing(true)
    await getOwnedNfts()
    setTimeout(() => {
      setIsRefreshing(false)
    }, 500)
  }, [web3])

  return (
    <div>
      <CardLabel
        style={{ height: "20px" }}
        leftHeader="My NFTs"
        rightAction={
          isRefreshing ? (
            <div className="loading-container">
              <Image className="loading" alt="loading" src={Loading} />
            </div>
          ) : (
            <div onClick={refresh}>Refresh</div>
          )
        }
      />
      {nftData && nftData.length > 0 ? (
        <div className="nft-list">
          {nftData.map((nft) => {
            return (
              <NFTDisplay
                id={nft.tokenId}
                key={nft.tokenId}
                name={nft.tokenURI}
              />
            )
          })}
        </div>
      ) : (
        <div className="code" style={{ color: "#777679" }}>
          No NFTs in wallet
        </div>
      )}
    </div>
  )
}

export default MyNfts
