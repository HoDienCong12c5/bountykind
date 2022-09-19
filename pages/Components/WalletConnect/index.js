import React, { useEffect, useState } from 'react'
import { Modal, Pagination } from 'antd'
import './style.scss'
import QRCode from 'qrcode'
import { images } from 'config/images'
import WalletConnectServices from 'controller/WalletConnect'
import ReduxServices from 'common/redux'
import { WALLET_CONNECT_APP } from 'config/wallet-connect/registry'

const WalletConnect = (props) => {
  const { visible, onCancel } = props
  const limit = 12
  const [type, setType] = useState('mobile')
  const [currentPosition, setCurrentPosition] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [apps, setApps] = useState([])
  const [qrcodeSvg, setQrcodeSvg] = useState()

  const renderBackground = (logo, color) => {
    return {
      background: `url(${logo}) ${color}`
    }
  }

  const refresh = () => {
    setCurrentPage(1)
    setCurrentPosition(0)
  }

  async function formatQRCodeImage (data) {
    let result = ''
    const dataString = await QRCode.toString(data, { margin: 0, type: 'svg', width: 250 })
    if (typeof dataString === 'string') {
      result = dataString.replace('<svg', `<svg class="walletconnect-qrcode__image"`)
    }
    setQrcodeSvg(result)
  }

  const onChangePage = (e) => {
    if (e > currentPage) {
      setCurrentPosition(currentPosition + (limit * (e - currentPage)))
    } else {
      setCurrentPosition(currentPosition - (limit * (currentPage - e)))
    }
    setCurrentPage(e)
  }

  const renderPaginationItem = (current, type, originalElement) => {
    if (type === 'prev') { return (<></>) }
    if (type === 'next') { return (<></>) }
    return originalElement
  }

  const initWalletConnectMobile = async (entry) => {
    let connector = await WalletConnectServices.initializeMobile()
    if (connector && connector.uri) {
      const href = WalletConnectServices.formatIOSMobile(connector.uri, entry)
      window.location.href = href
    }
  }

  const renderQrCode = async () => {
    let connector = await WalletConnectServices.initializeMobile()
    if (connector && connector.uri) {
      formatQRCodeImage(connector.uri)
    }
  }
  const renderContentMobile = () => {
    return <div className='c-wallet-connect__content_main_list-app'>
      {apps.map((item, key) => (
        <a className='c-wallet-connect__content_main_list-app_item' key={key} onClick={() => initWalletConnectMobile(item)}>
          <div className='c-wallet-connect__content_main_list-app_item_logo' style={renderBackground(item.logo, item.color)} />
          <div className='c-wallet-connect__content_main_list-app_item_text'>
            {item.shortName}
          </div>
        </a>
      ))}
    </div>
  }

  const getListWallet = () => {
    let data = []
    WALLET_CONNECT_APP.filter((item, key) => {
      if (key >= currentPosition && data.length < limit) {
        data.push(item)
      }
    })
    setApps(data)
  }

  useEffect(() => {
    getListWallet()
  }, [currentPosition])

  const walletConnect = ReduxServices.getWalletConnect()

  useEffect(() => {
    if (walletConnect.connected) {
      onCancel()
    }
  }, [walletConnect])

  return (
    <Modal
      className='c-wallet-connect'
      title={null}
      footer={null}
      centered
      visible={visible}
      onOk={null}
      closable={false}
    >
      <div className='c-wallet-connect__header'>
        <img src={images.walletconnect} width={34} />
        <p>WalletConnect</p>
        <div className='c-wallet-connect__header_close' onClick={() => onCancel()}>
          <div className='c-wallet-connect__header_close_icon'>
            <div className='c-wallet-connect__header_close_line1' />
            <div className='c-wallet-connect__header_close_line2' />
          </div>
        </div>
      </div>
      <div className='c-wallet-connect__content'>
        <div className={`c-wallet-connect__content_choose-type ${type}-type`}>
          <div className='toggle_selector' />
          <a onClick={() => {
            setType('mobile')
            refresh()
          }}>Mobile</a>
          <a onClick={() => {
            setType('qrcode')
            renderQrCode()
          }}>QRCode</a>
        </div>
        <div className='c-wallet-connect__content_main'>
          <p className='c-wallet-connect__content_main_text'>
            {type === 'qrcode' ? 'Scan QR code with a WalletConnect-compatible wallet' : 'Choose your preferred wallet '}
          </p>
          { type === 'qrcode'
            ? <div className='MT20 MB15' dangerouslySetInnerHTML={{ __html: qrcodeSvg }} />
            : renderContentMobile()}
          { type === 'mobile' &&
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            total={WALLET_CONNECT_APP.length}
            pageSize={limit}
            itemRender={renderPaginationItem}
            onChange={(e) => onChangePage(e)}
          />}
        </div>
      </div>
    </Modal>
  )
}

export default WalletConnect
