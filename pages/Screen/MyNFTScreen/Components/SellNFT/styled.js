import styled from 'styled-components'
import Input from 'pages/Components/Input'
import MyButton from 'pages/Components/MyButton'
import { DivAll } from 'pages/Components/DivBasic'
import { NormalText, MediumText } from 'pages/Components/TextSize'
import { COLOR } from 'common/constants'
import { Form } from 'antd'
export const MainContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  height:100%;
  width:100%;
  padding-bottom: 50px;
  color: white;
`

export const InputCustom = styled(Input)`
/* padding: 5px 10px !important;
  &.ant-input-affix-wrapper {
    background-color: transparent !important;
    border: 0px;
  } */
`

export const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  flex-flow: row wrap;
  margin: auto auto;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    width: 90%;
    flex-flow: column wrap;
  }
`

export const LeftDetailsContainer = styled.div`
  width: 48%;
  display: flex;
  flex-flow: column wrap;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const RightDetailsContainer = styled(DivAll)`
  width: 47%;
  display: flex;
  flex-flow: column;
  padding: 30px;
  height: 10%;
  max-height: 100%;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 15px;
  }
`

export const BackContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 30%;
`
export const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center; 
  flex-direction: column;
   border-bottom: ${(props) => (!props.noBorderBottom ? '0.1px solid rgba(255,255,255,0.7)' : 'none')};

  img {
    max-width: 95%;
    max-height: 95%;
  }
 
`

export const NftName = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 16px;
  color: white;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

export const OptionToken = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 16px;
  color: white;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

export const TypeToken = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 24px;
  color: white;
  display: flex;
  text-align: center;
  align-items: center;
  margin-bottom: 20px;
`

// export const MyButton = styled.button`
//   min-width: 100px;
//   border: none;
//   margin-top:10px;
//   /* margin-right:10px; */
//   outline: none;
//   background:${props => props.isCancel ? 'red' : '#1877F2'};
//   color: white;
//   font-weight: bold;
//   font-size: 15px;
//   border-radius: 6px;
//   padding-top: 15px;
//   padding-bottom: 15px;
//   cursor: pointer;
//   opacity: 0.6;
//   transition: opacity 0.25s ease;
//   &:hover {
//     opacity: 1;
//         cursor:${props => props.allow ? 'not-allowed' : 'pointer'}; ;
//   }
//   // animation: flicker 1s ease infinite alternate;
//   @keyframes flicker{
//     from{
//       background: #1877F2;
//       box-shadow: 0px ;
//     }
//     to{
//       background:#0B0838;
//       box-shadow: 0px 2px 50px 2px #999999;
//     }
//   }
// `
export const ButtonEx = styled.button`
  width: 100%;
  min-width: 100px;
  border: none;
  margin-top: 10px;
  margin-right: 10px;
  outline: none;
  background: #1877f2;
  color: white;
  font-weight: bold;
  font-size: 15px;
  border-radius: 6px;
  padding-top: 15px;
  padding-bottom: 15px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.25s ease;
  &:hover {
    opacity: 1;
  }
`

export const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  word-wrap: break-word;
  word-break: break-all;
  justify-content: center;
  align-items: center;
  @media (max-width: 1025px) {
    display: unset;
  }
`
export const PropsDetails = styled.div`
  font-size: 18px;
  color: white;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`
export const Line = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: ${(props) => props.marginBottom || '0px'};
`

export const TextContent = styled.span`
  font-size: 16px;
  color: white;
`
export const BigTitle = styled.div`
  margin: 15px 0px;
  font-size: 18px;
  font-weight: 600;
  color: white;
`
export const InputPrice = styled.input``
export const InputWrapper = styled.div`
  width: calc(50%);
  @media screen and (max-width: 768px) {
    margin-top: 10px;
    width:100%;
  }

  .count {
    width: 340px;
    text-align: right;
    color: #ffffff;
    font-size: 13px;
    opacity: 0.5;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  .ant-form-item {
    margin-bottom: unset;
  }
  .ant-form-item-control-input-content {
    @media screen and (max-width: 768px) {
      max-width: 100%;
    }
    
  }
`
export const ContainerToken = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`
export const ImgToken = styled.img`
  &:hover {
    cursor: pointer;
    transform: translate(0, -5px);
  }
`
export const ItemContainer = styled.div`
  display: flex;
  flex-direction: "row";
  width: 80%;
  justify-content: space-between;
  margin: 20px 0px;
  align-items: center;
  @media screen and (max-width: 768px) {
    width:100%;
    padding:0px 20px;
  }
`
export const CommentContainer = styled(ItemContainer)`
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const TitleSale = styled(NormalText)`
  flex: 1;

`
export const Item = styled(DivAll)`
  border: ${(props) => (!props.noBackground ? 'var(--px) solid var(--color)' : 'none')};
  :last-child {
    border-radius: 0 0 10px 10px;
  }
`
export const ContentItem = styled.div`
  flex: 1;
`
export const TokenWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  .price-token {
    font-size: 13px;
    color: ${(props) => (props.color ? props.color : 'white')};
    opacity: ${(props) => (props.opacity ? props.opacity : '0.5')};
    font-weight: 600;
    font-size: 13px;
  }
`
export const ContentComment = styled(ContentItem)`
  @media screen and (max-width: 768px) {
    width:100%;
  }
`
export const StyledSellNFT = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 50px;
  max-width: 1000px;
  @media screen and (max-width: 768px) {
    max-width:unset;
    width:100%;
    padding: 0 20px;
  }
  padding-bottom: 50px;
`
export const TopActionContainer = styled.div`
  height: 50px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 50px 0;
  align-items: baseline;
  margin-bottom: 10px;
`
const HowtoUse = styled.div`
  padding: 12px 0;
  background: #000a1d;
  display: flex;
  align-items: center;
  color: white;
  justify-content: center;
  span {
    margin-left: 5px;
    padding: 2px 0;
  }
`
export const BackButton = styled.div`
  width: 10px;
  height: 9px;
  background: url('/static/Assets/Image/Icon/back2.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 2px;
`
export const TextBack = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  margin-left: 7px;
`
export const TitleMain = styled.div`
  text-transform: uppercase;
  margin: 0;
  box-sizing: border-box;
  height: 100%;
  font-weight: 600;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 30%;
  color: white;
  width: 70%;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
  @media screen and (max-width: 370px) {
    font-size: 12px;
  }
`
export const ButtonContainer = styled.div`
  text-align: right;
  margin: 26px 0px;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
  }
  button {
    width: 200px;
    min-width: auto;
    font-size: 12px;
    line-height: 20px;
    height: 50px;
    letter-spacing: 0.05em;
    font-weight: 600;
    color: #ffffff;
    text-transform: uppercase;
    @media screen and (max-width: 768px) {
      width: 50%;
    }
  }
`
export const ButtonCancel = styled(MyButton)`
`
export const ButtonSell = styled(MyButton)`
`
export const WordByComment = styled.div`
  text-align: end;
  color:white;
`
export const FormCustom = styled(Form)`
  .ant-input {
   border:1px solid ${COLOR.white2}
  }
  .ant-form-item{
  margin-bottom: 0px;
  }
  `
export default () => {}
