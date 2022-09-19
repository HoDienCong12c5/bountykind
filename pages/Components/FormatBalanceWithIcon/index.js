import React from 'react'
import { numberWithCommas, roundingNumber, scientificToDecimal, viewExternal } from 'common/function'
import { useSelector } from 'react-redux'
import { Router } from 'common/routes'
import styled from 'styled-components'

const imgTokenBalance = {
  width: '24px',
  height: '24px',
  marginRight: '5px',
  position: 'relative',
  bottom: '1.5px'
}
const buyStyle = {
  color: 'var(--color-primary)',
  marginLeft: '10px',
  fontWeight: '600',
  fontSize: '15px',
  cursor: 'pointer'
}

const Balance = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;

  color: #000A1D;
`

const Symbol = styled.span`
  margin-left: 5px;
  text-transform: uppercase;
`
const FormatBalanceWithIcon = ({ balance, decimals = 4, symbol = '', className = '', symbolClass = '', buyable = false, icon = '', url = '' }) => {
  const messages = useSelector(state => state.locale.messages)

  const redirect = () => {
    if (url) {
      viewExternal(url)
    } else {
      Router.pushRoute('/buy-token')
    }
  }

  return (
    <span className={`text text-color-main ${className}`}>
      <Balance style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        <img style={imgTokenBalance} src={icon} />
        {numberWithCommas(scientificToDecimal(roundingNumber(balance, decimals)))}
        <Symbol>{symbol}</Symbol>
      </Balance>
      {buyable && <span
        onClick={() => {
          redirect()
        }}
        style={buyStyle} >{messages.common.buy}</span>}
    </span>
  )
}

export default FormatBalanceWithIcon
