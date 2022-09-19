import styled from 'styled-components'
import { Carousel } from 'antd'

export const Header = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 80px;
  justify-content: space-between;
  align-items: center;
`

export const HeaderMobile = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  left: 0px;
  height: 80px;
  background: white;  
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`

export const Left = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #000a1d;
  font-weight: 600;
  padding-top: 3px;
  box-sizing: border-box;
  img {
    margin-right: 5px;
  }
`
export const Right = styled.div``
export const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 70%;
  margin-top: 23px;
  margin-left: 15%;
  min-height: calc(100vh - 50px);
  .ant-carousel {
    width: 100%;
  }
  @media screen and (max-width: 950px) {
    width: 90%;
    margin-left: 5%;
  }
`
export const ContainerMobile = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  margin-top: 0px;
  background: white;
  padding: 10px 20px 20px 20px;
  min-height: calc(100vh - 60px);
`
export const Detail = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  background: white;
  padding: 50px 0px 50px 0px;
`
export const DetailMobile = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  background: white;
  padding: 20px 0px 10px 0px;
  @media screen and (max-width: 768px) {
    padding: 10px 0px 10px 0px;
  }
`
export const DetailLeft = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  img {
    width: 50%;
  }
`
export const DetailLeftMobile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  img {
    width: 70%;
  }
`
export const DetailRight = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 50%;
  justify-content: center;
`
export const DetailRightMobile = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  align-items: center;
`
export const NFTName = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: #333333;
  font-weight: 700;
  font-size: 36px;
  font-family: Abhaya Libre;
`
export const NFTNameMobile = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333333;
  font-weight: 700;
  font-size: 24px;
  font-family: Abhaya Libre;
`
export const NFTID = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: rgba(0, 10, 29, 0.5);
  font-weight: normal;
  font-size: 15px;
  margin-bottom: 20px;
`
export const NFTIDMobile = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 10, 29, 0.5);
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 20px;
`
export const NFTPrice = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  flex-flow: row wrap;
  height: 40px;
  img {
    width: 40px;
    height: 40px;
  }
  & > .big-price {
    box-sizing: border-box;
    color: #000A1D;
    font-weight: bold;
    font-size: 36px;
    top: 0px;
    height: 100%;
    display: flex;
    align-items: flex-end;
    padding-top: 50px;
    padding-left: 10px;
    padding-right: 10px;
  }
  & > .small-price {
    font-weight: 400;
    font-size: 15px;
    color: #000a1d;
    top: 0px;
    height: 100%;
    display: flex;
    align-items: flex-end;
    opacity: 0.5;
  }
`
export const NFTPriceMobile = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Term = styled.div`
  width: 100%;
  color: #80848E;
  font-weight: 400;
  font-size: 15px;
  padding: 20px 0px 20px 0px;
  & > .red-text {
    color: #f6541d;
    cursor: pointer;
  }
`
export const TermMobile = styled.div`
  width: 100%;
  color: #80848E;
  font-weight: 400;
  font-size: 15px;
  padding: 25px 0px 20px 0px;
  text-align: center;
  & > .red-text {
    color: #f6541d;
    cursor: pointer;
  }
`
export const SellerDetail = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 40px;
`
export const SellerDetailMobile = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 15px;
`
export const SellerDetailLeft = styled.div`
  width: 49.5%;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  gap: 20px;
  & > .top {
    width: 100%;
    background: #000a1d;
    display: flex;
    flex-flow: row;
    padding: 10px 0px 10px 0px;
    & > .left {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 10px 10px 10px;
      & > .avatar {
        width: 60px;
        height: 60px;
        min-width: 40px;
        min-height: 40px;
      }
    }
    & > .right {
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      & > .title {
        color: rgba(255, 255, 255, 0.6);
        font-weight: 600;
        text-transform: uppercase;
        font-size: 14px;
        padding-bottom: 5px;
      }
      & > .value {
        color: #f6541d;
        font-size: 15px;
        font-weight: 500;
        word-break: break-all;
      }
    }
  }
  & > .bottom {
    width: 100%;
    background: #000a1d;
    display: flex;
    flex-flow: row wrap;
    & > .left {
      width: 50%;
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      padding: 20px;
      & > .title {
        color: rgba(255, 255, 255, 0.6);
        font-weight: 600;
        font-size: 14px;
        text-transform: uppercase;
      }
      & > .value {
        color: #fff;
        font-size: 15px;
        font-weight: 500;
        word-break: break-all;
      }
    }
    & > .right {
      width: 50%;
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      padding: 20px;
      & > .title {
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.6);
        font-weight: 600;
        font-size: 14px;
      }
      & > .value {
        color: #fff;
        font-size: 15px;
        font-weight: 500;
        word-break: break-all;
      }
    }
  }
`
export const SellerDetailLeftMobile = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  gap: 15px;
  & > .top {
    width: 100%;
    background: #000a1d;
    display: flex;
    flex-flow: row;
    padding: 10px 10px;
    & > .left {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 10px 10px 10px;
      & > .avatar {
        width: 60px;
        height: 60px;
        min-width: 40px;
        min-height: 40px;
      }
    }
    & > .right {
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      & > .title {
        color: rgba(255, 255, 255, 0.6);
        font-weight: 600;
        text-transform: uppercase;
        font-size: 14px;
        padding-bottom: 5px;
      }
      & > .value {
        color: #f6541d;
        font-size: 15px;
        font-weight: 500;
        word-break: break-all;
        padding-right: 10px;
        box-sizing: border-box;
      }
    }
  }
  & > .bottom {
    width: 100%;
    background: #000a1d;
    display: flex;
    flex-flow: row wrap;
    & > .left {
      width: 50%;
      display: flex;
      flex-flow: column wrap;
      justify-content: flex-start;
      padding: 20px;
      & > .title {
        color: rgba(255, 255, 255, 0.6);
        font-weight: 600;
        font-size: 14px;

        text-transform: uppercase;
      }
      & > .value {
        color: #fff;
        font-size: 15px;
        font-weight: 500;
        word-break: break-all;
      }
    }
    & > .right {
      width: 50%;
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      padding: 20px;
      & > .title {
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.6);
        font-weight: 600;

        font-size: 14px;
      }
      & > .value {
        color: #fff;
        font-size: 15px;

        font-weight: 500;
        word-break: break-all;
      }
    }
  }
