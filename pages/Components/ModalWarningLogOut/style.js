import styled from 'styled-components'
import { TitleText, NormalText } from 'pages/Components/TextSize'
import MyButton from 'pages/Components/MyButton'
export const ContainerModalWarningLogOut = styled.div`
    width: 100%;
    justify-content: center;
    align-items: center;
`
export const Title = styled(TitleText)`
    margin-bottom: 10px;
`
export const Description = styled(NormalText)`
    width:90%;
    margin: 0 auto;
`
export const ContainerOptions = styled.div`
    display: flex;
    flex-direction: row wrap;
    align-items: center;
    gap:20px;
    justify-content: center;
    margin-top:30px;
`
export const Button = styled(MyButton)`
    width:150px !important;
`
export const ButtonLogin = styled(MyButton)`
    width:150px !important;
`
export default () => {}
