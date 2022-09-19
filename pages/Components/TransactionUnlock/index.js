import React from 'react'
import { images } from 'config/images'

const TransactionUnlock = (props) => {
  return (
    <div className='transaction-unlock'>
      <h3 className='text text-uppercase text-bold text-size-6x text-size-mobile-4md'>{props.title || 'Unlock'}</h3>
      <div className='MT20 MB30'>
        <img src={images.txUnlock} />
      </div>
      <div className='MB20'>
        <img src={images.icLoading} width={70} />
      </div>
      <p className='text text-color-4'>Waiting for blockchain confirmation...</p>
    </div>
  )
}

export default TransactionUnlock
