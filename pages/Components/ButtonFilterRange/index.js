import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, Slider, Form } from 'antd'
import { NormalText, MediumText } from 'pages/Components/TextSize'
import './style.scss'
import ButtonFilter from 'pages/Components/ButtonFilter'
const ButtonFilterRangeContainer = styled.div`
width: 100%;
`
const Title = styled(MediumText)`
`
const SliderCustom = styled(Slider)`
  color: white;
  .ant-slider-handle{
    border: none;
  }
  .ant-slider-track {
    background-color: white;
  }
  .ant-slider-rail{
    background-color:#FFFFFF;
    opacity: 0.5;
  }
  
`
const TextMin = styled(NormalText)`
  min-width: 80px;
  padding: 5px 10px;
  text-align: center;
  border-radius: 16px;
  border: 1px solid #FFFFFF;
`
const TextMax = styled(TextMin)`

`
const calculateRange = (min, max, sizeRange) => {
  const range = max - min
  return range / sizeRange
}
const ButtonFilterRange = ({
  title = '',
  icon = null,
  changeRange,
  minRange = 19,
  maxRange = 100,
  sizeRange = 50
}) => {
  const [min, setMin] = useState(minRange)
  const [max, setMax] = useState(maxRange)
  const onChange = (value) => {
    setMin(value[0])
    setMax(value[1])
  }

  const onAfterChange = () => {
    changeRange(title, min, max)
  }
  return (
    <ButtonFilterRangeContainer >
      <Title
        className='MB15'
        textTransform
        size={16}
        fontWeight={400}
      >
        {
          icon && (
            <img src={icon}
              style={{
                height: '20px',
                width: '20px',
                marginRight: '10px'
              }}
            />
          )
        }
        {title}
      </Title>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* <TextMax >{min}</TextMax> */}
        <ButtonFilter title='okok' />
        <div style={{ textAlign: 'center', color: 'white' }}>-</div>
        <TextMax >{max}</TextMax>
      </div>
      <SliderCustom
        range
        className='MT20'
        step={calculateRange(minRange, maxRange, sizeRange)}
        min={minRange}
        max={maxRange}
        defaultValue={[minRange, maxRange]}
        onChange={onChange}
        onAfterChange={onAfterChange}

      />
    </ButtonFilterRangeContainer>
  )
}
export default ButtonFilterRange
