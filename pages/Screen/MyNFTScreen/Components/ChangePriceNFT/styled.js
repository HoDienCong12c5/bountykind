import MyButton from 'pages/Components/MyButton'
import styled from 'styled-components'
import { DivAll } from 'pages/Components/DivBasic'
import { COLOR } from 'common/constants'
import Input from 'pages/Components/Input'
import { Form } from 'antd'
const FormContainer = styled.div`
  // border: 1px solid #282c34;
  padding: 10px 0px;
  border-radius: 10px;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  @media screen and (max-width: 768px) {
    padding:0px;
  }
`

const ContainerStyled = styled.div`
  height:100%;
  width:100%;
  }
`

const StyledSellNFT = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 50px;
  max-width: 1000px;
  @media screen and (max-width: 768px) {
    max-width: unset;
    width: 100%;
    padding: 0 20px;
  }
  padding-bottom: 50px;
`
const SellingContainer = styled(DivAll)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
`
const SellingItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 100px 5px 100px;
  border-bottom: 1px solid ${COLOR.white2};

  @media screen and (max-width: 768px) {
   width:100%;
   padding:0px 20px;
    flex-direction: column;
    align-items: unset;
  }
  // background-color: rgb(28, 31, 37)
`
const SellingPriceContainer = styled(SellingItemContainer)`
  padding: 20px 100px;
  border-bottom: none;
  align-items: baseline;
  .title{
    width: calc(50% - 50px);
    
  }
  .ant-form-item{
    margin-bottom: 15px;
  }
  @media screen and (max-width: 768px) {  
      padding: 20px;
    }
`

// commission
const CommissionFeeContainer = styled(SellingItemContainer)`
  align-items: center;
  border-top: 1px solid ${COLOR.white2};

  border-bottom: 1px solid ${COLOR.white2};
  padding: 20px 100px;
  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`
const CommissionFeeMobile = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const TokenCommission = styled.div`
  width: calc(50% + 50px);
  @media screen and (max-width: 768px) {
    width: fit-content;
  }
`

const TokenPaymentMethod = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex: 1;
  }
  .symbol {
    font-size: 14px;
    line-height: 19px;
  }
  .price-text {
    opacity: 0.5;
    font-size: 13px;
    line-height: 150%;
    color: #ffffff;
  }
`
//
const YourNetRevenueContainer = styled(SellingItemContainer)`
  border-bottom: none;
  padding: 20px 100px;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: row !important;
    padding: 20px;
  }
  .title {
    width: calc(50% - 65px);
    @media screen and (max-width: 768px) {
      flex:1;
    }
  }
`
//
const PaymentMethodContainer = styled(SellingItemContainer)`
   padding :20px 100px;
   align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: row !important;
   padding :20px;

  }
  .title {
     width: calc(50% - 65px);
    @media screen and (max-width: 768px) {  
      width: fit-content;
    }
  }
`
const TokenRevenue = styled.div`
  width: calc(50% + 50px);
  @media screen and (max-width: 768px) {
    width: fit-content;
  }
`

const TokenWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  .price-token {
    font-size: 13px;
    color: ${props => props.color ? props.color : 'white'};
    opacity: ${props => props.opacity ? props.opacity : '0.5'};
    font-weight: 600;
    font-size: 13px;
  }
`
//
const TitleWrapper = styled.div`
  width: calc(50% - 63px);
  @media screen and (max-width: 768px) {
    width: fit-content;
  }
  margin-right: 10px;
  .title {
    width: 100%;
  }
`
const SubTitle = styled.div`
  font-size: 13px;
  text-align: justify;
  opacity: 0.6;
`
// common
const TopActionContainer = styled.div`
  height: 50px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 50px 0;
  align-items: baseline;
`
const HowtoUse = styled.div`
  padding: 12px 0;
  background: #000a1d;
  display: flex;
  align-items: center;
  color: white;
  justify-content: center;
  span{
    margin-left: 5px;
    padding: 2px 0;
  }
