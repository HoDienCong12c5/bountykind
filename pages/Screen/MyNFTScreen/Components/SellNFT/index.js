import React, { useState, useEffect, useRef } from 'react'
import {
  MainContainer,
  BackContainer,

  InputWrapper,
  InputCustom,
  ItemContainer,
  TitleSale as TitleItem,
  Item,
  ContentItem,
  StyledSellNFT,
  TopActionContainer,
  TextBack,
  TitleMain,
  ButtonContainer,
  ButtonCancel,
  ButtonSell,
  WordByComment,
  FormCustom,
  CommentContainer,
  ContentComment,
  TokenWrapper
} from './styled'
import { useSelector } from 'react-redux'
import { Router } from 'common/routes'
import { Form, Spin } from 'antd'
import { images } from 'config/images'
import {
  convertWeiToBalance,
  numberWithCommas,
  isNotEnoughGas,
  isUserDeniedTransaction,
  showNotification,
  detectImageUrl
} from 'common/function'
import Web3Services from 'controller/Web3'
import { useQuery } from 'react-query'
import GameService from 'services/gameService'
import StoreService from 'services/storeService'
import SuccessfullyModal from 'pages/Components/Modal/SuccessfullyModal'
import ApproveModal from 'pages/Components/Modal/ApproveModal'
import ConfirmModal from 'pages/Components/Modal/ConfirmModal'
import StartedModal from 'pages/Components/Modal/StartedModal'
import WalletConnectServices from 'controller/WalletConnect'
import MyModal from 'pages/Components/MyModal'
import { useGetListUSDToToken } from 'hooks/useGetListUSDToToken'
import useAuth from 'hooks/useAuth'
import Input from 'pages/Components/Input'
import {
  PAGE_NOT_SIGNED
} from 'common/constants'
import './style.scss'
const getUsdToToken = async ({ queryKey }) => {
  let value = 0
  if (queryKey[1]) {
    const tokenSymbol = queryKey[1]
    const contractFiat = queryKey[2]
    const response = await Web3Services.getTokenToUSDPrice(tokenSymbol, contractFiat)
    value = convertWeiToBalance(response._token2USD, 18)
  }
  return value
}
const SellNFTScreen = (props) => {
  const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace']

  const symbol = 'YU'
  const { isSigned } = useAuth()
  // get data in redux
  const userData = useSelector(state => state.userData)
  const messages = useSelector((state) => state.locale.messages)
  const contractFiat = useSelector((state) => state?.settingRedux?.bsc?.contract_fiat ?? '')
  const contractTokenAddress = useSelector((state) => state?.settingRedux?.bsc?.contract_token ?? '')
  const contractMarketAddress = useSelector((state) => state?.settingRedux?.bsc?.contract_market ?? '')
  const transferData = useSelector(state => state.transferDataRedux)
  const contractToken = useSelector(state => state?.settingRedux?.bsc?.contract_token ?? '')

  // use query
  const {
    data: usdToToken
  } = useQuery(['get-usd-to-asset', symbol, contractFiat], getUsdToToken)
  const myModal = useRef()
  const {
    listAmountToken
  } = useGetListUSDToToken([{ symbol: symbol }], contractFiat)

  // useState
  const [nftDetails, setNftDetails] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [priceUsd, setPriceUsd] = useState(0)
  const [price2Usd, setPrice2Usd] = useState(null)
  const [formData, setFormData] = useState({
    comment: 'FOR SALE',
    sellingPrice: ''
  })
  const [percentComissionFee, setPercentComissionFee] = useState(0)

  const [form] = Form.useForm()
  // get data
  useEffect(() => {
    const getTokenAmount = async () => {
      const tokenSymbol = await Web3Services.getTokenSymbol(contractToken)
      const tokenDecimal = await Web3Services.getTokenDecimal(contractToken)
      const resPriceUSD = await Web3Services.getToken2USD(tokenSymbol, tokenDecimal, contractFiat)
      setPrice2Usd(1 / resPriceUSD)
    }

    if (contractToken) {
      getTokenAmount()
    }
  }, [contractToken])

  useEffect(() => {
    const getNftDetails = async () => {
      setLoading(true)
      const _nftDetails = await GameService.getInforDetailsNFT(props.nftAddress, props.nftId)
      if (_nftDetails) {
        setNftDetails(_nftDetails.data)
        setLoading(false)
      }
    }
    const getNftDetailsAtStore = async () => {
      const _nftDetails = await StoreService.getNFT(props.nftAddress, props.nftId)
      if (_nftDetails) {
        setNftDetails(_nftDetails.data)
      }
    }
    if (!nftDetails) {
      getNftDetails()
    } else {
      if (nftDetails?.isSelling) {
        getNftDetailsAtStore()
      }
    }
  }, [nftDetails?.isSelling])
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
  const onCheckCommnet = async (rule, value) => {
    if (!value) {
      return Promise.reject('Please enter comment')
    }
  }

  const handleChange = (e) => {
    if (e.target.value !== '') {
      setPriceUsd(parseInt(e.target.value))
    } else {
      setPriceUsd(0)
    }
  }

  const showConfirmSellModal = (modalData, onConfirm, title, titleConfirm) => {
    myModal.current.openModal(
      <ConfirmModal
        title={title}
        onCancel={closeModal}
        onConfirm={onConfirm}
        titleConfirm={titleConfirm}
        modalData={modalData}
      />,
      { wrapClassName: 'confirm-modal', modalWidth: 500 }
    )
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
        title={title}
        textHelp={textHelp}
        modalData={modalData}
      />,
      { wrapClassName: 'success-modal', modalWidth: 500, onAfterClose: () => goBack() }
    )
  }

  const onPressSell = async () => {
    if (userData?.address) {
      const callbackBeforeDone = () => {
        showStartedModal(nftDetails, messages.confirm.sell.started)
      }
      const callbackAfterDone = () => {
        showSuccessModal(nftDetails, messages.confirm.sell.success)
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
          new Date().getTime() + Math.floor(Math.random() * 10000),
          nftDetails.contractAddress,
          nftDetails.nftId,
          priceUsd,
          [contractTokenAddress],
          callbackBeforeDone,
          callbackAfterDone,
          callbackRejected
        )
      }
      showConfirmSellModal(nftDetails, null, messages.confirm.sell.confirm)
      onConfirm()
    }
  }
  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }
  const goBack = () => {
    Router.pushRoute(transferData?.routerBackLink ?? `/marketplace/?attributes.type=${nftDetails.attributes.type}`)
  }
  const Content = () => {
    return (
      <div className='container'>
        <FormCustom
          style={{ color: 'white' }}
          form={form}
          initialValues={formData}
          onValuesChange={(changedValues, allValue) => setFormData(allValue)}
          // onFinish={submitChangePrice}
        >
          <Item
            style={{
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderBottom: 'none'
            }}
          >
            <ImageWrapper className='MT12'>
              <img
                className='MT20'
                style={{ maxWidth: 180, maxHeight: 200 }}
                src={nftDetails?.image}
              />
              <CommentContainer style={{ marginTop: 20, marginBottom: 0 }}>
                <TitleItem>{messages.myNFT.sellingPrice}</TitleItem>

                <InputWrapper className='MT10 MB15' >
                  <Form
                    form={form}
                    initialValues={formData}
                    onValuesChange={(changedValues, allValue) =>
                      setFormData(allValue)
                    }
                  >
                    <Form.Item
                      name={'sellingPrice'}
                      rules={[{ validator: onCheckNumber }]}
                    >
                      <Input
                        placeholder={'Enter a price'}
                        autoComplete='off'
                        type={'number'}
                        onChangText={(event) => {
                          if (event.target.value.length >= 9) {
                            event.preventDefault()
                          }
                        }}
                        className='input'
                        onChange={handleChange}
                        maxLength={10}
                        iconRight={
                          <span style={{ color: 'white', fontWeight: '600' }}>
                            $
                          </span>
                        }
                      />
                    </Form.Item>{' '}
                  </Form>
                </InputWrapper>
              </CommentContainer>

              {/* <ItemContainer>
              <TitleItem>AMOUNT</TitleItem>
              <ContentItem>
                {`${listAmountToken && listAmountToken[0]?.token} `}
                {numberWithCommas(usdToToken ? usdToToken * priceUsd : 0)}
              </ContentItem>
            </ItemContainer> */}
            </ImageWrapper>
            <ImageWrapper>
              <ItemContainer>
                <TitleItem>
                  {messages.myNFT.comissionFee}
                  <div
                    style={{ fontSize: 13, fontWeight: 'unset', opacity: 0.6 }}
                  >
                    {`0% ${messages.myNFT.freeWillCharged}`}
                  </div>
                </TitleItem>
                <ContentItem>
                  <div className='flex'>
                    <TokenWrapper size={14} opacity={1} className='MR6'>
                      <span >
                        {' '}
                        ${' '}
                        {numberWithCommas(
                          Number(
                            (percentComissionFee / 100) * formData?.sellingPrice
                          ).toFixed(2)
                        )}{' '}
                      </span>
                    </TokenWrapper>
                  </div>
                  <div style={{ opacity: 0.6 }}>
                    {
                      messages.myNFT
                        .commissionFeeWillBeChargedImmediatelyFromYourBuyerWhenThisItemIsBought
                    }
                  </div>

                </ContentItem>
              </ItemContainer>
            </ImageWrapper>
            <ImageWrapper noBorderBottom>
              <ItemContainer>
                <TitleItem>{messages.myNFT.yourNetRevenue}</TitleItem>
                <ContentItem>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={
                        'https://ipfs.pantograph.app/ipfs/QmctCXjXVUpTD7XeBuZYY1g7HZ2XSF1saggE5AKtoeCg2s?filename=YU.png'
                      }
                      style={{ width: 30, height: 30, marginRight: 5 }}
                    />
                    <TitleItem>
                      {`${listAmountToken && listAmountToken[0]?.token} `}
                      {numberWithCommas(usdToToken ? usdToToken * priceUsd : 0)}
                    </TitleItem>
                  </div>
                </ContentItem>
              </ItemContainer>
            </ImageWrapper>
          </Item>

          <Item
            style={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderTopColor: null
            }}
          >
            <ImageWrapper noBorderBottom>
              <ItemContainer>
                <TitleItem>{messages.myNFT.paymentMethod}</TitleItem>
                <ContentItem>
                  {
                    <div
                      className='token-payment'
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <img
                        src={
                          'https://ipfs.pantograph.app/ipfs/QmctCXjXVUpTD7XeBuZYY1g7HZ2XSF1saggE5AKtoeCg2s?filename=YU.png'
                        }
                        style={{ width: 30, height: 30, marginRight: 5 }}
                      />
                      <TitleItem>
                        1 {listAmountToken ? listAmountToken[0]?.token : ''} = ${' '}
                        {price2Usd}
                      </TitleItem>
                    </div>
                  }
                </ContentItem>
              </ItemContainer>
            </ImageWrapper>
          </Item>

          <Item className='MT20'>
            <ImageWrapper noBorderBottom>
              <CommentContainer>
                <TitleItem style={{ alignSelf: 'flex-start', marginBottom: 10 }}>
                  {messages.nft.comment}
                </TitleItem>
                <ContentComment>
                  {/* <TextArea rows={4} placeholder='Max length is 500' maxLength={6} /> */}

                  <Form.Item
                    name='comment'
                    rules={[{ validator: onCheckCommnet }]}
                  >
                    <Input
                      textArea
                      maxLength={500}
                      autoSize={{ minRows: 3, maxRows: 4 }}
                    />
                  </Form.Item>

                  <WordByComment>{formData.comment.length}/500</WordByComment>
                </ContentComment>
              </CommentContainer>
            </ImageWrapper>
          </Item>
          <Item noBackground>
            <ButtonContainer>
              <ButtonCancel type={3} onClick={() => Router.back()}>
                {messages?.common?.cancel}
              </ButtonCancel>
              <ButtonSell
                disabled={
                  !formData.comment ||
                  !formData.sellingPrice ||
                  priceUsd === 0 ||
                  !priceUsd ||
                  formData.sellingPrice < 10 ||
                  formData.sellingPrice.length >= 10
                }
                onClick={
                  priceUsd !== 0 &&
                  priceUsd &&
                  formData.sellingPrice >= 10 &&
                  onPressSell
                }
                htmlType='submit'
                className='ML15'
                loading={actionLoading}
                // disabled={actionLoading || priceUsd === 0 || !priceUsd || formData.sellingPrice < 10}
              >
                {messages.myNFT.sell}
              </ButtonSell>
            </ButtonContainer>
          </Item>
        </FormCustom>
      </div>
    )
  }
  return (
    <div className='sell-screen'>
      <MainContainer>
        <StyledSellNFT>
          <TopActionContainer className='on-hover'>
            <BackContainer onClick={() => Router.back()}>
              <img src={images.icBack} />
            </BackContainer>
            <TitleMain>{messages.myNFT.sell}</TitleMain>
          </TopActionContainer>

          {Content()}
          <MyModal ref={myModal} />
        </StyledSellNFT>
      </MainContainer>
    </div>
  )
}
SellNFTScreen.getInitialProps = async ({ query }) => {
  const { nftAddress, nftId } = query
  return { nftAddress, nftId }
}
export default SellNFTScreen
