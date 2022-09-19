import React from 'react'
import { Container, Title, Button, Description, ButtonContainer, ImageContentModal } from './styled'
import { useSelector } from 'react-redux'
import PriceHolder from 'pages/Components/PriceHolder'
import { images } from 'config/images'

const ModalConfirm = ({ title, onPressAccept, description, titleButton = null, closeModal, modalData, priceUsd, tokenAmount = 0, insufficientBalance, amountNft = 1, isStore = false, isReturn }) => {
  const tokenBase = useSelector(state => state.settingRedux.tokenBase)

  return (
    <Container>
      <Title>
        {title?.toUpperCase()}
      </Title>

      {
        !isReturn && (
  <>
    <ImageContentModal src={modalData?.image ?? images.avatarDefault} />
    <PriceHolder usdPrice={priceUsd} tokenIcon={tokenBase?.icon} tokenBnbIcon tokenPrice={tokenAmount} isStore isBuyFeeToken />
  </>)
      }
      {/* <ImageContentModal src={modalData?.image ?? images.avatarDefault} />
      <PriceHolder usdPrice={priceUsd} tokenIcon={tokenBase?.icon} tokenBnbIcon tokenPrice={'tokenAmt'} isStore isBuyFeeToken /> */}
      {description &&
        <Description>
          {description}
        </Description>
      }
      <ButtonContainer>
        <Button type={1} onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button onClick={() => onPressAccept()}>
          {titleButton ?? 'Accept'}
        </Button>

      </ButtonContainer>

    </Container>
  )
}
export default ModalConfirm
