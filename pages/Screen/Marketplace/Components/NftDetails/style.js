import styled from 'styled-components'
import { TitleText, MediumText } from 'pages/Components/TextSize'
import { DivAll, DivBorder } from 'pages/Components/DivBasic'
export const MainContainer = styled.div`
 width: 100%;
  display: flex;
  flex-flow: row wrap;
  max-width: 1550px;
  margin:0 auto;
  color: white;
   @media screen and (max-width: 1700px) {
    max-width: 1350px;

    padding: 0 50px;
   }
   @media screen and (max-width: 768px) {
    padding: 0 20px;
   }
`

export const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin: auto auto;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column wrap;
  }
   gap:26px;;
`

export const LeftDetailsContainer = styled.div`
  width: 38%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom:0px;
  }

`

export const RightDetailsContainer = styled.div`
  width: ${(props) => props.isSapphire ? '100%' : 'calc(62% - 26px)'};
  display: flex;
  flex-flow: column;
  @media (max-width: 768px) {
    width: 100%;
  }
  gap:20px;;
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
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const NftName = styled(TitleText)`
  width: 100%;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 16px;
  display: inline-flex;
  align-items: baseline;
  gap: 16px;
`

export const NftId = styled.div`
  width: 100%;
  font-weight: bold;
`

export const BuyButton = styled.button`
  width: 100%;
  border: none;
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

export const PriceContainer = styled(DivAll)`
display: flex;
flex-flow: row wrap;
@media (max-width: 768px) {
  flex-flow: column wrap;
}
padding:26px;
gap:20px;
@media screen and (max-width: 768px) {
  padding: 16px;
}
`

export const Owner = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
`

export const OwnerTitle = styled.div`
  font-weight: bold;
  text-transform: capitalize;
`
export const OwnerName = styled.div`
  font-weight: bold;
  color: #c4a5f8;
  margin-left: 10px;
  &.link {
    cursor: pointer;
    &:hover {
      color: #1877F2;
    }
  }
`

export const CustomTooltip = styled(DivBorder)`
  background-color: #fff;
  padding: 10px;
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
export const RightPriceContainer = styled.div`
  width: 100px;
  display: flex;
  flex-flow: row wrap;
  margin-left:12px;
  align-content: center;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 40px;
  }
`
export const LeftPriceContainer = styled.div`
  color: rgba(255, 255, 255, 1);
  font-weight: bold;
  font-size: 30px;
  letter-spacing: 1px;
      width: 30%;
    min-width: 250px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
    font-size: 25px;
  }
`
export const TokenOption = styled.div`
  width: 40px;
  height: 40px;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: baseline;
  justify-content: center;
  cursor: pointer;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  box-sizing: border-box;
  font-size: 13px;
  &:nth-child(1) {
    border-radius: 5px 0px 0px 5px;
  }
  &:last-child {
    border-radius: ${(props) => (props.oneToken ? '5px' : '0px 5px 5px 0px')};
  }
  &:hover {
    border: 1px solid white;
  }
  &.selected {
    background: white;
    color: black;
    animation: fill 0.25s ease;
    @keyframes fill {
      from {
        color: white;
        background: transparent;
      }
      to {
        color: black;
        background: white;
      }
    }
  }
`
export const ButtonOptions = styled.div`
width:100%;
  display: flex;
  flex-direction: row;

  gap:20px;;
  @media screen and (max-width: 950px) {
    flex-direction: column;
    gap: 16px;
  }
`
export const ContentInGame = styled.div`
color: red;
`
export const PriceTitle = styled(MediumText)`
  transform:uppercase;

`

export const Title = styled(MediumText)`
`

export const StatContainer = styled(DivAll)`
display: flex;
padding:26px ;
flex-flow: column wrap;
height:100%;
`

export const RowAttribute = styled.div`
   flex:1;
   height:fit-content;
`

export const ChartContainer = styled(DivAll)`
width: 100%;
border-radius: 16px;
padding:26px;
border:unset;
`
export const MoreCollection = styled(DivAll)`
width: 100%;
padding:26px;
`
export const IDNft = styled(MediumText)`
color:#c4a5f8;
padding-top:16px;
`
export const AvartarSeller = styled.img`
margin-left:12px;
width:20px;
height:20px;
`
export const OrderIDNft = styled.div`
display: flex;
margin-top:12px;
`
export const TitleOrderIDNft = styled.div``
export const ContentOrderIDNft = styled.div`
margin-left:12px;
color:#c4a5f8;

`
export default () => {}
