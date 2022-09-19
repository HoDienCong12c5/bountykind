import React, { useState } from 'react'
import { images } from 'config/images'
import { Container, Title, Description, Button, InputCustoms } from './styled'
const ModalScholarship = ({ onScholarship }) => {
  const [ratio, setRatio] = useState(0)
  return (
    <Container>
      <Title >
            Do you want Scholarship ?
      </Title>
      <Description >
            If you want Scholarship, you need enter percent for your.
      </Description>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ minWidth: 100 }}>
        Percent :
        </div>
        <InputCustoms
          className='input'
          suffix={<img width={15} src={images.icDollar} />}
          placeholder='Enter Ratio'
          onChange={(value) => setRatio(value?.target.value)}
        />

      </div>
      <div style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
        <div style={{ minWidth: 100 }}>
          Password :
        </div>
        <InputCustoms
          className='input'
          type={'password'}
          suffix={<img width={15} src={images.icDollar} />}
          placeholder='Enter Ratio'
          onChange={(value) => setRatio(value?.target.value)}
        />

      </div>

      <Button onClick={() => onScholarship(ratio)}>
          Offer Scholarship
      </Button>
    </Container>
  )
}
export default ModalScholarship
