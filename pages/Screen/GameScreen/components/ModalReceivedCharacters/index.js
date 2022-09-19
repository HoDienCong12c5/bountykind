import React, { useState } from 'react'
import { Router } from 'common/routes'
import { Button } from './styled'
import { useSelector } from 'react-redux'

const ModalReceivedCharacters = ({ title, description, onclickBtn, onclickBtnPlayGame }) => {
  const [value, setValue] = useState(1)
  const messages = useSelector(state => state.locale.messages)
  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  return (
        <>
          <div style={{ marginBottom: 20, textAlign: 'center', fontSize: 26, fontWeight: 700 }}>
            {title}
          </div>
          <div style={{ textAlign: 'center', fontSize: 16 }}>

            {description}
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Button onClick={() => onclickBtn()}>
              {messages.common.backMyAccount}
            </Button>
            {onclickBtnPlayGame &&
            <Button onClick={() => onclickBtn()}>
              {messages.common.playGame}
            </Button>
            }
          </div>

        </>

  )
}
export default ModalReceivedCharacters
