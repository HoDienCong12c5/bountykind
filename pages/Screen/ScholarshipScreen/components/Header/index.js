import React from 'react'
import styled from 'styled-components'
import { TitleText } from 'pages/Components/TextSize'
const Title = styled(TitleText)`
padding:26px;
@media screen and (max-width: 768px) {
padding-top:0px;
}
`
const Container = styled.div`
text-align: center;
`
const Header = () => {
  return (
    <Container>
      <Title>SCHOLARSHIP OFFER</Title>
    </Container>

  )
}

export default Header
