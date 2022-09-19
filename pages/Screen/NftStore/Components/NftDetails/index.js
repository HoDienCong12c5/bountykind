import { Router } from 'common/routes'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { images } from 'config/images'
import {
  MainContainer,
  DetailsContainer,
  LeftDetailsContainer,
  RightDetailsContainer,
  BackContainer,
  NftName,
  PriceContainer,
  LeftPriceContainer,
  TokenOption,
  Quantity,
  QuantityInput,
  TextWarning,
  PriceChange
} from './style'
import Web3Services from 'controller/Web3'
import { NULL_ADDRESS, OBSERVER_KEY } from 'common/constants'
import { useSelector } from 'react-redux'
import MyModal from 'pages/Components/MyModal'
import BuyModal from 'pages/Components/Modal/BuyModal'
import ApproveModal from 'pages/Components/Modal/ApproveModal'
import ConfirmModal from 'pages/Components/Modal/ConfirmModal'
import SuccessfullyModal from 'pages/Components/Modal/SuccessfullyModal'
import StartedModal from 'pages/Components/Modal/StartedModal'
import { useGetSphereDetails } from 'hooks/useGetSphereDetails'
import ViewNFT from 'pages/Components/ViewNFT'
import { useGetTokensList } from 'hooks/buyPackage/useGetTokensList'
import { useGetTypeNFT } from 'hooks/buyPackage/useGetTypeNFT'
import { usePrice2wei } from 'hooks/buyPackage/usePrice2wei'
import {
  isNotEnoughGas,
  isUserDeniedTransaction,
  convertBalanceToWei,
  convertWeiToBalance,
  numberWithCommas,
  showNotification
} from 'common/function'
import useAuth from 'hooks/useAuth'
import MarketplaceButton from 'pages/Components/Marketplace/Button'
import Loading from 'pages/Components/Loading'
import PropertiesDetails from 'pages/Components/PropertiesDetails'

import Observer from 'common/observer'
import ReduxServices from 'common/redux'
import WalletConnectServices from 'controller/WalletConnect'
import AboutNft from 'pages/Components/AboutNft'
import NFT3D from 'pages/Components/NFT3D'
const WARNING_ENOUGH = `You don't have enough token`
const WARNING_ENOUGH_BNB = `You don't have enough BNB`

