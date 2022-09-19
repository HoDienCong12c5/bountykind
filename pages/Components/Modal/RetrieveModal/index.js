import { detectImageUrl, isNotEnoughGas, isUserDeniedTransaction, showNotification } from 'common/function'
import Web3Services from 'controller/Web3'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ConfirmModal from '../ConfirmModal'
import StartedModal from '../StartedModal'
import { Router } from 'common/routes'
import {
  ButtonCancelModal,
  ButtonConfirmBuy,
  ButtonContainer,
  ContentModal,
  ImageContentModal,
  StyledModal,
  TextHelpModal,
  TextTitleModal
} from '../styled'
import { RELOAD_MY_NFT } from 'common/constants'
import Observer from 'common/observer'

import SuccessfullyModal from '../SuccessfullyModal'
import StoreService from 'services/storeService'
import WalletConnectServices from 'controller/WalletConnect'

const RetrieveModal = (props) => {
  const { modalData, closeModal, setActionLoading, myModal } = props
  const [loading, setLoading] = useState(false)

  // redux
  const messages = useSelector(state => state.locale.messages)
  const userData = useSelector(state => state.userData)
  const contractMarket = useSelector(state => state?.settingRedux?.bsc?.contract_market ?? '')

  const refresh = () => {
    Observer.emit(RELOAD_MY_NFT)
    Router.pushRoute('/my-nfts')
  }
  // Modal
  const showConfirmRetrieveModal = () => {
    myModal.current.openModal(<ConfirmModal title={messages.nft.confirmRetrievement} closeModal={closeModal} modalData={modalData} />)
  }

  const showStartedRetrieveModal = () => {
    myModal.current.openModal(<StartedModal title={messages.nft.yourRetrievementHasStarted} closeModal={closeModal} modalData={modalData} />)
  }

  const showSuccessRetrieveModal = () => {
    myModal.current.openModal(<SuccessfullyModal title={messages.nft.itemRetrievedSuccessfully} closeModal={closeModal} modalData={modalData} />, { onAfterClose: () => refresh() })
  }
  const onRetrieveNft = () => {
    showConfirmRetrieveModal()
    setActionLoading && setActionLoading(true)
    const callbackBeforeDone = () => {
      showStartedRetrieveModal()
    }

    const callbackAfterDone = () => {
      StoreService.removeNFT({
        orderId: modalData.orderId,
        nftAddress: modalData.address
      })
      showSuccessRetrieveModal()
      props.onGetData && props.onGetData()
      setActionLoading && setActionLoading(false)
    }

    const callbackRejected = (err) => {
      if (!isNotEnoughGas(err)) {
        if (isUserDeniedTransaction(err)) {
          showNotification(messages.errors.deniedTransaction)
        } else {
          showNotification(messages.errors.somethingWrong)
        }
      } else {
        showNotification(messages.errors.notEnoughGas)
      }
      setActionLoading && setActionLoading(false)
      closeModal()
    }
    WalletConnectServices.deeplinkOpenApp()
    Web3Services.removePrice(
      userData.address,
      contractMarket,
      modalData.address,
      modalData.orderId,
      callbackBeforeDone,
      callbackAfterDone,
      callbackRejected
    )
  }
  return (
    <StyledModal>
      <TextTitleModal>{messages.nft.retrieveItem}</TextTitleModal>
      <TextHelpModal color='#000A1D' >{messages.nft.areYouSureYouWouldLikeToRetrieveIt}</TextHelpModal>
      <ContentModal className='MT20'>
        <ImageContentModal src={detectImageUrl(modalData?.image) || ''} />
      </ContentModal>
      <ButtonContainer>
        <ButtonCancelModal
          onClick={() => {
            closeModal()
          }}
          className='MR25'
        >
          {messages?.common?.cancel || 'Cancel'}
        </ButtonCancelModal>
        <ButtonConfirmBuy
          loading={loading}
          onClick={() => {
            setLoading(true)
            onRetrieveNft()
          }}
        >
          {messages.nft.retrieve || 'Retrieve'}
        </ButtonConfirmBuy>
      </ButtonContainer>

    </StyledModal>
  )
}

export default RetrieveModal
