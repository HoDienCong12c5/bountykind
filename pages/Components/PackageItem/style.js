import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons'
import MyButton from 'pages/Components/MyButton'
import { Spin } from 'antd'

export const NFTContainer = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
  height: 100%;
  display:flex;
  flex-flow: column;
  .ant-btn-loading{
    position: absolute !important;
  }
`

export const Top = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  display:flex;
  flex-flow: column;
  position: relative;
  padding-top: 20px;
`
export const PackageName = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 30px;
  color: #fff;
  line-height: 33px;
  padding-left: 27px;
  box-sizing: border-box;
  margin-top: 100px;
  text-transform: uppercase;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  display: -webkit-box;
`
export const AttributeContainer = styled.div`
  width: 100%;
  padding-left: 27px;
  padding-right: 27px;
  box-sizing: border-box;
  flex-grow: 1;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  margin-top: 20px;
`
export const Attribute = styled.div`
  width: 100%;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
`
export const Bottom = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding-top: 25px;
`
export const AmountSelect = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  user-select: none;
`
export const AmountSelectTitle = styled.div`
  width: 100%;
  text-align: center;
  color: #FFFFFF;
  font-weight: 400;
  font-size: 12px;
  opacity: 0.6;
  margin-bottom: 8px;
`
export const InputContainer = styled.div`
  width: 160px;
  height: 40px;
  display: flex;
  flex-flow: row wrap;
`
export const MinusButton = styled.div`
  width: 40px;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`
export const PlusButton = styled.div`
  width: 40px;
  height: 100%;
  background: linear-gradient(90deg, #2C91C0 0%, #5BCBE4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Input = styled.input`
  height: 100%;
  width: 80px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
`
export const Price = styled.span`
  font-weight: 700;
  font-size: 36px;
  color: #F6531E; 
  margin-top: 12px;
`
export const BuyButton = styled(MyButton)`
  position: absolute;
  width: 195px;
  height: 52px;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  bottom: -26px;
`
export const SpinLoading = styled(Spin)``
export const LoadingIcon = styled(LoadingOutlined)`
  font-size: 30px;
  color: #2F80ED;
`
export default () => {}
