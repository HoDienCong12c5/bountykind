import { numberWithCommas } from 'common/function'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`

const Title = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 26px;
  text-transform: uppercase;
  padding-top: 10px;
  padding-bottom: 10px;
  color: rgba(0, 0, 0, 0.85);
  line-height:41px;
`

const HelperText = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  padding-bottom: 20px;
  color: rgba(0, 0, 0, 0.5);
`

const YuPoint = styled.div`
  width: 100%;
  text-align: right;
  color: black;
  font-size: 16px;
  font-weight: 700;
  padding: 0px 20px;
  color:rgba(0, 0, 0, 0.65)
`

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  color: black;
  font-weight: 700;
  position: relative;
  color:rgba(0, 0, 0, 0.65)
`

const AmountInput = styled.input`
  width: 80%;
  height: 40px;
  border: 2px solid rgba(0,0,0,0.2);
  outline: none;
  box-sizing: border-box;
  padding: 0px 10px;
  opacity: 0;
  background: red;
  z-index: 2;
`

const DisplayAmountInput = styled.div`
    width: 70%;
    height: 40px;
    border: 2px solid rgba(0,0,0,0.2);
    box-sizing: border-box;
    position: absolute;
    right: 5%;
    z-index: 1;
    text-align: left;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    font-weight:normal;
    font-size: 16px;
`

const TextHolder = styled.div`
    width: 75%;
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
    background: #673ab7;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-top: 20px;
    padding: 0px 20px;
    border-radius: 6px;
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
`

const ExchangeToYuModal = ({ title = '', helperText = '', data, onExchange }) => {
  const { yuPoint } = data
  const [yuPointToExchange, setYuPointToExchange] = useState(0)

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
      <YuPoint>Spendable: {numberWithCommas(yuPoint)}</YuPoint>
      <InputContainer>
        Amount
        <AmountInput value={yuPointToExchange} onChange={handleChange} />
        <DisplayAmountInput value={yuPointToExchange} onChange={handleChange}>
          <TextHolder>
            {numberWithCommas(yuPointToExchange)}
          </TextHolder>
          <Suffix>YU Point</Suffix>
        </DisplayAmountInput>
      </InputContainer>
      <ExchangeButton onClick={handleExchange} className={yuPointToExchange === 0 && 'disabled'}>Exchange Point to YU</ExchangeButton>
    </Container>
  )
}

export default ExchangeToYuModal
