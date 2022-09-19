import { detectImageUrl } from 'common/function'
import React, { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { ButtonConfirmModal, ButtonContainer, ContentModal, ImageContentModal, LoadingWrapper, MessageLoading, StyledModal, TextHelpModal, TextTitleModal } from '../styled'

const ConfirmModal = (props) => {
  const { title, textHelp, onConfirm, modalData, titleConfirm } = props
  const messages = useSelector(state => state.locale.messages)
  useEffect(() => {
    if (!isMobile) {
      onConfirm && onConfirm()
    }
  }, [])
  return (
    <StyledModal>
      <TextTitleModal>{title}</TextTitleModal>
      {textHelp && <TextHelpModal className='MT15'>{textHelp}</TextHelpModal>}
      <ContentModal className='MT20'>
        <ImageContentModal src={detectImageUrl(modalData?.image)} />
        {/* <ImageContentModal src={modalData?.image} /> */}
        <LoadingWrapper modalData={modalData} />
      </ContentModal>
      <MessageLoading className='MT30'>
        {messages?.myNFT?.waitingForBlockchainConfirmation}
      </MessageLoading>
      {isMobile && onConfirm && titleConfirm && (
        <ButtonContainer className='MT20'>
          <ButtonConfirmModal
            onClick={() => {
              onConfirm()
            }}
          >
            {titleConfirm}
          </ButtonConfirmModal>
        </ButtonContainer>
      )}
    </StyledModal>
  )
}

export default ConfirmModal
