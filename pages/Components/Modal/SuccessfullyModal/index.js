import { detectImageUrl } from 'common/function'
import React from 'react'
import { useSelector } from 'react-redux'
import Lotties from 'pages/Components/Lotties'
import {
  ContentModal,
  ImageContentModal,
  StyledModal,
  LottieContainer,
  TextTitleModal,
  BuyMoreButton
} from '../styled'
// import { images } from 'config/images'

const SuccessfullyModal = (props) => {
  const { title, textHelp, modalData, onBuyMore, textButton = null } = props
  const messages = useSelector((state) => state.locale.messages)
  return (
    <StyledModal>
      <TextTitleModal>{title}</TextTitleModal>
      {/* {textHelp && <TextHelpModal className='MT15'>{textHelp}</TextHelpModal>} */}
      <ContentModal className='MB30'>
        <ImageContentModal
          className='MT30'
          src={
            detectImageUrl(modalData?.image) ||
            'https://ipfs.pantograph.app/ipfs/QmZuGAnMUrUNGSr5vKSfVKRpmB8PSdcVH6HRcpQxqdQL5y'
            // ? detectImageUrl(modalData?.packageAddress ? modalData?.nftImage : modalData?.image) : ''
          }
        />
        <LottieContainer>
          <Lotties type='success' loop={false} />
        </LottieContainer>
      </ContentModal>
      {onBuyMore && (
        <BuyMoreButton onClick={onBuyMore}>
          {textButton || messages.nft.buyMore}
        </BuyMoreButton>
      )}
    </StyledModal>
  )
}

export default SuccessfullyModal
