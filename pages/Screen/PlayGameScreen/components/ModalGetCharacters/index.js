import React, { useState } from 'react'
import { Router } from 'common/routes'
import { Button, ButtonClose } from './styled'
import { Radio } from 'antd'
const ModalGetCharacters = ({ closeModal }) => {
  const [value, setValue] = useState(1)

  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  return (
    <div style={{ position: 'relative' }}>

      <div style={{ marginBottom: 20, textAlign: 'center', fontSize: 18, color: 'black', fontWeight: 700 }}>
               GET CHARACTERS
      </div>
      <div style={{ textAlign: 'center', fontSize: 16, color: 'black' }}>
                You need to have at least 3 characters to play.
      </div>
      <div style={{ textAlign: 'center', fontSize: 16, color: 'black' }}>
               Please get them from one of the options below
      </div>

      <Radio.Group className='MT12' onChange={onChange} value={value}>
        <div >
          <Radio value={1}>Bought from market</Radio>
        </div>

        <br />
        <div style={{ textAlign: 'left' }}>
          <Radio value={2}>Enter scholarship</Radio>
        </div>

      </Radio.Group>
      <Button onClick={() => {
        if (value === 1) {
          Router.pushRoute('/marketplace')
        } else if (value === 2) {
          Router.pushRoute('/scholarship')
        }
      }}>
               Next
      </Button>
    </div>

  )
}
export default ModalGetCharacters
