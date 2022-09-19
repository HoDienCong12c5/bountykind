import React, { useState, useEffect } from 'react'
import {
  Container,
  Title,
  Description,
  BalanceHolder,
  InputContainer,
  ChargeButton
} from './style'
import { numberWithCommas, roundingNumber } from 'common/function'
import { useSelector } from 'react-redux'
const ChangeToken = ({ title = '', description = '', tokenIcon = '', tokenName = '', onCharge, balance, textWarnings = '' }) => {
  const [amount, setAmount] = useState(null)
  const [textWarning, setTextWarning] = useState('')
  const [isCharge, setIsCharge] = useState(false)
  const [isWarning, setIsWarning] = useState(false)
  const messages = useSelector(state => state.locale.messages)
  const checkAmount = () => {
    if (Number(amount) > Number(balance)) {
      setTextWarning(`You don't have enough ${tokenName} `)
      setIsCharge(false)
    }
    if (Number(amount) < Number(balance) && Number(amount) > 0) {
      setTextWarning()
      setIsWarning(true)
      setIsCharge(true)
    }
    if (Number(amount) === 0) {
      setTextWarning(`Please input an integer number!`)
      setIsCharge(false)
    }
  }
  const submitSend = () => {
    onCharge(amount)
  }
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <BalanceHolder>
        {`${tokenName} ${messages.common.balance}`}: {numberWithCommas(roundingNumber(balance ?? 0, 3))}
      </BalanceHolder>
      <div>
        <InputContainer>
          <span><img src={tokenIcon} style={{ width: 80, height: 80 }} />
            {messages.common.amount}
          </span>
          <input onKeyUp={checkAmount} type='number' value={amount} placeholder='0' onChange={(e) => {
            setAmount(e.target.value)
          }} className='amount-input' />
        </InputContainer>
        {
          textWarning
            ? <div style={{ color: 'red', marginTop: '-15px', textAlign: 'right' }}>{textWarning}</div>
            : <></>
        }
      </div>
      <div>
        <ChargeButton
          enable={isCharge && amount}
          onClick={isCharge ? submitSend : () => {}}
        >
          {messages.common.charge}
        </ChargeButton>
      </div>
    </Container>
  )
}

export default ChangeToken
