import React from 'react'
import { images } from 'config/images'

const TransactionConfirm = (props) => {
  return (
    <div className='transaction-confirm'>
      <h3 className='text text-uppercase text-bold text-size-6x text-size-mobile-4md'>{props.title || 'Confirm transaction'}</h3>
      <div className='MT20 MB30'>
        <img src={images.txConfirm} />
      </div>
      <div className='MB20'>
        <img src={images.icLoading} width={70} />
      </div>
      <p className='text text-color-4'>Waiting for blockchain confirmation...</p>
    </div>
  )
}

export default TransactionConfirm
