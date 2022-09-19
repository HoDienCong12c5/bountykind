import { images } from 'config/images'
import React from 'react'
import { useSelector } from 'react-redux'
import { detectImageUrl } from 'common/function'
import { ContentModal, ImageApproveModal, LoadingApproveWrapper, MessageLoading, StyledModal, TextTitleModal } from '../styled'

const ApproveModal = (props) => {
  const { title, modalData, isNFT = false } = props
  const messages = useSelector(state => state.locale.messages)

  return (
    <StyledModal>
      <TextTitleModal>{title}</TextTitleModal>
      <ContentModal className='MT20'>
        <ImageApproveModal src={detectImageUrl(modalData?.image) || images?.icDefaultToken
          // ? detectImageUrl(modalData?.packageAddress ? modalData?.nftImage : modalData?.image) : ''
        } width={190} isNFT={isNFT} />
        <LoadingApproveWrapper isNFT={isNFT} className='loading' />
      </ContentModal>
      <MessageLoading className='MT30'>
        {messages?.myNFT?.waitingForBlockchainConfirmation}
      </MessageLoading>

    </StyledModal>
  )
}

export default ApproveModal
