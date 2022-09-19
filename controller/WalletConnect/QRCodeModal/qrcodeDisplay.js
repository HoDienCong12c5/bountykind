import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { images } from 'config/images'
import './style.scss'
async function formatQRCodeImage(data) {
  let result = ''
  const dataString = await QRCode.toString(data, { margin: 0, type: 'svg', width: 250 })
  if (typeof dataString === 'string') {
    result = dataString.replace('<svg', `<svg class="walletconnect-qrcode__image"`)
  }
  return result
}

const QRCodeDisplay = (props) => {
  const [svg, setSvg] = useState('')
  useEffect(() => {
    (async () => {
      setSvg(await formatQRCodeImage(props.uri))
    })()
  }, [])
  return (
    <div className='qrcode-display'>
      <div className='qrcode-title'>
        <img src={images.icWalletConnect} />
        <h3 className='text text-title PB0 ML10'>WalletConnect</h3>
      </div>
      <p className='text text-color-4'>To connect, please use KEYRING PRO app to scan this QR code.</p>
      <div className='MT20 MB15' dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  )
}

export default QRCodeDisplay
