import MyButton from 'pages/Components/MyButton'
import styled from 'styled-components'
export const Button = styled(MyButton)`
background:${props => props.color}; 
color : black;
margin-top: 30px;
width:100%
`
export const ButtonClose = styled.div`
position:'absolute';
top:5;
right:5;
`
export default () => {}
