import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import WalletConnectServices from 'controller/WalletConnect'
import { OBSERVER_KEY, WALLET_CONNECT_APP } from 'common/constants'
import Observer from 'common/observer'
import { images } from 'config/images'
import {
  ConnectContainer,
  ConnectHeader,
  ConnectTitle,
  ConnectBody,
  ConnectUsing,
  ConnectContent,
  ConnectProvider
} from './style'
import './style.scss'

const ConnectWalletMb = (props) => {
  const { messages } = useSelector(state => state.locale)
  useEffect(() => {
    function handleSignedIn () {
      props.closeModal()
    }
    Observer.on(OBSERVER_KEY.ALREADY_SIGNED, handleSignedIn)
    return function cleanup () {
      Observer.removeListener(OBSERVER_KEY.ALREADY_SIGNED, handleSignedIn)
    }
  })
  const initWalletConnectMobile = async (entry) => {
    let connector = await WalletConnectServices.initializeMobile()
    if (connector && connector.uri) {
      const href = WalletConnectServices.formatIOSMobile(connector.uri, entry)
      window.location.href = href
    }
  }
  const renderWalletConnectApp = () => {
    let columns = []
    WALLET_CONNECT_APP.map((item, index) => {
      columns.push(
        <ConnectProvider key={index} onClick={() => props.closeModal()}>
          <a onClick={() => initWalletConnectMobile(item)}>
            <img src={item.icon} />
          </a>
          <p>{item.name}</p>
        </ConnectProvider>
      )
    })
    return columns
  }
  return (
    <ConnectContainer>
      <ConnectHeader>
        <img src={images.download.walletconnect} width={28} />
        <ConnectTitle>WalletConnect</ConnectTitle>
      </ConnectHeader>
      <ConnectBody>
        <ConnectUsing>{messages.connectApp.connectUsing}</ConnectUsing>
        <ConnectContent>
          {renderWalletConnectApp()}
        </ConnectContent>
      </ConnectBody>
    </ConnectContainer>
  )
}

export default ConnectWalletMb
