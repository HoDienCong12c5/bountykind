import React from 'react'
import { numberWithCommas, roundingNumber } from 'common/function'

const FormatFiat = ({ balance, className = '' }) => {
  return (
    <span className={`text text-color-4 text-size-2x ${className}`}>(${numberWithCommas(roundingNumber(balance, 2))})</span>
  )
}

export default FormatFiat
