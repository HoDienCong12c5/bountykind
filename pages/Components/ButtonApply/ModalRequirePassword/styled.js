import MyButton from 'pages/Components/MyButton'
import { TitleText } from 'pages/Components/TextSize'
import styled from 'styled-components'
export const Button = styled(MyButton)`
background:${props => props.color}; 
color : black;
width:100%;
margin-top:20px;
`
export const TitleModal = styled(TitleText)`
margin-bottom: 20px;
 text-align: 'center';
 font-weight: 700px; 
`
export const DescriptionModal = styled.div`
opacity: 0.5;
`
export default () => {}
