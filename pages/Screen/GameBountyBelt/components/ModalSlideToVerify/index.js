import { images } from 'config/images'
import { MediumText, TitleText } from 'pages/Components/TextSize'
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react'
import styled from 'styled-components'
import SwipeButton from 'pages/Components/SwipeButton'
import { Input, Form, Slider } from 'antd'
import MyButton from 'pages/Components/MyButton'

const Container = styled.div`
position: relative;
 background-image: url(${(props) => props.src});
  
-moz-user-select: none !important;
-webkit-touch-callout: none!important;
-webkit-user-select: none!important;
-khtml-user-select: none!important;
-moz-user-select: none!important;
-ms-user-select: none!important;
user-select: none!important;

`
const ImageBountyBelt = styled.img`
width: 100%;
margin-top: 12px;
`
const Title = styled(TitleText)``
const PuzzlePieceEmpty = styled.img`
position: absolute;
top:20%;
left:80%;
`
const PuzzlePiece = styled.img`
position: absolute;
top:20%;
left: ${props => props.pos}%;
`
const DescriptionVerity = styled(MediumText)`
width:50%;
position: absolute;
top:50%;
left:20px;
word-wrap: break-word;
text-align: left;
`
const SwiperContainer = styled.div`
  width: 100%;
  max-width:250px;
  align-self:center ;
`
const FormItemSlider = styled(Form.Item)`
  .ant-form-item-control-input-content {
    color: white;
  display: flex;
  flex: 1;
  justify-content:center;
  align-items: center;
  }
`
const SliderWrap = styled.div`
  width: 100%;
  position: relative;
  margin-top: 32px;
 
`
const SliderBtn = styled(Slider)`
  height: 60px;
  .ant-slider-rail {
    height: 50px;
    background-color: #c76fe757 !important;
    border-radius: 500px;
  }
  .ant-slider-track {
    height: 50px;
    max-width: 100%;
    border-top-left-radius: 500px;
    border-bottom-left-radius: 500px;
    background-image: linear-gradient(
      91.83deg,
      #dd5ee4 0%,
      #20e7f9 100%
    ) !important;
  }
  .ant-slider-handle {
    border: none;
    background-image: url("/static/Assets/Image/Icon/drag-icon.svg");
    padding: 18px;
    z-index: 9999;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 28px;
    top: 9px;
    height: 50px;
    width: 50px;
    @media screen and (max-width: 680px) {
      z-index: 1;
    }
  }
`
const SlideText = styled.span`
  position: absolute;
  color: white;
  /* right:30%; */
  top:5px;
  width: 100%;
  left:0px;
  height:50px;
  display:flex;
  align-items: center;
  justify-content: center;
`
const Button = styled(MyButton)`
width: 100%;`
const TitleVerify = styled(TitleText)`

`
const ImageStatusVerify = styled.img`
margin-top:16px;
width:30%;
`
const ContainerStatusVerify = styled.div`
display: flex;
width: 100%;
flex-direction: column;
align-items: center;
justify-content: center;
`

const ModalSildeToVerify = ({ closeModals, setPlaying, setStatusGame }) => {
  const [valueSilder, setValueSilder] = useState(6)
  const [positionPuzzlePiece, setPositionPuzzlePiece] = useState(0)

  const [verifyComplete, setVerifyStatus] = useState({ status: 'notVerify' })

  const handleVerify = (val) => {
    console.log('const handleVerify', val)
    setPositionPuzzlePiece(val)
    if (val <= 6) {
      setValueSilder(6)
    } else if (val >= 94) {
      setValueSilder(94)
    } else {
      setValueSilder(val)
    }
  }
  const onAfterChange = (val) => {
    console.log('onAfterChange', val)
    setTimeout(() => {
      if (val >= 79 && val <= 81) {
        setVerifyStatus({ status: 'success' })
        setTimeout(() => {
          setPlaying(true)
          setStatusGame({ status: 'countdown' })
          closeModals()
        }, 1500)
      } else {
        setVerifyStatus({ status: 'failed' })
      }
    }, 1500)
  }
  const onRetry = () => {
    setVerifyStatus({ status: 'notVerify' })
    setValueSilder(6)
    setPositionPuzzlePiece(0)
  }

  return (
    <Container>
      {verifyComplete?.status === 'notVerify' ? (
        <>
          <Title textTransform>Verify</Title>
          <ImageBountyBelt draggable={false} src={images.bountyBelt} />
          <DescriptionVerity>
            Please fit the puzzle piece carefully
          </DescriptionVerity>
          <PuzzlePieceEmpty draggable={false} src={images.puzzlePieceEmpty} />
          <PuzzlePiece
            draggable={false}
            pos={positionPuzzlePiece < 89 ? positionPuzzlePiece : 89}
            src={images.puzzlePieceEmpty}
          />
          <SliderWrap>
            <SliderBtn
              onAfterChange={onAfterChange}
              defaultValue={6}
              value={valueSilder}
              disabled={false}
              onChange={handleVerify}
              tipFormatter={null}
            />
            <SlideText>Drag the left slider to verify</SlideText>
          </SliderWrap>
        </>
      ) : verifyComplete?.status === 'success' ? (
        <>
          <TitleVerify textTransform>Verify Successfully</TitleVerify>
          <ImageStatusVerify src={images.icVerifyComplete} />
        </>
      ) : (
        <>
          <TitleVerify textTransform>Verify Failed</TitleVerify>
          <ContainerStatusVerify>
            <ImageStatusVerify src={images.icVerifyFailed} />
            <Button onClick={onRetry}>Retry</Button>
          </ContainerStatusVerify>
        </>
      )}
    </Container>
    // 26 //413
  )
}

export default ModalSildeToVerify
