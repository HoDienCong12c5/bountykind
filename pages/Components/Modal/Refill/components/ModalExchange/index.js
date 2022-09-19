import React from 'react'
import {
  Container,
  Title,
  Button,
  Description
} from './styled'
import { useSelector } from 'react-redux'
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
  const messages = useSelector((state) => state.locale.messages)
  return (
    <Container >
      <Title >
        {title || messages.token.confirm.start}
      </Title>
      <Description >
        {description || messages.token.confirm.desStart}
      </Description>
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        {noLoading || <Lotties type='started' />}
      </div>
      {
        isFinish && <Button onClick={finish} >
          {
            textButton || (noLoading ? 'OK' : messages.common.close)
          }
        </Button>
      }

    </Container>

  )
}
export default ModalExchange
