import React from 'react'
import {
  Container,
  Title,
  Button,
  Description
} from './styled'
import Lotties from 'pages/Components/Lotties'

const ModalExchange = (props) => {
  const {
    title = null,
    description = null,
    finish,
    noLoading = false,
    textButton,
    isFinish = false
  } = props
  return (
    <Container >
      <Title >
        {title || 'The process has started'}
      </Title>
      <Description >
        {description || 'System is processing your transaction which can take a little while'}
      </Description>
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        {noLoading || <Lotties type='started' />}
      </div>
      {
        isFinish && <Button onClick={finish} >
          {
            textButton || (noLoading ? 'OK' : 'close')
          }
        </Button>
      }

    </Container>

  )
}
export default ModalExchange
