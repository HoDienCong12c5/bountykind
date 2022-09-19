import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { images } from 'config/images'
import {
  ContainerSlide,
  ImageBanner,
  TitleBanner,
  ImageBannerS
} from './style'
import 'aos/dist/aos.css'
import Media from 'react-media'
import { isMobile } from 'react-device-detect'
export default function SlideInforGame ({ onClick }) {
  const messages = useSelector(state => state.locale.messages)
  const [index, setIndex] = useState(0)
  const data = [
    {
      image: images.home.bannerMain1,
      description: messages.home.slideInfor.des1,
      index: 0
    },
    {
      image: images.home.bannerMain2,
      description: messages.home.slideInfor.des2,
      index: 1
    }
  ]
  const [itemShow, setItemShow] = useState(data[0])

  //
  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length > index + 1) {
        setItemShow(data[index + 1])
        setIndex(index + 1)
      } else {
        setItemShow(data[0])
        setIndex(0)
      }
    }, 8000)
    return () => clearInterval(interval)
  }, [index])
  const renderDesktop = () => (
    <ContainerSlide >
      <div style={{ textAlign: 'center' }} >
        <ImageBannerS src={itemShow.image} key={itemShow.description} />
      </div>
      <TitleBanner
        key={itemShow.description}
      >
        <div
          style={{
            maxWidth: 650,
            margin: 'auto',
            width: '90%'
          }}
        >
          {itemShow.description}

        </div>
      </TitleBanner>

    </ContainerSlide>
  )
  const renderMobile = () => (
    <ContainerSlide >
      <div style={{ textAlign: 'center' }} >
        <ImageBannerS src={itemShow.image} key={itemShow.description} />
      </div>
      <TitleBanner
        key={itemShow.description}
      >
        <div
          style={{
            maxWidth: 650,
            margin: 'auto',
            width: '90%'
          }}
        >
          {itemShow.description}

        </div>
      </TitleBanner>

    </ContainerSlide>
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
