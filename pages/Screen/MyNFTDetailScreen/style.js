import styled from 'styled-components'
import { TitleText, MediumText, NormalText } from 'pages/Components/TextSize'
import { COLOR } from 'common/constants'
import Title from 'react-vanilla-tilt'
export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;

  max-width: 1550px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 1);
  padding-bottom: 50px;
  color: white;
  @media screen and (max-width: 1700px) {
    max-width: 1350px;

    width: 100%;
    padding: 0 50px;
  }
  @media screen and (max-width: 768px) {
    max-width: none;
    width: 100%;
    padding: 0 20px;
    display: flex;
  }
`

export const DetailsContainer = styled.div`
  --color: ${COLOR.white2}; /* color */
  width: 100%;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  border: ${(props) => (props.border ? '1px solid var(--color)' : 'none')};
  border-radius: 16px;
  margin-top: ${(props) => (props.border ? '26px' : '0px')};
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column wrap;
  }
  gap: 20px;
`

export const LeftDetailsContainer = styled.div`
  width: 38%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
    height: 400px;
  }
`

export const RightDetailsContainer = styled.div`
  width: calc(62% - 26px);
  display: flex;
  flex-flow: column;
  border-radius: 10px;
  height: auto;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0px;
  }
  gap: 20px;
`

export const BackContainer = styled.div`
  width: 100%;
  margin: auto auto;
  padding-top: 60px;
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
`
export const StatusMyNFT = styled.div`
  width: 'max-content';
  text-align: 'center';
  padding: 0px 5px 0px 5px;
  background: #bc4e9c; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    rgba(221, 94, 228, 1),
    rgba(32, 231, 249, 1)
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    rgba(221, 94, 228, 1),
    rgba(32, 231, 249, 1)
  ) !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  filter: brightness(85%);
  padding: 0px 12px;
  height: 30px;
  position: absolute;
  top: -5px;
  z-index: 10;
`

export const NftName = styled(TitleText)`
  width: 100%;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 16px;
  align-items: baseline;
  gap: 16px;
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

export const MyButton = styled.button`
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
export const CustomTooltip = styled.div`
  background-color: #fff;
  padding: 10px;
  border: 1px solid #1877f2;
  .text {
    color: #1877f2;
  }
  .tooltip-price {
    display: flex;
    flex-flow: row wrap;
    img {
      width: 20px;
      height: 20px;
    }
    color: black;
    p {
      height: 20px;
      margin-bottom: 0px;
      margin-top: 0px;
    }
  }
`

export const BigTitle = styled(TitleText)`
  width: 100%;
  height: 60px;
  background: #1c1f25;
  margin-top: 50px;
  margin-bottom: 50px;
  color: white;
  font-weight: bold;
  display: flex;
  height: 80px;
  align-items: center;
  padding-left: 30px;
  border-radius: 10px;
`

export const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  flex-flow: row;
  @media screen and (max-width: 1170px) {
    display: grid;
  }
`
export const PropsDetails = styled.div`
  font-size: 14px;
  color: white;
  opacity: 0.7;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  .animation {
    animation: aniName 10s infinite linear;
    -moz-animation: aniName 10s infinite;
    -webkit-animation: aniName 10s infinite;
    -o-animation: aniName 10s infinite;
  }
  @keyframes flicker {
    0% {
      color: #fff;
    }
    50% {
      color: #f5b6d0;
    }
    100% {
      color: #f771a8;
    }
  }
  @-moz-keyframes flicker {
    0% {
      color: #fff;
    }
    50% {
      color: #f5b6d0;
    }
    100% {
      color: #f771a8;
    }
  }
  @-webkit-keyframes flicker {
    0% {
      color: #fff;
    }
    50% {
      color: #f5b6d0;
    }
    100% {
      color: #f771a8;
    }
  }
`
export const Line = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: ${(props) => props.marginBottom || '0px'};
`
export const BigTitleHistory = styled(TitleText)`
  width: 100%;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-left: 26px;
  padding-top: 26px;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`
export const ContainerButtonWithRawContinue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`
export const NftId = styled(NormalText)`
  width: 100%;
  font-weight: bold;
`
export const ButtonContainer = styled.div`
  flex: 1;
`
export const SubTitleNft = styled.div``
export const ContainerOption = styled.div`
  border-radius: 16px;
  border: 1px solid #ffffff;
  padding: 26px;
`
export const ContainerDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const ContentDetails = styled.div`
  color: #c4a5f8;
`
export const IDNft = styled.span`
  margin-left: 6px;
  font-size: 20px;
  color: #c4a5f8;
`
export const TitleCustom = styled(Title)`
  transform-style: preserve-3d !important;
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  background-color: transparent !important;
  margin: 0 !important;
`
export default () => {}
