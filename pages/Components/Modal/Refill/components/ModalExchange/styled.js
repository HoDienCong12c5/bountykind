import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
export const Container = styled.div`
    justify-content: center;
    align-items: center;
    
`
export const Title = styled.div`
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 10px;
    text-transform: uppercase;
    
`
export const Description = styled.div`
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: 20px;
`
export const Button = styled(MyButton)`
    width: 100%;
`

export default () => {}
