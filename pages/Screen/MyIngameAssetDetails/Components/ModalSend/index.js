import React, { useState } from 'react'
import { images } from 'config/images'
import { Container, Title, Description, Button, InputCustoms } from './styled'
const ModalSend = ({ onSend }) => {
  const [address, setAddress] = useState(0)
  return (
    <Container>
      <Title >
            Do you want Send?
      </Title>
      <Description >
            If you want to send, you need enter address receiver.
      </Description>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ minWidth: 100 }}>
        Address :
        </div>
        <InputCustoms
          className='input'
          suffix={<img width={15} src={images.icDollar} />}
          placeholder='Enter Address'
          onChange={(value) => setAddress(value?.target.value)}
        />

      </div>

      <Button onClick={() => onSend(address)}>
          Send
      </Button>
    </Container>
  )
}
export default ModalSend
