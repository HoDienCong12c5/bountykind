import { detectImageUrl } from 'common/function'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PriceHolder from 'pages/Components/PriceHolder'
import {
  ButtonCancelModal,
  ButtonConfirmBuy,
  ButtonContainer,
  ContentModal,
  ImageContentModal,
  StyledModal,
  TextHelpModal,
  TextTitleModal,
  InsufficientBalance
} from '../styled'
import { MG } from 'pages/Style/CommonStyle'
import Web3Services from 'controller/Web3'
import ReduxServices from 'common/redux'
import { Spin } from 'antd'

const BuyModal = ({ isBuyFeeToken = false, title, textHelp, onConfirm, modalData, titleConfirm, onCancel, tokenAmount = 0, insufficientBalance, amountNft = 1, isStore = false, ...props }) => {
  const tokenBase = useSelector(state => state.settingRedux.tokenBase)
  const contractFiat = useSelector(state => state?.settingRedux?.bsc?.contract_fiat ?? '')
  const contractToken = useSelector(state => state?.settingRedux?.bsc?.contract_token ?? '')
  let isSigned = ReduxServices.checkIsSigned()
  const userData = useSelector(state => state.userData)
  const [loading, setLoading] = useState(false)
  const [loadingToken, setLoadingToken] = useState(false)
  const [priceUsd, setPriceUsd] = useState()
  const [tokenAmt, setTokenAmt] = useState()
  const [insufficientBalanceToken, setInsufficientBalanceToken] = useState(false)
  const messages = useSelector(state => state.locale.messages)

  const getInsufficientBalance = async (totalAmount, tokenDecimal) => {
    const tokenBalance = await Web3Services.getTokenBalance(userData.address, contractToken, tokenDecimal || 18)
    if (Number(tokenBalance) < (Number(totalAmount) * Number(amountNft))) {
      setInsufficientBalanceToken(true)
    } else {
      setInsufficientBalanceToken(false)
    }
  }
  const getDetailToken = async () => {
    setLoadingToken(false)
  }
  useEffect(() => {
    setTokenAmt(tokenAmount)
    setInsufficientBalanceToken(insufficientBalance)
    setPriceUsd(props.priceUsd)
  }, [tokenAmount, modalData, props.priceUsd])

  return (
    <StyledModal>
      <TextTitleModal>{title}</TextTitleModal>
      {textHelp &&
      <>
        <TextHelpModal color='#000A1D' className='MT15'>{textHelp}</TextHelpModal>
        <MG MB={10} />
      </>
      }
      <ContentModal className='MT20'>
        {/* <ImageContentModal src={detectImageUrl(modalData?.image) || 'https://ipfs.pantograph.app/ipfs/QmZuGAnMUrUNGSr5vKSfVKRpmB8PSdcVH6HRcpQxqdQL5y'} /> */}
        <ImageContentModal src={modalData?.image} />
        <MG MT={10} />
        { loadingToken ? <Spin className='MT20' /> : <PriceHolder usdPrice={priceUsd} tokenIcon={tokenBase?.icon} tokenBnbIcon tokenPrice={tokenAmt} isStore={isStore} isBuyFeeToken={isBuyFeeToken} />}
      </ContentModal>
      {insufficientBalanceToken && <InsufficientBalance>{messages.errors.insufficientBalance || 'Insufficient Balance' }</InsufficientBalance>}
      <ButtonContainer>
        <ButtonCancelModal
          onClick={() => {
            onCancel && onCancel()
          }}
          className='MR25'
        >
          {messages?.common?.cancel || 'Cancel'}
        </ButtonCancelModal>
        <ButtonConfirmBuy
          loading={loading || loadingToken}
          disabled={insufficientBalanceToken}
          onClick={() => {
            setLoading(true)
            tokenAmount === 0 ? onConfirm(tokenAmt) : onConfirm()
          }}
        >
          {titleConfirm || messages.nft.buy}
        </ButtonConfirmBuy>
      </ButtonContainer>

    </StyledModal>
  )
}

export default BuyModal
