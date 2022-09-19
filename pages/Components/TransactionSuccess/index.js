import React from 'react'
import { images } from 'config/images'

const TransactionSuccess = (props) => {
  return (
    <div className='confirm-transaction'>
      <h3 className='text text-uppercase text-bold text-size-6x text-size-mobile-4md'>{props.title || 'Transaction successfully!'}</h3>
      <div className='MT20 MB30'>
        <img src={images.txSuccess} />
      </div>
    </div>
  )
}

export default TransactionSuccess
