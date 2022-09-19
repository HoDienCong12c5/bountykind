import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import Media from 'react-media'
import {
  BackButton,
  BackContainer,
  ButtonContainer,
  CommentContainer,
  ImageSell,
  InputComment,
  InputWrapper,
  SpinContainer,
  StyledSellNFT,
  TextBack,
  TitleMain,
  TitleSellingItem,
  TopActionContainer,
  ButtonCancel,
  SellingContainer,
  SellingPriceContainer,
  CommissionFeeContainer,
  TitleWrapper,
  SubTitle,
  YourNetRevenueContainer,
  TokenCommission,
  CommissionFeeMobile,
  TokenRevenue,
  TokenWrapper,
  ButtonSell,
  PaymentMethodContainer,
  TokenPaymentMethod,
  OldPriceContainer
} from './styled'
import { useSelector } from 'react-redux'
import { Router } from 'common/routes'
import Observer from 'common/observer'
import { Form, Input, Spin } from 'antd'
import { images } from 'config/images'
import { LoadingOutlined } from '@ant-design/icons'
import {
  convertWeiToBalance,
  numberWithCommas,
  isNotEnoughGas,
  isUserDeniedTransaction,
  showNotification,
  roundingNumber,
  detectImageUrl
} from 'common/function'
import Web3Services from 'controller/Web3'
import { useQuery } from 'react-query'
import GameService from 'services/gameService'
import Waiting from 'pages/Screen/MyNFTDetailScreen/Components/Waiting/index'
import StoreService from 'services/storeService'
import SuccessfullyModal from 'pages/Components/Modal/SuccessfullyModal'
import ApproveModal from 'pages/Components/Modal/ApproveModal'
import ConfirmModal from 'pages/Components/Modal/ConfirmModal'
import StartedModal from 'pages/Components/Modal/StartedModal'
import WalletConnectServices from 'controller/WalletConnect'
import MyModal from 'pages/Components/MyModal'
import { useGetTokenSymbols } from 'hooks/useGetTokenSymbols'
import { useGetListUSDToToken } from 'hooks/useGetListUSDToToken'
import { RELOAD_MY_NFT } from 'common/constants'

