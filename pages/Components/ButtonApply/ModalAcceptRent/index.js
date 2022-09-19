import React, { useState } from 'react'
import { Button, OptionSelectButtonContainer, ButtonCancel, ButtonRent } from './styled'

import { useSelector } from 'react-redux'
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'
const ModalAcceptRent = ({ closeModal, onclick, isRent = true, name = null }) => {
  const messages = useSelector(state => state.locale.messages)
  // if (name !== null) {
  //   if (name === 'continue') {
  //     name = 'continue scholarship'
  //   }
  // }
  return (
    <>
      <div
        style={{
          marginBottom: 20,
          textAlign: 'center',
          fontSize: 26,
          color: 'white',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}
      >
        {name ?? (isRent ? 'APPLY FOR' : 'WITHDRAW')} SCHOLARSHIP
      </div>
      <div
        style={{
          textAlign: 'center',
          fontSize: 13,
          color: 'white',
          opacity: 0.5
        }}
      >
        {`Are you sure you would like to ${
          name ?? (isRent ? 'apply for' : 'withdraw')
        }  this scholarship?`}
      </div>

      <OptionSelectButtonContainer>
        <ButtonCancel type={1} onClick={() => closeModal()}>
          {messages.common.cancel}
        </ButtonCancel>
        <ButtonRent
          onClick={() => {
            closeModal()
            onclick()
          }}
        >
          {name ?? (isRent ? messages.common.apply : messages.common.withdraw)}
        </ButtonRent>
      </OptionSelectButtonContainer>
    </>
  )
}
export default ModalAcceptRent
