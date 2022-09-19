import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
import { NormalText } from 'pages/Components/TextSize'
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  background-color: black;
  padding-bottom: 50px;
  font-family: URW DIN Arabic, SemiCond XLight;
`

export const CharacterMain = styled.div`
  width: 60%;
  height: calc(80vh - 50px);
  background-size: cover;
  background-image: url("${(props) => props.src}");
  text-align: center;
  @media screen and (max-width: 768px) {
    height: calc(100vh - 120px);
    justify-content: flex-end;
  }
`
export const BannerBigText = styled.span`
  font-family: URW DIN Arabic;
  color: #fff;
  font-size: 96px;
  font-weight: 800;
  max-width: 200px;
  line-height: 100px;
  word-wrap: break-word;
  text-align: left;
  margin-right: 500px;
  word-wrap: break-word;
  @media screen and (max-width: 768px) {
    font-size: 24px;
    margin-right: 0px;
  }
`
export const BannerBigImg = styled.img`
  height: 100%;
  width: 100%;
`
export const BannerDes = styled.span`
  font-family: Abhaya Libre;
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  line-height: 42px;
  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`
export const BannerButton = styled(MyButton)`
  width: 200px;
  height: 50px;
  text-transform: uppercase;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  margin-top: 30px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin-bottom: 50px;
  }
`
export const IntroduceHome = styled.div`
  background-color: black;
  flex-flow: row wrap;
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: 1099px) {
    justify-content: normal;
  }
  @media screen and (max-width: 919px) {
    justify-content: center;
    flex-flow: colum wrap;
  }
`
export const LeftIntroduce = styled.div`
  flex-flow: column wrap;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1700px) {
    padding: 0 50px;
  }
  @media screen and (max-width: 568px) {
    margin: auto;
    width: 90%;
    padding: 0px;
    display:unset;
    flex-flow: unset;
  }
`
export const BigTitle = styled.div`
  color: #fff;
  max-width: 500px;
  text-transform: ${(props) => (props.upCase ? 'uppercase' : 'none')};
  font-size: 36px;
  font-family: URW DIN Arabic;
  white-space: break-spaces;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`
export const BigTitleWar = styled.div`
  color: #fff;
  text-transform: uppercase;
  font-size: 36px;
  margin: auto;
  text-align: center;
  position: relative;
  top: ${(props) => (props.top ? `${props.top}px` : '0px')};
  z-index: 1;
  > div {
    transform: translateY(${(props) => props.translateY ?? 0}px);
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    font-size: 24px;
  }
`
export const LineTitle = styled.div`
  background-image: url("${(props) => props.src}");
  background-size: contain;
  height: 20px;
  margin: auto;
  max-width: 500px;
  margin-bottom: 20px;
  @media screen and (max-width: 568px) {
    width: 80%;
    height: 15px;
  }
`
export const Directions = styled(NormalText)`
  color: #fff;
  max-width: 500px;
  margin-bottom: 20px;
  white-space: break-spaces;
  text-wrap: break-word;
  @media screen and (max-width: 568px) {
    margin: auto;
    margin-bottom: 20px;
  }
`
export const ButtonGame = styled.div`
  display: flex;
  font-size: 13px;
  flex-flow: row wrap;
  justify-content: space-between;
  max-width: 200px;
  min-width: 150px;
  background-color: rgba(255, 255, 255, 0.1);
  background-image: ${(props) =>
    props.isLinear
      ? 'linear-gradient(to right,rgba(221, 94, 228, 1), rgba(32, 231, 249, 1))'
      : 'none'};
  text-transform: ${(props) => (props.isUpCase ? 'uppercase' : 'none')};
  padding: 10px;
  padding-right: 15px;
  opacity: 0.8;
  &:hover,
  &:focus {
    cursor: pointer;
    opacity: 1;
    transform: scale(1.05);
    color: rgb(255, 255, 255);
    // background-image: linear-gradient(to right, rgb(5, 144, 195) 0%, rgb(70, 203, 229) 100%);
    transition: all 0.2s ease-in-out 0s;
    box-shadow: ${(props) =>
    props.isLinear ? 'rgba(5,144, 195, 0.5) 0px 0px 30px 6px' : 'none'};
  }
  @media screen and (max-width: 568px) {
    margin: auto;
    min-width: 100%;
  }
`
export const TitleButtonGame = styled(NormalText)`
  text-transform: uppercase;
  font-weight: 400;
  color: white;
  opacity: 1;
`
export const IconButtonGame = styled.div`
  background-image: url("${(props) => props.src}");
  height: 16px;
  width: 9px;
  background-size: contain;
`
export const RightIntroduce = styled.div`
  background-color: black;
  min-width: 400px;
  max-width: 500px;
  min-height: 400px;
  max-height: 450px;
  @media screen and (max-width: 568px) {
    min-width: unset;
  }
`
export const LogoGame = styled.img`
  width: 100%;
  height: 100%;
  animation: flash 4s infinite linear alternate;
  @keyframes flash {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
`
export const IconGame = styled.img`
  width: 20%;
  height: 20%;
  position: relative;
  top: -63%;
  left: 35%;
`

export const BtnManagerSlide = styled.div`
  text-align: right;
  width: 95%;
  &:hover {
    cursor: pointer;
    animation: zoomIn 2s infinite linear alternate;
    transition: all 0.2s ease-in-out;
    @keyframes zoomIn {
      transform: scale(1.05);
    }
  }
`
export const FooterHome = styled.div`
  background-image: url("${(props) => props.src}");
  padding-top: 20px;
  width: 100%;
  background-size: cover;
`
export default () => {}
