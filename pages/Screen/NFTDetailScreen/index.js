import React, { useState, useEffect, useRef } from 'react'
import { AreaChart, XAxis, YAxis, CartesianGrid, Area, ResponsiveContainer, Tooltip } from 'recharts'
import {
  Dropdown,
  message,
  List
} from 'antd'
import moment from 'moment'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import DiamondButton from 'pages/Components/DiamondButton'
import MyButton from 'pages/Components/MyButton'
import Media from 'react-media'
import { Router } from 'common/routes'
import Observer from 'common/observer'
import {
  convertBalanceToWei,
  detectImageUrl,
  isUserDeniedTransaction,
  numberWithCommas,
  showNotification,
  roundingNumber,
  isNotEnoughGas
} from 'common/function'
import {
  Container,
  Header,
  Left,
  Right,
  Detail,
  DetailLeft,
  DetailRight,
  NFTName,
  NFTID,
  Term,
  SellerDetail,
  SellerDetailLeft,
  SellerDetailRight,
  TokenSymbol,
  ChartContainer,
  CustomTooltip,
  ContainerMobile,
  HeaderMobile,
  DetailLeftMobile,
  DetailMobile,
  DetailRightMobile,
  NFTNameMobile,
  NFTIDMobile,
  NFTPriceMobile,
  TermMobile,
  SellerDetailMobile,
  SellerDetailLeftMobile,
  SellerDetailRightMobile,
  Stats,
  ActionList,
  Stat,
  StatTitle,
  StatValue,
  ActionItem,
  Title,
  Related,
  ViewAllButton,
  InsufficientBalance
} from './style'
import './style.scss'
import { useRouter } from 'next/router'
import BuyModal from 'pages/Components/Modal/BuyModal'
import StoreService from 'services/storeService'
import Web3Services from 'controller/Web3'
import { useSelector } from 'react-redux'
import WalletConnectServices from 'controller/WalletConnect'
import StartedModal from 'pages/Components/Modal/StartedModal'
import SuccessfullyModal from 'pages/Components/Modal/SuccessfullyModal'
import ConfirmModal from 'pages/Components/Modal/ConfirmModal'
import Status from 'pages/Components/Status'
import useAuth from 'hooks/useAuth'
import RetrieveModal from 'pages/Components/Modal/RetrieveModal'
import { OBSERVER_KEY } from 'common/constants'
import ApproveModal from 'pages/Components/Modal/ApproveModal'
import Loading from 'pages/Components/Loading'
import { MG } from 'pages/Style/CommonStyle'
import PriceHolder from 'pages/Components/PriceHolder'
import { isMobile } from 'react-device-detect'
import CustomMessage from 'pages/Components/CustomMessage'
import NFTItemCarousel from 'pages/Components/NFTItemCarousel'
import NFT3D from './components/NFT3D'

function formatXAxis (tickItem) {
  return moment(tickItem).format('MM/DD')
}

const customTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <CustomTooltip>
        <p className='text'>{formatXAxis(label)}</p>
        <div className='text'>
          Price:
          <br />
          <span className='tooltip-price'>
            &nbsp;<p>${numberWithCommas(roundingNumber(payload[0].value, 4))}</p>
          </span>
        </div>
      </CustomTooltip>
    )
  }
  return null
}
const NFTDetailScreen = () => {
  const { isSigned } = useAuth()
  const userData = useSelector(state => state.userData)
  const contractFiat = useSelector(state => state?.settingRedux?.bsc?.contract_fiat ?? '')
  const contractToken = useSelector(state => state?.settingRedux?.bsc?.contract_token ?? '')
  const contractMarketSub = useSelector(state => state?.settingRedux?.bsc?.contract_market_sub ?? '')
  const { messages, lang } = useSelector(state => state.locale)
  const [insufficientBalance, setInsufficientBalance] = useState(false)
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState(null)
  const [relatedItems, setRelatedItems] = useState(null)
  const [orderHistory, setOrderHistory] = useState(null)
  const [tokenInfo, setTokenInfo] = useState(null)
  const route = useRouter()
  const myModal = useRef(null)
  const [slideTo, setSlideTo] = useState(1)
  const [hoverId, setHoverId] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)

  const getDetails = async () => {
    setLoading(true)
    const pathArr = route.asPath.split('/')
    const nftAddress = pathArr[2]
    const id = pathArr[3]
    const response = await StoreService.getNFTDetails(nftAddress, id)
    if (response?.data && response?.data.jpyPrice) {
      setDetails(response.data)
    } else {
      Router.pushRoute('/')
    }
    setLoading(false)
  }
  const getSlideTo = () => {
    const containerWidth = window.innerWidth * 0.7
    setSlideTo(Math.floor((containerWidth + 10) / 230))
  }
  const handleGetSlideTo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.addEventListener('resize', getSlideTo)
    getSlideTo()
  }
  useEffect(() => {
    handleGetSlideTo()
    getDetails()
    getRelatedItems()
    getOrderHistory()
  }, [route.asPath])
  useEffect(() => {
    return () => window.removeEventListener('resize', getSlideTo)
  }, [])

  const replaceTermOfService = () => {
    const value = messages.nft.byClickingOnAboveButtonsYouAgreeAbout.split('TERMOFSERVICE')
    return isMobile
      ? <TermMobile> {value[0]}<span className='red-text'>{messages.nft.termsOfServices}</span>{value[1]}</TermMobile>
      : <Term> {value[0]}<span className='red-text'>{messages.nft.termsOfServices}</span>{value[1]}</Term>
  }
  const getTokenPrice = async () => {
    setActionLoading(true)
    let tokenAddress = contractToken
    if (details.paymentTokenAddress?.length > 0) {
      tokenAddress = details.paymentTokenAddress[0]
    }
    let getTokenInfoRes = await StoreService.getTokenInfo(tokenAddress)
    const { symbol, decimals } = getTokenInfoRes
    const usdToToken = await Web3Services.getToken2USD(symbol, decimals, contractFiat)
    getTokenInfoRes.rate = usdToToken
    setTokenInfo(getTokenInfoRes)
    if (isSigned && userData.address !== details.owner) {
      getInsufficientBalance(Number(details.jpyPrice * usdToToken), decimals)
    }
    setActionLoading(false)
  }

  const getInsufficientBalance = async (totalAmount, tokenDecimal) => {
    const tokenBalance = await Web3Services.getTokenBalance(userData.address, contractToken, tokenDecimal || 18)
    if (Number(tokenBalance) < Number(totalAmount)) {
      setInsufficientBalance(true)
    } else {
      setInsufficientBalance(false)
    }
  }

  const getRelatedItems = async () => {
    const pathArr = route.asPath.split('/')
    const nftAddress = pathArr[2]
    const id = pathArr[3]
    const response = await StoreService.getRelatedItems(nftAddress, id)
    if (response?.data?.length > 0) {
      setRelatedItems(response.data)
    }
  }

  const getOrderHistory = async () => {
    const pathArr = route.asPath.split('/')
    const nftAddress = pathArr[2]
    const id = pathArr[3]
    const response = await StoreService.getOrderHistory(nftAddress, id)
    if (response) {
      setOrderHistory(response)
    }
  }
  useEffect(() => {
    if (details) {
      getTokenPrice()
    }
    if (!isSigned) {
      setInsufficientBalance(false)
    }
  }, [details, isSigned])

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(function () {
      message.success({
        content: <CustomMessage
          text={'Copied'}
          icon={images.icCheck}
          closeIcon={images.icClose} />,
        icon: <></>
      })
    })
  }

  const shareOnFB = () => {
    window.open(`http://m.facebook.com/sharer.php?u=${window.location.href}`)
  }

  const shareToTwitter = () => {
    window.open(`http://www.twitter.com/share?url=${window.location.href}`)
  }

  const goToMyNFTs = () => {
    Router.pushRoute('/my-nfts')
  }
  // modal Buy

  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }

  const showConfirmBuyModal = (modalData, onConfirm) => {
    myModal.current.openModal(<ConfirmModal titleConfirm={messages.nft.confirm} onConfirm={onConfirm} title={messages.nft.confirmTrade} closeModal={closeModal} modalData={modalData} />, { wrapClassName: 'confirm-modal', modalWidth: 500 })
  }
  const handleSignIn = () => {
    Observer.emit(OBSERVER_KEY.SIGN_IN)
  }
  const showBuyModal = (modalData) => {
    if (isSigned) {
      myModal.current.openModal(<BuyModal
        onCancel={closeModal}
        modalData={modalData}
        priceUsd={details.jpyPrice}
        tokenAmount={details.jpyPrice * tokenInfo.rate}
        onConfirm={onConfirmBuy} title={messages.nft.buynft} textHelp={messages.nft.areYouSureYouWouldLikeToBuyIt} />, {
      })
    } else {
      handleSignIn()
    }
  }

  const showRetrieveModal = () => {
    myModal.current.openModal(<RetrieveModal myModal={myModal} closeModal={closeModal} modalData={details} setActionLoading={setActionLoading} />)
  }
  const showBuyStartedModal = (modalData) => {
    myModal.current.openModal(<StartedModal modalData={modalData} />)
  }

  const showBuySuccessfullyModal = (modalData) => {
    myModal.current.openModal(<SuccessfullyModal modalData={modalData} title={messages.nft.itemBoughtSuccessfully} textHelp={messages?.nft?.textBuySuccess} onBuyMore={() => Router.pushRoute('/market')} />, { wrapClassName: 'confirm-modal', modalWidth: 500, onAfterClose: () => goToMyNFTs() })
  }

  const showApproveToken = (modalData) => {
    myModal.current.openModal(<ApproveModal title={messages.nft.approveYourPointForBuying} modalData={modalData} />, { wrapClassName: 'confirm-modal', modalWidth: 500 })
  }

  const onConfirmBuy = async () => {
    setActionLoading(true)
    const tokenSymbol = await Web3Services.getTokenSymbol(contractToken)
    const tokenDecimals = await Web3Services.getTokenDecimal(contractToken)
    const allowance = await Web3Services.checkAllowance(contractToken, userData.address, contractMarketSub)
    const fiatAmountWei = convertBalanceToWei(roundingNumber(details.jpyPrice * tokenInfo.rate), tokenDecimals)
    const callbackBeforeDone = (res) => {
      StoreService.buyNFT({
        hash: res,
        orderId: details.orderId
      })
      showBuyStartedModal(details)
    }

    const callbackAfterDone = () => {
      setActionLoading && setActionLoading(false)
      showBuySuccessfullyModal(details)
    }

    const callbackRejected = (err) => {
      setActionLoading && setActionLoading(false)
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
    const onConfirm = () => {
      WalletConnectServices.deeplinkOpenApp()
      Web3Services.buyNFT(
        userData.address,
        contractMarketSub,
        details.address,
        details.orderId,
        contractToken,
        tokenSymbol,
        callbackBeforeDone,
        callbackAfterDone,
        callbackRejected
      )
    }
    if (Number(allowance) < Number(fiatAmountWei)) {
      showApproveToken()
      WalletConnectServices.deeplinkOpenApp()
      Web3Services.approveTokenAmount(
        userData.address,
        contractToken,
        tokenDecimals,
        contractMarketSub,
        roundingNumber(details.jpyPrice * tokenInfo.rate),
        false,
        null,
        () => showConfirmBuyModal(details, onConfirm),
        callbackRejected
      )
    } else {
      showConfirmBuyModal(details)
      onConfirm()
    }
  }

  const actionList = (
    <ActionList>
      <ActionItem onMouseEnter={() => { setHoverId(1) }} onMouseLeave={() => { setHoverId(null) }} onClick={copyLink}>
        <div
          style={{ opacity: hoverId === 1 ? 1 : 0.6 }}
          className='icon'>
          <img src={hoverId === 1 ? images.icCopy : images.icCopyDe} />
        </div>
        <div className='title'>Copy link</div>
      </ActionItem>
      <ActionItem onMouseEnter={() => { setHoverId(2) }} onMouseLeave={() => { setHoverId(null) }} onClick={shareOnFB}>
        <div
          style={{ opacity: hoverId === 2 ? 1 : 0.6 }}
          className='icon'>
          <img src={hoverId === 2 ? images.icShareFacebook : images.icShareFacebookDe} />
        </div>
        <div className='title'>Share on facebook</div>
      </ActionItem>
      <ActionItem onMouseEnter={() => { setHoverId(3) }} onMouseLeave={() => { setHoverId(null) }} onClick={shareToTwitter}>
        <div
          style={{ opacity: hoverId === 3 ? 1 : 0.6 }}
          className='icon'>
          <img src={hoverId === 3 ? images.icShareTwitter : images.icShareTwitterDe} />
        </div>
        <div className='title'>Share to Twitter</div>
      </ActionItem>
    </ActionList>
  )
  const goToMarket = () => {
    Router.pushRoute('/marketplace/nfts')
  }
  const renderDesktop = () => {
    return (
      <Container>
        {!loading && details && orderHistory
          ? <>
            <Header>
              <Left onClick={() => { goToMarket() }}><img src={images.icBack2} /> {messages.nft.market}</Left>
              <Right>
                <Dropdown placement='bottomRight' trigger={['click']} overlayClassName='share-nft-dropdown' overlay={actionList}>
                  <div className='share-btn'>
                    <DiamondButton imgSrc={images.icShare} />
                  </div>
                </Dropdown>
              </Right>
            </Header>
            <Detail>
              <DetailLeft>
                <img src={detectImageUrl(details.image)} />
              </DetailLeft>
              <DetailRight>
                {isSigned && userData?.address === details.sellerAddress &&
                  <Status>
                    {messages.nft.waitingForBuyer}
                  </Status>}
                <NFTName>{details.name}</NFTName>
                <NFTID>#{details.id}</NFTID>
                {!actionLoading && tokenInfo && <PriceHolder align='left' usdPrice={details.jpyPrice} tokenPrice={details.jpyPrice * tokenInfo.rate} tokenIcon={tokenInfo.icon} />}
                {actionLoading && <Loading fitContainer withWrapper={false} />}
                <MG MB={20} />
                {isSigned && userData?.address === details.sellerAddress
                  ? <div style={{ display: 'flex', width: '100%', flexFlow: 'row', gap: '20px' }}>
                    <MyButton loading={actionLoading} style={{ width: '200px', height: '50px' }} onClick={() => showRetrieveModal()}>
                      <img src={images.icRetrieve} />&nbsp;
                      {messages.nft.retrieve}
                    </MyButton>
                    <MyButton
                      loading={actionLoading}
                      onClick={() => {
                        Router.pushRoute(`/nft/change-price/${details.nftAddress}/${details.id}`)
                      }}
                      style={{ width: '200px', height: '50px' }}>
                      <img src={images.icChangePrice} />&nbsp;
                      {messages.nft.changePrice}
                    </MyButton>
                  </div>
                  : <MyButton loading={actionLoading} disabled={insufficientBalance} style={{ width: '200px', height: '50px', textTransform: 'uppercase' }} onClick={() => showBuyModal(details)}>
                    {messages.nft.buyNow}
                  </MyButton>}
                {insufficientBalance && <InsufficientBalance>{messages.errors.insufficientBalance || 'Insufficient Balance'}</InsufficientBalance>}
                {isSigned && userData?.address === details.sellerAddress ? null
                  : lang !== 'ja'
                    ? <Term>
                      {messages.nft.byClickingOnAboveButtonsYouAgreeAbout}&nbsp;<span className='red-text'>{messages.nft.termsOfServices}</span>
                    </Term>
                    : replaceTermOfService()}
              </DetailRight>
            </Detail>
            {isSigned && userData?.address === details.sellerAddress ? null
              : <SellerDetail>
                <SellerDetailLeft>
                  <div className='top'>
                    <div className='left'>
                      <img className='avatar' src={images.avatarDefault} />
                    </div>
                    <div className='right'>
                      <span className='title'>
                        {messages.nft.seller}
                      </span>
                      <span className='value'>
                        {details.sellerName}
                      </span>
                    </div>
                  </div>
                  <div className='bottom'>
                    <div className='left'>
                      <span className='title'>
                        {messages.nft.startDate}
                      </span>
                      <span className='value'>
                        {moment(details.createdAt).format('DD/MM/YYYY')}
                      </span>
                    </div>
                    <div className='right'>
                      <span className='title'>
                        {messages.nft.storeId}
                      </span>
                      <span className='value'>
                        {details._id}
                      </span>
                    </div>
                  </div>
                </SellerDetailLeft>
                <SellerDetailRight>
                  <span className='title'>
                    {messages.nft.comment}
                  </span>
                  <span className='value'>
                    {details.description && details.description}
                  </span>
                </SellerDetailRight>
              </SellerDetail>}
            <Title>{messages.nft.marketCap}</Title>
            {orderHistory.data.length > 0 &&
              <ChartContainer>
                <TokenSymbol>
                  <p>{messages.nft.price} <span style={{ color: '#000A1D' }}>$</span></p>
                </TokenSymbol>
                <div style={{ width: '100%' }}>
                  <ResponsiveContainer width='100%' height={200}>
                    <AreaChart data={orderHistory.data}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='50%' stopColor={'rgba(221, 94, 228, 0.8)'} stopOpacity={0.7} />
                          <stop offset='95%' stopColor={'rgba(32, 231, 249, 0.8)'} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey={'createdAt'} tickFormatter={formatXAxis} tick={{ fontSize: 14 }} />
                      <YAxis tick={{ fontSize: 14 }} />
                      <CartesianGrid />
                      <Tooltip content={customTooltip} />

                      <Area name='Price JPY' type='monotone' dataKey={'jpyPrice'} stroke={'rgba(221, 94, 228,1)'} fillOpacity={1} fill='url(#colorUv)' />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </ChartContainer>}
            <Stats>
              <Stat>
                <StatTitle>
                  {messages.nft.highestTradingPrice}
                </StatTitle>
                <StatValue>
                  {orderHistory.maxPrice !== '-'
                    ? <>
                      <p>${numberWithCommas(roundingNumber(orderHistory.maxPrice, 4))}</p>
                    </> : orderHistory.maxPrice}
                </StatValue>
              </Stat>
              <Stat>
                <StatTitle>
                  {messages.nft.lowestTransactionPrice}
                </StatTitle>
                <StatValue>
                  {orderHistory.minPrice !== '-'
                    ? <>
                      <p>${numberWithCommas(roundingNumber(orderHistory.minPrice, 4))}</p>
                    </> : orderHistory.minPrice}
                </StatValue>
              </Stat>
              <Stat>
                <StatTitle>
                  {messages.nft.averageTransactionPrice}
                </StatTitle>
                <StatValue>
                  {orderHistory.avgPrice !== '-'
                    ? <>
                      <p>${numberWithCommas(roundingNumber(orderHistory.avgPrice, 4))}</p>
                    </> : orderHistory.avgPrice}
                </StatValue>
              </Stat>
              <Stat>
                <StatTitle>
                  {messages.nft.lastTransactionPrice}
                </StatTitle>
                <StatValue>
                  {orderHistory.lastPrice !== '-'
                    ? <>
                      <p>${numberWithCommas(roundingNumber(orderHistory.lastPrice, 4))}</p>
                    </> : orderHistory.lastPrice}
                </StatValue>
              </Stat>
            </Stats>
            {relatedItems?.length > 0 &&
              <>
                <Title>
                  {messages.nft.similarItems}
                  <ViewAllButton onClick={() => {
                    Router.pushRoute(`/market?type=${details.type}`)
                  }}>{messages.nft.viewAll}</ViewAllButton>
                </Title>
                <Related
                  variableWidth
                  draggable
                  dots={false}
                  infinite={false}
                  slidesToShow={slideTo < 10 ? slideTo : 10}
                  slidesToScroll={slideTo < 10 ? slideTo : 10}
                  styleSlickTrack={userData && isSigned && relatedItems[0].sellerAddress.toLowerCase() === userData.address.toLowerCase()}
                >
                  {relatedItems.map((item, i) =>
                    <NFTItemCarousel key={i} item={item} />
                  )}
                </Related>
                <MG MB={50} />
              </>}
          </>
          : <Loading fitContainer withWrapper={false} />
        }
      </Container>
    )
  }
  const renderMobile = () => {
    return (
      <ContainerMobile>
        {!loading && details && orderHistory
          ? <>
            <HeaderMobile>
              <Left onClick={() => { goToMarket() }}><img src={images.icBack2} />{messages.nft.market}</Left>
              <Right>
                <Dropdown placement='bottomRight' trigger={['click']} overlayClassName='share-nft-dropdown' overlay={actionList}>
                  <div className='share-btn'>
                    <DiamondButton imgSrc={images.icShare} />
                  </div>
                </Dropdown>
              </Right>
            </HeaderMobile>
            <DetailMobile>
              <DetailLeftMobile>
                <img src={detectImageUrl(details.image)} />
              </DetailLeftMobile>
              <DetailRightMobile>
                <MG MT={20} />
                {isSigned && userData?.address === details.sellerAddress &&
                  <Status>
                    {messages.nft.waitingForBuyer}
                  </Status>
                }
                <NFTNameMobile>{details.name}</NFTNameMobile>
                <NFTIDMobile>#{details.id}</NFTIDMobile>
                <NFTPriceMobile>
                  {!actionLoading && tokenInfo && <PriceHolder usdPrice={details.jpyPrice} tokenPrice={details.jpyPrice * tokenInfo.rate} tokenIcon={tokenInfo.icon} />}
                  {actionLoading && <Loading fitContainer withWrapper={false} />}
                </NFTPriceMobile>
                {isSigned && userData?.address === details.sellerAddress
                  ? <div style={{ display: 'flex', width: '100%', flexFlow: 'row', gap: '20px', justifyContent: 'space-between' }}>
                    <MyButton style={{ width: '49%', height: '54px' }} onClick={() => showRetrieveModal(details)}>
                      <img src={images.icRetrieve} />&nbsp;
                      {messages.nft.retrieve}
                    </MyButton>
                    <MyButton
                      onClick={() => {
                        Router.pushRoute(`/nft/change-price/${details.nftAddress}/${details.id}`)
                      }}
                      style={{ width: '49%', height: '54px', fontSize: '12px' }}>
                      <img src={images.icChangePrice} />&nbsp;
                      {messages.nft.changePrice}
                    </MyButton>
                  </div>
                  : <MyButton loading={actionLoading} disabled={insufficientBalance} style={{ width: '200px', height: '50px', textTransform: 'uppercase' }} onClick={() => showBuyModal(details)}>
                    {messages.nft.buyNow}
                  </MyButton>}
                {insufficientBalance && <InsufficientBalance>{messages.errors.insufficientBalance || 'Insufficient Balance'}</InsufficientBalance>}
                {isSigned && userData?.address === details.sellerAddress ? null
                  : lang !== 'ja'
                    ? <TermMobile>
                      {messages.nft.byClickingOnAboveButtonsYouAgreeAbout}&nbsp;<span className='red-text'>{messages.nft.termsOfServices}</span>
                    </TermMobile>
                    : replaceTermOfService()}
              </DetailRightMobile>
            </DetailMobile>
            {isSigned && userData?.address === details.sellerAddress ? null
              : <SellerDetailMobile>
                <SellerDetailLeftMobile>
                  <div className='top'>
                    <div className='left'>
                      <img className='avatar' src={images.avatarDefault} />
                    </div>
                    <div className='right'>
                      <span className='title'>
                        {messages.nft.seller}
                      </span>
                      <span className='value'>
                        {details.sellerName}
                      </span>
                    </div>
                  </div>
                  <div className='bottom'>
                    <div className='left'>
                      <span className='title'>
                        {messages.nft.startDate}
                      </span>
                      <span className='value'>
                        {moment(details.createdAt).format('DD/MM/YYYY')}
                      </span>
                    </div>
                    <div className='right'>
                      <span className='title'>
                        {messages.nft.storeId}
                      </span>
                      <span className='value'>
                        {details._id}
                      </span>
                    </div>
                  </div>
                </SellerDetailLeftMobile>
                <SellerDetailRightMobile>
                  <span className='title'>
                    {messages.nft.comment}
                  </span>
                  <span className='value'>
                    {details.description && details.description}
                  </span>
                </SellerDetailRightMobile>
              </SellerDetailMobile>}
            <Title>{messages.nft.marketCap}</Title>
            {orderHistory.data.length > 0 &&
              <ChartContainer>
                <TokenSymbol>
                  <p>{messages.nft.price} $</p>
                </TokenSymbol>
                <div style={{ width: '100%' }}>
                  <ResponsiveContainer width='100%' height={200}>
                    <AreaChart data={orderHistory.data}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='50%' stopColor={'rgba(221, 94, 228, 0.8)'} stopOpacity={0.7} />
                          <stop offset='95%' stopColor={'rgba(32, 231, 249, 0.8)'} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey={'createdAt'} tickFormatter={formatXAxis} tick={{ fontSize: 14 }} />
                      <YAxis tick={{ fontSize: 14 }} />
                      <CartesianGrid />
                      <Tooltip content={customTooltip} />
                      <Area name='Price JPY' type='monotone' dataKey={'jpyPrice'} stroke={'rgba(221, 94, 228,1)'} fillOpacity={1} fill='url(#colorUv)' />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </ChartContainer>}
            <Stats>
              <Stat>
                <StatTitle>
                  {messages.nft.highestTradingPrice}
                </StatTitle>
                <StatValue>
                  {orderHistory.maxPrice !== '-'
                    ? <>
                      <p>${numberWithCommas(roundingNumber(orderHistory.maxPrice, 4))}</p>
                    </> : orderHistory.maxPrice}
                </StatValue>
              </Stat>
              <Stat>
                <StatTitle>
                  {messages.nft.lowestTransactionPrice}
                </StatTitle>
                <StatValue>
                  {orderHistory.minPrice !== '-'
                    ? <>
                      <p>${numberWithCommas(roundingNumber(orderHistory.minPrice, 4))}</p>
                    </> : orderHistory.minPrice}
                </StatValue>
              </Stat>
              <Stat>
                <StatTitle>
                  {messages.nft.averageTransactionPrice}
                </StatTitle>
                <StatValue>
                  {orderHistory.avgPrice !== '-'
                    ? <>
                      <p>${numberWithCommas(roundingNumber(orderHistory.avgPrice, 4))}</p>
                    </> : orderHistory.avgPrice}
                </StatValue>
              </Stat>
              <Stat>
                <StatTitle>
                  {messages.nft.lastTransactionPrice}
                </StatTitle>
                <StatValue>
                  {orderHistory.lastPrice !== '-'
                    ? <>
                      <p>${numberWithCommas(roundingNumber(orderHistory.lastPrice, 4))}</p>
                    </> : orderHistory.lastPrice}
                </StatValue>
              </Stat>
            </Stats>
            {relatedItems?.length > 0 && <>
              <Title>{messages.nft.similarItems}
                <ViewAllButton onClick={() => {
                  Router.pushRoute(`/market?type=${details.type}`)
                }}> {messages.nft.viewAll}</ViewAllButton>
              </Title>
              <List
                grid={{
                  gutter: 25,
                  xxl: 8,
                  xl: 6,
                  lg: 4,
                  md: 4,
                  sm: 2,
                  xs: 2
                }}
                dataSource={relatedItems}
                className='list-container MT5'
                renderItem={(item) => (
                  <List.Item>
                    <NFTItemCarousel item={item} />
                  </List.Item>
                )}
              />
              <MG MB={50} />
            </>}
          </> : <Loading fitContainer withWrapper={false} />
        }
      </ContainerMobile>
    )
  }
  return (
    <>
      <Media
        query='(min-width: 769px)'
        render={() => renderDesktop()}
      />
      <Media
        query='(max-width: 768px)'
        render={() => renderMobile()}
      />
      <MyModal ref={myModal} />
    </>
  )
}

export default NFTDetailScreen
