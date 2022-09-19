import React, { useEffect, useRef, useState } from 'react'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'

import {
  EarthContainer,
  Earth1,
  Earth2,
  Tornado,
  EarthImage,
  EarthMobile,
  UniverseContainer

} from './style'
import { isMobile } from 'react-device-detect'
import ModalEarth from './Components/ModalEarth'
import { useSelector } from 'react-redux'
import Media from 'react-media'
import RoutePageDesign from './Components'
import { Router } from 'common/routes'
import useAuth from 'hooks/useAuth'

import { OBSERVER_KEY } from 'common/constants'

import Observer from 'common/observer'
import ReduxServices from 'common/redux'

export default function Earth () {
  const { messages } = useSelector(state => state.locale)
  const myModal = useRef()
  const imgBg = useRef(new Image())
  const dataEarth = [
    {
      title: messages.home.linkEarth.tradingMarket.title,
      description: messages.home.linkEarth.tradingMarket.desc,
      image: images.home.modalTradingMarket,
      routePage: '/marketplace'
    },
    {
      title: messages.home.linkEarth.mainMap.title,
      description: messages.home.linkEarth.mainMap.desc,
      linkVideo: 'https://ipfs.pantograph.app/ipfs/QmTkiZskoyszAHXPTmjDNgysEgFHqg9v2m7L9GiNBitSn8?filename=map.mp4'

    },
    {
      title: messages.home.linkEarth.trainingArea.title,
      description: messages.home.linkEarth.trainingArea.desc,
      image: images.home.modalTrainArea
    },
    {
      title: messages.home.linkEarth.moonArea.title,
      description: messages.home.linkEarth.moonArea.desc,
      linkVideo: 'https://ipfs.pantograph.app/ipfs/QmczsUtV6uRvztN7iMEZjfogLyFDtEA7Ggc7Hg2bcwM1AY?filename=Moon Arena 2_1.mp4'
    },
    {
      title: messages.home.linkEarth.wormHole.title,
      description: messages.home.linkEarth.wormHole.desc,
      linkVideo: 'https://ipfs.pantograph.app/ipfs/QmNkqVhLMtdfZmAZgJCPSX3E811VWomrY8qf1ZBr9qQCSy?filename=Black hole.mp4'
    }
  ]
  const [widthScreen, setWidthScreen] = useState(window.innerWidth)
  const [heightImgBg, setHeightImgBg] = useState(0)
  const [widthImgBg, setWidthImgBg] = useState(0)
  const { isSign } = useAuth()
  //
  useEffect(() => {
    window.addEventListener('resize', function () {
      setWidthScreen(window.innerWidth)
      if (imgBg.current) {
        const height = imgBg?.current?.clientHeight
        const width = imgBg?.current?.clientWidth
        setHeightImgBg(height)
        setWidthImgBg(width)
      }
    })
    setTimeout(() => {
      const height = imgBg?.current?.clientHeight
      const width = imgBg?.current?.clientWidth
      setHeightImgBg(height)
      setWidthImgBg(width)
    }, 400)

    return () => {
      window.removeEventListener('resize', function () { })
    }
  }, [])
  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }
  const openModalSignIn = async () => {
    await Observer.emit(OBSERVER_KEY.SIGN_IN)
    ReduxServices.setIsOpenModalWarning(true)
  }
  const onClickEarth = (index) => {
    const dataTemp = dataEarth[index]
    myModal.current.openModal(
      <ModalEarth
        title={dataTemp.title}
        description={dataTemp.description}
        linkLearnMore={() => {

        }}
        linkExperience={() => {
          const tempEarth = dataEarth[index]
          if (tempEarth.routePage) {
            Router.push(tempEarth.routePage)
          } else {
            isSign ? Router.push('/playGame') : openModalSignIn()
          }
        }}
        linkVideo={dataTemp?.linkVideo ?? ''}
        image={dataTemp?.image ?? ''}
        closeModal={() => myModal.current.closeModal()}
      />,
      { modalWidth: 900,
        closable: false,
        wrapClassName: 'modal-earth',
        maskStyle: {
          background: 'red'
        } }
    )
  }
  const calculateSize = (size1, size2 = 50, size3, size4) => {
    if (widthScreen > 1199) {
      return size1
    } else {
      if (widthScreen > 799) {
        return size2
      } else {
        if (widthScreen > 568) {
          return size3
        } else {
          return size4
        }
      }
    }
  }
  const calculateTransform = (size1, size2, size3, size4) => {
    if (widthScreen > 1199) {
      return size1
    } else {
      if (widthScreen > 799) {
        return size2
      } else {
        if (widthScreen > 568) {
          return size3
        } else {
          return size4
        }
      }
    }
  }
  const renderDesktop = () => {
    return (
      <>
        <Earth1 >
          <EarthImage
            size={calculateSize(500, 400, 300, 250)}
            src={images.home.Earth1} data-aos='zoom-out-right'
          >
            <RoutePageDesign
              titlePage='Trading market'
              imageLine={images.home.lineRoutePage.lineRoutePageTrainingMarket}
              translateY={calculateTransform(-10, -20, -40, -60)}
              translateX={calculateTransform(170, 120, 70, 50)}
              XChild={10}
              YChild={-5}
              onClick={() => onClickEarth(0)}
            />
            <RoutePageDesign
              titlePage='Main map'
              imageLine={images.home.lineRoutePage.lineRoutePageMainMap}
              translateY={calculateTransform(-120, -130, -170, -180)}
              translateX={calculateTransform(300, 250, 180, 150)}
              XTitlePage={30}
              XChild={-20}
              YChild={-5}
              onClick={() => onClickEarth(1)}
            />
            <RoutePageDesign
              titlePage='Training area'
              imageLine={images.home.lineRoutePage.lineRoutePageTrainingArea}
              translateY={calculateTransform(-150, -180, -250, -280)}
              translateX={calculateTransform(370, 300, 230, 180)}
              XTitlePage={25}
              XChild={-20}
              YChild={-5}
              onClick={() => onClickEarth(2)}
            />
          </EarthImage>
        </Earth1>
        <Earth2 >
          <EarthImage
            data-aos='zoom-out-up'
            size={calculateSize(300, 200, 100, 80)}
            sizeMin={calculateSize(300, 200, 150, 100)}
            src={images.home.Earth2}
          >
            <RoutePageDesign
              titlePage='Battle arena'
              imageLine={images.home.lineRoutePage.lineRoutePageBattleArea}
              translateY={calculateTransform(-50, -65, -80, -85)}
              translateX={calculateTransform(130, 85, 65, 40)}
              XTitlePage={20}
              XChild={-20}
              YChild={-5}
              onClick={() => onClickEarth(3)}
            />
          </EarthImage>
        </Earth2>
        <Tornado
          opacity={0.3}
          translateX={calculateTransform(0, -100, 0, 0)}
        >
          <EarthImage
            src={images.home.tornado}
            size={calculateSize(600, 500, 400, 350)}
            data-aos='zoom-out-left'
          >
            <RoutePageDesign
              titlePage='Worm Hole'
              imageLine={images.home.lineRoutePage.lineRoutePageWormHole}
              translateY={calculateTransform(90, 60, 20, 0)}
              translateX={calculateTransform(250, 230, 180, 250)}
              XChild={-20}
              YChild={-5}
              onClick={() => onClickEarth(4)}
              especially
              XTitlePage={18}
            />
          </EarthImage>
        </Tornado>
      </>
    )
  }
  const renderMobile = () => {
    return (
      widthImgBg > 0 && (
        <>
          <Earth2 >
            <EarthImage
              data-aos={!isMobile && 'zoom-out-up'}
              size={widthImgBg / 4}
              src={images.home.Earth2}
            >
              <RoutePageDesign
                titlePage='Battle arena'
                imageLine={images.home.lineRoutePage.lineRoutePageBattleArea}
                translateY={calculateTransform(-50, -65, -80, -35)}
                translateX={calculateTransform(130, 85, 65, 40)}
                XTitlePage={widthScreen > 568 ? 20 : -1}
                XChild={widthScreen > 568 ? -25 : -14}
                YChild={-5}
                onClick={() => onClickEarth(2)}
              />
            </EarthImage>
          </Earth2>
          <Earth1
            translateY={heightImgBg / 6}
          >
            <EarthImage
              size={widthImgBg / 2.5}
              src={images.home.Earth1}
              data-aos={!isMobile && 'zoom-out-right'}
            >
              <RoutePageDesign
                titlePage='Trading market'
                imageLine={images.home.lineRoutePage.lineRoutePageTrainingMarket}
                translateY={calculateTransform(-10, -20, -40, -30)}
                // translateX={calculateTransform(170, 120, 70, 50)}
                translateX={widthScreen / 12}
                XChild={widthScreen > 568 ? 10 : 2}
                XTitlePage={widthScreen > 568 ? 0 : -11}
                YChild={-5}
                onClick={() => onClickEarth(0)}
              />
              <RoutePageDesign
                titlePage='Main map'
                imageLine={images.home.lineRoutePage.lineRoutePageMainMap}
                translateY={calculateTransform(-120, -130, -170, -100)}
                // translateX={calculateTransform(300, 250, 180, 120)}
                translateX={widthScreen / 4.2}
                XTitlePage={widthScreen > 568 ? 30 : 3}
                XChild={widthScreen > 568 ? -25 : -14}

                YChild={-5}
                onClick={() => onClickEarth(1)}
              />
              <RoutePageDesign
                titlePage='Training area'
                imageLine={images.home.lineRoutePage.lineRoutePageTrainingArea}
                translateY={calculateTransform(-150, -180, -250, -160)}
                translateX={widthScreen / 3.5}
                XTitlePage={widthScreen > 568 ? 25 : 3}
                XChild={widthScreen > 568 ? -25 : -15}
                YChild={-5}
                onClick={() => onClickEarth(2)}
              />
            </EarthImage>
          </Earth1>
          <Tornado
            opacity={0.3}
            translateY={heightImgBg / 8}
            translateX={calculateTransform(0, -100, 0, 0)}
          >
            <EarthImage
              margin
              src={images.home.tornado}
              size={calculateSize(600, 500, 400, widthScreen / 1.5)}
              data-aos={!isMobile && 'zoom-out-left'}
            >
              <RoutePageDesign
                titlePage='Worm Hole'
                imageLine={images.home.lineRoutePage.lineRoutePageWormHole}
                translateY={calculateTransform(90, 60, 20, 60)}
                translateX={widthScreen / 2.8}
                XChild={widthScreen > 568 ? -25 : -14}

                YChild={-5}
                XTitlePage={widthScreen > 568 ? 20 : -2}
                especially
                onClick={() => onClickEarth(4)}
              />
            </EarthImage>
          </Tornado>
          </>

      )
    )
  }
  return (
    <UniverseContainer

      style={{ width: widthScreen }}
      sizeMin={calculateSize(800, 700, heightImgBg - 10, heightImgBg - 10)}
    >
      <img
        draggable={false}
        ref={imgBg}
        style={{
          width: widthScreen,
          position: 'absolute',
          height: calculateSize(800, 700, '', '')
        }}
        src={widthScreen > 768 ? images.home.backgroundFooterMain : images.home.backgroundEarthMobile}
        alt='backgroundEarth'
      />
      <EarthContainer style={{ width: widthScreen }}>
        <Media query='(min-width: 768px)'>
          {(match) => {
            if (match) {
              return renderDesktop()
            }
            return renderMobile()
          }}
        </Media>
        <MyModal ref={myModal} />
      </EarthContainer>
    </UniverseContainer>

  )
}
