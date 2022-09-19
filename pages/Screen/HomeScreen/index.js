import React, { useState, useEffect, useRef } from 'react'
import MyModal from 'pages/Components/MyModal'
import { scrollTop } from 'common/function'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { images } from 'config/images'
import {
  Container,
  IntroduceHome,
  LeftIntroduce,
  BigTitle,
  LineTitle,
  Directions,
  ButtonGame,
  TitleButtonGame,
  RightIntroduce,
  LogoGame,
  FooterHome,
  BigTitleWar,
  IconGame
} from './style'
import './style.scss'
import Earth from './Components/Earth'
import { OBSERVER_KEY } from 'common/constants'
import Observer from 'common/observer'
import SlideInforGame from './Components/SlideInforGame'
import ListCard from './Components/ListCard'
import 'aos/dist/aos.css'
import Aos from 'aos'
import Banner from './Components/Banner'
const HomeScreen = () => {
  const userData = useSelector(state => state.userData)

  const { messages } = useSelector(state => state.locale)
  const myModal = useRef()
  window.addEventListener('resize', function () {
    setWidthScreen(window.innerWidth)
  })
  const [widthScreen, setWidthScreen] = useState(window.innerWidth)

  useEffect(() => {
    Aos.init({ duration: 2500 })
  }, [])
  useEffect(() => {
    scrollTop && scrollTop()
    Observer.on(OBSERVER_KEY.REFRESH_PAGE, refreshPage)
    return function cleanup () {
      Observer.removeListener(OBSERVER_KEY.REFRESH_PAGE, refreshPage)
    }
  }, [])

  // useEffect(() => {
  //   getSalesNFTs()
  // }, [userData])

  const refreshPage = () => {
    // getSalesNFTs()
  }
  return (
    <Container className='home-container'>
      <Banner />
      <IntroduceHome >
        <LeftIntroduce>
          <div>
            <BigTitle upCase>
              {messages.home.titleGame}
            </BigTitle>
            <LineTitle src={images.home.lineTitleHome} />
          </div>

          <Directions>
            {messages.home.description}
          </Directions>
          <ButtonGame >
            <TitleButtonGame style={{ color: 'white' }} >
              {messages.common.getDirections}
            </TitleButtonGame>
            <img src={images.home.iconRightBtn} />
          </ButtonGame>
        </LeftIntroduce>
        <RightIntroduce>
          <LogoGame src={images.home.logoGame} />
          <IconGame src={images.home.iconGame} />
        </RightIntroduce>
      </IntroduceHome>
      <div style={{ textAlign: 'center' }}>
        <video src='https://ipfs.pantograph.app/ipfs/QmbfyX1JMFzCAcWDiwzM5N9hZZFeBAjZwmcFaLynm2wXnh?filename=Tainted%20Grail_%20Fall%20of%20Avalon%20-%20Official%20Cinematic%20Trailer.mp4'
          autoPlay
          muted
          loop
          controls={false}
          repeat
          style={{
            transform: 'translateY(-60px)',
            width: '100%'
          }}
        />
      </div>
      <div
        style={{
          position: 'relative',
          top: '-100px',
          width: widthScreen
        }}
      >
        <SlideInforGame data={[]} />
        <BigTitleWar data-aos={!isMobile && 'zoom-in'} top={0} >
          <div style={{ marginBottom: 15 }}> {messages.home.history} </div>
          <LineTitle src={images.home.lineTitleHome} />
        </BigTitleWar>
        <Earth />

        <FooterHome >
          <BigTitleWar data-aos={!isMobile && 'fade-right'}>
            <div style={{ marginBottom: 15 }}> {messages.home.keyFeatures} </div>
            <LineTitle src={images.home.lineTitleHome} />
          </BigTitleWar>
          <ListCard />
        </FooterHome>
      </div>

      <MyModal className='home-container' ref={myModal} />
    </Container>
  )
}

export default HomeScreen
