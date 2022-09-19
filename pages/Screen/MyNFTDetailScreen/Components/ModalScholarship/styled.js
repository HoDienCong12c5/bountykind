import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
import { Input, Select } from 'antd'
import { TitleText, NormalText } from 'pages/Components/TextSize'
import {
  PercentageOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined
} from '@ant-design/icons'

export const Container = styled.div`
  width: 100%;
  align-items: center;
  height: 100%;
`
export const Title = styled(TitleText)`
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
`
export const Description = styled(NormalText)`
  margin-bottom: 16px;
  opacity:0.5;
`
export const Button = styled(MyButton)`
  background: ${(props) => props.color};
  color: black;
  disabled: ${(props) => props.disabled};
  // margin-top: 30px;
  width: 100%;
`
export const ContainerCheckboxPassword = styled.div`
margin-bottom: 20px;
    text-align: left;
  .ant-checkbox-wrapper{
    color:white !important;
  }
`
export const Checkbox = styled.div`

color: white !important;
    display: flex;
    align-items: center;
`
export const IconCheckbox = styled.div`
  display: flex;
  margin-right: 10px;
  :hover {
    cursor: pointer;
  }
`
export const TitleCheckBox = styled.div`

`
export const TitleInput = styled.div`
color:white;
text-align: left;
margin-bottom: 12px;
`

export default () => { }
