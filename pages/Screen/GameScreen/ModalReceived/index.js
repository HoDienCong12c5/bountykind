import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from './styled'
const ModelReceivedCharacters = ({ onClickBtn }) => {
  const messages = useSelector(state => state.locale.messages)
  return (
    <>
      {/* <div style={{ marginBottom: 20, textAlign: 'center', fontSize: 18, color: 'black', fontWeight: 700 }}>
        You received Characters !
      </div> */}
      <div style={{ textAlign: 'center', fontSize: 16 }}>
        {messages.receiveCharacters.yourReceived}
      </div>
      <div style={{ textAlign: 'center', fontSize: 16 }}>
        {messages.receiveCharacters.yourStartGame}
      </div>
      <Button onClick={() => {
        onClickBtn()
      }}>
        {messages.common.playGame}
      </Button>
    </>

  )
}
export default ModelReceivedCharacters
