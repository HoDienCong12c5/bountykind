import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'

export const Container = styled.div`

width: 100%;
align-items: center;
height: 100%;
`
export const Title = styled.div`
font-size: 24px;
font-weight: bold;
transform: uppercase;

`
export const Description = styled.div`
font-size: 13px;
opacity:0.5;
margin-top:16px;
`

export const Button = styled(MyButton)`
background:${props => props.color}; 
color : black;
margin-top: 20px;
width:100%;

`
export const ButtonContainer = styled.div`  
display:flex;
gap:20px;;
`
export const ImageContentModal = styled.img`
  max-width: 190px;
  margin:16px 0px;
`

export default () => {}
