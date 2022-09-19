import { Router } from 'common/routes'
import {
  AreaChart,
  XAxis,
  YAxis,
  Area,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef } from 'react'
import { images } from 'config/images'
import { orderHistory } from './orderHistorySampleData'
import MyModal from 'pages/Components/MyModal'
import {
  MainContainer,
  DetailsContainer,
  LeftDetailsContainer,
  RightDetailsContainer,
  BackContainer,
  NftName,
  PriceContainer,
  CustomTooltip,
  LeftPriceContainer,
  ButtonOptions,
  StatusMyNFT,
  Title,
  ChartContainer,
  MoreCollection,
  IDNft
} from './style'
import ViewNFT from 'pages/Components/ViewNFT'
import moment from 'moment'
import StoreService from 'services/storeService'

import ApproveModal from 'pages/Components/Modal/ApproveModal'
import StartedModal from 'pages/Components/Modal/StartedModal'
import SuccessfullyModal from 'pages/Components/Modal/SuccessfullyModal'
import ConfirmModal from 'pages/Components/Modal/ConfirmModal'
import Web3Services from 'controller/Web3'
import { useSelector } from 'react-redux'
import {
  convertBalanceToWei,
  showNotification,
  isUserDeniedTransaction,
  isNotEnoughGas,
  numberWithCommas,
  roundingNumber } from 'common/function'
import WalletConnectServices from 'controller/WalletConnect'
import MarketplaceButton from 'pages/Components/Marketplace/Button'
import useAuth from 'hooks/useAuth'
import { NULL_ADDRESS, OBSERVER_KEY } from 'common/constants'
import Observer from 'common/observer'
import GameService from 'services/gameService'
import Stats from 'pages/Components/Stats'
import PropertiesDetails from 'pages/Components/PropertiesDetails'
import ReduxServices from 'common/redux'
import AboutNft from 'pages/Components/AboutNft'
import NFT3D from 'pages/Components/NFT3D'
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
            &nbsp;
            <p>${numberWithCommas(roundingNumber(payload[0].value, 4))}</p>
          </span>
        </div>
      </CustomTooltip>
    )
  }
  return null
}

