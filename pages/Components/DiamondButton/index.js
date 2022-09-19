import React from 'react'
import styled from 'styled-components'

const DiamondButton = ({
  imgSrc = null,
  width = 45,
  height = 45,
  onClick = null,
  imgWidth = 15,
  imgHeight = 16,
  bgColor = '#000A1D',
  borderColor = '#F6541D'
}) => {
  const Button = styled.div`
    width: ${width}px;
    height: ${height}px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    img {
        position:absolute;
        z-index: 2;
        width: ${imgWidth}px;
        height: ${imgHeight}px;
    }
    &::before{
        content: "";
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        background: ${bgColor};
        transform: rotate(45deg) scale(0.7);
        border: 0.5px solid ${borderColor};
        z-index: 0;
    }
    &::after{
        content: "";
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        background: transparent;
        transform: rotate(45deg) scale(0.6);
        border: 0.5px solid ${borderColor};
        z-index: 1;
    }
`
  return (
    <Button onClick={onClick}>
      {imgSrc && <img src={imgSrc} />}
    </Button>
  )
}

export default DiamondButton
