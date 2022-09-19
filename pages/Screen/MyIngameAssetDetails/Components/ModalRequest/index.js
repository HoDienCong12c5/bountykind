import React from 'react'
import { Container, Title, Button, Description } from './styled'
const ModalRequest = ({ onBuy, onContinue, onReturn, title, modalData }) => {
  return (
    <Container>
      <Title>
        {title?.toUpperCase()}
      </Title>
      <Description>
        Your loan period for characters has expired. Please select one of the options below to continue:
      </Description>
      <div>
        <Button onClick={onBuy}>
          Buy these characters
        </Button>
        <Button onClick={onContinue} >
          Continue to loan for 7 more days
        </Button>
        <Button onClick={onReturn}>
          Return characters
        </Button>
      </div>

    </Container>
  )
}
export default ModalRequest
