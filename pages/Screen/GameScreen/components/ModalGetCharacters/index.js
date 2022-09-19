import React, { useState } from 'react'
import { Router } from 'common/routes'
import { Button, ButtonClose } from './styled'
import { Radio } from 'antd'
import { useSelector } from 'react-redux'
const ModalGetCharacters = ({ closeModal }) => {
  const messages = useSelector(state => state.locale.messages)

  const [value, setValue] = useState(1)

  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  return (
    <div style={{ position: 'relative' }}>

      <div style={{ marginBottom: 20, textAlign: 'center', fontSize: 18, color: 'black', fontWeight: 700 }}>
        {messages.receiveCharacters.getCharacter}
      </div>
      <div style={{ textAlign: 'center', fontSize: 16, color: 'black' }}>
        {messages.receiveCharacters.youNeedToHaveAtLeast3CharactersToJoinTheGame}
      </div>
      <div style={{ textAlign: 'center', fontSize: 16, color: 'black' }}>
        {messages.receiveCharacters.wouldYouLikeToSelectYourCharactersFromThisListAndPlayForFreeInOneWeek}
      </div>

      <Radio.Group className='MT12' onChange={onChange} value={value}>
        <div >
          <Radio value={1}>{messages.common.boughtMarket}</Radio>
        </div>

        <br />
        <div style={{ textAlign: 'left' }}>
          <Radio value={2}>{messages.common.enterScholarship}</Radio>
        </div>

      </Radio.Group>
      <Button onClick={() => {
        if (value === 1) {
          Router.pushRoute('/marketplace')
        } else if (value === 2) {
          Router.pushRoute('/scholarship')
        }
      }}>
        {messages.common.next}
      </Button>
    </div>

  )
}
export default ModalGetCharacters
