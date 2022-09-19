import React, { useRef, useState } from 'react'
import ReduxServices from 'common/redux'
import WalletConnectServices from 'controller/WalletConnect'
import { images } from 'config/images'
import './style.scss'
import { useSelector } from 'react-redux'
import { CONNECTION_METHOD } from 'common/constants'
import { Tooltip } from 'antd'

const Account = () => {
  const textArea = useRef()
  const userData = useSelector(state => state.userData)
  const messages = useSelector(state => state.locale.messages)
  const [copyShow, setCopyShow] = useState(false)
  const connectionMethod = useSelector(state => state.connectionMethod)
  const copyAddress = () => {
    textArea.current.select()
    document.execCommand('copy')
    setTimeout(() => setCopyShow(false), 1000)
  }
  const detectTomoScan = (address) => {
    if (parseInt(process.env.WEB3_NETWORK_ID_ALLOWED) === 1) {
      return `https://scan.tomochain.com/address/${address}`
    } else {
      return `https://scan.testnet.tomochain.com/address/${address}`
    }
  }
  const viewExplorer = () => {
    window.open(detectTomoScan(userData.address), '_blank')
  }
  const onSignOut = () => {
    if (connectionMethod === CONNECTION_METHOD.WALLET_CONNECT) {
      WalletConnectServices.killSession()
    } else {
      ReduxServices.resetUser()
    }
  }
  return (
    <div className='account-container'>
      <div className='info-wrapper'>
        <div className='info-block'>
          <p className='title'>{messages.account.blockchain}</p>
          <p className='content'>TomoChain</p>
        </div>
        <div className='info-block'>
          <p className='title'>{messages.account.yourAddress}</p>
          <div className='address-wrapper'>
            <p className='content'>{userData.address}</p>
            <textarea style={{ position: 'absolute', top: -1000 }} ref={textArea} value={userData.address} />
            <Tooltip title={messages.common.copied} visible={copyShow} onVisibleChange={(value) => setCopyShow(value)} trigger='click'>
              <div onClick={copyAddress} className='icon-copy' style={{ background: `url(${images.icCopy})` }} />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className='link-wrapper'>
        <a className='link' onClick={viewExplorer}>{messages.account.viewExplorer}</a>
        <a className='link' onClick={onSignOut}>{messages.signOut}</a>
      </div>
      <div className='bacoor-logo' style={{ background: `url(${images.bacoorLogoBlack})` }} />
      <a
        href='https://www.bacoor.io'
        // eslint-disable-next-line react/jsx-no-target-blank
        target='_blank'
        className='bacoor-link'>https://www.bacoor.io</a>
    </div>
  )
}

export default Account
