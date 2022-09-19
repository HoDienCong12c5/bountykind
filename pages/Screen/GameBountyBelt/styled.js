import { COLOR } from 'common/constants'
import { DivAll } from 'pages/Components/DivBasic'
import MyButton from 'pages/Components/MyButton'
import { TitleText } from 'pages/Components/TextSize'
import styled from 'styled-components'
export const Container = styled.div`
  width: 100%;
  background: transparent ;
  /* height: calc(100vh - 50px); */
  color:white;
  -moz-user-select: none !important;
-webkit-touch-callout: none!important;
-webkit-user-select: none!important;
-khtml-user-select: none!important;
-moz-user-select: none!important;
-ms-user-select: none!important;
user-select: none!important;
`
export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  /* max-width: 1550px;
  margin:0 auto;
   @media screen and (max-width: 1700px) {
    max-width: 1350px;

    padding: 0 50px;
   }
   @media screen and (max-width: 768px) {
    padding: 0 20px;
   } */
  /* max-width: 600px;
  margin: 0 auto;
    @media screen and (max-width: 1700px) {
  

    padding: 0 50px;
   }
   @media screen and (max-width: 768px) {
    padding: 0 20px;
   }  */

`
export const TitleScreen = styled(TitleText)`
width: 100%;
text-align: center;
margin: 20px 0px;
`
export const ImageLogo = styled.img`
width: 100%;
margin: 0 auto;
`
export const InputWrapper = styled.div`
width: 100%;

margin: 0 auto;
.ant-form-item{
margin-bottom:0px;
}
`
export const Button = styled(MyButton)`
width: 100%;

margin: 0 auto;
`
export const BackContainer = styled.div`
  width: 100%;
  margin: auto auto;
  padding-bottom: 26px;
  display: flex;
  align-items: center;
  button {
    background: none;
    border: none;
    outline: none;
    color: white;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-left: 0px;
    img {
      margin-right: 10px;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`
export const ContainerCountdown = styled.div`
width: 100%;
/* height:calc(100vh - 100px); */
margin : 0 auto;
display: flex;
align-items: center;
justify-content: center;
display: flex;
flex-direction: column;
`
export const NumberCountDown = styled.div`
font-size:150px ;
`
export const ContainerPlaying = styled.div`
width: 100%;
/* height:calc(100vh - 100px); */
margin : 0 auto;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
export const NumberPlayerContainer = styled.div`
display: inline-flex;
gap:20px;
`
export const NumberPlayer = styled(DivAll)`
  flex: 1;
  display: flex;
  /* justify-content: space-around; */
  justify-content: center;
  padding: 0 12px;
  flex-flow: column wrap;
  align-items: baseline;
`
export const TxtWraning = styled.div`
  --color: ${COLOR.white2}; /* color */
  color: var(--color);
`
export const TxtNotice = styled.div`
margin-top:12px;
  text-align: left;
  color: ${COLOR.white2};
`
export default () => {}
