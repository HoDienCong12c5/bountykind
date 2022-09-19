import React, { useState, useEffect, useRef } from 'react'
import { images } from 'config/images'
import {
  BannerContainer,
  BannerContent,
  BannerBigImg,
  BannerBGMobile,
  BannerContainerMobile,
  BannerContentMobile,
  ImgBackground
} from './style'
import { ButtonGame, TitleButtonGame } from '../../style'
import { Router } from 'common/routes'
import Media from 'react-media'
import useAuth from 'hooks/useAuth'
import MyModal from 'pages/Components/MyModal'
import Observer from 'common/observer'
import ReduxServices from 'common/redux'
import {
  OBSERVER_KEY
} from 'common/constants'

import { useSelector } from 'react-redux'
const BannerHome = () => {
  const messages = useSelector(state => state.locale.messages)
  const [heightScreen, setHeightScreen] = useState(0)
  const imgBackgroundRef = new useRef(new Image())
  const { isSign } = useAuth()
  const myModal = useRef(null)
  // useEffect
  useEffect(() => {
    window.addEventListener('resize', () => {
      setHeightScreen(imgBackgroundRef?.current?.clientHeight)
    })
    setTimeout(() => {
      const heightImageMobile = imgBackgroundRef?.current?.clientHeight
      if (heightScreen >= 0 && heightImageMobile !== heightScreen) {
        setHeightScreen(heightImageMobile)
      }
    }, 200)
    return () => {
      window.removeEventListener('resize', () => {
        setHeightScreen(window.innerHeight)
      })
    }
  }, [heightScreen, imgBackgroundRef])
  const openModalSignIn = async () => {
    await Observer.emit(OBSERVER_KEY.SIGN_IN)
    ReduxServices.setIsOpenModalWarning(true)
  }
  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }
  const renderDesktop = () => {
    return (
      <BannerContainer height={heightScreen - 20}>
        <ImgBackground
          draggable={false}
          ref={imgBackgroundRef}
          src={images.home.backgroundMain}
        />
        <BannerContent>
          <BannerBigImg
            draggable={false}
            src={images.home.solutionGame}
            height={heightScreen / 2}
          />
          <br />
          <br />
          <ButtonGame
            onClick={() => {
              isSign ? Router.pushRoute('/playGame') : openModalSignIn()
            }}
            isUpCase
            isLinear
            style={{ marginLeft: 10 }}
          >
            <TitleButtonGame style={{ color: 'white' }}>
              {messages.common.playGame}
            </TitleButtonGame>
            <img src={images.home.iconRightBtn} />
          </ButtonGame>
        </BannerContent>

        <MyModal ref={myModal} />
      </BannerContainer>
    )
  }
  const renderMobile = () => {
    return (
      <BannerContainerMobile height={heightScreen + 50}>
        <BannerBGMobile
          ref={imgBackgroundRef}
          src={images.home.backgroundMainMobile}
        />
        <BannerContentMobile
          height={heightScreen / 1.5}
          marginTop={heightScreen / 2}
        >
          <BannerBigImg draggable={false} src={images.home.solutionGame} />
          {/* <BannerBigText dangerouslySetInnerHTML={{ __html: messages.home.banner.turnYour }} /> */}
          <br />
          <br />
          <br />
          <ButtonGame
            onClick={() => Router.pushRoute('/playGame')}
            isUpCase
            isLinear
          >
            <TitleButtonGame style={{ color: 'white' }}>
              {messages.common.playGame}
            </TitleButtonGame>
            <img src={images.home.iconRightBtn} />
          </ButtonGame>
        </BannerContentMobile>

        <MyModal ref={myModal} />
      </BannerContainerMobile>
    )
  }
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
export default BannerHome
