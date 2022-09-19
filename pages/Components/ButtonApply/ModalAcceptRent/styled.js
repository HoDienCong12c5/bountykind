import MyButton from 'pages/Components/MyButton'
import styled from 'styled-components'
export const Button = styled(MyButton)`
background:${props => props.color}; 
color : black;
width:100%;
margin-top:20px;
`
export const OptionSelectButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top:26px;
  `
export const ButtonCancel = styled(MyButton)`
flex:1;
`
export const ButtonRent = styled(MyButton)`
flex:1;
  
`
export default () => {}
