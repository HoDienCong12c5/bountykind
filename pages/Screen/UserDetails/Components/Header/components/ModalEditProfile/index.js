import { removeHexLeadingZeros } from '@walletconnect/utils'
import React, { useState } from 'react'
import { Container, Title, Button, Description, InputText } from './styled'

import { MG } from 'pages/Style/CommonStyle'
const ModalEditProfile = (props) => {
  const {
    title,
    type = 0,
    textOld,
    onSave
  } = props
  const [textNew, setTextNew] = useState('')
  const updateTextNew = (text) => {
    setTextNew(text.target.value)
  }
  return (
    <Container>
      <Title>
        {
          type === 0 ? (
            'Change user name'
          ) : null
        }

      </Title>
      <Description >
        {
          type === 0 ? (
            'Old user name : ' + textOld
          ) : null
        }
      </Description>
      <MG MB={20} />
      <Description >
        {
          type === 0 ? (
            <div style={{ display: 'flex' }}>
              Name new :  <InputText onChange={updateTextNew} value={textNew} placeholder={'new '} />
            </div>
          ) : null
        }
      </Description>

      <Button onClick={() => onSave(type, textNew)}>
       Save
      </Button>
    </Container>
  )
}
export default ModalEditProfile
