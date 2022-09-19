import React, { useState, useEffect } from 'react'
import {
  Container,
  Title,
  Description,
  BalanceHolder,
  ChargeButton
} from './style'
import { images } from 'config/images'
import Web3Services from 'controller/Web3'
import ModalExchange from './components/ModalExchange'
import ConfirmModal from 'pages/Components/Modal/ConfirmModal'

import { REACT_QUERY_KEY } from 'common/constants'
import { useSelector } from 'react-redux'
import { useQueryClient } from 'react-query'
import {
  isNotEnoughGas,
  isUserDeniedTransaction,
  showNotification, roundingNumber, convertBalanceToWei, numberWithCommas, copyToClipboard
} from 'common/function'
import WalletConnectServices from 'controller/WalletConnect'
import { useGetUserGameInfo } from 'hooks/useGetUserGameInfo'
import Input from 'pages/Components/Input'

const Refill = ({ type, YuToken, EnergyToken, myModal }) => {
  const [amount, setAmount] = useState(null)
  const [textWarning, setTextWarning] = useState('')
  const [isCharge, setIsCharge] = useState(false)
  const [modalData, setModalData] = useState({})
  const contractExchange = useSelector(state => state.settingRedux?.bsc?.contract_exchange)
  const queryClient = useQueryClient()
  const messages = useSelector(state => state.locale.messages)
  const userData = useSelector(state => state.userData)
  const { userGameInfo } = useGetUserGameInfo()

  const checkAmount = () => {
    if (Number(amount) > Number(modalData.balance)) {
      setTextWarning(`${messages.token.enoughTokens}`)
      setIsCharge(false)
    }
    if (Number(amount) < Number(modalData.balance) && Number(amount) > 0) {
      setTextWarning()
      // setIsWarning(true)
      setIsCharge(true)
    }
    if (Number(amount) === 0) {
      setTextWarning(messages.warningEnterIntegerNumber)
      setIsCharge(false)
    }
  }
  const submitSend = () => {
    if (type === 1) {
      exchangeYuToPoint(amount)
    } else {
      exchangeEnergyToPoint(amount)
    }
  }
  useEffect(() => {
    if (type === 1) {
      setModalData({
        title: messages.token.tokenToPoint.chargeYuPoint,
        description: `You are having ${userGameInfo?.yuPoint && numberWithCommas(userGameInfo?.yuPoint)} YU Point . \n YU point is necessary to play on Board. \n Do you want to charge your Yu Point from YU Token?`,
        tokenName: 'YU Token',
        balance: YuToken.amount,
        tokenIcon: images.icYuToken
      })
    } else {
      setModalData({
        title: messages.token.tokenToPoint.chargeEnergyPoint,
        description: `You are having ${userGameInfo?.energy && numberWithCommas(userGameInfo?.energy)} Energy.\n Energy is necessary to play on Board.\n Do you want to charge your Energy from FFE Token ?`,
        tokenName: 'FFE Token',
        balance: EnergyToken.amount,
        tokenIcon: images.icFFEToken
      })
    }
  }, [])

  const exchangeEnergyToPoint = async (amount) => {
    const checkAllowance = await Web3Services.checkAllowance(
      EnergyToken.contract,
      userData.address,
      contractExchange
    )
    const confirmBefore = async () => {
      myModal.current.openModal(
        <ModalExchange
          finish={closeModals} />, { closable: false }
      )
    }
    const confirmAfter = async () => {
      queryClient.invalidateQueries([REACT_QUERY_KEY.GET_USER_GAME_INFO])
      myModal.current.openModal(
        <ModalExchange
          title={messages.token.tokenToPoint.chargeSuccess}
          description={messages.token.tokenToPoint.desSuccessEnergy}
          noLoading
          isFinish
          finish={closeModals}
        />
      )
    }
    const confirmReject = (err) => {
      closeModals()
      if (!isNotEnoughGas(err)) {
        if (isUserDeniedTransaction(err)) {
          showNotification(messages.errors.deniedTransaction)
        } else {
          showNotification(messages.errors.somethingWrong)
        }
      } else {
        showNotification(messages.errors.notEnoughGas)
      }
    }
    const confirmChange = async () => {
      WalletConnectServices.deeplinkOpenApp()
      Web3Services.deposit(
        userData.address,
        EnergyToken.contract,
        convertBalanceToWei(amount, 18),
        contractExchange,
        confirmBefore,
        confirmAfter,
        confirmReject
      )
    }
    if (Number(amount) > 0 && Number(amount) <= Number(EnergyToken?.amount)) {
      myModal.current.closeModal()
      if (Number(checkAllowance) === 0) {
        myModal.current.openModal(<ConfirmModal
          title={messages.token.tokenToPoint.confirmCharging}
          onCancel={closeModals}
        />,
        { wrapClassName: 'confirm-modal', modalWidth: 500 })
        WalletConnectServices.deeplinkOpenApp()

        Web3Services.approveTokenAmount(
          userData.address,
          EnergyToken.contract,
          18,
          contractExchange,
          convertBalanceToWei(amount, 18),
          true,
          confirmBefore,
          confirmChange,
          confirmReject
        )
      } else {
        myModal.current.openModal(
          <ConfirmModal
            title={messages.token.tokenToPoint.confirmCharging}
            onCancel={closeModals}
          />,
          { wrapClassName: 'confirm-modal', modalWidth: 500 })
        confirmChange()
      }
    }
  }

  const exchangeYuToPoint = async (amount) => {
    const checkAllowance = await Web3Services.checkAllowance(
      YuToken.contract,
      userData.address,
      contractExchange
    )
    const confirmBefore = async () => {
      myModal.current.openModal(
        <ModalExchange
          finish={closeModals} />, { closable: false }
      )
    }
    const confirmAfter = async () => {
      queryClient.invalidateQueries([REACT_QUERY_KEY.GET_USER_GAME_INFO])
      myModal.current.openModal(
        <ModalExchange
          title={messages.token.tokenToPoint.chargeSuccess}
          description={messages.token.tokenToPoint.desSuccessYu}
          noLoading
          isFinish
          finish={closeModals}
        />
      )
    }
    const confirmReject = (err) => {
      closeModals()
      if (!isNotEnoughGas(err)) {
        if (isUserDeniedTransaction(err)) {
          showNotification(messages.errors.deniedTransaction)
        } else {
          showNotification(messages.errors.somethingWrong)
        }
      } else {
        showNotification(messages.errors.notEnoughGas)
      }
    }
    const confirmChange = async () => {
      WalletConnectServices.deeplinkOpenApp()
      Web3Services.deposit(
        userData.address,
        YuToken.contract,
        convertBalanceToWei(amount, 18),
        contractExchange,
        confirmBefore,
        confirmAfter,
        confirmReject
      )
    }
    if (Number(amount) > 0 && Number(amount) <= Number(YuToken?.amount)) {
      myModal.current.closeModal()
      if (Number(checkAllowance) === 0) {
        myModal.current.openModal(
          <ConfirmModal
            title={'Confirm charging'}
            onCancel={closeModals}
          />,
          { wrapClassName: 'confirm-modal', modalWidth: 500 })
        WalletConnectServices.deeplinkOpenApp()
        Web3Services.approveTokenAmount(
          userData.address,
          YuToken.contract,
          18,
          contractExchange,
          amount,
          true,
          confirmBefore,
          confirmChange,
          confirmReject
        )
      } else {
        myModal.current.openModal(
          <ConfirmModal
            title={messages.token.tokenToPoint.chargeSuccess}
            onCancel={closeModals}
          />,
          { wrapClassName: 'confirm-modal', modalWidth: 500 })
        confirmChange()
      }
    }
  }
  const closeModals = () => {
    myModal.current && myModal.current.closeModal()
  }
  return (
    <Container>
      <Title>{modalData?.title}</Title>
      <Description>{modalData?.description}</Description>
      <BalanceHolder>
        {`${modalData?.tokenName} ${messages.common.balance}`}: {numberWithCommas(roundingNumber(modalData?.balance ?? 0, 3))}
      </BalanceHolder>
      <Input
        onKeyUp={checkAmount}
        className='MT5'
        type='number'
        value={amount}
        placeholder='0'
        onChange={(e) => {
          setAmount(e.target.value)
        }}
        iconRight={(<span><img src={modalData?.tokenIcon} style={{
          width: 35,
          height: 35,
          padding: 2
        }} />
        </span>)}
      />

      {
        textWarning
          ? <div style={{ color: 'red', textAlign: 'right', marginTop: '12px' }}>{textWarning}</div>
          : <></>
      }
      <div>
        <ChargeButton
          enable={isCharge && amount}
          onClick={isCharge ? submitSend : () => { }}
        >
          {messages.common.charge}
        </ChargeButton>
      </div>
    </Container>
  )
}

export default Refill
