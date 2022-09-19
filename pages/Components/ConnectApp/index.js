import React, { useRef } from 'react'
import MetaMaskServices from 'controller/MetaMask'
import WalletConnectServices from 'controller/WalletConnect'
import ReduxServices from 'common/redux'
import { connect, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import StorageAction from 'controller/Redux/actions/storageActions'
import MyModal from 'pages/Components/MyModal'
import GetMetaMask from 'pages/Components/GetMetaMark'
import MetamaskExtension from 'pages/Components/MetamaskExtension'
import { isFirefox } from 'react-device-detect'
import Observer from 'common/observer'
import { OBSERVER_KEY, LINK_SUPPORT, CONNECTION_METHOD } from 'common/constants'
import {
  Container,
  ConnectProvider,
  ConnectProviderTitle,
  ConnectProviderDesc
} from './style'
import { images } from 'config/images'
import './style.scss'
import cookiesService from 'services/cookiesService'
const ConnectApp = (props) => {
  const { close } = props
  const myModal = useRef()
  const messages = useSelector(state => state.locale.messages)
  const onConnectViaWalletConnect = () => {
    props.setConnectionMethod(CONNECTION_METHOD.WALLET_CONNECT)
    close && close()
    WalletConnectServices.initialize()
  }
  const onConnectViaPantographExtension = async () => {
    close && close()
    props.setConnectionMethod(CONNECTION_METHOD.PANTOGRAPH)
    await ReduxServices.refreshPantograph()
    ReduxServices.loginPantograph(
      showModalGetMetaMask,
      callback,
      callbackErr
    )
  }
  const onConnectViaMetaMask = async () => {
    props.setConnectionMethod(CONNECTION_METHOD.METAMASK)
    close && close()
    MetaMaskServices.initialize()
  }
  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }
  const onOpenPlugin = () => {
    myModal.current.openModal(<MetamaskExtension closeModal={closeModal} />)
    window.open(
      isFirefox ? LINK_SUPPORT.PANTOGRAPH_FIREFOX : LINK_SUPPORT.PANTOGRAPH_CHROME,
      '_blank'
    )
  }
  const showModalGetMetaMask = () => {
    myModal.current.openModal(
      <GetMetaMask
        closeModal={closeModal}
        onOpenPlugin={onOpenPlugin}
      />
    )
  }
  const callback = async (callback = null) => {
    Observer.emit(OBSERVER_KEY.ALREADY_SIGNED)
    closeModal()
    callback && callback()
    await cookiesService.checkHasCookies()
  }

  const callbackErr = (callbackErr = null) => {
    closeModal()
    callbackErr && callbackErr()
  }
  return (
    <Container>
      <ConnectProvider onClick={onConnectViaMetaMask}>
        <img src={images.download.metamask} width={45} />
        <ConnectProviderTitle>{messages.connectApp.metamask}</ConnectProviderTitle>
        <ConnectProviderDesc>{messages.connectApp.connectToMetamask}</ConnectProviderDesc>
      </ConnectProvider>
      <ConnectProvider onClick={onConnectViaWalletConnect}>
        <img src={images.download.blueWalletconnect} width={45} />
        <ConnectProviderTitle>{messages.connectApp.walletConnect}</ConnectProviderTitle>
        <ConnectProviderDesc>{messages.connectApp.scanWithWalletConnect}</ConnectProviderDesc>
      </ConnectProvider>
      <MyModal ref={myModal} />
    </Container>
  )
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData,
  metamaskRedux: state.metamaskRedux
})

const mapDispatchToProps = (dispatch) => {
  return {
    setConnectionMethod: bindActionCreators(StorageAction.setConnectionMethod, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectApp)