const NftDetails = (props) => {
  const { tokenSymbols } = useGetTokensList()
  const myModal = useRef(null)
  const { isSigned } = useAuth()
  const userData = useSelector((state) => state.userData)
  const balanceBNBUser = useSelector((state) => state.balanceRedux?.balanceETH)
  const messages = useSelector((state) => state.locale.messages)
  // use state
  const [id, setId] = useState(null)
  const [balanceUser, setBalanceUser] = useState('')
  const [insufficientBalance, setInsufficientBalance] = useState(false)
  const [qty, setQty] = useState(1)
  // use query
  const { sphereDetails, isLoadingSphereDetails } =
    useGetSphereDetails(id)
  const [selectedTokenAddress, setSelectedTokenAddress] = useState(null)
  const { fiats } = useGetTypeNFT(sphereDetails)
  const { price2Wei } = usePrice2wei(fiats?.price, selectedTokenAddress)
  const contractCompanyPackage = useSelector((state) => state.settingRedux.bsc.contract_company_package)
  const router = useRouter()
  // get data
  useEffect(() => {
    const arr = router.asPath.split('/')
    const id = arr[arr.length - 1]
    setId(id)
    // setBalanceUser(balanceBNBUser)
  }, [])

  useEffect(() => {
    if (tokenSymbols?.length > 0) {
      setSelectedTokenAddress(tokenSymbols[0].tokenAddress)
    }
  }, [tokenSymbols])

  // get balance
  useEffect(() => {
    const getBalanceUser = async (tokenAddress) => {
      if (tokenAddress !== NULL_ADDRESS) {
        const balance = await Web3Services.getTokenBalance(userData.address, selectedTokenAddress)
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
  // is buy
  useEffect(() => {
    const checkBalance = () => {
      console.log({ balanceUser })
      const isEnough = Number(balanceUser) >= Number(convertWeiToBalance(price2Wei?.price, 18) * qty)

      if (isSigned && !isEnough) {
        setInsufficientBalance(true)
      } else { setInsufficientBalance(false) }
    }
    if (balanceUser !== '' && price2Wei) {
      checkBalance()
    }
  }, [balanceUser, price2Wei, qty, isSigned])

  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
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
        title={'Buy Item Successfully'}
        textHelp={textHelp}
        modalData={modalData}
      />,
      { wrapClassName: 'success-modal', modalWidth: 500, onAfterClose: () => goBack() }
    )
  }

  const goBack = () => {
    Router.back()
  }

  const handleBuy = () => {
    let modalData = { image: sphereDetails.image }
    myModal.current.openModal(
      <BuyModal
        isBuyFeeToken={selectedTokenAddress !== NULL_ADDRESS}
        amountNft={1}
        titleConfirm={'Buy'}
        tokenAmount={numberWithCommas(Math.round(convertWeiToBalance(price2Wei?.price) * qty * 10000) / 10000 || 0)}
        priceUsd={convertWeiToBalance(fiats?.price * qty, 18)}
        modalData={modalData}
        onCancel={closeModal}
        onConfirm={onBuy}
        title={'Confirm buy'}
        // textHelp={messages.nft.areYouSureYouWouldLikeToBuyIt}
        isStore
      />,
      {}
    )
  }

  const showApproveToken = () => {
    myModal.current.openModal(<ApproveModal title={'Confirm buying'} isNFT />, {
      wrapClassName: 'confirm-modal',
      modalWidth: 500
    })
  }

  const showConfirmBuyModal = (modalData, onConfirm) => {
    myModal.current.openModal(
      <ConfirmModal
        title='Confirm buy'
        modalData={modalData}
        onConfirm={onConfirm}
      />,
      { wrapClassName: 'confirm-modal', modalWidth: 500 }
    )
  }

  const onBuy = async () => {
    if (userData?.address) {
      const callbackBeforeDone = () => {
        showStartedModal(sphereDetails)
      }
      const callbackAfterDone = () => {
        showSuccessModal(sphereDetails)
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
      if (Number(convertBalanceToWei(balanceUser, 18)) < Number(Number(
        price2Wei?.price
      ) * Number(qty)) || Number(balanceUser) <= 0) {
        closeModal()
        showNotification(`You don't have enough token`)
      } else {
        if (selectedTokenAddress === NULL_ADDRESS) {
          WalletConnectServices.deeplinkOpenApp()

          await Web3Services.buyStorePackage(
            userData?.address,
            contractCompanyPackage,
            sphereDetails.contractAddress,
            sphereDetails.typeId,
            qty,
            selectedTokenAddress,
            Number(price2Wei?.price) * qty,
            callbackBeforeDone,
            callbackAfterDone,
            callbackRejected
          )
        } else {
          const allowance = await Web3Services.checkAllowance(
            selectedTokenAddress,
            userData?.address,
            contractCompanyPackage
          )
          const onConfirm = async () => {
            WalletConnectServices.deeplinkOpenApp()

            await Web3Services.buyStorePackage(
               userData?.address,
               contractCompanyPackage,
               sphereDetails.contractAddress,
               sphereDetails.typeId,
               qty,
               selectedTokenAddress,
               null,
               callbackBeforeDone,
               callbackAfterDone,
               callbackRejected
            )
          }
          if (Number(allowance) <
           Number(
             Number(price2Wei?.price) * qty
           )) {
            showApproveToken()
            const nftTokenPrice = convertWeiToBalance(
              // nftTokenPriceInWei
              Number(price2Wei?.price)
              , 18)
            WalletConnectServices.deeplinkOpenApp()

            Web3Services.approveTokenAmount(
              userData.address,
              selectedTokenAddress,
              18,
              contractCompanyPackage,
              nftTokenPrice * qty,
              false,
              null,
              () => showConfirmBuyModal(sphereDetails, onConfirm),
              callbackRejected
            )
          } else {
            showConfirmBuyModal(sphereDetails)
            onConfirm()
          }
        }
      }
    }
    console.log('buy')
  }

  const handleQtyChange = (e) => {
    setQty(parseInt(e.target.value) > 100 ? 100 : parseInt(e.target.value))
  }

  useEffect(() => {
    if (isNaN(qty)) setQty(1)
  }, [qty])

  const adjustQty = (type) => {
    if (type === -1) {
      if (qty > 1) setQty(qty - 1)
    } else {
      if (qty < 100) setQty(qty + 1)
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

      {isLoadingSphereDetails && <Loading fitContainer withWrapper={false} />}

      {sphereDetails && !isLoadingSphereDetails && (
        <DetailsContainer>
          <LeftDetailsContainer>
            <ViewNFT
              nftDetails={sphereDetails}
            />

          </LeftDetailsContainer>
          <RightDetailsContainer>
            <NftName textTransform>{sphereDetails.name}</NftName>

            <PropertiesDetails
              isStore
              showDetails={false}
              nftDetails={sphereDetails}
            />
            <PriceContainer className='padding'>
              <LeftPriceContainer>
                <PriceChange style={{ width: '30%', minWidth: 250 }}>
                  $
                  {fiats
                    ? numberWithCommas(
                      convertWeiToBalance(fiats?.price) * qty || 0
                    )
                    : 0}{' '}
                  ≈{' '}
                  {price2Wei
                    ? numberWithCommas(
                      Math.round(
                        convertWeiToBalance(price2Wei?.price) * qty * 10000
                      ) / 10000 || 0
                    )
                    : 0}{' '}
                  {price2Wei?.symbol}
                </PriceChange>
                <div style={{ display: 'flex', marginLeft: 10 }}>
                  {tokenSymbols?.length > 0 &&
                    tokenSymbols.map((token) => (
                      <TokenOption
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
                </div>
              </LeftPriceContainer>

              <div style={{ width: '100%', display: 'flex' }}>
                <Quantity>
                  <img
                    src={images.icMinus}
                    className='MR0'
                    onClick={() => adjustQty(-1)}
                    style={{
                      width: 30,
                      cursor: qty === 1 ? 'not-allowed' : 'pointer',
                      opacity: qty === 1 ? 0.5 : 1
                    }}
                  />
                  <QuantityInput value={qty} onChange={handleQtyChange} />
                  <img
                    src={images.icPlus}
                    className='ML0'
                    onClick={() => adjustQty(1)}
                    style={{
                      width: 30,
                      cursor: qty === 100 ? 'not-allowed' : 'pointer',
                      opacity: qty === 100 ? 0.5 : 1
                    }}
                  />
                </Quantity>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16
                }}
              >
                {isSigned &&
                  insufficientBalance &&
                  (selectedTokenAddress === NULL_ADDRESS ? (
                    <TextWarning>{WARNING_ENOUGH_BNB}</TextWarning>
                  ) : (
                    <TextWarning>{WARNING_ENOUGH}</TextWarning>
                  ))}
                <MarketplaceButton
                  disabled={insufficientBalance}
                  onClick={() => {
                    if (isSigned) {
                      handleBuy()
                      // onBuy()
                    } else {
                      openModalSignIn()
                    }
                  }}
                >
                  Buy now
                </MarketplaceButton>
              </div>
            </PriceContainer>
          </RightDetailsContainer>
          <div className='MT26' style={{ width: '100%' }}>
            <AboutNft description={sphereDetails?.description} />
          </div>
        </DetailsContainer>
      )}
      <MyModal ref={myModal} />
    </MainContainer>
  )
}
NftDetails.getInitialProps = async ({ query }) => {
  const { id } = query
  return {
    id
  }
}
export default NftDetails
