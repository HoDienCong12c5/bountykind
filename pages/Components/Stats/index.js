import React from 'react'
import styled from 'styled-components'
import { TitleText, MediumText, NormalText } from 'pages/Components/TextSize'
import { images } from 'config/images'
import { useSelector } from 'react-redux'
import { DivAll } from '../DivBasic'
import Media from 'react-media'

const StatContainer = styled(DivAll)`
  display: flex;
  border-radius: 16px;
  flex-flow: column wrap;
  display: flex;
  gap: 16px;
  -moz-user-select: none !important;
  -webkit-touch-callout: none !important;
  -webkit-user-select: none !important;
  -khtml-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
`
const Title = styled(MediumText)`
`
const RowAttribute = styled.div`
   flex:1;
   height:fit-content;
   display: flex;
   gap: 16px;
   flex-flow:column wrap;
   @media screen and (max-width: 768px){
    flex-flow:row wrap;
    justify-content: flex-start;
   }
`
const IconAttribute = styled.img`
height: 25px;
width: 25px;
margin-right:8px;
`
const itemAttribute = (icon, text, value) => (
  <NormalText style={{ minWidth: 100, flex: 1 }}>
    <IconAttribute draggable={false} src={icon} />
    {text} :{value}
  </NormalText>
)
const Stats = ({ data }) => {
  const { messages } = useSelector(state => state.locale)
  console.log({ data })
  let dataStats = {
    hp: 0, attack: 0, critical: 0, defend: 0, speed: 0, luck: 0
  }
  if (data?.attributes?.type === 'character') {
    dataStats = {
      hp: data.baseHp,
      attack: data.baseAtk,
      critical: data.baseCritical,
      defend: data.baseDef,
      speed: data.baseSpeed,
      luck: data.baseLuck
    }
  } else if (data?.attributes?.type === 'item') {
    dataStats = {
      hp: data.hp,
      attack: data.atk,
      critical: data.critical,
      defend: data.def,
      speed: data.speed,
      luck: data.luck
    }
  }
  const renderMobile = () => {
    return (
      <StatContainer className='padding'>
        <Title textTransform>{messages.baseStats.title}</Title>
        <RowAttribute>
          {itemAttribute(
            images.iconTypeGame.iconHP,
            messages.baseStats.hp,
            dataStats.hp
          )}
          {itemAttribute(
            images.iconTypeGame.iconAttack,
            messages.baseStats.attack,
            dataStats.attack
          )}
        </RowAttribute>
        <RowAttribute>
          {itemAttribute(
            images.iconTypeGame.iconDefend,
            messages.baseStats.defend,
            dataStats.defend
          )}
          {itemAttribute(
            images.iconTypeGame.iconSpeed,
            messages.baseStats.speed,
            dataStats.speed
          )}
        </RowAttribute>
        <RowAttribute>
          {itemAttribute(
            images.iconTypeGame.iconCritical,
            messages.baseStats.critical,
            dataStats.critical + '%'
          )}
          {itemAttribute(
            images.iconTypeGame.iconLuck,
            messages.baseStats.luck,
            dataStats.luck
          )}
        </RowAttribute>

      </StatContainer>
    )
  }
  const renderDesktop = () => {
    return (
      <StatContainer className='padding'>
        <Title textTransform>{messages.baseStats.title}</Title>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <RowAttribute>
            {itemAttribute(
              images.iconTypeGame.iconHP,
              messages.baseStats.hp,
              dataStats.hp
            )}
            {itemAttribute(
              images.iconTypeGame.iconAttack,
              messages.baseStats.attack,
              dataStats.attack
            )}
          </RowAttribute>
          <RowAttribute>
            {itemAttribute(
              images.iconTypeGame.iconDefend,
              messages.baseStats.defend,
              dataStats.defend
            )}
            {itemAttribute(
              images.iconTypeGame.iconSpeed,
              messages.baseStats.speed,
              dataStats.speed
            )}
          </RowAttribute>
          <RowAttribute>
            {itemAttribute(
              images.iconTypeGame.iconCritical,
              messages.baseStats.critical,
              dataStats.critical + '%'
            )}
            {itemAttribute(
              images.iconTypeGame.iconLuck,
              messages.baseStats.luck,
              dataStats.luck
            )}
          </RowAttribute>
        </div>
      </StatContainer>
    )
  }
  return (
    <Media query='(min-width: 568px)'>
      {(match) => {
        if (match) {
          return renderDesktop()
        }
        return renderMobile()
      }}

    </Media>

  )
}

export default Stats
