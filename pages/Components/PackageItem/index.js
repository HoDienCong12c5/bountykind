import React, { useEffect, useState } from 'react'
import { convertBalanceToWei, detectImageUrl, isNotEnoughGas, isUserDeniedTransaction, numberWithCommas, showNotification } from 'common/function'
import { images } from 'config/images'
import {
  NFTContainer,
  Top,
  PackageName,
  AttributeContainer,
  AmountSelect,
  AmountSelectTitle,
  Attribute,
  Bottom,
  BuyButton,
  Price,
  PlusButton,
  InputContainer,
  MinusButton,
  Input
} from './style'
import { useSelector } from 'react-redux'
import BuyModal from '../Modal/BuyModal'
import SuccessfullyModal from '../Modal/SuccessfullyModal'
import StartedModal from '../Modal/StartedModal'
import WalletConnectServices from 'controller/WalletConnect'
import Web3Services from 'controller/Web3'
import ConfirmModal from '../Modal/ConfirmModal'
import ApproveModal from '../Modal/ApproveModal'
import Observer from 'common/observer'
import { OBSERVER_KEY } from 'common/constants'
import { Router } from 'common/routes'
import Loading from 'pages/Components/Loading'
import ReduxServices from 'common/redux'

const PackageItem = (props) => {
  const tokenBase = useSelector(state => state.settingRedux.tokenBase)
  const { myModal } = props
  const { messages } = useSelector(state => state.locale)
  let isSigned = ReduxServices.checkIsSigned()
  const settingRedux = useSelector(state => state.settingRedux)
  const contractFiat = useSelector(state => state?.settingRedux?.bsc?.contract_fiat ?? '')
  const contractToken = useSelector(state => state?.settingRedux?.bsc?.contract_token ?? '')
  const contractNft = props?.package?.contractAddress
  const userData = useSelector(state => state.userData)
  const [amt, setAmt] = useState(1)
  const [tokenAmount, setTokenAmount] = useState(0)
  const [insufficientBalance, setInsufficientBalance] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [descriptions, setDescriptions] = useState([])
  const [priceUsd, setUsdPrice] = useState(null)
  const [token2Usd, setToken2Usd] = useState(null)
  const [usdToToken, setUsdToToken] = useState(0)
  const [isBuyFeeToken, setIsBuyFeeToken] = useState(false)
  const [remainingQty, setRemainingQty] = useState(0)

  const handleMinus = () => {
    if (amt > 1) {
      setAmt(amt - 1)
    }
  }
  const handlePlus = () => {
    if (amt < remainingQty) {
      setAmt(amt + 1)
    }
  }

  const showBuyModal = (modalData) => {
    myModal.current.openModal(
      <BuyModal
        isBuyFeeToken={isBuyFeeToken}
        amountNft={amt}
        titleConfirm={messages.nft.buy}
        insufficientBalance={insufficientBalance}
        tokenAmount={tokenAmount} priceUsd={priceUsd}
        onCancel={closeModal}
        modalData={{ ...modalData, image: settingRedux.others ? detectImageUrl(modalData.image) : `https://ipfs.pantograph.app/ipfs/${modalData.image}` }}
        onConfirm={onBuyPackage}
        title={messages.nft.buynft}
        textHelp={messages.nft.areYouSureYouWouldLikeToBuyIt}
        isStore />, {
      })
  }

  const showBuySuccessModal = (modalData) => {
    myModal.current.openModal(
      <SuccessfullyModal modalData={modalData}
        title={messages?.nft?.itemBoughtSuccessfully}
        textHelp={messages?.nft?.textBuySuccess}
        onBuyMore={() => {
          closeModal()
        }} />, {
        onAfterClose: () => Observer.emit(OBSERVER_KEY.REFRESH_PAGE)
      })
  }

  const showBuyStartedModal = (modalData) => {
    myModal.current.openModal(
      <StartedModal
        modalData={modalData}
        textHelp={messages.nft.areYouSureYouWouldLikeToBuyIt} />, {
      })
  }

  const showBuyConfirmModal = (modalData, onConfirm) => {
    myModal.current.openModal(
      <ConfirmModal
        titleConfirm={messages.nft.confirmTrade}
        onConfirm={onConfirm} title={messages?.nft?.confirmTrade}
        closeModal={closeModal} modalData={modalData} />,
      { wrapClassName: 'confirm-modal', modalWidth: 500 })
  }

  const showApproveForBuyModal = (modalData) => {
    myModal.current.openModal(<ApproveModal title={messages.nft.approveYourPointForBuying} modalData={modalData} />, { wrapClassName: 'confirm-modal', modalWidth: 500 })
  }

  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }

  const onBuyPackage = async (totalAmount = ((props?.package?.price * amt) / token2Usd)) => {
    setActionLoading(true)
    const callbackBeforeDone = (res) => {
      showBuyStartedModal(props.package)
    }

    const callbackAfterDone = () => {
      setActionLoading && setActionLoading(false)
      showBuySuccessModal(props.package)
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
    const onConfirm = async () => {
      if (isBuyFeeToken) {
        WalletConnectServices.deeplinkOpenApp()
        Web3Services.buyPackage(
        userData?.address,
        props?.package?.contractAddress,
        amt,
        props?.package?.type,
        null,
        callbackBeforeDone,
        callbackAfterDone,
        callbackRejected
        )
      } else {
        WalletConnectServices.deeplinkOpenApp()
        Web3Services.buyPackage(
          userData?.address,
          props?.package?.contractAddress,
          amt,
          props?.package?.type,
          convertBalanceToWei((props?.package?.price) * amt * usdToToken, 18),
          callbackBeforeDone,
          callbackAfterDone,
          callbackRejected
        )
      }
    }
    if (isBuyFeeToken) {
      const decimalToken = await Web3Services.getTokenDecimal(contractToken)
      const allowance = await Web3Services.checkAllowance(contractToken, userData.address, contractNft)
      if (Number(allowance) < convertBalanceToWei(totalAmount, decimalToken)) {
        const tokenFiat = {
          image: tokenBase.icon
        }
        showApproveForBuyModal(tokenFiat)
        WalletConnectServices.deeplinkOpenApp()
        Web3Services.approveTokenAmount(
          userData.address,
          contractToken,
          decimalToken,
          contractNft,
          totalAmount,
          false,
          null,
          () => showBuyConfirmModal(props.package, onConfirm),
          callbackRejected
        )
      } else {
        showBuyConfirmModal(props.package)
        onConfirm()
      }
    } else {
      showBuyConfirmModal(props.package)
      onConfirm()
    }
  }

  const splitDescription = () => {
    if (props.package.description) {
      const description = props.package.description
      if (description.includes('\n')) {
        const desArr = description.split('\n')
        setDescriptions(desArr)
      } else {
        setDescriptions([description])
      }
    }
  }
  // Check Insufficient Balance
  const getInsufficientBalance = async () => {
    if (tokenAmount > 0) {
      let tokenBalance = 0
      if (userData && userData?.address) {
        if (isBuyFeeToken) {
          tokenBalance = await Web3Services.getTokenBalance(userData.address, contractToken, tokenBase.decimals || 18)
        } else {
          tokenBalance = await Web3Services.getBalance(userData.address, 18)
        }
        if (Number(tokenBalance) < Number(tokenAmount)) {
          setInsufficientBalance(true)
        } else {
          setInsufficientBalance(false)
        }
      } else {
        setInsufficientBalance(false)
      }
    }
  }
  //
  const handleSignIn = () => {
    Observer.emit(OBSERVER_KEY.SIGN_IN)
  }
  //
  const getIsBuyFeeToken = async () => {
    const isBuyFeeTokenRes = await Web3Services.getIsbuyByFeeToken(props?.package?.contractAddress)
    setIsBuyFeeToken(isBuyFeeTokenRes)
  }
  const onGetTokenAmount = async () => {
    setUsdPrice(Number(props?.package?.price))
    if (isBuyFeeToken && contractToken) {
      const tokenSymbol = await Web3Services.getTokenSymbol(contractToken)
      const tokenDecimal = await Web3Services.getTokenDecimal(contractToken)
      const resPriceUSD = await Web3Services.getToken2USD(tokenSymbol, tokenDecimal, contractFiat)
      const usdPriceToken = 1 / resPriceUSD
      setUsdToToken(resPriceUSD)
      setTokenAmount(Number(props?.package?.price) * resPriceUSD)
      setToken2Usd(usdPriceToken)
      if (isSigned && userData.address) {
        getInsufficientBalance(tokenAmount, tokenDecimal)
      } else {
        setInsufficientBalance(false)
      }
    } else {
      const tokenSymbol = 'BNB'
      const tokenDecimal = 18
      const resPriceUSD = await Web3Services.getToken2USD(tokenSymbol, tokenDecimal, contractFiat)
      const usdPriceToken = 1 / resPriceUSD
      setUsdToToken(resPriceUSD)
      setTokenAmount(Number(props?.package?.price) * resPriceUSD)
      setToken2Usd(usdPriceToken)
      if (isSigned && userData.address) {
        getInsufficientBalance(Number(props?.package?.price) * resPriceUSD, tokenDecimal)
      } else {
        setInsufficientBalance(false)
      }
    }
  }

  const getRemainNFT = async () => {
    const type = props?.package.type
    const limitNFT = await Web3Services.getLimitNFT(type, contractNft)
    const soldNFT = await Web3Services.getNumberNFTSold(type, contractNft)
    const remainQTY = Number(limitNFT) - Number(soldNFT)
    if (remainQTY <= 0) {
      setAmt(0)
    }
    setRemainingQty(remainQTY)
  }

  useEffect(() => {
    getRemainNFT()
    onGetTokenAmount()
  }, [contractToken, isSigned, props?.package, isBuyFeeToken, userData])
  useEffect(() => {
    if (token2Usd && amt) {
      setUsdPrice(Number(props?.package?.price) * amt)
      setTokenAmount((Number(props?.package?.price) * amt) / token2Usd)
    }
  }, [token2Usd, amt])

  useEffect(() => {
    getInsufficientBalance()
  }, [tokenAmount])
  useEffect(() => {
    splitDescription()
    getIsBuyFeeToken()
  }, [])
  const formatName = () => {
    const name = props.package.name
    const words = name.split(' ')
    let formattedName = ''
    words.map((word, i) => {
      if (i < word.length - 1) {
        formattedName += word + '<br />'
      } else {
        formattedName += word
      }
    })
    return formattedName
  }
  return (
    descriptions?.length > 0 && priceUsd
      ? <NFTContainer>
        <Top style={{ backgroundImage: settingRedux.others ? `url(${detectImageUrl(props.package.image)})` : `url("https://ipfs.pantograph.app/ipfs/${props.package.image}")` }}>
          {/* {!props.package.discount &&
          <StatusBox>
            YOU SAVE {props.package.percentOff}%
          </StatusBox>
        } */}
          {/* <PackageName dangerouslySetInnerHTML={{ __html: formatName() }} /> */}
          {/* <AttributeContainer>
            {descriptions.map((description, i) =>
              <Attribute key={i}>
                <img src={images.icBlueArrow} />&nbsp;&nbsp;{description}
              </Attribute>
            )}
          </AttributeContainer> */}
        </Top>
        <Bottom style={{ backgroundImage: `url("${images.blackBackground}") ` }}>
          <AmountSelect>
            <AmountSelectTitle>{messages.packageItem.selectHowMany}</AmountSelectTitle>
            <InputContainer>
              <MinusButton style={{ cursor: remainingQty <= 0 ? 'not-allowed' : 'pointer', opacity: remainingQty <= 0 ? 0.7 : 1 }} onClick={handleMinus}>
                <img src={images.icMinus} />
              </MinusButton>
              <Input disabled value={amt} />
              <PlusButton style={{ cursor: remainingQty <= 0 ? 'not-allowed' : 'pointer', opacity: remainingQty <= 0 ? 0.7 : 1 }} onClick={handlePlus}>
                <img src={images.icPlus} />
              </PlusButton>
            </InputContainer>
          </AmountSelect>
          <Price>
          ${remainingQty > 0 ? numberWithCommas(priceUsd) : 0}
          </Price>
          <BuyButton disabled={actionLoading || remainingQty <= 0 || tokenAmount === 0} loading={actionLoading} onClick={() => isSigned ? showBuyModal(props?.package) : handleSignIn()}>
            {remainingQty > 0 ? messages.packageItem.buy : messages.packageItem.notAvailable}
          </BuyButton>
        </Bottom>
      </NFTContainer>
      : <div className='flex justify-center'>
        <Loading fitContainer withWrapper={false} />
      </div>
  )
}

export default PackageItem
