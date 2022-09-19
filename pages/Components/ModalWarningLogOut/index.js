import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  ContainerModalWarningLogOut,
  Title,
  Description,
  Button,
  ContainerOptions,
  ButtonLogin
} from './style'
const ModalWarningLogOut = ({
  title = '',
  description = '',
  cancel,
  login
}) => {
  const { messages } = useSelector(state => state.locale)
  console.log('messages', messages.warningContinueLogin.title)
  return (
    <ContainerModalWarningLogOut>
      <Title textTransform> {title || messages.warningContinueLogin.title}</Title>
      <Description>{description || messages.warningContinueLogin.description}</Description>
      <ContainerOptions>
        <Button type={1} onclick={() => cancel()}>
          {messages.common.cancel}
        </Button>
        <ButtonLogin onClick={() => login()}>{messages.common.loginAgain}</ButtonLogin>
      </ContainerOptions>
    </ContainerModalWarningLogOut>
  )
}
export default ModalWarningLogOut
