import React, { useState } from 'react'
import {
  InforDetailEarthContainer,
  TitleInfor,
  DescriptionInfor,
  ImageInfor,
  RightDetailEarth,
  LeftDetailEarth,
  LineEspecially,
  BtnCloseModal
} from './style'
import './style.scss'
import { ButtonGame } from '../../../../style'
import { images } from 'config/images'
import Media from 'react-media'
import { useSelector } from 'react-redux'
export default function ModalEarth ({
  title,
  description,
  linkLearnMore,
  linkExperience,
  linkVideo = '',
  image,
  closeModal
}) {
  const messages = useSelector(state => state.locale.messages)

  const renderDesktop = () => {
    return (
      <InforDetailEarthContainer>
        <div style={{ textAlign: 'right', marginBottom: 25 }} >
          <BtnCloseModal onClick={closeModal} src={images.home.iconCloseEspecially} style={{ height: 45, width: 45 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 20, backgroundColor: 'black' }}>
          <LeftDetailEarth >
            <TitleInfor>  {title} </TitleInfor>
            <DescriptionInfor >{description}</DescriptionInfor>
            <LineEspecially src={images.home.lineRoutePage.lineEspecially} />
            <ButtonGame isLinear isUpCase onClick={linkExperience}>
              <div >
                {messages.nft.experienceIt}
              </div>
              <img src={images.home.iconRightBtn} />
            </ButtonGame>
            <br className='MB10' />
            <ButtonGame isUpCase onClick={linkLearnMore}>
              <div >
                {messages.common.learnMore}
              </div>
              <img src={images.home.iconRightBtn} />
            </ButtonGame>
          </LeftDetailEarth>
          <RightDetailEarth >
            {
              linkVideo ? (
                <video
                  src={linkVideo}
                  autoPlay
                  muted
                  loop
                  controls={false}
                  width={'100%'}
                />
              ) : (
                <ImageInfor >
                  <img style={{ width: '100%' }} src={image} alt='image' />
                </ImageInfor>
              )
            }
          </RightDetailEarth>
        </div>

      </InforDetailEarthContainer>
    )
  }

  const renderMobile = () => {
    return (
      <InforDetailEarthContainer>
        <div style={{ textAlign: 'right', marginBottom: 25 }} >
          <BtnCloseModal onClick={closeModal} src={images.home.iconCloseEspecially} />
        </div>
        {/* <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}> */}
        <LeftDetailEarth >
          <TitleInfor>  {title} </TitleInfor>
          <DescriptionInfor >{description}</DescriptionInfor>
          <LineEspecially src={images.home.lineEspecially} />
          <ButtonGame isLinear isUpCase onClick={linkExperience}>
            <div >
              {messages.nft.experienceIt}
            </div>
            <img src={images.home.iconRightBtn} />
          </ButtonGame>
          <br />
          <ButtonGame isUpCase onClick={linkLearnMore}>
            <div >
              {messages.common.learnMore}
            </div>
            <img src={images.home.iconRightBtn} />
          </ButtonGame>
        </LeftDetailEarth>
        <RightDetailEarth >
          {
            linkVideo ? (
              <video
                src={linkVideo}
                autoPlay
                muted
                allowFullScreen={false}
                loop
                controls={false}
                width={'100%'}
              />
            ) : (
              <ImageInfor >
                <img style={{ width: '100%' }} src={image} alt='image' />
              </ImageInfor>
            )
          }
        </RightDetailEarth>
        {/* </div> */}

      </InforDetailEarthContainer>
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
