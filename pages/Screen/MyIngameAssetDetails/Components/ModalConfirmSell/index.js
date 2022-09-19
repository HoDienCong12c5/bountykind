import React from 'react'
import { Container, Title, Button } from './styled'
const ModalConfirmSellOrChangePrice = ({ onSell, isChangePrice }) => {
  return (
    <Container>
      <Title>
        {isChangePrice ? 'Are you want to change price ?' : 'Are you want to Sell ?'}

      </Title>
      <Button onClick={onSell}>
        {isChangePrice ? 'Change price ' : 'Sell' }
      </Button>
    </Container>
  )
}
export default ModalConfirmSellOrChangePrice
