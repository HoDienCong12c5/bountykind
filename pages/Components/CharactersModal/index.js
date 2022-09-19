import React, { useState } from 'react'
import {
  Container,
  Title,
  Description,
  NextButton,
  CustomRadio
} from './style'
import { Router } from 'common/routes'
import { Radio } from 'antd'

const CharactersModal = () => {
  const [value, setValue] = useState(1)
  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  const handleNext = () => {
    switch (value) {
    case 1:
      Router.pushRoute('/nft-market')
      break
    case 2:
      Router.pushRoute('/scholarship')
      break
    case 3:
      Router.pushRoute('/game')
      break
    }
  }
  return (
    <Container>
      <Title>GET CHARACTERS</Title>
      <Description>
        You need at least 3 characters to play. Please get them from one of the options below
      </Description>
      <Radio.Group onChange={onChange} value={value}>
        <CustomRadio value={1} style={{ color: value === 1 ? '#1877F2' : 'rgba(0, 0, 0, 0.3)' }}>Bought from market</CustomRadio>
        <CustomRadio value={2} style={{ color: value === 2 ? '#1877F2' : 'rgba(0, 0, 0, 0.3)' }}>Enter scholarship</CustomRadio>
        <CustomRadio value={3} style={{ color: value === 3 ? '#1877F2' : 'rgba(0, 0, 0, 0.3)' }}>Borrow from the system</CustomRadio>
      </Radio.Group>
      <NextButton onClick={handleNext}>
          Next
      </NextButton>
    </Container>
  )
}

export default CharactersModal
