import React from 'react'
import { numberWithCommas, roundingNumber, scientificToDecimal } from 'common/function'

const FormatBalance = ({ balance, decimals = 8, symbol = '', className = 'text-size-4md text-size-mobile-2x text-color-main' }) => {
  return (
    <span className={`text text-bold ${className}`}>{numberWithCommas(scientificToDecimal(roundingNumber(balance, decimals)))} {symbol}</span>
  )
}

export default FormatBalance
