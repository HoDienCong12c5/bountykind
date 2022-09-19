import { numberWithCommas } from 'common/function'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
import { MediumText, NormalText } from 'pages/Components/TextSize'
import { images } from 'config/images'
import { useSelector } from 'react-redux'
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  color: white;
`

const Title = styled(MediumText)`
  width: 100%;
  font-weight: 500;
  text-transform: uppercase;
  padding-top: 10px;
  padding-bottom: 10px;
  line-height:41px;
`

const HelperText = styled(NormalText)`
  width: 100%;
  font-weight: 500;
  padding-bottom: 20px;
  opacity: 0.7;
`

const YuPoint = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 300;
  text-align: left;

`

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5px;
  position: relative;
  border: 1px solid white;
  border-radius: 8px;
`

const AmountInput = styled.input`
  width: 100%;
  height: 40px;
  outline: none;
  box-sizing: border-box;
  opacity: 0;
  background: red;
  z-index: 2;
`

const DisplayAmountInput = styled.div`
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    position: absolute;
    z-index: 1;
    text-align: left;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    font-weight:normal;
    font-size: 16px;
`

const TextHolder = styled.div`
    width: calc(100% - 60px);
    height: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 10px;
`

const Suffix = styled.div`
    flex: 1;
    text-align: center;
    
`

const ExchangeButton = styled(MyButton)`
    height: 45px;
    width: 100%;
    background: #673ab7;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-top: 20px;
    padding: 0px 20px;
    cursor: pointer;
    animation: onEnabled 0.25s ease;
    transition: box-shadow 0.25s ease;
    &:hover {
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    }
    @keyframes onEnabled {
        from {
            opacity: 0.5;
        }
        to {
            opacity: 1;
        }
    }
    &.disabled {
        &:hover {
            box-shadow: none;
        }
        opacity: 0.5;
        cursor: not-allowed;
        animation: onDisabled 0.25s ease;
        @keyframes onDisabled {
            from {
                opacity: 1;
            }
            to {
                opacity: 0.5;
            }
        }
    }
    margin-top: 30px;
`

const ExchangeToYuModal = ({ title = '', helperText = '', data, onExchange }) => {
  const { yuPoint } = data
  const [yuPointToExchange, setYuPointToExchange] = useState(0)
  const messages = useSelector((state) => state.locale.messages)
  const handleChange = (e) => {
    setYuPointToExchange(parseInt(e.target.value))
  }

  const handleExchange = () => {
    if (yuPointToExchange > 0) onExchange(yuPointToExchange)
  }

  useEffect(() => {
    if (isNaN(yuPointToExchange)) {
      setYuPointToExchange(0)
    } else {
      if (yuPointToExchange > yuPoint) setYuPointToExchange(yuPoint)
    }
  }, [yuPointToExchange])

  return (
    <Container>
      <Title>{title}</Title>
      <HelperText>{helperText}</HelperText>
      <YuPoint className='MB10'>{messages.token.yuBalance} {numberWithCommas(yuPoint)}</YuPoint>
      <InputContainer>
        <AmountInput value={yuPointToExchange} onChange={handleChange} />
        <DisplayAmountInput value={yuPointToExchange} onChange={handleChange}>
          <TextHolder>
            {numberWithCommas(yuPointToExchange)}
          </TextHolder>
          <Suffix>
            <span><img src={images.icYuToken} style={{
              width: 35,
              height: 35,
              padding: 5
            }} />
            </span>
          </Suffix>
        </DisplayAmountInput>
      </InputContainer>
      <ExchangeButton onClick={handleExchange} className={yuPointToExchange === 0 && 'disabled'}>{messages.common.claim}</ExchangeButton>
    </Container>
  )
}

export default ExchangeToYuModal
