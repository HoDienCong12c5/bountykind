import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
`
export const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`

export const NftContainer = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: appear 0.2s ease;
  z-index: 100;
  img {
    max-width: 180px;
    max-height: 250px;
    animation: glow 0.5s infinite alternate ease;
  }
  @keyframes glow {
    from {
      filter: brightness(100%);
      transform: scale(0.95);
    }
    to {
      filter: brightness(130%);
      transform: scale(1);
    }
  }
  @keyframes appear {
    from {
      margin-top: 600px;
      transform: scale(0.5);
    }
    to {
      margin-top: 0px;
      transform: scale(1);
    }
  }
`

export const Bottom = styled.div`
  width: 100%;
  background: red;
  display: flex;
`

export const LottieContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .video {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .lottie {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

export const StartButton = styled.button`
  color: white;
  background: #1877f2;
  border: none;
  outline: none;
  font-weight: bold;
  width: 40%;
  height: 50px;
  margin-top: 30px;
  font-size: 15px;
  text-transform: uppercase;
  border-radius: 10px;
  cursor: pointer;
`

export const SlideContainer = styled.div`
  position: absolute;
  z-index: 100;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.125);
  height: 100%;
  width: 100%;
  margin: auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  &::after {
    position: absolute;
    z-index: -1;
    content: "";
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
`

export const BlurBG = styled.div`
  position: absolute;
  z-index: -1;
  content: "";
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`

export const RouletteContainer = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  display: flex;
  flex-flow: column wrap;
  gap: 10px;
  overflow: hidden;
  // animation: scroll 5s ease;
  // transform: translateX(${(props) => props.position}px);
  @keyframes scroll {
    0% {
      transform: translateX(700px);
    }
    25% {
      transform: translateX(calc(-320px * 3));
    }
    50% {
      transform: translateX(700px);
    }
    75% {
      transform: translateX(calc(-320px * 3));
    }
    100% {
      translatex: translateX(${(props) => props.position}px);
    }
  }
`

export const RouletteItem = styled.div`
  width: 30%;
  height: 200px;
  display: flex;
  flex-flow: row wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7);
  padding: 10px;
  overflow: hidden;
  img {
    max-width: 80%;
    max-height: 80%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`
export const Arrow = styled.div`
  position: absolute;
  height: 200px;
  width: 30px;
  margin-left: calc(50% - 10px);
  z-index: 101;
`

export const Details = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`

export const NftName = styled.div`
  width: 100%;
  font-weight: bold;
  color: white;
  font-size: 24px;
  margin-bottom: 40px;
`

export const ImageWrapper = styled.div`
  width: 50%;
  img {
    animation: glow 0.5s infinite alternate ease;
    @keyframes glow {
      from {
        filter: brightness(100%);
      }
      to {
        filter: brightness(130%);
      }
    }
  }
`

export const Description = styled.div`
  padding-top: 50px;
  width: 60%;
  color: rgba(255, 255, 255, 0.9);
  text-align: left;
  font-size: 14px;
`

export const ResultImage = styled.div`
  width: 20%;
  padding-bottom: 10%;
  background: url("${(props) => props.image}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 40%;
  left: 40%;
  animation: resultImageAni 0.2s ease;
  @keyframes resultImageAni {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`

export const ResultImageMobile = styled.div`
  width: 50%;
  padding-bottom: 50%;
  background: url("${(props) => props.image}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 40%;
  left: 25%;
  animation: resultImageAni 0.2s ease;
  @keyframes resultImageAni {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`

export const ButtonGroup = styled.div`
  position: absolute;
  z-index: 100;
  bottom: 60px;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export const ButtonGroupMobile = styled.div`
  position: absolute;
  z-index: 100;
  bottom: 60px;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export const PlayButton = styled(MyButton)`
  width: ${props => props.width};
  min-width: 100px;
  height: 50px;

`

export const CancelButton = styled(MyButton)`
  width: ${props => props.width};
  min-width: 100px;
  height: 50px;

`
export default () => {}
