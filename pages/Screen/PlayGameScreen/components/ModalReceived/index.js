import React from 'react'
import { Router } from 'common/routes'
import { Button } from './styled'
const ModalReceived = ({ onSuccess }) => {
  return (
    <>
      <div style={{ marginBottom: 20, textAlign: 'center', fontSize: 18, color: 'black', fontWeight: 700 }}>
        You received Characters !
      </div>
      <div style={{ textAlign: 'center', fontSize: 16, color: 'black' }}>
          Your character mint to need a few minute... !
      </div>
      <div style={{ textAlign: 'center', fontSize: 16, color: 'black' }}>
      You can start game
      </div>
      <Button onClick={onSuccess}>
        Go to start game
      </Button>
    </>

  )
}
export default ModalReceived
