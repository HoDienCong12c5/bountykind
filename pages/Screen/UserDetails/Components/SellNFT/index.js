import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import Media from 'react-media'
import {
  MainContainer,
  DetailsContainer,
  LeftDetailsContainer,
  RightDetailsContainer,
  BackContainer,
  ImageWrapper,
  NftName,
  TypeToken,
  MyButton,
  OptionContainer,
  ImgToken,
  Line,
  BigTitle,
  TextContent,
  InputWrapper,
  ContainerToken
} from './styled'
import { useSelector } from 'react-redux'
import { Router } from 'common/routes'
import { useRouter } from 'next/router'
import { Form, Input, Spin } from 'antd'
import { images } from 'config/images'
import { LoadingOutlined } from '@ant-design/icons'
import {
  convertWeiToBalance,
  numberWithCommas,
  isNotEnoughGas,
  isUserDeniedTransaction,
  showNotification
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
import {
  PAGE_NOT_SIGNED
} from 'common/constants'
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
  const contractMarketSub = useSelector(state => state?.settingRedux?.bsc?.contract_market_sub ?? '')
  const contractMarketSubAddress = useSelector((state) => state?.settingRedux?.bsc?.contract_market_sub ?? '')
  const contractFiat = useSelector((state) => state?.settingRedux?.bsc?.contract_fiat ?? '')
  const contractTokenAddress = useSelector((state) => state?.settingRedux?.bsc?.contract_token ?? '')
  const contractMarketAddress = useSelector((state) => state?.settingRedux?.bsc?.contract_market ?? '')
  // use query
  const {
    data: usdToToken
  } = useQuery(['get-usd-to-asset', symbol, contractFiat], getUsdToToken)
  const myModal = useRef()
  const {
    listAmountToken
  } = useGetListUSDToToken([{ symbol: symbol }], contractFiat)

  const antIcon = <LoadingOutlined style={{ fontSize: 40, color: 'white' }} spin />
  // useState
  const [nftDetails, setNftDetails] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [priceUsd, setPriceUsd] = useState(0)
  // get data

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
      if (nftDetails?.selling) {
        getNftDetailsAtStore()
      }
    }
  }, [nftDetails?.selling])
  const onCheckNumber = (e) => {
  }
  const handleChange = (e) => {
    if (e.target.value !== '') {
      setPriceUsd(parseInt(e.target.value))
    } else {
      setPriceUsd(0)
    }
  }
  const renderRightDetailNFT = () => {
    return (
      <RightDetailsContainer>
        <TypeToken>
          <img src={nftDetails?.image} style={{
            height: 30,
            width: 30,
            marginRight: 8
          }} />
          {nftDetails?.attributes?.type || ' Pet'}
        </TypeToken>
        <NftName>
          {nftDetails.name}
        </NftName>
        <BigTitle >
        Start sell
        </BigTitle>
        <TextContent >
          price :
        </TextContent>
        <InputWrapper className='MT10'>
          <Form.Item
            name='sellingPrice'
            rules={[{ validator: onCheckNumber }]}
          >
            <Input
              autoComplete='off'
              placeholder='0'
              pattern='\d*'
              onKeyDown={e => !keys.includes(e.key) && e.preventDefault()}
              type='text'
              value={priceUsd}
              onChange={handleChange}
              className='input'
              suffix={<span style={{ color: 'white', fontWeight: '600' }}>$</span>}
            />
          </Form.Item>
        </InputWrapper>
        <Line marginBottom={'20px'} className={'MT10'} />
        <TextContent >
        Amount :
        </TextContent>
        <TextContent className='MT10'>
          <div style={{ float: 'left', maxWidth: '85%', wordBreak: 'break-all' }}>
            {numberWithCommas(usdToToken ? usdToToken * priceUsd : 0)}

          </div>
          <div style={{ float: 'right', marginRight: 15 }}>
            {`${listAmountToken && listAmountToken[0]?.token}` }
          </div>
        </TextContent>
        <Line marginBottom={'20px'} className={'MT10'} />
        <OptionContainer >
          <MyButton onClick={onPressSell}>
                Sell
          </MyButton>
        </OptionContainer>
      </RightDetailsContainer>
    )
  }
  const renderContent = () => {
    return (
      nftDetails && !isLoading &&
        <DetailsContainer>
          <LeftDetailsContainer>
            <ImageWrapper>
              <img src={nftDetails?.image} />
            </ImageWrapper>
          </LeftDetailsContainer>
          {renderRightDetailNFT()}
        </DetailsContainer>

    )
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

  const showSellStartedModal = (modalData, title) => {
    myModal.current.openModal(<StartedModal title={title} modalData={modalData} />, {
      wrapClassName: 'started-modal',
      modalWidth: 500
    })
  }

  const showSellSuccessModal = (modalData, title, textHelp) => {
    myModal.current.openModal(
      <SuccessfullyModal
        title={title}
        textHelp={textHelp}
        modalData={modalData}
      />,
      { wrapClassName: 'success-modal', modalWidth: 500, onAfterClose: () => goToMarket() }
    )
  }

  const showApproveAllModal = (modalData) => {
    myModal.current.openModal(<ApproveModal modalData={modalData} />, {
      wrapClassName: 'confirm-modal',
      modalWidth: 500
    })
  }

  const onPressSell = async (value) => {
    const resCreate = await StoreService.createStore({
      ids: [nftDetails.id],
      description: '',
      jpyPrice: priceUsd,
      nftAddress: nftDetails.address,
      paymentTokenAddress: [`${contractTokenAddress}`]
    })
    const isApprovedForAll = await Web3Services.checkApprovedForAll(
      userData.address,
      nftDetails.address,
      contractMarketSubAddress
    )
    const callbackAfterDone = () => {
      myModal.current.closeModal()
      setActionLoading(false)
      showSellSuccessModal(
        nftDetails,
        messages.myNFT.itemOnSellSuccessfully,
        messages.myNFT.itMayTake
      )
      // Router.push('/my-nfts')
    }

    const callbackRejected = (err) => {
      myModal.current.closeModal()
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
        jpyPrice: priceUsd,
        orderId: resCreate?.orderId,
        paymentTokenAddress: [contractTokenAddress]
      })
      showSellStartedModal(nftDetails, messages.myNFT.yourTransactionHasStarted)
    }

    setActionLoading(true)
    const onConfirm = () => {
      WalletConnectServices.deeplinkOpenApp()
      Web3Services.setPriceFee(
        userData.address,
        contractMarketAddress,
        resCreate?.orderId,
        nftDetails.address,
        nftDetails.id,
        priceUsd,
        [contractTokenAddress],
        callbackBeforeDone,
        callbackAfterDone,
        callbackRejected
      )
    }
    if (isApprovedForAll) {
      showConfirmSellModal(
        nftDetails,
        () => {},
        messages.myNFT.confirmSell,
        messages.myNFT.sell
      )
      onConfirm()
    } else {
      showApproveAllModal(nftDetails)
      WalletConnectServices.deeplinkOpenApp()
      await Web3Services.approveAllNFT(
        userData.address,
        nftDetails.address,
        contractMarketSub,
        null,
        () => showConfirmSellModal(nftDetails, onConfirm),
        callbackRejected
      )
    }
  }

  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }
  const goToMarket = () => {
    Router.pushRoute('/marketplace/nfts')
  }
  return (
    <MainContainer >
      <BackContainer>
        <button onClick={() => Router.back()}><img src={images.icBack} />Back</button>
      </BackContainer>
      { isLoading &&
        <DetailsContainer>
          <Spin indicator={antIcon} />
        </DetailsContainer>
      }
      {renderContent()}
      <MyModal ref={myModal} />
    </MainContainer>
  )
}
SellNFTScreen.getInitialProps = async ({ query }) => {
  const { nftAddress, nftId } = query
  return { nftAddress, nftId }
}
export default SellNFTScreen
