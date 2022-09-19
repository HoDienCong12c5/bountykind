import MyButton from 'pages/Components/MyButton'
import { TitleText } from 'pages/Components/TextSize'
import React, { useState } from 'react'
import styled from 'styled-components'
import Observer from 'common/observer'
import { COLOR, OBSERVER_KEY } from 'common/constants'
import useOnlineStatus from 'hooks/useOnlineStatus'
const TitleAfterGame = styled(TitleText)``
const DescriptionAfterGame = styled.div``
const ButtonContainer = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;
   gap:20px;
   margin-top:20px;
`
const ButtonCacel = styled(MyButton)`
flex:1;`
const ButtonAgree = styled(MyButton)`
flex:1;`
const TxtNotice = styled.div`
margin-top:12px;
  text-align: left;
  color: ${COLOR.white2};
`
const ModalAfterGame = ({
  type,
  title = 'title',
  descriptions = 'descriptions',
  closeModals,
  onExitGame
}) => {
  const online = useOnlineStatus()
  const [isPaying, setPaying] = useState(false)
  const onAgree = () => {
    setPaying(true)
    setTimeout(() => {
      setPaying(false)
      Observer.emit(OBSERVER_KEY.AGREE_TO_PAY_GAME_BOUNTY_BELT)
      closeModals()
    }, 1500)
  }
  return (
    <>
      <TitleAfterGame textTransform>{title}</TitleAfterGame>
      <DescriptionAfterGame>{descriptions}</DescriptionAfterGame>
      <ButtonContainer>
        <ButtonCacel
          type={3}
          onClick={() => {
            onExitGame()
            closeModals()
          }}
        >
          {type === 'win' ? 'Close' : 'Cancel'}
        </ButtonCacel>
        {type === 'lost' && (
          <ButtonAgree
            loading={isPaying}
            disabled={isPaying || !online}
            onClick={onAgree}
          >
            Agree to pay
          </ButtonAgree>
        )}
      </ButtonContainer>
      {!online && <TxtNotice>*Please connect to network</TxtNotice>}
    </>
  )
}

export default ModalAfterGame
