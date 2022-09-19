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

const ChangeToken = ({ title = '', description = '', tokenIcon = '', tokenName = '', onCharge, balance, textWarnings = '' }) => {
  const [amount, setAmount] = useState(0)
  const [textWarning, setTextWarning] = useState('')
  const checkAmount = () => {
    if (Number(amount) > Number(balance)) {
      setTextWarning(`You don't have enough ${tokenName} `)
    }
    if (Number(amount) < Number(balance) && Number(amount) > 0) {
      setTextWarning('')
      onCharge(amount)
    }
    if (Number(amount) === 0) {
      setTextWarning(`Please input an integer number!`)
    }
  }
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <BalanceHolder>
        {tokenName} Balanace: {numberWithCommas(roundingNumber(balance ?? 0, 3))}
      </BalanceHolder>
      <div >
        <InputContainer>
          <img src={tokenIcon} style={{ width: 80, height: 80 }} />
          &nbsp;&nbsp;Amount
          <input type='number' value={amount} onChange={(e) => {
            setAmount(e.target.value)
          }} />
        </InputContainer>
        {
          textWarning && <div style={{ color: 'red' }}>{textWarning}</div>
        }
      </div>

      <ChargeButton onClick={checkAmount}>
          Charge
      </ChargeButton>
    </Container>
  )
}

export default ChangeToken