const NftDetails = (props) => {
  const { isSigned } = useAuth()
  const balanceBNBUser = useSelector((state) => state.balanceRedux?.balanceETH)

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: 'white' }} spin />
  )
  const myModal = useRef(null)
  const router = useRouter()
  const messages = useSelector((state) => state.locale.messages)
  const userData = useSelector((state) => state.userData)
  const contractMarketSub = useSelector(
    (state) => state?.settingRedux?.bsc?.contract_market_sub ?? ''
  )
  const contractTokenAddress = useSelector(
    (state) => state?.settingRedux?.bsc?.contract_token ?? ''
  )
  const contractFiatAddress = useSelector(
    (state) => state?.settingRedux?.bsc?.contract_fiat ?? ''
  )
  const contractMarketAddress = useSelector(
    (state) => state?.settingRedux?.bsc?.contract_market ?? ''
  )

  // use state
  const [nftDetails, setNftDetails] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [amountToken, setAmountToken] = useState(0)
  const [insufficientBalance, setInsufficientBalance] = useState(false)
  const [balanceUser, setBalanceUser] = useState(null)
  const [nftId, setId] = useState(null)
  const [selectedTokenAddress, setSelectedTokenAddress] = useState(null)
  const [checkNFTInGame, setCheckNFTInGame] = useState(false)
  const [nftAttributes, setNftAttributes] = useState(null)

  // get fiat and symbol
  const [listBalanceUser, setListBalanceUser] = useState([])
  const [listPaymentTokenAddress, setListPaymentTokenAddress] = useState([])
  const [statusMyNFT, setStatusMyNFT] = useState('')
  const [fiatForTokenSelected, setFiatForToken] = useState(0)
  // constant

  const WARNING_ENOUGH = `You don't have enough token`
  const WARNING_ENOUGH_BNB = `You don't have enough BNB`

  const [tokenSymbols, setTokenSymbols] = useState([])

  // get data nft

  useEffect(() => {
    if (listPaymentTokenAddress && listPaymentTokenAddress.length > 0) {
      let symbol = []
      listPaymentTokenAddress.map((tokenAddress) => {
        symbol.push({
          tokenAddress,
          symbol: tokenAddress === NULL_ADDRESS ? 'BNB' : 'YU'
        })
      })
      setTokenSymbols(symbol)
    }
  }, [listPaymentTokenAddress])

  useEffect(() => {
    const getNftDetails = async () => {
      setLoading(true)
      const _nftDetails = await StoreService.getNFT(
        props.nftAddress,
        props.nftId
      )
      if (_nftDetails) {
        setListPaymentTokenAddress(_nftDetails?.paymentTokenAddress)
        setNftDetails(_nftDetails)
        if (_nftDetails?.isSelling) {
          setStatusMyNFT(`Selling`)
        }
      }
      setLoading(false)
    }
    if (!nftDetails && props.nftAddress && props.nftId) {
      getNftDetails()
    }
  }, [nftDetails, props.nftAddress, props.nftId])

  useEffect(() => {
    if (nftDetails?.attributes) {
      let _nftAttributes = []
      const type = nftDetails.attributes.type
      const info = nftDetails.attributes[type]
      for (let property in info) {
        const infoTitle = property
        const infoValue = info[property]
        _nftAttributes.push({ infoTitle, infoValue })
      }
      setNftAttributes(_nftAttributes)
    }
  }, [nftDetails])

  useEffect(() => {
    const arr = router.asPath.split('/')
    const id = arr[arr.length - 1]
    setId(id)
    // setBalanceUser(balanceBNBUser)
  }, [])

  useEffect(() => {
    const getBalanceUser = async (tokenAddress) => {
      if (tokenAddress !== NULL_ADDRESS) {
        const balance = await Web3Services.getTokenBalance(
          userData.address,
          selectedTokenAddress
        )
        if (balance) {
          setBalanceUser(balance)
        }
      } else {
        setBalanceUser(balanceBNBUser)
      }
    }
    if (selectedTokenAddress && userData) {
      getBalanceUser(selectedTokenAddress)
    }
  }, [selectedTokenAddress, userData])
  useEffect(() => {
    if (userData?.address && nftDetails && balanceUser !== null) {
      if (Number(balanceUser) < nftDetails.price) {
        setInsufficientBalance(true)
      } else {
        setInsufficientBalance(false)
      }
    }
  }, [balanceUser, userData, nftDetails])
  useEffect(() => {
    if (tokenSymbols?.length > 0) {
      setSelectedTokenAddress(tokenSymbols[0].tokenAddress)
    }
  }, [tokenSymbols])

  useEffect(() => {
    const checkNFT = async () => {
      const _nftDetails = await GameService.getInforDetailsNFT(
        props.nftAddress,
        props.nftId
      )

      if (_nftDetails?.data?.inGame === true) {
        setCheckNFTInGame(true)
      }
    }
    if (nftDetails?.ownerAddress) {
      if (!checkOwnerUser(nftDetails?.ownerAddress)) {
        checkNFT()
      }
    }
  }, [nftDetails?.ownerAddress])
  // function
  const getAmountTokenBuyUSD = async (tokenSymbol) => {
    const amountToken = await Web3Services.getToken2USD(
      tokenSymbol,
      18,
      contractFiatAddress
    )
    if (amountToken && nftDetails) {
      setAmountToken(Number(amountToken) * Number(nftDetails?.jpyPrice))
    }
  }

  const changeToken = async (indexFiatToken) => {
    if (indexFiatToken !== fiatForTokenSelected) {
      setFiatForToken(indexFiatToken)
      await getAmountTokenBuyUSD(listPaymentTokenAddress[indexFiatToken])
    }

    // setsymbols(token)
  }

  const checkOwnerUser = (address) => {
    return address === userData?.address
  }

  const showStartedModal = (modalData, title = null) => {
    myModal.current.openModal(
      <StartedModal modalData={modalData} title={title} />
    )
  }

  const showSuccessfullyModal = (modalData, title, textHelp, textButton) => {
    myModal.current.openModal(
      <SuccessfullyModal
        modalData={modalData}
        title={title}
        textHelp={textHelp}
        textButton={textButton}
        onBuyMore={() => {
          Router.back()
        }}
      />,
      {
        wrapClassName: 'confirm-modal',
        modalWidth: 500,
        onAfterClose: () => Router.back()
      }
    )
  }

  const showApproveToken = (modalData) => {
    myModal.current.openModal(
      <ApproveModal
        title={messages.nft.approveYourPointForBuying}
        modalData={modalData}
      />,
      { wrapClassName: 'confirm-modal', modalWidth: 500, closable: false }
    )
  }

  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }

  const showConfirmBuyModal = (modalData, onConfirm) => {
    myModal.current.openModal(
      <ConfirmModal
        titleConfirm={messages.nft.confirm}
        onConfirm={onConfirm}
        title={messages.nft.confirmTrade}
        closeModal={closeModal}
        modalData={modalData}
      />,
      { wrapClassName: 'confirm-modal', modalWidth: 500 }
    )
  }
  const ChangeSellPrice = (contractAddress, nftID) => {
    Router.push(`/nft/change-price/${contractAddress}/${nftID}`)
  }

  const showSuccessModal = (modalData = {}, title = '', textHelp = '') => {
    myModal.current.openModal(
      <SuccessfullyModal
        title={'Buy Item Successfully'}
        textHelp={textHelp}
        modalData={modalData}
      />,
      {
        wrapClassName: 'success-modal',
        modalWidth: 500,
        onAfterClose: () => goBack()
      }
    )
  }
  const goBack = () => {
    Router.back()
  }

  const buyNFT = async () => {
    if (userData?.address) {
      const callbackBeforeDone = () => {
        showStartedModal(nftDetails)
      }
      const callbackAfterDone = () => {
        showSuccessModal(nftDetails)
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

      const allowance = await Web3Services.checkAllowance(
        contractTokenAddress,
        userData?.address,
        contractMarketSub
      )
      const onConfirm = async () => {
        WalletConnectServices.deeplinkOpenApp()
        console.log(
          userData.address,
          contractMarketSub,
          nftDetails.contractAddress,
          nftDetails.orderId,
          contractTokenAddress
        )
        Web3Services.buyNFT(
          userData.address,
          contractMarketSub,
          nftDetails.contractAddress,
          nftDetails.orderId,
          contractTokenAddress,
          'YU',
          callbackBeforeDone,
          callbackAfterDone,
          callbackRejected
        )
      }

      if (Number(allowance) < Number(convertBalanceToWei(nftDetails?.price * 2))) {
        showApproveToken()
        WalletConnectServices.deeplinkOpenApp()
        Web3Services.approveTokenAmount(
          userData.address,
          contractTokenAddress,
          18,
          contractMarketSub,
          nftDetails?.price * 2,
          false,
          null,
          () => showConfirmBuyModal(nftDetails, onConfirm),
          callbackRejected
        )
      } else {
        showConfirmBuyModal(nftDetails)
        onConfirm()
      }
    }
    console.log('buy')
  }
  const reTrieveNFT = async () => {
    showConfirmRetrieveModal(nftDetails)
    const callbackBeforeDone = () => {
      showStartedModal(nftDetails, 'Retrieve NFT ')
    }
    const callbackAfterDone = () => {
      StoreService.removeNFT({
        orderId: nftDetails.orderId,
        nftAddress: nftDetails.nftAddress
      })
      showSuccessfullyModal(
        nftDetails,
        messages.nft.itemRetrievedSuccessfully,
        '',
        'Back to marketplace'
      )
    }
    const callbackRejected = () => {
      showNotification(messages.errors.deniedTransaction)
      closeModal()
    }
    WalletConnectServices.deeplinkOpenApp()
    await Web3Services.removePrice(
      userData.address,
      contractMarketAddress,
      nftDetails.contractAddress,
      nftDetails.orderId,
      callbackBeforeDone,
      callbackAfterDone,
      callbackRejected
    )
  }
  const showConfirmRetrieveModal = (modalData, onConfirm) => {
    myModal.current.openModal(
      <ConfirmModal
        title={'Confirm Retrieve'}
        onCancel={closeModal}
        onConfirm={onConfirm}
        titleConfirm={'Retrieving NFT'}
        modalData={modalData}
      />,
      { wrapClassName: 'confirm-modal', modalWidth: 500 }
    )
  }

  const goToUserPage = () => {
    if (nftDetails.ownerAddress === userData?.address) {
      Router.pushRoute('/my-nfts')
    } else {
      Router.pushRoute(`/user/${nftDetails.ownerAddress}`)
    }
  }
  const openModalSignIn = async () => {
    await Observer.emit(OBSERVER_KEY.SIGN_IN)
    ReduxServices.setIsOpenModalWarning(true)
  }

  return (
    <MainContainer>
      <BackContainer>
        <button
          onClick={() => {
            Router.back()
          }}
        >
          <img src={images.icBack} />
        </button>
      </BackContainer>

      {isLoading && (
        <DetailsContainer>
          <Spin indicator={antIcon} />
        </DetailsContainer>
      )}

      {nftDetails && !isLoading && (
        <DetailsContainer>
          <LeftDetailsContainer>
            <ViewNFT
              nftDetails={nftDetails}
              status={statusMyNFT}
            />
          </LeftDetailsContainer>
          <RightDetailsContainer>
            <NftName textTransform>
              {nftDetails?.name}
              <IDNft>#{nftDetails?.nftId}</IDNft>
            </NftName>
            {nftDetails?.attributes?.type !== 'sapphire' && (
              <Stats data={nftDetails} />
            )}
            <PropertiesDetails nftDetails={nftDetails} isMarketPlace />

            <PriceContainer>
              <Title>CURRENT PRICE</Title>
              <div style={{ width: '100%', display: 'flex' }}>
                <LeftPriceContainer>
                  {nftDetails?.price + '$ ≈ ' + nftDetails?.price * 2 + ' YU'}
                </LeftPriceContainer>
                {/* <RightPriceContainer>
                  {tokenSymbols?.length > 0 &&
                    tokenSymbols.map((token) => (
                      <TokenOption
                        oneToken={tokenSymbols?.length === 1}
                        onClick={() => {
                          setSelectedTokenAddress(token.tokenAddress)
                        }}
                        className={
                          token.tokenAddress === selectedTokenAddress
                            ? 'selected'
                            : ''
                        }
                        key={token.tokenAddress}
                      >
                        {token.symbol}
                      </TokenOption>
                    ))}
                </RightPriceContainer> */}
              </div>

              {!isSigned ? (
                <MarketplaceButton onClick={() => openModalSignIn()}>
                  Buy Now
                </MarketplaceButton>
              ) : !checkNFTInGame ? (
                <ButtonOptions>
                  {checkOwnerUser(nftDetails?.ownerAddress) && (
                    <MarketplaceButton type={1} onClick={reTrieveNFT}>
                      Retrieve
                    </MarketplaceButton>
                  )}
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 16
                    }}
                  >
                    {insufficientBalance &&
                      isSigned &&
                      !checkOwnerUser(nftDetails?.ownerAddress) && (
                      <div
                        style={{
                          color: 'red',
                          textAlign: 'start',
                          fontWeight: 'bold',
                          fontSize: '13px'
                        }}
                      >
                        {selectedTokenAddress === NULL_ADDRESS
                          ? WARNING_ENOUGH_BNB
                          : WARNING_ENOUGH}
                      </div>
                    )}
                    <MarketplaceButton
                      disabled={
                        insufficientBalance &&
                        !checkOwnerUser(nftDetails?.ownerAddress)
                      }
                      onClick={() => {
                        if (checkOwnerUser(nftDetails?.ownerAddress)) {
                          ChangeSellPrice(
                            nftDetails.contractAddress,
                            nftDetails.id
                          )
                        } else {
                          buyNFT()
                        }
                      }}
                    >
                      {!checkOwnerUser(nftDetails?.ownerAddress)
                        ? 'Buy now '
                        : 'Change Price'}
                    </MarketplaceButton>
                  </div>
                </ButtonOptions>
              ) : null}
            </PriceContainer>
          </RightDetailsContainer>

          {/* <RightDetailsContainer
            isSapphire={nftDetails?.attributes?.type === 'sapphire'}
          >
            <StatContainer>
              <Title textTransform>About</Title>
              <div className='MT12'>{nftDetails?.description}</div>
            </StatContainer>  </RightDetailsContainer> */}
          {nftDetails && !isLoading && (
            <DetailsContainer>
              <AboutNft
                isMarketPlace
                nftDetails={nftDetails}
                description={nftDetails?.description}
              />
            </DetailsContainer>
          )}

          <ChartContainer>
            <Title className='PB12'>PRICE HISTORY</Title>

            <ResponsiveContainer width='100%' height={300}>
              <AreaChart
                data={orderHistory?.data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='50%' stopColor='#ffff' stopOpacity={0.7} />
                    <stop offset='95%' stopColor={'black'} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey={'createdAt'}
                  tickFormatter={formatXAxis}
                  tick={{ fontSize: 12 }}
                  stroke='white'
                />
                <YAxis tick={{ fontSize: 12 }} stroke='white' />
                <Tooltip content={customTooltip} />
                {/* <CartesianGrid verticalFill={'#111111'} horizontal={false} /> */}
                <Area
                  name='Price JPY'
                  type='monotone'
                  dataKey={'jpyPrice'}
                  stroke={'#ffff'}
                  fillOpacity={1}
                  fill='url(#colorUv)'
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          <MoreCollection>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline'
              }}
            >
              <Title className='PB12'>MORE FROM THIS COLLECTION</Title>
              <div>See more</div>
            </div>
          </MoreCollection>
        </DetailsContainer>
      )}
      <MyModal ref={myModal} />
    </MainContainer>
  )
}

NftDetails.getInitialProps = async ({ query }) => {
  const { nftId, type = null, nftAddress } = query
  return {
    nftId,
    nftAddress,
    type
  }
}

export default NftDetails
