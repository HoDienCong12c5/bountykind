import styled from 'styled-components'
import { TitleText } from 'pages/Components/TextSize'

import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import MyButton from 'pages/Components/MyButton'
export const MainContainer = styled.div`
 width: 100%;
  display: flex;
  flex-flow: column wrap;

  max-width:1550px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 1);
  padding-bottom: 50px;
  color: white;
  gap:20px;;

   @media screen and (max-width: 1700px) {
    max-width: 1350px;
   
    width: 100%;
    padding:0 50px;
   }
    @media screen and (max-width: 768px) {
    max-width: none;
    width: 100%;
    padding:0 20px;
    display: flex;
   }
`

export const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin: 0px auto;
  gap:20px;;
  @media (max-width: 768px) {
    width: 90%;
    flex-flow: column wrap;
  }
`

export const LeftDetailsContainer = styled.div`
  width: 38%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  border-radius: 16px;
  @media (max-width: 768px) {
    width: 100%;
  }

`

export const RightDetailsContainer = styled.div`
  width:calc(62% - 26px);
  display: flex;
  flex-flow: column;
  border-radius: 10px;
  height: auto;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 50px;
  }
  gap:20px;;
`

export const BackContainer = styled.div`
  margin-top: 60px;
  padding-bottom: 26 px;
  display: flex;
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
    width: 90%;
  }
`

export const NftName = styled(TitleText)`
  width: 100%;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 16px;
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
export const ButtonEx = styled.button`
  width: 100%;
  min-width: 100px;
  border: none;
  margin-top: 10px;
  margin-right: 10px;
  outline: none;
  background: #1877F2;
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
  border: 1px solid #1877F2;
  .text {
    color: #1877F2;
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

export const BigTitle = styled.div`
  width: 100%;
  height: 60px;
  background: #1c1f25;
  margin-top: 50px;
  margin-bottom: 50px;
  color: white;
  font-weight: bold;
  font-size: 26px;
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
    flex-wrap: wrap;
    @media screen and (max-width: 1170px) {
      display: grid;
    }
`
export const PropsDetails = styled.div`
  font-size: 14px;
  color: #D0CCCD;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  .animation{
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
      color: #F5B6D0;
    }
    100% {
      color: #F771A8;
    }

  }
  @-moz-keyframes flicker {
    0% {
      color: #fff;
    }
    50% {
      color: #F5B6D0;
    }
    100% {
      color: #F771A8;
    }
  }
  @ -webkit-keyframes flicker {
    0% {
      color: #fff;
    }
    50% {
      color: #F5B6D0;
    }
    100% {
      color: #F771A8;
    }
  }

`
export const Line = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: ${(props) => props.marginBottom || '0px'};
`
export const BigTitleHistory = styled.div`
  width: 100%;
  height: 60px;
  background: #1c1f25;
  margin-top: 50px;
  color: white;
  font-weight: bold;
  font-size: 26px;
  display: flex;
  height: 80px;
  align-items: center;
  padding-left: 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`
export const TitleInformation = styled.div`
  color: #f6f2f2;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`

export default () => { }
