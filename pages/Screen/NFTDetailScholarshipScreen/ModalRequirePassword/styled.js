import MyButton from 'pages/Components/MyButton'
import styled from 'styled-components'
export const Button = styled(MyButton)`
background:${props => props.color}; 
color : black;
width:100%;
margin-top:20px;
`
export default () => {}