const ChangePriceNFT = (props) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: 'white' }} spin />
  )
  const myModal = useRef(null)
  const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace']

  const userData = useSelector((state) => state.userData)
  const contractFiat = useSelector(
    (state) => state?.settingRedux?.bsc?.contract_fiat ?? ''
  )
  const contractMarketSubAddress = useSelector(
    (state) => state?.settingRedux?.bsc?.contract_market_sub ?? ''
  )
  const messages = useSelector((state) => state.locale.messages)
  const contractMarketSub = useSelector(state => state?.settingRedux?.bsc?.contract_market_sub ?? '')
  const contractMarketAddress = useSelector((state) => state?.settingRedux?.bsc?.contract_market ?? '')
  const contractToken = useSelector(state => state?.settingRedux?.bsc?.contract_token ?? '')

  // useState
  const [nftDetails, setNftDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [priceUsd, setPriceUsd] = useState(0)
  const [price2Usd, setPrice2Usd] = useState(null)
  const [formData, setFormData] = useState({
    comment: 'FOR SALE',
    sellingPrice: 0
  })
  const [percentComissionFee, setPercentComissionFee] = useState(0)
  // get fiat and symbol
  const [listPaymentTokenAddress, setListPaymentTokenAddress] = useState([])
  const [selectedPayToken, setSelectedPayToken] = useState(0)
  const [actionLoading, setActionLoading] = useState(false)
  const [form] = Form.useForm()
  // get data
  useEffect(() => {
    const getDataNFT = async () => {
      const tempNftDetails = await StoreService.getNFT(
        props.nftAddress,
        props.nftId
      )
      if (tempNftDetails) {
        setPriceUsd(tempNftDetails?.data?.jpyPrice)
        setListPaymentTokenAddress(tempNftDetails?.data?.paymentTokenAddress)
        setNftDetails(tempNftDetails.data)
      }
    }
    if (!nftDetails) {
      getDataNFT()
    }
  }, [nftDetails])
  useEffect(() => {
    if (contractToken) {
      onGetTokenAmount()
    }
  }, [contractToken])
  // useQuery
  const { tokenSymbols } = useGetTokenSymbols(listPaymentTokenAddress)
  const { listAmountToken } = useGetListUSDToToken(tokenSymbols, contractFiat)
  // function
  const onGetTokenAmount = async () => {
    setActionLoading(true)
    const tokenSymbol = await Web3Services.getTokenSymbol(contractToken)
    const tokenDecimal = await Web3Services.getTokenDecimal(contractToken)
    const resPriceUSD = await Web3Services.getToken2USD(tokenSymbol, tokenDecimal, contractFiat)
    setPrice2Usd(1 / resPriceUSD)
    setActionLoading(false)
  }

  const submitChangePrice = async (value) => {
    const { sellingPrice, comment } = value
    setActionLoading(true)
    const resCreate = await StoreService.createStore({
      ids: [nftDetails.id],
      description: '',
      jpyPrice: sellingPrice,
      nftAddress: nftDetails.address,
      paymentTokenAddress: [`${listPaymentTokenAddress[selectedPayToken]}`]
    })
    const isApprovedForAll = await Web3Services.checkApprovedForAll(
      userData.address,
      nftDetails.address,
      contractMarketSubAddress
    )
    const callbackAfterDone = () => {
      myModal.current.closeModal()
      setActionLoading(false)
      showChangePriceSuccessModal(
        nftDetails,
        'Item on change price successfully!',
        messages.myNFT.itMayTake
      )
      Router.back()
    }

    const callbackRejected = (err) => {
      setActionLoading(false)
      closeModal()
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

    const callbackBeforeDone = (res) => {
      StoreService.sellNFT({
        hash: res,
        ids: [nftDetails.id],
        nftAddress: nftDetails.address,
        description: '',
        jpyPrice: sellingPrice,
        orderId: resCreate?.orderId,
        paymentTokenAddress: [listPaymentTokenAddress[selectedPayToken]]
      })
      showChangePriceStartedModal(nftDetails, 'Your changing price has started')
    }

    const onConfirm = () => {
      WalletConnectServices.deeplinkOpenApp()
      Web3Services.setPriceFee(
        userData.address,
        contractMarketAddress,
        resCreate?.orderId,
        nftDetails.address,
        nftDetails.id,
        sellingPrice,
        [listPaymentTokenAddress[selectedPayToken]],
        callbackBeforeDone,
        callbackAfterDone,
        callbackRejected
      )
    }
    if (isApprovedForAll) {
      showConfirmChangePriceModal(nftDetails)
      onConfirm()
    } else {
      showApproveAllModal(nftDetails)
      WalletConnectServices.deeplinkOpenApp()
      await Web3Services.approveAllNFT(
        userData.address,
        nftDetails.address,
        contractMarketSub,
        null,
        () => showConfirmChangePriceModal(nftDetails, onConfirm),
        callbackRejected
      )
    }
  }

  const refresh = () => {
    Observer.emit(RELOAD_MY_NFT)
    Router.pushRoute('/my-nfts')
  }
  const showConfirmChangePriceModal = (modalData, onConfirm) => {
    myModal.current.openModal(
      <ConfirmModal
        title={messages.myNFT.confirmPriceChange}
        onCancel={closeModal}
        onConfirm={onConfirm}
        titleConfirm={messages.myNFT.changePrice}
        modalData={modalData}
      />,
      { wrapClassName: 'confirm-modal', modalWidth: 500 }
    )
  }
  const onCheckNumber = async (rule, value) => {
    if (!value) {
      return Promise.reject(
        messages.form.pleaseInputNumber
      )
    }
    if (Number(value) >= 10) {
      if (value.toString().includes('.')) {
        return Promise.reject(messages.form.pleaseInputNumber)
      }
      if (value.length > 9) {
        return Promise.reject(messages.form.maxDigits)
      }
      setFormData({ ...formData, sellingPrice: value })
      return Promise.resolve()
    } else {
      setFormData({ ...formData, sellingPrice: 0 })
      return Promise.reject(messages.form.minNumberInput)
    }
  }

  const showChangePriceStartedModal = (modalData, content) => {
    myModal.current.openModal(
      <StartedModal
        title={content}
        modalData={modalData}
      />,
      {
        wrapClassName: 'started-modal',
        modalWidth: 500
      }
    )
  }
  const goToMarket = () => {
    Router.back()
  }
  const showChangePriceSuccessModal = (modalData, title, description) => {
    myModal.current.openModal(
      <SuccessfullyModal
        title={title}
        textHelp={description}
        modalData={modalData}
      />,
      {
        wrapClassName: 'success-modal',
        modalWidth: 500,
        onAfterClose: () => goToMarket()
      }
    )
  }

  const showApproveAllModal = (modalData) => {
    myModal.current.openModal(<ApproveModal modalData={modalData} />, {
      wrapClassName: 'confirm-modal',
      modalWidth: 500
    })
  }
  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }
  const formDataDesktop = () => {
    return (
      <CommissionFeeContainer className='MT25'>
        <TitleWrapper>
          <TitleSellingItem className='title'>
            {messages?.myNFT?.comissionFee}
          </TitleSellingItem>
          <SubTitle>
            {percentComissionFee}%
            {' '}{messages?.myNFT?.OfSellingPrice}
          </SubTitle>
        </TitleWrapper>
        <TokenCommission>
          <div className='flex'>
            <TokenWrapper size={14} opacity={1} className='MR6'>
              <span className='price-token'> ${numberWithCommas(Number((percentComissionFee / 100) * formData?.sellingPrice).toFixed(2))} </span>
            </TokenWrapper>
          </div>
          <SubTitle className='MT10 MB20'>
            {messages.myNFT.commissionFeeWillBeChargedImmediatelyFromYourBuyerWhenThisItemIsBought}
          </SubTitle>
        </TokenCommission>
      </CommissionFeeContainer>
    )
  }
  const formDataMobile = () => {
    return (
      <CommissionFeeContainer className='MT25'>
        <CommissionFeeMobile>
          <TitleWrapper>
            <TitleSellingItem className='title'>
              {messages?.myNFT?.comissionFee}
            </TitleSellingItem>
            <SubTitle>
              {percentComissionFee}%
              {' '}{messages?.myNFT?.OfSellingPrice}
            </SubTitle>
          </TitleWrapper>
          <TokenCommission>
            <div className='flex'>
              <TokenWrapper size={14} opacity={1} className='MR6'>
                <span className='price-token ML5'> ${numberWithCommas(Number((percentComissionFee / 100) * formData?.sellingPrice).toFixed(2))} </span>
              </TokenWrapper>
            </div>
          </TokenCommission>
        </CommissionFeeMobile>
        <SubTitle className='MT10 MB20 text-help'>
          {messages.myNFT.commissionFeeWillBeChargedImmediatelyFromYourBuyerWhenThisItemIsBought}
        </SubTitle>
      </CommissionFeeContainer>
    )
  }
  const renderFormData = () => {
    return (
      <Form
        form={form}
        initialValues={formData}
        onValuesChange={(changedValues, allValue) => setFormData(allValue)}
        onFinish={submitChangePrice}
      >
        <SellingContainer className='MT20'>
          <Form.Item>
            <ImageSell
              className='MT30'
              src={detectImageUrl(nftDetails?.image)}
            />
          </Form.Item>
          <SellingPriceContainer className='MT30'>
            <TitleSellingItem className='title'>
              {messages?.myNFT?.sellingPrice}
            </TitleSellingItem>
            <InputWrapper className='MT10'>
              <Form.Item
                name={'sellingPrice'}
                rules={[{ validator: onCheckNumber }]}
              >
                <Input
                  autoComplete='off'
                  placeholder='0'
                  type={'number'}
                  onKeyPress={(event) => {
                    if (event.target.value.length >= 9) {
                      event.preventDefault()
                    }
                  }}
                  className='input'
                  suffix={<span style={{ color: 'white', fontWeight: '600' }}>$</span>}
                />
              </Form.Item>
            </InputWrapper>
          </SellingPriceContainer>
          <Media query='(min-width: 768px)'>
            {
              match => {
                if (match) {
                  return formDataDesktop()
                }
                return formDataMobile()
              }
            }
          </Media>
          <PaymentMethodContainer className='MT21'>
            <TitleSellingItem className='title'>
              {messages?.myNFT?.paymentMethod}
            </TitleSellingItem>
            <TokenPaymentMethod>
              <img src={detectImageUrl(listAmountToken && listAmountToken[0]?.token)} width={29} height={29} />
              <div className='token-payment ML10'>
                <div className='symbol'>
                  {listAmountToken && listAmountToken[0]?.token}
                </div>
                <div className='price-text'>1 {listAmountToken && listAmountToken[0]?.token} = ${ price2Usd}</div>
              </div>
            </TokenPaymentMethod>
          </PaymentMethodContainer>
          <YourNetRevenueContainer className='MT20'>
            <TitleSellingItem className='title'>
              {messages?.myNFT?.yourNetRevenue}
            </TitleSellingItem>
            <TokenRevenue>
              <div className='flex'>
                <TokenWrapper size={18} opacity={1} className='MR6'>
                  <span className='price-token'> ${numberWithCommas((Number(formData?.sellingPrice || 0) - Number((percentComissionFee / 100) * formData?.sellingPrice)).toFixed(2))} </span>
                </TokenWrapper>
              </div>
            </TokenRevenue>
          </YourNetRevenueContainer>
        </SellingContainer>
        <CommentContainer className='MT20'>
          <TitleSellingItem>
            {messages?.myNFT?.comment || 'Comment'}
          </TitleSellingItem>
          <InputComment>
            <Form.Item name='comment'>
              <Input.TextArea
                className='input'
                maxLength={250}
                autoSize={{ minRows: 3, maxRows: 4 }}
              />
            </Form.Item>
            <p className='count MT5'>{formData.comment.length}/250</p>
          </InputComment>
        </CommentContainer>
        <ButtonContainer className='MT30'>
          <ButtonCancel onClick={() => Router.back()}>
            {messages?.common?.cancel}
          </ButtonCancel>
          <ButtonSell
            htmlType='submit'
            className='ML15'
            loading={actionLoading}
            disabled={actionLoading}
          >
            {messages?.nft?.changePrice}
          </ButtonSell>
        </ButtonContainer>
      </Form>
    )
  }
  return (
    <StyledSellNFT>
      <TopActionContainer>
        <BackContainer onClick={() => Router.back()}>
          <BackButton />
          <TextBack>{messages.common.back}</TextBack>
        </BackContainer>
        <TitleMain>{messages.nft.changePrice}</TitleMain>
      </TopActionContainer>
      <OldPriceContainer>
        <TitleSellingItem>
          {messages.nft.oldPrice}
        </TitleSellingItem>
        <TokenRevenue>
          <div className='flex'>
            <TokenWrapper size={18} opacity={1} className='MR6'>
              <span className='price-token'> ${Number(nftDetails?.jpyPrice || 0)} </span>
            </TokenWrapper>
          </div>
        </TokenRevenue>
      </OldPriceContainer>
      {
        loading ? (
          <SpinContainer />
        ) : (

          renderFormData()

        )
      }
      <MyModal ref={myModal} />
    </StyledSellNFT>
  )
}
ChangePriceNFT.getInitialProps = async ({ query }) => {
  const { nftAddress, nftId } = query
  return { nftAddress, nftId }
}
export default ChangePriceNFT
