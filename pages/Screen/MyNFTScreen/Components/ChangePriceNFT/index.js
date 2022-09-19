import React, { useState, useEffect, useRef } from 'react'
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
  OldPriceContainer,
  ContainerStyled,
  FormContainer,
  InputCustom,
  FormCustom
} from './styled'
import { useSelector } from 'react-redux'
import { Router } from 'common/routes'
import Observer from 'common/observer'
import { Form, Spin } from 'antd'
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
import './style.scss'
import Input from 'pages/Components/Input'
import { COLOR } from 'common/constants'
const ChangePriceNFT = (props) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: 'white' }} spin />
  )
  const myModal = useRef(null)

  const userData = useSelector((state) => state.userData)
  const contractFiat = useSelector(
    (state) => state?.settingRedux?.bsc?.contract_fiat ?? ''
  )
  const messages = useSelector((state) => state.locale.messages)
  const contractMarketAddress = useSelector((state) => state?.settingRedux?.bsc?.contract_market ?? '')
  const contractToken = useSelector(state => state?.settingRedux?.bsc?.contract_token ?? '')

  // useState
  const [nftDetails, setNftDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [priceUsd, setPriceUsd] = useState(0)
  const [price2Usd, setPrice2Usd] = useState(null)
  const [formData, setFormData] = useState({
    comment: 'FOR CHANGE PRICE',
    sellingPrice: ''
  })
  const [percentComissionFee, setPercentComissionFee] = useState(0)
  // get fiat and symbol
  const [listPaymentTokenAddress, setListPaymentTokenAddress] = useState([])
  const [priceNFTOld, setPriceNFTOld] = useState(0)
  const [actionLoading, setActionLoading] = useState(false)
  const [form] = Form.useForm()
  const contractTokenAddress = useSelector((state) => state?.settingRedux?.bsc?.contract_token ?? '')

  // get data
  useEffect(() => {
    const getDataNFT = async () => {
      const tempNftDetails = await StoreService.getNFT(
        props.nftAddress,
        props.nftId
      )
      if (tempNftDetails) {
        console.log({ tempNftDetails })
        setPriceUsd(tempNftDetails?.price)
        setPriceNFTOld(tempNftDetails?.price)
        setListPaymentTokenAddress(tempNftDetails.paymentTokenAddress)
        setNftDetails(tempNftDetails)
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
  const showStartedModal = (modalData, title) => {
    myModal.current.openModal(<StartedModal title={title} modalData={modalData} />, {
      wrapClassName: 'started-modal',
      modalWidth: 500
    })
  }
  const showSuccessModal = (modalData = {}, title = '', textHelp = '') => {
    myModal.current.openModal(
      <SuccessfullyModal
        title={messages.confirm.changePrice.success}
        textHelp={textHelp}
        modalData={modalData}
      />,
      { wrapClassName: 'success-modal', modalWidth: 500, onAfterClose: () => goBack() }
    )
  }
  const submitChangePrice = async (value) => {
    const { sellingPrice } = value

    if (userData?.address) {
      const callbackBeforeDone = () => {
        showStartedModal(nftDetails, messages.confirm.changePrice.started)
      }
      const callbackAfterDone = () => {
        showSuccessModal(nftDetails, messages.confirm.changePrice.success)
      }
      const callbackRejected = (err) => {
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

      const onConfirm = async () => {
        WalletConnectServices.deeplinkOpenApp()
        Web3Services.setPriceFee(
          userData.address,
          contractMarketAddress,
          nftDetails.orderId,
          nftDetails.contractAddress,
          nftDetails.nftId,
          sellingPrice,
          [contractTokenAddress],
          callbackBeforeDone,
          callbackAfterDone,
          callbackRejected
        )
      }
      showConfirmChangePriceModal(nftDetails, null)
      onConfirm()
    }
  }

  const showConfirmChangePriceModal = (modalData, onConfirm) => {
    myModal.current.openModal(
      <ConfirmModal
        title={messages.nft.confirmPriceChange}
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
  const onCheckComment = async (rule, value) => {
    if (!value) {
      return Promise.reject('Please enter comment')
    }
  }

  const goBack = () => {
    Router.back()
  }
  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }
  const formDataDesktop = () => {
    return (
      <CommissionFeeContainer>
        <TitleWrapper>
          <TitleSellingItem className='title'>
            {messages?.myNFT?.comissionFee}
          </TitleSellingItem>
          <SubTitle >
            <div style={{ opacity: 1 }}>
              {percentComissionFee}%
              {' '}{messages?.myNFT?.OfSellingPrice}
            </div>

          </SubTitle>
        </TitleWrapper>
        <TokenCommission>
          <div className='flex'>
            <TokenWrapper size={14} opacity={1} className='MR6'>
              <span className='price-token'> $ {numberWithCommas(Number((percentComissionFee / 100) * formData?.sellingPrice).toFixed(2))} </span>
            </TokenWrapper>
          </div>
          <SubTitle>
            {messages.myNFT.commissionFeeWillBeChargedImmediatelyFromYourBuyerWhenThisItemIsBought}
          </SubTitle>
        </TokenCommission>
      </CommissionFeeContainer>
    )
  }
  const formDataMobile = () => {
    return (
      <CommissionFeeContainer >
        <CommissionFeeMobile>
          <TitleWrapper>
            <TitleSellingItem className='title'>
              {messages?.myNFT?.comissionFee}
            </TitleSellingItem>
            <div>
              <div style={{ color: COLOR.white2 }}>
                {percentComissionFee}%
                {' '}{messages?.myNFT?.OfSellingPrice}
              </div>

            </div>
          </TitleWrapper>
          <TokenCommission>
            <div className='flex'>
              <TokenWrapper size={14} opacity={1} className='MR6'>
                <span className='price-token ML5'> $ {numberWithCommas(Number((percentComissionFee / 100) * formData?.sellingPrice).toFixed(2))} </span>
              </TokenWrapper>

            </div>
          </TokenCommission>
        </CommissionFeeMobile>
        <SubTitle style={{ width: '100%' }} className='MT10 MB20 text-help'>
          {messages.myNFT.commissionFeeWillBeChargedImmediatelyFromYourBuyerWhenThisItemIsBought}
        </SubTitle>
      </CommissionFeeContainer>
    )
  }
  const renderFormData = () => {
    console.log('formData', formData)
    return (
      <FormCustom
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
          <SellingPriceContainer>
            <TitleSellingItem className='title'>
              {messages?.myNFT?.sellingPrice}
            </TitleSellingItem>
            <InputWrapper className='MT10'>
              <Form.Item
                name={'sellingPrice'}
                rules={[{ validator: onCheckNumber }]}
              >
                <InputCustom
                  placeholder='Enter a price'
                  autoComplete='off'
                  type={'number'}
                  onKeyPress={(event) => {
                    if (event.target.value.length >= 9) {
                      event.preventDefault()
                    }
                  }}
                  iconRight={
                    <span style={{ color: 'white', fontWeight: '600' }}>$</span>
                  }
                />
              </Form.Item>
            </InputWrapper>
          </SellingPriceContainer>
          <Media query='(min-width: 768px)'>
            {(match) => {
              if (match) {
                return formDataDesktop()
              }
              return formDataMobile()
            }}
          </Media>
          <PaymentMethodContainer>
            <TitleSellingItem >
              {messages?.myNFT?.paymentMethod}
            </TitleSellingItem>
            <TokenPaymentMethod>
              {
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={
                      'https://ipfs.pantograph.app/ipfs/QmctCXjXVUpTD7XeBuZYY1g7HZ2XSF1saggE5AKtoeCg2s?filename=YU.png'
                    }
                    style={{ width: 30, height: 30, marginRight: 5 }}
                  />
                  <div style={{ color: COLOR.white2 }}>
                    1 {listAmountToken ? listAmountToken[0]?.token : ''} = $
                    {price2Usd}
                  </div>
                </div>
              }
            </TokenPaymentMethod>
          </PaymentMethodContainer>
          <YourNetRevenueContainer noLineBottom>
            <TitleSellingItem>
              {messages?.myNFT?.yourNetRevenue}
            </TitleSellingItem>
            <TokenRevenue>
              <div className='flex'>
                <TokenWrapper size={18} opacity={1} className='MR6'>
                  {formData && (
                    <>
                      <img
                        src={
                          'https://ipfs.pantograph.app/ipfs/QmctCXjXVUpTD7XeBuZYY1g7HZ2XSF1saggE5AKtoeCg2s?filename=YU.png'
                        }
                        style={{ width: 30, height: 30, marginRight: 5 }}
                      />
                      <span style={{ color: COLOR.white2 }}>
                        {priceNFTOld &&
                          price2Usd &&
                          numberWithCommas(
                            (
                              Number(
                                (formData?.sellingPrice !== ''
                                  ? formData?.sellingPrice
                                  : priceNFTOld) / price2Usd || 0
                              ) -
                              Number(
                                (percentComissionFee / 100) *
                                  formData?.sellingPrice
                              )
                            ).toFixed(2)
                          )}
                      </span>
                    </>
                  )}
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
            <Form.Item name='comment' rules={[{ validator: onCheckComment }]}>
              <Input
                textArea
                maxLength={500}
                autoSize={{ minRows: 3, maxRows: 4 }}
              />
            </Form.Item>
            <p style={{ color: 'white', textAlign: 'right' }}>
              {formData.comment.length}/500
            </p>
          </InputComment>
        </CommentContainer>
        <ButtonContainer className='MT30'>
          <ButtonCancel type={3} onClick={() => Router.back()}>
            {messages?.common?.cancel}
          </ButtonCancel>
          <ButtonSell
            htmlType='submit'
            className='ML15'
            loading={actionLoading}
            disabled={
              actionLoading || !formData.comment || !formData.sellingPrice
            }
          >
            {messages?.nft?.changePrice}
          </ButtonSell>
        </ButtonContainer>
      </FormCustom>
    )
  }
  return (
    <ContainerStyled>
      <StyledSellNFT>
        <TopActionContainer className='on-hover'>
          <BackContainer onClick={() => Router.back()}>
            <img src={images.icBack} />
          </BackContainer>
          <TitleMain>{messages.nft.changePrice}</TitleMain>
        </TopActionContainer>

        {
          loading ? (
            <SpinContainer />
          ) : (
            <FormContainer>
              <OldPriceContainer>
                <TitleSellingItem>
                  {messages.nft.oldPrice}
                </TitleSellingItem>
                <TokenRevenue>
                  <div className='flex'>
                    <TokenWrapper size={18} opacity={1} className='MR6'>
                      <span className='price-token'> ${Number(nftDetails?.price || 0)} </span>
                    </TokenWrapper>
                  </div>
                </TokenRevenue>
              </OldPriceContainer>
              {renderFormData()}
            </FormContainer>

          )
        }
        <MyModal ref={myModal} />
      </StyledSellNFT>
    </ContainerStyled>
  )
}
ChangePriceNFT.getInitialProps = async ({ query }) => {
  const { nftAddress, nftId } = query
  return { nftAddress, nftId }
}
export default ChangePriceNFT