`
const BackButton = styled.div`
  width: 10px;
  height: 9px;
  background: url("/static/Assets/Image/Icon/back2.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 2px;
`
const BackContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 30%;
`
const InfoIcon = styled.span`
  cursor: pointer;
  width: 20px;
  height: 20px;
  background-image: url("/static/Assets/Image/Icon/info.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
const TextBack = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  margin-left: 7px;
`
const TitleMain = styled.div`
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
const TitleSellingItem = styled.div`
  margin: 0;
  text-align: left;
  width: calc(50% - 63px);
  margin-right: 10px;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  line-height: 150%;
  color: #ffffff;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`
const SpinContainer = styled.div`
  display: flex;
  justify-content: center;
`
const ImageSell = styled.img`
  width: 180px;
  max-height: 200px;
  @media screen and (max-width: 768px) {
    margin-left: unset;
  }
`
const InputWrapper = styled.div`
  width: calc(50% + 60px);
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }

  .input {
    max-width: 340px;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-radius: 10px !important;
    @media screen and (max-width: 768px) {
      max-width: none;
    }
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
    .ant-input {
      background: #192234;
      // padding-left: 10px;
      padding-top: 5px;
      font-size: 15px;
      color: #ffffff;
    }
    .ant-input:focus {
      box-shadow: none;
    }
    textarea {
      resize: none;
    }
  }
`
const CommentContainer = styled(DivAll)`
  display: flex;
  padding: 25px 100px;
  @media screen and (max-width: 768px) {
    padding: 30px 20px 13px 20px;
    flex-direction: column;
  }
`
const InputComment = styled.div`
  width: calc(50% + 60px);
  @media screen and (max-width: 768px) {
    width: unset;
    padding-top: 12px;
  }
  .input {
    max-width: 340px;
    border-radius: 10px !important;
    @media screen and (max-width: 768px) {
      max-width: none;
    }
  }
  .count {
    width: 340px;
    text-align: right;
    color: #ffffff;
    font-size: 13px;
    line-height: 150%;
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
    .ant-input {
      background: #192234;
      height: 120px;
      padding-left: 10px;
      padding-top: 5px;
      max-height: 120px;
      font-size: 15px;
      line-height: 150%;
      color: #ffffff;
    }
    .ant-input:focus {
      box-shadow: none;
    }
    textarea {
      resize: none;
    }
  }
`
const OldPriceContainer = styled(SellingItemContainer)`
   border-radius: 10px !important;
   padding: 20px 100px;
   border-radius: 10px;
border: 1px solid rgba(255, 255, 255,0.6);
align-items: center;
   @media screen and (max-width: 768px) {
    padding:  20px;
    flex-direction: row !important;
    justify-content: space-between;
  }
`
const ButtonContainer = styled.div`
  text-align: right;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding:10px 0px;
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
const ButtonCancel = styled(MyButton)`

`
const ButtonSell = styled(MyButton)`
 
`
const InputCustom = styled(Input)`
`
const FormCustom = styled(Form)`
  .ant-input {
   border:1px solid ${COLOR.white2}
  }
  
`

export {
  SellingContainer,
  SpinContainer,
  TitleMain,
  TextBack,
  InfoIcon,
  BackContainer,
  BackButton,
  HowtoUse,
  TopActionContainer,
  SubTitle,
  TitleWrapper,
  ImageSell,
  InputWrapper,
  TitleSellingItem,
  CommentContainer,
  InputComment,
  ButtonContainer,
  ButtonCancel,
  ButtonSell,
  SellingPriceContainer,
  CommissionFeeContainer,
  YourNetRevenueContainer,
  TokenCommission,
  CommissionFeeMobile,
  TokenRevenue,
  TokenWrapper,
  PaymentMethodContainer,
  TokenPaymentMethod,
  StyledSellNFT,
  OldPriceContainer,
  ContainerStyled,
  FormContainer,
  InputCustom,
  FormCustom
}

export default () => {}
