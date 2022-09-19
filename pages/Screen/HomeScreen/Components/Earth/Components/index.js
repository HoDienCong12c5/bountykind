import {
  RoutePageContainer,
  AnimationRoutePage,
  TitleRoutePage,
  LineRoutePage,
  PotionRoutePage,
  TitleRoutePageEspecially

} from '../style'
import React, { useState } from 'react'
import { images } from 'config/images'
const RoutePageDesign = ({
  titlePage,
  imageLine,
  translateY = 0,
  translateX = 0,
  translateZ = 0,
  YChild = 0,
  XChild = 0,
  ZChild = 0,
  XTitlePage = 0,
  onClick,
  especially = false
}) => {
  const [isHover, setIsHover] = useState(0)
  const hoverHandler = (type) => {
    if (type === 1) {
      setIsHover(1)
    } else {
      setIsHover(0)
    }
  }
  return (
    <RoutePageContainer
      key={titlePage}
      translateY={translateY}
      translateX={translateX}
      translateZ={translateZ}
    >
      <AnimationRoutePage opacity={isHover} className={'linePage'}>
        {
          especially ? (
            <TitleRoutePageEspecially
              XTitlePage={XTitlePage}
            >
              <img
                src={images.home.iconLeftNamePage}
                style={{ height: 18, width: 18 }}
              />
              {titlePage}
            </TitleRoutePageEspecially>
          ) : (
            <TitleRoutePage
              XTitlePage={XTitlePage}
            >
              <img
                src={images.home.iconLeftNamePage}
                style={{ height: 18, width: 18 }}
              />
              {titlePage}
            </TitleRoutePage>
          )
        }

        <LineRoutePage src={imageLine} />
      </AnimationRoutePage>
      <PotionRoutePage
        onMouseOver={() => hoverHandler(1)}
        onMouseOut={() => hoverHandler(-1)}
        onClick={onClick}
        src={images.home.positionRoutePage}
        translateYChild={YChild}
        translateXChild={XChild}
        translateZChild={ZChild}
      />

    </RoutePageContainer>
  )
}
export default RoutePageDesign
