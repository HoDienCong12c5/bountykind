import React from 'react'
import { images } from 'config/images'
import { useSelector } from 'react-redux'
import {
  NFTContainer,
  BlackBackground,
  NFTImage,
  NFTName,
  NFTId,
  NFTPrice
} from './style'
import useAuth from 'hooks/useAuth'
import { Router } from 'common/routes'
import { detectImageUrl, numberWithCommas } from 'common/function'
import StatusBox from '../StatusBox'

const NFTItemMarket = (props) => {
  const { messages } = useSelector(state => state.locale)
  const { item } = props
  const { isSigned } = useAuth()
  const userData = useSelector(state => state.userData)
  const goToDetails = () => {
    Router.pushRoute(`/nft/${item.nftAddress}/${item.id}`)
  }
  const formatName = () => {
    let name = ''
    if (item.name) {
      name = item.name.replace(' ', '<br/>')
    }
    return name
  }
  return (
    <NFTContainer image={images.blackBackground} onClick={() => { goToDetails() }}>
      {isSigned && userData?.address === item.sellerAddress &&
      <StatusBox>
        {messages.nft.waitingForBuyer}
      </StatusBox>}
      <NFTImage src={detectImageUrl(item.image)} />
      <BlackBackground image={images.blackBackground}>
        <NFTName dangerouslySetInnerHTML={{ __html: formatName() }} />
        <NFTId>#{item.id}</NFTId>
        {item.jpyPrice && <NFTPrice>${numberWithCommas(item.jpyPrice)}</NFTPrice>}
      </BlackBackground>
    </NFTContainer>
  )
}

export default NFTItemMarket
