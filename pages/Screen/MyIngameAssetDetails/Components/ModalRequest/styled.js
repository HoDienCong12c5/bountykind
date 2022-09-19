import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'

export const Container = styled.div`

width: 100%;
align-items: center;
height: 100%;
`
export const Title = styled.div`
margin-bottom: 20px;
font-size: 24px;
font-weight: bold;
transform: uppercase;

`
export const Description = styled.div`
font-size: 13px;
opacity:0.5
`

export const Button = styled(MyButton)`
background:${props => props.color}; 
color : black;
margin-top: 20px;
width:100%
`

export default () => {}
