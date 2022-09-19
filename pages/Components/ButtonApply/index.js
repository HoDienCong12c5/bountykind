import React, { useRef, useCallback } from 'react'
import StartedModal from 'pages/Components/Modal/StartedModal'
import ConfirmModal from 'pages/Components/Modal/ConfirmModal'
import SuccessfullyModal from 'pages/Components/Modal/SuccessfullyModal'
import { useSelector } from 'react-redux'
import WalletConnectServices from 'controller/WalletConnect'
import Web3Services from 'controller/Web3'
import useAuth from 'hooks/useAuth'
import ModalRequirePassword from './ModalRequirePassword'
import ModalAcceptRent from './ModalAcceptRent'
import {
  showNotification,
  isUserDeniedTransaction,
  isNotEnoughGas
} from 'common/function'
import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
import MyModal from 'pages/Components/MyModal'
import scholarshipService from 'services/scholarshipService'
import { Router } from 'common/routes'
import Observer from 'common/observer'
import {
  OBSERVER_KEY
} from 'common/constants'
import ReduxServices from 'common/redux'

const ButtonApplyCustom = styled(MyButton)`
  width: 100%;
`
const ButtonApply = ({ type,
  nftDetails,
  nftDetailsScholarship,
  funcAfterClose = null,
  name = null,
  funcContinueScholarship = null,
  isRoutePage = false,
  style = {}
}) => {
  const { isSigned } = useAuth()
  const myModal = useRef(null)
  const messages = useSelector((state) => state.locale.messages)
  const userData = useSelector((state) => state.userData)
  const isOwner = userData?.address === nftDetails?.ownerAddress
  const contractScholarshipOffer = useSelector(
    (state) => state?.settingRedux?.bsc?.contract_scholarship_offer
  )
  /// /////////////////////////////////////
  const showRentStartedModal = (modalData = '', title) => {
    myModal.current.openModal(
      <StartedModal title={title} modalData={modalData} />,
      {
        wrapClassName: 'started-modal',
        modalWidth: 500
      }
    )
  }
  const showConfirmTransactionsModal = (
    modalData = {},
    onConfirm = () => {},
    title,
    titleConfirm = ''
  ) => {
    myModal.current.openModal(
      <ConfirmModal
        title={title}
        onCancel={closeModal}
        modalData={modalData}
      />,
      { wrapClassName: 'confirm-modal', modalWidth: 500 }
    )
  }
  const showRentSuccessModal = (modalData, title, description, afterClose = null) => {
    myModal.current.openModal(
      <SuccessfullyModal
        title={title}
        textHelp={description}
        modalData={modalData}
      />,
      {
        wrapClassName: 'success-modal',
        modalWidth: 500,
        onAfterClose: () => (afterClose && afterClose()) ?? (funcAfterClose && funcAfterClose())
      }
    )
  }
  const onRentNFt = async (data) => {
    console.log({ data })
    showConfirmTransactionsModal(
      nftDetails,
      () => {},
      messages.confirm.scholarship.confirm,
      messages.myNFT.scholarship
    )
    const callbackBeforeDone = () => {
      showRentStartedModal(nftDetails, messages.confirm.scholarship.started)
    }
    const callbackAfterDone = () => {
      showRentSuccessModal(
        nftDetails,
        messages.confirm.scholarship.success,
        '', () => Router.pushRoute('/my-nfts')
      )
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
      // setActionLoading && setActionLoading(false)
      closeModal()
    }

    WalletConnectServices.deeplinkOpenApp()
    await Web3Services.rentNFT(
      userData.address,
      nftDetails.contractAddress,
      nftDetails.nftId,
      data.timestamp,
      data.v,
      data.r,
      data.s,
      callbackBeforeDone,
      callbackAfterDone,
      callbackRejected
    )
  }
  const showTransactionsStartedModal = (
    modalData = '',
    title = ''
  ) => {
    myModal.current.openModal(
      <StartedModal title={title} modalData={modalData} />,
      {
        wrapClassName: 'started-modal',
        modalWidth: 500
      }
    )
  }
  const showTransactionsSuccessModal = (
    modalData = {},
    title = '',
    textHelp = '', afterClose = null
  ) => {
    myModal.current.openModal(
      <SuccessfullyModal
        title={title}
        textHelp={textHelp}
        modalData={modalData}
      />,
      {
        wrapClassName: 'success-modal',
        modalWidth: 500,
        onAfterClose: () => (afterClose && afterClose()) ?? (funcAfterClose && funcAfterClose())
      }
    )
  }
  const goBack = () => {
    Router.back()
  }
  const onWithdraw = async () => {
    // console.log({ nftDetailsScholarship })
    showConfirmTransactionsModal(
      nftDetails,
      () => {},
      messages.confirm.withDraw.confirm,
      messages.myNFT.scholarship
    )
    const callbackBeforeDone = () => {
      showTransactionsStartedModal(nftDetails, messages.confirm.withDraw.started)
    }
    const callbackAfterDone = () => {
      showTransactionsSuccessModal(
        nftDetails,
        messages.confirm.withDraw.success,
        null,
        () => Router.push('/my-nfts')
      )
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
      // setActionLoading && setActionLoading(false)
      closeModal()
    }

    WalletConnectServices.deeplinkOpenApp()
    await Web3Services.scholarshipNFT(
      userData.address,
      nftDetails.contractAddress,
      nftDetails.nftId,
      nftDetailsScholarship.ratio * 1000,
      0,
      nftDetailsScholarship.checkCode,
      callbackBeforeDone,
      callbackAfterDone,
      callbackRejected
    )
  }

  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }

  const openModalSignIn = async () => {
    await Observer.emit(OBSERVER_KEY.SIGN_IN)
    ReduxServices.setIsOpenModalWarning(true)
  }
  return (
    <div>
      <div
        onClick={() => {
          if (isSigned) {
            if (isRoutePage) {
              Router.push(
                `/my-nft-detail/${nftDetails.contractAddress}/${nftDetails.nftId}`
              )
            } else {
              myModal.current.openModal(<ModalAcceptRent name={name} isRent={!isOwner} onclick={
                async () => {
                  if (name === 'continue') {
                    funcContinueScholarship()
                  } else
                  if (isOwner) {
                    onWithdraw()
                  } else if (nftDetailsScholarship?.checkCode) {
                    myModal.current.openModal(<ModalRequirePassword nftDetails={nftDetails} onclick={onRentNFt} closeModal={closeModal} />, { modalWidth: 480, wrapClassName: '', onAfterClose: null })
                  } else {
                    const dataScholarship = await scholarshipService.postCheckCodeScholarship(nftDetails.contractAddress, nftDetails.nftId, { 'code': '' })
                    if (dataScholarship?.message === 'success') {
                      onRentNFt(dataScholarship.data)
                    }
                  }
                }} closeModal={closeModal} />, { modalWidth: 480, wrapClassName: '', onAfterClose: null })
            }
          } else {
            openModalSignIn()
          }
        }}
      >
        <ButtonApplyCustom type={type} style={style}>
          {name || (isOwner && isSigned ? messages.common.withdraw : messages.common.apply)}
        </ButtonApplyCustom>
      </div>

      <MyModal ref={myModal} />
    </div>
  )
}

export default ButtonApply
