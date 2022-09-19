import { Router } from 'common/routes'
import { Spin, Row, Col, Modal } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef } from 'react'
import { sampleDatas } from './sampleDatas'
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
  TypeToken,
  CustomTooltip,
  PropsDetails,
  Line,
  TitleInformation,
  OptionContainer,
  ButtonContainer
} from './style'
import './style.scss'
import GameService from 'services/gameService'
import { useSelector } from 'react-redux'
import PropertiesDetails from 'pages/Components/PropertiesDetails'
import Stats from 'pages/Components/Stats'
import AboutNft from 'pages/Components/AboutNft'
import ModalRequest from './Components/ModalRequest'
import { isNotEnoughGas,
  isUserDeniedTransaction,
  showNotification,
  convertBalanceToWei
} from 'common/function'
import Web3Services from 'controller/Web3'
import WalletConnectServices from 'controller/WalletConnect'
import ApproveModal from 'pages/Components/Modal/ApproveModal'
import StartedModal from 'pages/Components/Modal/StartedModal'
import SuccessfullyModal from 'pages/Components/Modal/SuccessfullyModal'
import ConfirmModal from 'pages/Components/Modal/ConfirmModal'
import MarketplaceButton from 'pages/Components/Marketplace/Button'
import ModalConfirm from './Components/ModalConfirm'
import ViewNFT from 'pages/Components/ViewNFT'
const MyIngameAssetDetails = (props) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: 'white' }} spin />
  )
  const router = useRouter()
  const userData = useSelector((state) => state.userData)
  const messages = useSelector((state) => state.locale.messages)

  const [nftDetails, setNftDetails] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const contractTokenAddress = useSelector(
    (state) => state?.settingRedux?.bsc?.contract_token ?? ''
  )
  const contractMarketSub = useSelector(
    (state) => state?.settingRedux?.bsc?.contract_market_sub ?? ''
  )
  const myModal = useRef(null)
  useEffect(() => {
    const type = router.asPath.split('/')[2]
    getAssetDetails(type)
  }, [])
  // useEffect(() => {
  //   myModal.current.openModal(
  //     <ModalRequest title='LOAN PERIOD EXPIRED' modalData='modalData' onBuy={onBuy} onContinue={onContinue} onReturn={onReturn} />,
  //     {
  //       wrapClassName: 'started-modal',
  //       modalWidth: 500
  //     }
  //   )
  // }, [])
  const showStartedModal = (modalData, title = null) => {
    myModal.current.openModal(
      <StartedModal modalData={modalData} title={title} />
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
  const goBack = () => {
    Router.back()
  }
  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }

  const onBuy = async () => {
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
  const onContinue = async () => {
    console.log('onReturn')
  }
  const onReturn = async () => {
    console.log('onReturn')
  }
  const getAssetDetails = async (type) => {
    const assetId = props.id
    setLoading(true)
    if (type === 'character') {
      const response = await GameService.getUserCharacterDetails(assetId)
      setNftDetails(response.data)
    } else {
      const response = await GameService.getUserItemDetails(assetId)
      setNftDetails(response.data)
    }
    setLoading(false)
  }

  const propsNFTDetails = (
    title1,
    title2,
    content1,
    content2,
    isAnimation = false
  ) => {
    return (
      <Row>
        <Col span={12}>
          <PropsDetails className={`${isAnimation && 'animation'}`}>
            {title1} : <div style={{ marginLeft: 10 }}>{content1}</div>
          </PropsDetails>
        </Col>
        <Col span={12}>
          <PropsDetails className={`${isAnimation && 'animation'}`}>
            {title2} : <div style={{ marginLeft: 10 }}>{content2}</div>
          </PropsDetails>
        </Col>
      </Row>
    )
  }

  const renderRightDetailNFT = () => {
    return (
      <RightDetailsContainer>
        <NftName>{nftDetails?.name?.toUpperCase()}</NftName>
        <PropertiesDetails nftDetails={nftDetails} />
        <div>
          <OptionContainer>

            <MarketplaceButton
              type={1}
              onClick={() => {
                myModal.current.openModal(
                  <ModalConfirm
                    priceUsd={7.5}
                    tokenAmount={15}
                    closeModal={closeModal}
                    title={'Do you want to buy these characters ?'}
                    onPressAccept={() => {}}
                  />, {
                    modalWidth: 500,
                    wrapClassName: 'modal-send'
                  }
                )
              }}
              disabled={nftDetails?.inGame}
            >
           BUY
            </MarketplaceButton>
            <MarketplaceButton
              type={2}
              disabled={nftDetails?.inGame}
              onClick={() => {
                myModal.current.openModal(
                  <ModalConfirm
                    closeModal={closeModal}
                    priceUsd={4}
                    tokenAmount={8}
                    title={'Do you want to continue this NFT loan?'}
                    onPressAccept={() => { onContinue() }}
                    description='Continue to loan for 7 more days'
                  />, {
                    modalWidth: 500,
                    wrapClassName: 'modal-send'
                  }
                )
              }}
            >
              CONTINUE TO LOAN
            </MarketplaceButton>
            <MarketplaceButton
              type={3}
              disabled={nftDetails?.inGame}

              onClick={() => {
                myModal.current.openModal(
                  <ModalConfirm
                    isReturn
                    closeModal={closeModal}
                    description='This NFT will be returned'
                    title={'Do you want to return this NFT ?'}
                    onPressAccept={() => { onReturn() }}
                  />, {
                    modalWidth: 500,
                    wrapClassName: 'modal-send'
                  }
                )
              }}
            >
                    RETURN CHARACTERS
            </MarketplaceButton>
          </OptionContainer>
        </div>

      </RightDetailsContainer>
    )
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
            />
          </LeftDetailsContainer>
          {renderRightDetailNFT()}
        </DetailsContainer>
      )}
      {
        nftDetails && !isLoading && (
          <DetailsContainer>
            <LeftDetailsContainer>
              <Stats
                data={nftDetails}
              />
            </LeftDetailsContainer>
            <RightDetailsContainer>
              <AboutNft />
            </RightDetailsContainer>

          </DetailsContainer>
        )
      }
      <MyModal ref={myModal} />
    </MainContainer>
  )
}

MyIngameAssetDetails.getInitialProps = async ({ query }) => {
  const { id } = query
  return { id }
}

export default MyIngameAssetDetails
