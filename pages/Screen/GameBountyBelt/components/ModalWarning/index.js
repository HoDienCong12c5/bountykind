import MyButton from 'pages/Components/MyButton'
import { TitleText } from 'pages/Components/TextSize'
import React from 'react'
import styled from 'styled-components'
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
  color:red !important;
`
const ButtonCacel = styled(MyButton)`
  flex: 1;
`
const ButtonAgree = styled(MyButton)`
  flex: 1;
`
const TitleWarning = styled(TitleText)``

const ModalWarning = ({ onResetGame, closeModals }) => {
  return (
    <div>
      <TitleWarning textTransform>Do you want to exit the game?</TitleWarning>
      <ButtonContainer>
        <ButtonCacel type={3} onClick={closeModals}>
          Cancel
        </ButtonCacel>

        <ButtonAgree
          onClick={() => {
            onResetGame()
            closeModals()
          }}
        >
          Exit
        </ButtonAgree>
      </ButtonContainer>
    </div>
  )
}

export default ModalWarning
