import { numberWithCommas, convertWeiToBalance } from 'common/function'
import { images } from 'config/images'
import useAuth from 'hooks/useAuth'
import { useGetNFTDetails } from 'hooks/useGetNFTDetails'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import StatusBox from '../StatusBox'
import { useGetTypeNFT } from 'hooks/buyPackage/useGetTypeNFT'
import {
  NftContainerMode1,
  NftContainerMode2,
  TopMode1,
  TopMode2,
  ImageWrapperMode1,
  ImageWrapperMode2,
  BottomMode1,
  BottomMode2,
  TopInfo,
  PriceHolderMode1,
  PriceHolderMode2,
  ContainerStatus,
  ContentStatus,
  IdNft,
  DescriptionNft,
  NameNft
} from './style'

const Nft = ({
  nft,
  handleOnClick,
  tableMode = 1,
  showPrice = true,
  showId = true,
  getDetails = false,
  showSellingStatus = true,
  isMarketPlace = false,
  isStore = false
}) => {
  const { isSigned } = useAuth()
  const userData = useSelector((state) => state.userData)
  const { details } = useGetNFTDetails(nft.contractAddress, nft.nftId, getDetails)
  let isNotActive = ['destroyed', 'collected', 'in_game'].includes(nft.status)
  const checkStatus = (nft) => {
    let status = 'Renting'
    if (nft?.isRenting) {
      if (nft?.statusScholarship === 'expired') {
        status = `Scholarship ${nft?.statusScholarship}`
      }
      if (nft?.statusScholarship === 'posting') {
        status = `Waiting for scholar`
      }
      if (nft?.statusScholarship === 'renting') {
        if (nft?.ownerAddress === userData.address) {
          status = 'Scholarship offered'
        } else if (nft?.renterAddress === userData.address) {
          status = 'In scholarship'
        }
      }
    }
    return status
  }
  const checkTypeDescriptionNFT = () => {
    if (nft?.attributes?.type === 'character') {
      return nft?.attributes?.character?.rarity
    }
    if (nft?.attributes?.type === 'item') {
      return nft?.attributes?.item?.rarity
    }
    if (nft?.attributes?.type === 'sapphire') {
      return `For ${nft?.attributes?.sapphire?.type} NFT`
    }
    if (nft?.rarity !== undefined) {
      return nft?.rarity
    }
    if (nft?.rarity === undefined) {
      return `For ${nft?.type} NFT` ?? nft?.rarity
    }

    return 'Description'
  }
  const Status = ({ children }) => {
    return (
      <ContainerStatus style={{
        textAlign: 'center',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }}>
        <ContentStatus >
          {children}
        </ContentStatus>

      </ContainerStatus>
    )
  }
  const { fiats } = isStore && useGetTypeNFT(nft)
  return tableMode === 1 ? (
    <NftContainerMode1
      className={!nft?.nftId && !nft?.typeId && 'not-nft'}
      onClick={handleOnClick}
      style={{ position: 'relative' }}
    >
      {isSigned &&
        userData?.address === nft.sellerAddress &&
        showSellingStatus && <Status>Selling</Status>}
      {getDetails && details?.isSelling && showSellingStatus && (
        <Status>Selling</Status>
      )}
      {!getDetails && nft?.isSelling && showSellingStatus && (
        <Status>Selling</Status>
      )}
      {showSellingStatus && nft.isRenting ? (
        <Status>{checkStatus(nft)}</Status>
      ) : (
        nft?.isSelling && showSellingStatus && <Status>Selling</Status>
      )}
      {/* {nft?.isSelling && (
        <Status>Selling</Status>)
      } */}

      {showId && !isNotActive && (
        <IdNft>
          {nft.id ? `#${nft.id}` : nft.nftId ? `#${nft.nftId}` : null}
        </IdNft>
      )}
      <ImageWrapperMode1
        image={nft.image && nft.image !== '' ? nft.image : images.avatarDefault}
      />
      <div className='MB10 MT10' style={{ margin: 'auto' }}>
        <DescriptionNft noHover disabled title={checkTypeDescriptionNFT()} />
      </div>

      <NameNft>{nft?.name?.toUpperCase()}</NameNft>

      {isStore && (
        <BottomMode1>
          <PriceHolderMode1>
            {fiats && '$' + `${convertWeiToBalance(fiats?.price)}`}
          </PriceHolderMode1>
        </BottomMode1>
      )}
      {isMarketPlace && (
        <BottomMode1>
          <PriceHolderMode1>$ {nft?.price}</PriceHolderMode1>
        </BottomMode1>
      )}
    </NftContainerMode1>
  ) : (
    <NftContainerMode2 onClick={handleOnClick}>
      <ImageWrapperMode2 image={nft.image} />
      <TopMode2>
        <TopInfo>#{nft.id}</TopInfo>
        <TopInfo style={{ fontSize: '12px' }}>{nft.name}</TopInfo>
      </TopMode2>
      {showPrice && (
        <BottomMode2>
          {nft.currentPrice | nft.jpyPrice && (
            <PriceHolderMode2>
              $
              {numberWithCommas(
                nft.currentPrice ? nft.currentPrice : nft.jpyPrice
              )}
            </PriceHolderMode2>
          )}
        </BottomMode2>
      )}
    </NftContainerMode2>
  )
}

export default Nft
