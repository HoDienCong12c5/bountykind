import styled from 'styled-components'
import { TitleText, NormalText, MediumText } from 'pages/Components/TextSize'
import ButtonFilter from 'pages/Components/ButtonFilter'
import { DivAll } from 'pages/Components/DivBasic'
export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  background: rgba(0, 0, 0, 1);
  padding-bottom: 50px;
  min-height: calc(100vh - 50px);
  color:white;
 max-width: 1550px;
  margin: 0 auto;
   @media screen and (max-width: 1700px) {
    max-width: 1350px;

    padding: 0 50px;
   }
   @media (max-width: 768px) {
    width: 100%;
    flex-flow: column wrap;
    padding: 0px 20px;
  }

`

export const DetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin: 0px auto;
  
  
`

export const LeftDetailsContainer = styled.div`
  width:38%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  border-radius: 16px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const RightDetailsContainer = styled.div`
  width: 62%;
  display: flex;
  flex-flow: column wrap;
  padding-left: 26px;
  gap:20px;;
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0px;
  }
`

export const BackContainer = styled.div`
  padding-top:60px;
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
      height: auto;
      margin-right: 10px;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 0px;
    padding-bottom: 20px;
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

export const BuyButton = styled.button`
  width: 100%;
  border: none;
  outline: none;
  background: #1877f2;
  color: white;
  font-weight: bold;
  font-size: 15px;
  border-radius: 6px;
  padding-top: 15px;
  padding-bottom: 15px;
  cursor: pointer;
  transition: opacity 0.25s ease;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    opacity: ${(props) => (props.disabled ? 0.6 : 0.8)};
  }
`

export const PriceContainer = styled(DivAll)`
  border-radius: 16px;
  display: flex;
  flex-flow: row wrap;
  gap:20px;;
  
  @media (max-width: 768px) {
    flex-flow: column wrap;
    gap: 13px;
  }
`

export const LeftPriceContainer = styled(TitleText)`
  color: rgba(255, 255, 255, 1);
  font-weight: bold;
  letter-spacing: 1px;
align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
  display: flex;

`

export const RightPriceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`

export const TokenOption = styled.div`
  width: 40px;
  height:40px;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #ffff;
  box-sizing: border-box;
  font-size: 12px;
  padding:12px;
  &:nth-child(1) {
    border-radius: 5px 0px 0px 5px;
  }
  &:last-child {
    border-radius: 0px 5px 5px 0px;
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

export const Owner = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  padding-bottom: 15px;
  &.last {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
`

export const OwnerTitle = styled.div`
  width: 100%;
  color: rgba(255, 255, 255, 0.6);
  font-weight: bold;
  letter-transform: uppercase;
  font-size: 12px;
  padding-bottom: 2px;
`
export const OwnerName = styled.div`
  font-weight: bold;
  font-size: 13px;
  color: white;
  &.link {
    cursor: pointer;
    &:hover {
      color: #1877f2;
    }
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

export const Quantity = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 130px;
  border-radius: 6px;
  height: 50px;
  img{ 
   filter: brightness(0) invert(1);
   -webkit-filter: brightness(0) invert(1);
}
`

export const QuantityInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  border-radius: 6px;
  background: transparent;
 
  
`

export const AdjustQty = styled.div`
  width: 25px;
  height: 50px;
  display: flex;
  flex-flow: column wrap;
  & > div {
    width: 100%;
    height: 50%;
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px 5px 0px 0px;
    background: white;
    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    img {
      width: 45%;
      height: 45%;
    }
    &.down {
      border-top: 0.5px solid rgba(0, 0, 0, 0.5);
      border-radius: 0px 0px 5px 5px;
      img {
        transform: rotate(180deg);
      }
    }
  }
`
export const PropertyContainer = styled(DivAll)`
  border-radius: 16px;
  display: flex;
  flex-flow: column wrap;
  gap: 13px;
  width: 100%;
  margin-bottom: 20px;
`
export const Title = styled(MediumText)`
margin-bottom: 10px;
`
export const Description = styled(NormalText)`
`
export const Link = styled(NormalText)`
  color: #c4a5f8;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
export const TextWarning = styled(NormalText)`
  color: red;
  text-align: start;
  font-weight: bold;
  
`
export const PriceChange = styled.div`
  width: 30%;
  min-width: 250px;
  @media screen and (max-width: 768px){
    min-width: 200px !important;
  }
`

export default () => {}
