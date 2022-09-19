import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
import { Input } from 'antd'
export const Container = styled.div`

width: 100%;
align-items: center;
height: 100%;
`
export const Title = styled.div`
margin-top: 20px;
margin-bottom: 20px;
font-size: 24px;
font-weight: bold;
color: black;

`
export const Description = styled.div`
font-size: 16px;
color: #4F4F4F;
margin-bottom: 20px;
`
export const InputCustoms = styled(Input)`
    font-size: 16px;
    color: black;
    border-radius: 8px;
    border: 0px;
    border-bottom: 1px solid #4F4F4F;
    .ant-input-affix-wrapper > input.ant-input {
        padding: 0;
        border: none;
        outline: none;
        color: black;
    }
    .ant-input-suffix{
        color:black
    }
`

export const Button = styled(MyButton)`
background:${props => props.color}; 
color : black;
margin-top: 30px;
width:100%
`

export default () => {}
