import { detectImageUrl } from 'common/function'
import React from 'react'
import { useSelector } from 'react-redux'
import Lotties from 'pages/Components/Lotties'
import { ContentModal, ImageContentModal, MessageLoading, LottieContainer, StyledModal, TextTitleModal } from '../styled'

const StartedModal = (props) => {
  const { modalData, title } = props
  const messages = useSelector(state => state.locale.messages)

  return (
    <StyledModal>
      <TextTitleModal>{title || messages.nft.yourTransactionHasStarted}</TextTitleModal>
      <ContentModal className='MT20'>
        <ImageContentModal src={detectImageUrl(modalData?.image) || 'https://ipfs.pantograph.app/ipfs/QmZuGAnMUrUNGSr5vKSfVKRpmB8PSdcVH6HRcpQxqdQL5y'
          // ? detectImageUrl(modalData?.packageAddress ? modalData?.nftImage : modalData?.image) : ''
        } />
        <LottieContainer>
          <Lotties type='started' />
        </LottieContainer>
      </ContentModal>
      <MessageLoading className='MT30'>
        {messages?.myNFT?.tomoNetworkIsProcessingYourTransactionWhichCanTakeALittleWhile || 'Network is processing your transaction, which can take a little while'}
      </MessageLoading>
    </StyledModal>
  )
}

export default StartedModal
