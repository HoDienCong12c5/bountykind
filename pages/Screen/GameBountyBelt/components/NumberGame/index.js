import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { COLOR } from 'common/constants'
import { TitleText } from 'pages/Components/TextSize'
import { images } from 'config/images'

const ContainerNumber = styled.div`
--color:${COLOR.white2};
width:70px;
height:70px;
/* border:1px solid var(--color); */
display: flex;
align-items: center;
justify-content: center;
border-radius:8px;
 
   ${props => css`
     opacity: ${(props) => (props.isSelected) ? 0.3 : 1};
     &:hover{
    cursor:${(props) => (props.isSelected) ? 'not-allowed' : 'pointer'}; 
    }
  `}
`
const Number = styled(TitleText)`

`
const ImageNumber = styled.img`
width: 100%;
height: 100%;

`
const NumberGame = ({ number, onClickNumber }) => {
//   const [numberNext, setNumberNext] = useState()
  return (
    <ContainerNumber
      isSelected={number?.isSelected}
      onClick={() => {
        if (!number?.isSelected) {
          onClickNumber(number?.number)
        }
      }}
    >
      {/* <Number >
        {number?.number}
      </Number> */}
      <ImageNumber
        draggable='false'
        src={images.bountyBeltNumber[`number${number?.number}`]}
      />
    </ContainerNumber>
  )
}

export default NumberGame
