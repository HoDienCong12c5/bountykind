/* eslint-disable react/jsx-no-target-blank */
import { Router } from 'common/routes'
import {
  AreaChart,
  XAxis,
  YAxis,
  Area,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import { Spin, Table } from 'antd'
import { ExportOutlined, LoadingOutlined } from '@ant-design/icons'
import React, { useEffect, useState, useRef } from 'react'
import {
  numberWithCommas,
  isNotEnoughGas,
  isUserDeniedTransaction,
  showNotification,
  roundingNumber,
  validateAddress,
  ellipsisAddress,
  detectTransaction
} from 'common/function'
import { images } from 'config/images'
import { orderHistory } from './orderHistorySampleData'
import ModalScholarship from './Components/ModalScholarship'
import SuccessfullyModal from 'pages/Components/Modal/SuccessfullyModal'
import ConfirmModal from 'pages/Components/Modal/ConfirmModal'
import StartedModal from 'pages/Components/Modal/StartedModal'
import ModalSend from './Components/ModalSend'
import WalletConnectServices from 'controller/WalletConnect'
import Web3Services from 'controller/Web3'
import MyModal from 'pages/Components/MyModal'
import {
  MainContainer,
  DetailsContainer,
  LeftDetailsContainer,
  RightDetailsContainer,
  BackContainer,
  NftName,
  CustomTooltip,
  BigTitleHistory,
  OptionContainer,
  StatusMyNFT,
  ButtonContainer,
  IDNft
} from './style'
import './style.scss'
import moment from 'moment'
import GameService from 'services/gameService'
import { useSelector } from 'react-redux'
import StoreService from 'services/storeService'
import CustomLink from 'pages/Components/CustomLink'
import useOrderHistory from 'hooks/useOrderHistory'
import MarketplaceButton from 'pages/Components/Marketplace/Button'
import { isMobile } from 'react-device-detect'
import scholarshipService from 'services/scholarshipService'
import ButtonApply from 'pages/Components/ButtonApply'
import PropertiesDetails from 'pages/Components/PropertiesDetails'
import Stats from 'pages/Components/Stats'
import AboutNft from 'pages/Components/AboutNft'
import cookiesService from 'services/cookiesService'
import EmptyData from 'pages/Components/EmptyData'
import ViewNFT from 'pages/Components/ViewNFT'

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

const OrderHistory = ({ nft }) => {
  const {
    data,
    page,
    changePage,
    total,
    limit,
    isLoadingOrderHistory
  } = useOrderHistory(nft?.address, nft?.id)
  const column = [
    {
      title: 'Date',
      align: 'center',
      width: '15%',
      dataIndex: 'createdAt',
      render: (date) => (
        <>
          {isMobile
            ? moment(date).format('DD/MM/YY')
            : moment(date).format('DD/MM/YYYY hh:mm A')}
        </>
      )
    },
    {
      title: 'Price',
      width: '15%',
      dataIndex: 'jpyPrice',
      render: (data) => (
        <span>
          {data} {'YU'}
        </span>
      )
    },
    {
      title: 'Seller',
      width: '30%',
      dataIndex: 'sellerAddress',
      render: (text) => (
        <CustomLink route={'/'}>
          <a className='on-hover'>
            {isMobile
              ? ellipsisAddress(text, 3, 3)
              : ellipsisAddress(text, 6, 6)}
          </a>
        </CustomLink>
      )
    },
    {
      title: 'Buyer',
      width: '30%',
      dataIndex: 'buyerAddress',
      render: (text) => (
        <CustomLink route={'/'}>
          <a className='on-hover'>
            {isMobile
              ? ellipsisAddress(text, 3, 3)
              : ellipsisAddress(text, 6, 6)}
          </a>
        </CustomLink>
      )
    },
    {
      title: 'Txs',
      width: '10%',
      dataIndex: 'hash',
      render: (text) => (
        <a href={detectTransaction(text)} target='_blank'>
          <ExportOutlined />
        </a>
      )
    }
  ]
  return (
    <DetailsContainer border>
      <BigTitleHistory textTransform>List History</BigTitleHistory>
      {data?.length > 0 ? <Table
        className='tb-history'
        style={{ width: '100%' }}
        columns={column}
        loading={isLoadingOrderHistory}
        dataSource={data}
        pagination={{
          current: page,
          onChange: (newPage) => {
            changePage(newPage)
          },
          total: total,
          pageSize: limit
        }}
      />
        : <div className='MB30'><EmptyData />
        </div>
      }

    </DetailsContainer>
  )
}

const MyNftDetails = (props) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: 'white' }} spin />
  )

  const userData = useSelector((state) => state.userData)
  const messages = useSelector((state) => state.locale.messages)
  const contractMarketAddress = useSelector(
    (state) => state.settingRedux?.bsc?.contract_market
  )

  // state
  const [nftDetails, setNftDetails] = useState(null)
  const [nftDetailsScholarship, setNftDetailsScholarship] = useState({})
  const [isLoading, setLoading] = useState(false)
  const [typeNFT, setTypeNFT] = useState(null)
  const isOwner = userData?.address === nftDetails?.ownerAddress
  const [statusMyNFT, setStatusMyNFT] = useState('')
  // useRef
  const myModal = useRef(null)
  // useEffect
  useEffect(() => {
    const getNftDetails = async () => {
      setLoading(true)
      const _nftDetails = await GameService.getInforDetailsNFT(
        props.nftAddress,
        props.id
      )
      if (_nftDetails) {
        setNftDetails(_nftDetails?.data)
        setTypeNFT(_nftDetails?.data.attributes.type)
        if (_nftDetails?.data.statusScholarship === 'expired') {
          setStatusMyNFT(messages.myNFT.scholarshipExpired)
        }
        if (_nftDetails?.data.statusScholarship === 'posting') {
          setStatusMyNFT(messages.myNFT.waitingScholarship)
        }
        if (_nftDetails?.data.statusScholarship === 'renting') {
          if (_nftDetails?.data?.ownerAddress === userData.address) {
            setStatusMyNFT(messages.myNFT.scholarshipOffered)
          } else if (_nftDetails?.data?.rentAddress === userData.address) {
            setStatusMyNFT(messages.myNFT.inScholarship)
          }
        }
        if (_nftDetails?.data.isSelling && !(_nftDetails?.data.isRenting)) {
          setStatusMyNFT(messages.myNFT.selling)
        }
      }
      setLoading(false)
    }
    const getNftDetailsNew = async () => {
      const _nftDetails = await StoreService.getNFT(props.nftAddress, props.id)
      if (_nftDetails) {
        setNftDetails(_nftDetails)
        setTypeNFT(_nftDetails?.attributes?.type)
      }
    }
    if (!nftDetails) {
      getNftDetails()
    } else {
      if (nftDetails?.isSelling) {
        getNftDetailsNew()
      }
    }
  }, [nftDetails?.isSelling, props.nftAddress, props.id])

  useEffect(() => {
    if (nftDetails?.isRenting) {
      scholarshipService
        .getItemScholarshipById(nftDetails.contractAddress, nftDetails.nftId)
        .then((res) => {
          if (res && res.data) {
            setNftDetailsScholarship(res.data)
          }
        })
        .catch(console.log)
    }
  }, [nftDetails])

  const renderMarket = () => {
    return (
      nftDetails &&
      !isLoading && (
        <DetailsContainer>
          <BigTitleHistory>PRICE HISTORY</BigTitleHistory>
          <ResponsiveContainer width='100%' height={300}>
            <AreaChart
              data={orderHistory.data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                  <stop
                    offset='50%'
                    stopColor={'white'}
                    stopOpacity={0.7}
                  />
                  <stop
                    offset='95%'
                    stopColor={'black'}
                    stopOpacity={0}
                  />
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
                stroke={'white'}
                fillOpacity={1}
                fill='url(#colorUv)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </DetailsContainer>
      )
    )
  }
  const optionForScholarship = () => {
    return (
      <>
        {nftDetails.statusScholarship === 'expired' && isOwner && (
          <div>
            <div style={{ color: 'red' }}>{messages.myNFT.warningExpired}</div>
            <OptionContainer className='MT12'>
              <ButtonContainer>
                <ButtonApply
                  type={1}
                  funcAfterClose={() => Router.push('/my-nfts')}
                  nftDetails={nftDetails}
                  nftDetailsScholarship={nftDetailsScholarship}
                />
              </ButtonContainer>
              <ButtonContainer>
                <ButtonApply
                  name='continue'
                  funcAfterClose={() => Router.push('/my-nfts')}
                  nftDetails={nftDetails}
                  nftDetailsScholarship={nftDetailsScholarship}
                  funcContinueScholarship={onPressScholarship}
                />
              </ButtonContainer>
            </OptionContainer>
          </div>
        )}
        {nftDetails.statusScholarship === 'expired' && !isOwner && (
          <div>
            <div style={{ color: 'red' }}>{messages.myNFT.warningExpired}</div>
          </div>
        )}

        {!nftDetails.rentAddress && (
          <div className='MT10'>
            <ButtonApply
              funcAfterClose={() => Router.push('/my-nfts')}
              nftDetails={nftDetails}
              nftDetailsScholarship={nftDetailsScholarship}
            />

            {/* <MarketplaceButton onClick={onPressChangeScholarship}>
                Change Scholarship
          </MarketplaceButton> */}
          </div>
        ) }
      </>
    )
  }

  const goBack = () => {
    Router.pushRoute(`/my-nfts`)
  }

  const showStartedModal = (modalData, title) => {
    myModal.current.openModal(
      <StartedModal title={title} modalData={modalData} />,
      {
        wrapClassName: 'started-modal',
        modalWidth: 500
      }
    )
  }
  const showSuccessModal = (
    modalData = {},
    title = '',
    textHelp = '',
    afterClose = null
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
        onAfterClose: () => (afterClose && afterClose()) ?? goBack()
      }
    )
  }
  const showConfirmModal = (modalData, onConfirm, title) => {
    myModal.current.openModal(
      <ConfirmModal
        titleConfirm='Confirm'
        onConfirm={onConfirm}
        title={title}
        closeModal={closeModal}
        modalData={modalData}
      />,
      { wrapClassName: 'confirm-modal', modalWidth: 500 }
    )
  }

  const onSubmitSend = async (address) => {
    if (userData?.address) {
      const callbackBeforeDone = () => {
        showStartedModal(nftDetails, messages.myNFT.yourSendingHasStarted)
      }
      const callbackAfterDone = () => {
        showSuccessModal(nftDetails, messages.confirm.myNFT.success)
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
      showConfirmModal(nftDetails, null, messages.confirm.myNFT.sending)
      const onConfirm = async () => {
        WalletConnectServices.deeplinkOpenApp()
        Web3Services.sendDirectNFT(
          userData.address,
          address,
          nftDetails.contractAddress,
          nftDetails.nftId,
          callbackBeforeDone,
          callbackAfterDone,
          callbackRejected
        )
      }

      onConfirm()
    }
  }
  const onSubmitRetrieve = async () => {
    showConfirmModal(nftDetails, null, messages.nft.confirmRetrievement)

    const callbackBeforeDone = () => {
      showStartedModal(nftDetails, messages.nft.yourRetrievementHasStarted)
    }
    const callbackAfterDone = () => {
      StoreService.removeNFT({
        orderId: nftDetails.orderId,
        nftAddress: nftDetails.nftAddress
      })
      showSuccessModal(nftDetails, messages.nft.itemRetrievedSuccessfully)
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
  const onPressSell = async () => {
    if (nftDetails?.isSelling) {
      Router.pushRoute(
        `/nft/change-price/${nftDetails?.contractAddress}/${nftDetails?.nftId}`
      )
    } else {
      Router.pushRoute(
        `/my-nfts/sell/${nftDetails?.contractAddress}/${nftDetails?.nftId}`
      )
    }
  }
  const onPressScholarship = () => {
    myModal.current.openModal(
      <ModalScholarship onScholarship={submitScholarship} />, {
        modalWidth: 580
      }
    )
  }

  const submitScholarship = async (ratio, isPass, durationTime, comment) => {
    await cookiesService.checkHasCookies()
    const callbackBeforeDone = () => {
      showStartedModal(nftDetails, 'Your scholarship offer has started')
    }
    const callbackAfterDone = async () => {
      if (isPass) {
        await scholarshipService.putCodeScholarship(
          nftDetails.contractAddress,
          nftDetails.nftId,
          { code: isPass },
          await cookiesService.getCookiesByName()
        )
      }
      showSuccessModal(
        nftDetails,
        'Scholarship offered successfully!',
        null,
        () => Router.pushRoute(`/scholarship`)
      )
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
    showConfirmModal(nftDetails, null, 'Confirm Scholarship offer')

    WalletConnectServices.deeplinkOpenApp()
    await Web3Services.scholarshipNFT(
      userData?.address,
      nftDetails.contractAddress,
      nftDetails.nftId,
      ratio,
      durationTime,
      isPass,
      callbackBeforeDone,
      callbackAfterDone,
      callbackRejected
    )
  }
  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }
  return (
    <div className='full-container'>
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

              {/* </TitleCustom> */}
            </LeftDetailsContainer>
            <RightDetailsContainer>
              <NftName>
                {nftDetails.name}

                <IDNft>#{nftDetails?.nftId}</IDNft>
              </NftName>
              {nftDetails?.attributes?.type !== 'sapphire' && (
                <Stats data={nftDetails} />
              )}
              <PropertiesDetails
                nftDetails={{ ...nftDetails, ...nftDetailsScholarship }}
              />
              {nftDetails?.isRenting ? (
                optionForScholarship()
              ) : (
                <OptionContainer className='MT10'>
                  <MarketplaceButton
                    type={1}
                    onClick={() => {
                      nftDetails.isSelling
                        ? onSubmitRetrieve()
                        : myModal.current.openModal(
                          <ModalSend
                            onSend={(address) => {
                              if (
                                validateAddress(address) &&
                                  address.length >= 42
                              ) {
                                onSubmitSend(address)
                              }
                            }}
                          />,
                          {
                            modalWidth: 500,
                            wrapClassName: 'modal-send'
                          }
                        )
                    }}
                    disabled={nftDetails?.inGame}
                  >
                    {nftDetails?.isSelling
                      ? messages.nft.retrieve
                      : messages.myNFT.send}
                  </MarketplaceButton>
                  <MarketplaceButton
                    type={2}
                    disabled={nftDetails?.inGame}
                    onClick={onPressSell}
                  >
                    {`${
                      nftDetails?.isSelling
                        ? messages.nft.changePrice
                        : messages.myNFT.sell
                    }`}
                  </MarketplaceButton>
                  {nftDetails.isSelling || (
                    <>
                      {nftDetails.attributes.type === 'character' && (
                        <MarketplaceButton
                          type={3}
                          disabled={nftDetails?.inGame}
                          onClick={onPressScholarship}
                        >
                          Scholarship
                        </MarketplaceButton>
                      )}
                    </>
                  )}
                </OptionContainer>
              )}
            </RightDetailsContainer>
          </DetailsContainer>
        )}

        <div className='MT26' />
        {nftDetails && !isLoading && (
          <DetailsContainer>
            <AboutNft
              nftDetails={{ ...nftDetails, ...nftDetailsScholarship }}
              description={nftDetails?.description}
            />
          </DetailsContainer>
        )}
        {nftDetails && <OrderHistory nft={nftDetails} />}
        {renderMarket()}
        <MyModal ref={myModal} />
      </MainContainer>
    </div>
  )
}
MyNftDetails.getInitialProps = async ({ query }) => {
  const { id, nftAddress } = query
  return { id, nftAddress }
}
export default MyNftDetails
