import React from 'react'
import { images } from 'config/images'

const TransactionStart = (props) => {
  return (
    <div className='transaction-start'>
      <h3 className='text text-uppercase text-bold text-size-6x text-size-mobile-4md'>{props.title || 'Your transaction has started'}</h3>
      <div className='MT20 MB30'>
        <img src={images.txStart} />
      </div>
      <div className='MB20'>
        <img src={images.icLoading} width={70} />
      </div>
      <p className='text text-color-4'>
        Ethereum network is processing your transaction,<br />
        which can take a little white
      </p>
    </div>
  )
}

export default TransactionStart
