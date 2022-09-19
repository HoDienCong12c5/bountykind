import styled from 'styled-components'
import { NormalText, MediumText } from 'pages/Components/TextSize'
import React from 'react'
import { images } from 'config/images'
import Media from 'react-media'
import ButtonFilter from 'pages/Components/ButtonFilter'
import { useSelector } from 'react-redux'
const ContainerAttribute = styled.div`
  color: white;
`
const TitleAttribute = styled(MediumText)`
  margin-bottom: 15px;
  text-transform: uppercase;
`
const RowAttribute = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 30px;
  margin-bottom: 15px;
`
const IconAttribute = styled.img`
  height: 25px;
  width: 25px;
  margin-right: 8px;
`
const TypeAttribute = styled.div`
  opacity: ${(props) => props.opacity ?? 0.5};
  display: flex;
  gap: 10px;
  min-width: 120px;
`
const itemBaseStats = (icon, text, value) => (
  <NormalText style={{ minWidth: 100 }}>
    <IconAttribute src={icon} />
    {text} :{value}
  </NormalText>
)
const ItemAttribute = ({ title, icon, opacity, typeElement }) => {
  return (
    <TypeAttribute opacity={opacity}>
      <img
        src={
          typeElement === title
            ? images.icSelectedCharacter
            : images.icSelectCharacter
        }
      />
      <ButtonFilter icon={icon} title={title} disabled noHover />
    </TypeAttribute>
  )
}
const iconElement = [
  {
    icon: images.iconTypeGame.iconAttribute.iconAnima,
    title: 'Anima'
  },
  {
    icon: images.iconTypeGame.iconAttribute.iconAqua,
    title: 'Aqua'
  },
  {
    icon: images.iconTypeGame.iconAttribute.iconEarth,
    title: 'Earth'
  },
  {
    icon: images.iconTypeGame.iconAttribute.iconEleking,
    title: 'Eleking'
  },
  {
    icon: images.iconTypeGame.iconAttribute.iconIgnis,
    title: 'Ignis'
  },
  {
    icon: images.iconTypeGame.iconAttribute.iconPlant,
    title: 'Plant'
  }
]
const AttributeNFT = ({
  titleAttribute,
  titleBaseStats,
  hp,
  attack,
  defend,
  luck,
  speed,
  critical,
  typeElement
}) => {
  const messages = useSelector(state => state.locale.messages)
  const renderDesktop = () => (
    <ContainerAttribute>
      <>
        <TitleAttribute>{titleAttribute}</TitleAttribute>
        <RowAttribute>
          {iconElement.map((item, index) => {
            if (index < 3) {
              return (
                <ItemAttribute
                  key={index}
                  opacity={typeElement === item.title ? 1 : 0.5}
                  icon={item.icon}
                  title={item.title}
                  typeElement={typeElement}
                />
              )
            }
          })}
        </RowAttribute>
        <RowAttribute>
          {iconElement.map((item, index) => {
            if (index > 2) {
              return (
                <ItemAttribute
                  key={index}
                  opacity={typeElement === item.title ? 1 : 0.5}
                  icon={item.icon}
                  title={item.title}
                  typeElement={typeElement}
                />
              )
            }
          })}
        </RowAttribute>
      </>

      <>
        <TitleAttribute>{titleBaseStats}</TitleAttribute>
        <RowAttribute>
          {itemBaseStats(images.iconTypeGame.iconHP, messages.baseStats.hp, hp)}
          {itemBaseStats(images.iconTypeGame.iconAttack, messages.baseStats.attack, attack)}
          {itemBaseStats(images.iconTypeGame.iconDefend, messages.baseStats.defend, defend)}
        </RowAttribute>
        <RowAttribute>
          {itemBaseStats(images.iconTypeGame.iconSpeed, messages.baseStats.speed, speed)}
          {itemBaseStats(
            images.iconTypeGame.iconCritical,
            messages.baseStats.critical,
            critical
          )}
          {itemBaseStats(images.iconTypeGame.iconLuck, messages.baseStats.luck, luck)}
        </RowAttribute>
      </>
    </ContainerAttribute>
  )
  const renderMobile = () => (
    <ContainerAttribute>
      <>
        <TitleAttribute>{titleAttribute}</TitleAttribute>
        <RowAttribute>
          {iconElement.map((item, index) => (
            <ItemAttribute
              key={index}
              opacity={typeElement === item.title ? 1 : 0.5}
              icon={item.icon}
              title={item.title}
              typeElement={typeElement}
            />
          ))}
        </RowAttribute>
      </>
      <>
        <TitleAttribute>{titleBaseStats}</TitleAttribute>
        <RowAttribute>
          {itemBaseStats(images.iconTypeGame.iconHP, messages.baseStats.hp, hp)}
          {itemBaseStats(images.iconTypeGame.iconAttack, messages.baseStats.attack, attack)}
          {itemBaseStats(images.iconTypeGame.iconDefend, messages.baseStats.defend, defend)}
          {itemBaseStats(images.iconTypeGame.iconSpeed, messages.baseStats.speed, speed)}
          {itemBaseStats(
            images.iconTypeGame.iconCritical,
            messages.baseStats.critical,
            critical
          )}
          {itemBaseStats(images.iconTypeGame.iconLuck, messages.baseStats.luck, luck)}
        </RowAttribute>
      </>
    </ContainerAttribute>
  )
  return (
    <Media query='(min-width: 768px)'>
      {(match) => {
        if (match) {
          return renderDesktop()
        }
        return renderMobile()
      }}
    </Media>
  )
}
export default AttributeNFT
