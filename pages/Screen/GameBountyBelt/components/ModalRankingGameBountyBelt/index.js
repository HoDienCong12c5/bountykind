
import { numberWithCommas } from 'common/function'
import GradientText from 'pages/Components/GradientText'
import MyButton from 'pages/Components/MyButton'
import { NormalText, TitleText } from 'pages/Components/TextSize'
import ListRecord from '../ListRecord'
import React, { useState } from 'react'
import styled from 'styled-components'
import { COLOR } from 'common/constants'
const Container = styled.div`
width:100%;
height:auto;
`
const NumberRecord = styled.div`
font-size: 32px;
`
const ContainerButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap:16px;
margin-top:16px;
`
const ButtonPrivate = styled(MyButton)`
flex:1;
`
const ButtonTotal = styled(MyButton)`
flex:1;

`
const TitleRecord = styled(TitleText)`

`
const ContainerList = styled.div`
  margin-top: 20px;
  padding: 16px;
  --color: ${COLOR.white2}; /* color */
  border: 1px solid var(--color);
  border-radius: 13px;
`
const ModalRankingGamebountyBelt = () => {
  const [dataListRecord, setDataListRecord] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  const handleInfiniteOnLoad = () => {
    console.log('InfiniteScroll')

    // setDataListRecord(dataListRecord)
  }
  const onPressPrivate = () => {
    console.log('onPressPrivate')
  }
  const onPressTotal = () => {
    console.log('onPressTotal')
  }

  return (
    <Container>
      <TitleRecord textTransform>
        <GradientText>New Record</GradientText>
      </TitleRecord>
      <NumberRecord>
        <GradientText>{numberWithCommas(2.072)}</GradientText>
      </NumberRecord>
      <ContainerButton>
        <ButtonPrivate onClick={onPressPrivate} type={3}>
          Private
        </ButtonPrivate>
        <ButtonTotal onClick={onPressTotal}>Total</ButtonTotal>
      </ContainerButton>
      <ContainerList>
        <ListRecord
          data={dataListRecord}
          handleInfiniteOnLoad={handleInfiniteOnLoad}
        />
      </ContainerList>
    </Container>
  )
}

export default ModalRankingGamebountyBelt
