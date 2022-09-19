import MyButton from 'pages/Components/MyButton'
import { TitleText } from 'pages/Components/TextSize'
import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
const Container = styled.div`
padding:24px;`
const Title = styled(TitleText)``
const Content = styled.div``
const Description = styled.div`
padding:16px;
`
const ButtonModal = styled(MyButton)``

const ModalRequestDesktop = ({ closeModals }) => {
  const messages = useSelector((state) => state.locale.messages)

  return (
    <Container >
      <Title textTransform >
        {messages.playGame.notifications}
      </Title>
      <Content>
        <Description>
          {messages.playGame.playGameJustSupportOnSesktopBrowsers}
        </Description>
        <ButtonModal onClick={closeModals} type={3}>
          {messages.common.close}
        </ButtonModal>
      </Content>
    </Container>
  )
}

export default ModalRequestDesktop
