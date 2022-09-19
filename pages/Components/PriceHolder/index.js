import React from 'react'
import { useSelector } from 'react-redux'
import {
  Container,
  Icon,
  TokenPrice,
  UsdPrice
} from './style'
import { detectImageUrl, roundingNumber, numberWithCommas } from 'common/function'
import { images } from 'config/images'

const PriceHolder = ({ align = 'center', usdPrice = 0, tokenPrice = 0, tokenIcon = null, isStore = false, isBuyFeeToken = false }) => {
  const tokenBase = useSelector(state => state.settingRedux.tokenBase)
  tokenIcon = detectImageUrl(tokenBase.icon)

  return (
    <Container align={align}>
      {isStore && <Icon src={isBuyFeeToken ? (tokenIcon || tokenBase.icon) : images.icBnbIcon} />}

      {!isStore && <Icon src={detectImageUrl(tokenIcon || tokenBase.icon)} />}
      <TokenPrice>{numberWithCommas(roundingNumber(tokenPrice, 4))}</TokenPrice>
      <UsdPrice>${numberWithCommas(roundingNumber(usdPrice, 4))}</UsdPrice>
    </Container>
  )
}

export default PriceHolder
