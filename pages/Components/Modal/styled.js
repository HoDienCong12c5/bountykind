import styled from 'styled-components'
import MyButton from '../MyButton'
import { TitleText } from '../TextSize'
const TextTitleModal = styled(TitleText)`
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  line-height: 42px;
  @media screen and (max-width: 768px) {
    font-size: 24px;
    line-height: 30px;
  }
`
const TextHelpModal = styled.div`
  margin-top: 10px;
  color: ${props => props.color ? props.color : '#000A1D'};
  padding: 0 50px;
  font-size: 15px;
  word-break: break-word;
  @media screen and (max-width: 768px) {
    padding: 0 15px;
    margin-top: unset;
  }
`
const ContentModal = styled.div`
  width: 190px;
  position: relative;
  @-webkit-keyframes loading {
    from {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -o-transform: rotate(360deg);
    }
  }
  @keyframes loading {
    from {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -o-transform: rotate(360deg);
    }
  }
`
const ImageContentModal = styled.img`
  max-width: 190px;
`
const LoadingWrapper = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  bottom: -15px;
  right:${props => props.modalData ? '-15px' : '80px'};
  background: url("/static/Assets/Image/Icon/loading2.svg");
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  animation: loading 1.5s linear 0s infinite;
  -webkit-animation: loading 1.5s linear 0s infinite;
  -moz-animation: loading 1.5s linear 0s infinite;
  -o-animation: loading 1.5s linear 0s infinite;
`
const StartedWrapper = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  bottom: -15px;
  right: -15px;
  background: url("/static/Assets/Image/Icon/started.svg");
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
`
const LottieContainer = styled.div`
  position: absolute;
  bottom: -15px;
  right: -15px;
`
const SuccessfullyWrapper = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  bottom: -15px;
  right: -15px;
  background: url("/static/Assets/Image/Icon/sell-successfully.svg");
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
`
const StyledModal = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px){
    padding-top: 10px;
  }
`
const MessageLoading = styled.div`
  margin: 0;
  font-weight: 400;
  font-size: 15px;
  line-height: 150%;
  color: #828282;
`
const ButtonConfirmModal = styled(MyButton)`
  width: 100%;
`
const ButtonCancelModal = styled(MyButton)`
  height: 50px;
  width: 50%;
  font-weight: bold;
  background: #000a1d !important;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  :hover {
    background: #000a1d !important;
    box-shadow: rgb(11, 23, 27) 0px 0px 60px 6px !important;
    border: none;
  }
  :focus {
    background: #000a1d !important;
    box-shadow: rgb(11, 23, 27) 0px 0px 60px 6px !important;
    border: none;
  }
  @media screen and (max-width: 768px) {
    min-width: unset;
  }
`
const ButtonConfirmBuy = styled(MyButton)`
  text-align: uppercase;
  height: 50px;
  width: 50%;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  @media screen and (max-width: 768px) {
    min-width: unset;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  max-width: 335px;
  width: 100%;
  justify-content: center;
  margin-top: 30px;
`
const WrapperToken = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .price-token {
    font-weight: bold;
    font-size: 36px;
    line-height: 110%;
    text-align: center;
    color: #333333;
  }
  .price-usd {
    font-size: 15px;
    line-height: 150%;
    text-align: center;
    color: #000a1d;
    opacity: 0.5;
    padding-top: 10px;
  }
`
const InsufficientBalance = styled.div`
    margin-top: 10px !important;
    margin: 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: #eb5757 !important;
`
const LoadingApproveWrapper = styled(LoadingWrapper)`
    bottom: ${props => props.isNFT ? '-15px' : '5px'};
    right: ${props => props.isNFT ? '-15px' : '20px'};
`
const ImageApproveModal = styled(ImageContentModal)`
`

const BuyMoreButton = styled(MyButton)`
  margin-top: 40px;
  height: 50px;
  padding: 20px 68px;
  font-size: 12px;
`
export {
  ButtonConfirmBuy,
  ButtonConfirmModal,
  ButtonContainer,
  ButtonCancelModal,
  MessageLoading,
  StyledModal,
  StartedWrapper,
  LoadingWrapper,
  SuccessfullyWrapper,
  ImageContentModal,
  ContentModal,
  TextTitleModal,
  TextHelpModal,
  WrapperToken,
  InsufficientBalance,
  LoadingApproveWrapper,
  ImageApproveModal,
  BuyMoreButton,
  LottieContainer
}

export default () => { }
