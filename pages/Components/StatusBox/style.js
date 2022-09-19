import styled from 'styled-components'

export const DiscountBox = styled.div`
  position: absolute;
  left: ${props => props.left}px;
  top: 15px;
  z-index: 10;
`
export const DiscountBoxTop = styled.div`
  width: 100%;
  height: 40px;
  background-color: rgb(255, 82, 0);
  margin-bottom: 0px !important;
  color: #FFF;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  @media screen and (max-width: 768px) {
    font-size: 3vw;
  }
`
export const DiscountBoxBottom = styled.div`
  position: absolute;
  width: 0px;
  height: 0px;
  border-top: 20px solid #632815;;
  border-left: 20px solid transparent;
`
export default () => {}
