import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
import { NormalText, MediumText, TitleText } from 'pages/Components/TextSize'
import Input from 'pages/Components/Input'
import { Form } from 'antd'
export const Container = styled.div`
  width: 100%;
  align-items: center;
  height: 100%;
  color: white;
`
export const Title = styled(TitleText)`
  margin-top: 0px;
  margin-bottom: 12px;
  font-weight: bold;
`
export const Description = styled(NormalText)`
  margin-bottom: 20px;
`
export const InputCustoms = styled(Input)`
  flex: 4;
  font-size: 13px;

  background: transparent;
  border: 1 px solid white;
  border-radius: 8px;
  &.ant-input-affix-wrapper > input.ant-input {
    padding: 0;
    border: none;
    outline: none;
    color: white;
  }
`

export const Button = styled(MyButton)`
  background: ${(props) => props.color};
  width: 100%;
  opacity: ${(props) => (props.enable ? 0.5 : 1)};
`
export const Content = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 5px;
`
export const TitleContent = styled(NormalText)`
  flex: 1;
  margin-bottom: 2px ;
`
export const InputWrapper = styled.div`
  width: 100%;
`
export const FormContainer = styled(Form)`
  .ant-form-item {
    margin-bottom: 12px !important;
  }
`
export const TextDescription = styled.div`
  color: white;
  opacity: 0.6;
  margin-bottom: 12px !important;
`

export default () => {}