`
export const SellerDetailRight = styled.div`
  width: 49.5%;
  display: flex;
  flex-flow: column wrap;
  background: #000a1d;
  padding: 20px;
  & > .title {
    color: rgba(255, 255, 255, 0.7);
    padding-bottom: 10px;
    font-weight: bold;
  }
  & > .value {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    word-break: break-all;
  }
`
export const SellerDetailRightMobile = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  background: #000a1d;
  padding: 20px;
  & > .title {
    color: rgba(255, 255, 255, 0.7);
    padding-bottom: 10px;
    font-weight: 600;
  }
  & > .value {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    word-break: break-all;
  }
`
export const TokenSymbol = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  padding-bottom: 10px;
  p {
    margin-top: 0px;
    margin-bottom: 0ch;
    font-size: 13px;
    padding-top: 2px;
    margin-right: 5px;
    color: rgba(0, 10, 29, 0.5);
    font-weight: 600;
  }
  img {
    width: 18px;
    height: 18px;
    margin-top: 2px;
  }
`
export const ChartContainer = styled.div`
  width: 100%;
  display: column wrap;
  margin-bottom: 20px;
  & > .title {
    color: #000a1d;
    font-size: 25px;
    font-weight: 700;
    font-family: Abhaya Libre;
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
export const Stats = styled.div`
  width: 100%;
  background-color: #000a1d;
  padding: 10px 20px 10px 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 20px;
`
export const Stat = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  padding: 10px;
  @media screen and (max-width: 768px) {
    width: 50%;
    &:nth-child(1),
    &:nth-child(2) {
      margin-bottom: 20px;
    }
  }
`
export const StatTitle = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 10px;
  text-transform: uppercase;
  font-weight: 600;
`
export const StatValue = styled.div`
  display: flex;
  flex-flow: row wrap;
  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  p {
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: bold;
    font-size: 15px;
    color: #fff;
  }
`
export const ActionList = styled.ul`
  width: 200px;
  border-radius: 15px;
`
export const ActionItem = styled.li`
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  color: rgba(255,255,255,0.5);
  overflow: hidden;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 20px;
  .icon {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;  
    margin-top: 1px;
  }
  .title {
    margin-left: 12px;
    width: 80%;
    height: 50px;
    display: flex;
    align-items: center;
  }
  &:hover {
    color: #1877F2;
  }
`
export const Title = styled.div`
  width: 100%;
  color: #000a1d;
  font-size: 36px;
  font-weight: 700;
  padding: 10px 0px 10px 0px;
  text-transform: uppercase;
  font-family: Abhaya Libre;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  @media screen and (max-width: 768px){
    font-size: 24px;
  }
`
export const ViewAllButton = styled.button`
  border: none;
  outline: none;
  padding: 0px;
  background: transparent;
  font-weight: 400;
  font-size: 15px;
  color: #f6541d;
  cursor: pointer;
  font-family: 'Open Sans';
`
export const Related = styled(Carousel)`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 20px;
  .slick-slide {
    margin-right: 25px;
    width: 200px;
    height: 350px;
  }
  .slick-track {
    margin-left: ${props => props.styleSlickTrack ? '20px' : '0px'};
  }
`
export const InsufficientBalance = styled.div`
    margin-top: 10px !important;
    margin: 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: #eb5757 !important;
`
export default () => {}
