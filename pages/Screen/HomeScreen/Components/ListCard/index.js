import React, { useState, useEffect } from 'react'
import { images } from 'config/images'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import 'aos/dist/aos.css'
import { isMobile } from 'react-device-detect'
import Aos from 'aos'
import Media from 'react-media'

const ListCardContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content:center;
    align-items: center;
`
const CardContainer = styled.div`
    background-image: url("${(props) => props.src}");
    height: 456px;
    margin: 10px;
    width: 209px;
    background-size: cover;
    position: relative; 
    &:hover{
      opacity: 1; 
      margin: 10px;
      transform: scale(1.03);
      cursor: pointer;
      transition: all 0.3s ease-in-out;
    }
    @media screen and (max-width: 768px) {
      margin:0px;
    }
    
`
const ContainerCardMobile = styled.div`
   width:100%;
   justify-content: space-around;
   align-items: center;
   margin: auto;
   display: flex;

  
`
const ButtonNext = styled.div`
   width:40px;
   height:40px;
   background-image: url("${(props) => props.src}");
   background-size:contain;
   transform: rotate(90deg);
   opacity:0.6;
   &:hover{
    cursor: pointer;
    opacity:1;
   }
`
const ButtonPre = styled(ButtonNext)`
transform: rotate(-90deg);
`
const CardItem = styled.div`
  margin:auto;
  margin-top: 80px;
  text-align: center;
  justify-content: center;
  padding:10px;
`
const LogoCard = styled.div`
  background-image: url("${(props) => props.src}");
  height: 100px;
  width: 100px;
  background-size: contain;
  margin-top: 80px;
  margin: auto;

`
const TextCard = styled.div`
  font-size: ${props => `${props.sizeNormal ? 13 : 16}px`};
  &.upCase{
    text-transform: uppercase;
  }
  font-weight: 300;
  color:white;
  margin-bottom:  ${props => `${props.bottom}px` ?? '0px'};
  margin-top:  ${props => `${props.top}px` ?? '0px'};
  height:  ${props => `${props.height}px` ?? '0px'};
  text-align:center;
  @media screen and (max-width: 768px) {
    font-size: ${props => `${props.sizeNormal ? 12 : 14}px`};
  }
`
export default function ListCard () {
  const { messages } = useSelector(state => state.locale)
  const [indexHover, setIndexHover] = useState(-1)
  const [indexItem, setIndexItem] = useState(0)
  const [isClickForMobile, setIsClickForMobile] = useState(false)
  const timeoutRef = React.useRef(null)
  // useEffect
  useEffect(() => {
    if (isClickForMobile) {
      clearInterval(timeoutRef)
      setIsClickForMobile(false)
    } else {
      timeoutRef.current = setInterval(() => {
        setIndexItem((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        )
      }, 3000)
    }
    return () => clearInterval(timeoutRef)
  }, [indexItem])

  useEffect(() => {
    setIsClickForMobile(true)
  }, [isClickForMobile])
  Aos.init()
  const data = [
    {
      logo: images.home.iconKeyFeature.play,
      title: messages.home.keyFeaturePlay.title,
      description: messages.home.keyFeaturePlay.desc
    },
    {
      logo: images.home.iconKeyFeature.decide,
      title: messages.home.keyFeatureDecide.title,
      description: messages.home.keyFeatureDecide.desc
    },
    {
      logo: images.home.iconKeyFeature.trade,
      title: messages.home.keyFeatureTrade.title,
      description: messages.home.keyFeatureTrade.desc
    }, {
      logo: images.home.iconKeyFeature.exploration,
      title: messages.home.keyFeatureExploration.title,
      description: messages.home.keyFeatureExploration.desc
    }

  ]

  const handleHover = (index) => {
    console.log('index', index)
    setIndexHover(index)
  }
  const onClickHandlerNext = (index) => {
    setIsClickForMobile(true)
    if (index < data.length - 1) {
      setIndexItem(index)
    } else {
      setIndexItem(0)
    }
  }
  const onClickHandlerPret = (index) => {
    setIsClickForMobile(true)
    if (index > 0) {
      setIndexItem(0)
    } else {
      setIndexItem(data.length - 1)
    }
  }
  const renderDesktop = () => (
    <div data-aos={!isMobile && 'fade-left'}>
      <ListCardContainer>
        {
          data.map((item, index) => {
            return (
              (
                <CardContainer
                  onMouseOver={() => handleHover(index)}
                  onMouseOut={() => handleHover(-1)}
                  key={item.title}
                  className={item.title}
                  src={indexHover === index ? images.home.borderCardFooterSelected : images.home.borderCardUnHover}
                >
                  <CardItem >
                    <LogoCard src={item.logo} />
                    <TextCard
                      top={40}
                      bottom={65}
                      height={40}
                      className={'upCase'}
                    >
                      {item.title}
                    </TextCard>
                    <TextCard sizeNormal>
                      {item.description}
                    </TextCard>
                  </CardItem>
                </CardContainer>
              )
            )
          })
        }

      </ListCardContainer>
    </div>
  )
  const renderMobile = () => {
    return (
      <ContainerCardMobile >
        <ButtonNext src={images.iconNext} onClick={() => onClickHandlerPret(indexItem - 1)} />
        <CardContainer
          // data-aos='zoom-in'
          onMouseOver={() => handleHover(indexItem)}
          onMouseOut={() => handleHover(-1)}
          key={data[indexItem]?.title}
          src={indexHover === indexItem ? images.home.borderCardFooterSelected : images.home.borderCardUnHover}
        >
          <CardItem >
            <LogoCard src={data[indexItem]?.logo} />
            <TextCard
              top={40}
              bottom={65}
              height={40}
              className={'upCase'}
            >
              {data[indexItem]?.title}
            </TextCard>
            <TextCard sizeNormal>
              {data[indexItem]?.description}
            </TextCard>
          </CardItem>
        </CardContainer>
        <ButtonPre src={images.iconNext} onClick={() => onClickHandlerNext(indexItem + 1)} />
      </ContainerCardMobile>
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
