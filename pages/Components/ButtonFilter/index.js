import React, { useCallback } from 'react'
import { COLOR } from 'common/constants'
import { isMobile } from 'react-device-detect'
import {
  ButtonContent,
  Title,
  IconButtonCustom
} from './style'
const checkTypeButton = (keyColor, colorCustom = null) => {
  if (colorCustom !== null) {
    return colorCustom
  } else {
    keyColor = keyColor.toLowerCase()
    switch (keyColor) {
    case 'uncommon':
      return 'rgba(86, 171, 72, 1)'
    case 'rare':
      return COLOR.purple
    case 'epic':
      return 'rgba(255, 153, 0, 1)'
    case 'legendary':
      return 'linear-gradient(269.09deg, #104AFB 0.78%, #00FFD1 99.53%)'
    case 'emperor':
      return 'linear-gradient(269.09deg, #DFA716 0.78%, #AD5B50 32.67%, #522197 66.1%, #6EBF3F 99.53%)'
    case 'common':
      return COLOR.white
    case 'red':
      return '#FF463A'
    case 'green':
      return '#7AD76A'
    case 'blue':
      return '#54ADFF'
    case 'yellow':
      return '#FFBE40'
    case 'rainbow':
      return 'linear-gradient(269.09deg, #DFA716 0.78%, #AD5B50 32.67%, #522197 66.1%, #6EBF3F 99.53%)'
    case 'ignis':
      return COLOR.red
    case 'plant':
      return 'rgba(122, 215, 106, 1)'
    case 'anima':
      return 'rgba(78, 255, 191, 1)'
    case 'earth':
      return 'rgba(255, 190, 64, 1)'
    case 'eleki':
      return 'rgba(154, 75, 255, 1)'
    case 'eleking':
      return 'rgba(154, 75, 255, 1)'
    case 'aqua':
      return 'rgba(84, 173, 255, 1)'
    case 'demon':
      return '#FB30FF'
    case 'beast':
      return '#FF7A00'
    case 'humanoid':
      return '#54FFEA'
    case 'god':
      return '#FFF500'
    case 'machine':
      return '#9B54FF'
    default: return COLOR.white
    }
  }
}
const ButtonFilter = ({
  title = '',
  onClick,
  isSelected = false,
  isUpCase = false,
  fontSize = 13,
  icon = null,
  typeButton = '',
  colorCustom = null,
  iconHover = null,
  disabled = false,
  noHover = false,
  opacity = 1,
  key = null
}) => {
  return (
    <ButtonContent
      backgroundColor={checkTypeButton(title, colorCustom)}
      onClick={disabled ? null : onClick}
      className={`${isSelected && 'isSelected'} ${noHover || !isMobile && 'hasHover'}`}
      iconHover={iconHover}
      opacity={opacity}
      key={key ?? title}
    >
      <Title textTransform={isUpCase} fontSize={fontSize} fontWeight={400}>
        <div style={{ display: 'flex' }}>
          {icon && (
            <IconButtonCustom
              className='icon-button'
              urlIcon={isSelected ? iconHover : icon}
            />
          )}
          {title}
        </div>
      </Title>
    </ButtonContent>
  )
}
const checkReRender = (prevBtn, nextBtn) => {
  return prevBtn.isSelected !== nextBtn.isSelected && prevBtn.onClick === nextBtn.onClick && prevBtn.title === nextBtn.title
}
export default React.memo(ButtonFilter, checkReRender)
