import React, { useEffect, useState, useRef } from 'react'
import { images } from 'config/images'
import {
  Container,
  Banner,
  Content,
  ContentContainer,
  Right,
  Left,
  ItemCharacter,
  LeftContent,
  ImgCard,
  ImgCharacter,
  TitleInfor,
  ContentInfor,
  InforDetail,
  ButtonCustom
} from './styled'
import './style.scss'
import Loading from 'pages/Components/Loading'
import { showNotification } from 'common/function'
import { Router } from 'common/routes'
import { List, Row, Col } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import GameService from 'services/gameService'
import { useSelector } from 'react-redux'
import MyModal from 'pages/Components/MyModal'
import ModalReceived from '../ModalReceived'
import useAuth from 'hooks/useAuth'
import cookiesService from 'services/cookiesService'
const MAX_NUMBER = 3

const GameScreen = () => {
  const messages = useSelector(state => state.locale.messages)
  const userData = useSelector(state => state.userData)
  const { isSigned } = useAuth()
  const myModal = useRef(null)

  const [loading, setLoading] = useState(true)
  const [cardSelected, setCardSelected] = useState([])
  const [cardList, setCardList] = useState([])
  const [cardSelecting, setCardSelecting] = useState(null)

  const toggleCardSelected = (item) => {
    let itemExistIndex = cardSelected.findIndex(e => e.key === item.key)
    if (itemExistIndex !== -1) {
      let newCardSelected = [...cardSelected]
      newCardSelected.splice(itemExistIndex, 1)
      setCardSelected(newCardSelected)
    } else {
      let termArr = [...cardSelected, { key: item.key }]
      if (termArr.length > MAX_NUMBER) {
        showNotification(messages.itIsExceededMaxOfNumberItems)
        return
      }
      setCardSelecting(item)
      setCardSelected(termArr)
    }
  }
  useEffect(() => {
    const getDataCharaters = async () => {
      const res = await GameService.getGameCharacters()
      if (res.data) {
        setCardList(res.data)
        setLoading(false)
      }
    }
    if (userData?.isReceived) {
      if (userData?.isReceived) {
        myModal.current.openModal(<ModalReceived />, { modalWidth: 480, closable: false, wrapClassName: '', maskStyle: {}, onAfterClose: null })
      }
    } else {
      getDataCharaters()
    }
  }, [userData?.isReceived])

  const onCreate = async () => {
    await cookiesService.checkHasCookies()
    if (isSigned) {
      let listMintCha = []
      cardSelected.map(item => {
        listMintCha.push(item.key)
      })
      const minting = await GameService.mintCharacters(listMintCha, await cookiesService.getCookiesByName())
      if (minting?.message) {
        await Router.pushRoute('/playGame')
      } else {
        console.log('error', minting)
      }
    } else { }

    // Router.pushRoute('/playGame')
  }
  const itemCharacters = () => {
    return (
      cardList.map((item, index) => {
        let isSelected = cardSelected.findIndex(e => e.key === item.key) !== -1
        return (
          <ItemCharacter
            className={'game-screen__card-item' + (isSelected ? ' selected' : '')}
            onClick={() => toggleCardSelected(item)}
            src={item.image}
            key={index}
          >
            {
              isSelected && (
                <CheckOutlined
                  style={{
                    color: 'white',
                    padding: 2,
                    height: 20,
                    width: 20,
                    margin: 5,
                    background: 'black',
                    borderRadius: 10
                  }}
                />
              )
            }
          </ItemCharacter>
        )
      })
    )
  }
  const inforSelecting = (title, content) => {
    return (
      <InforDetail >
        <TitleInfor >
          {title} :
        </TitleInfor>
        <ContentInfor >
          {content}
        </ContentInfor>
      </InforDetail>

    )
  }
  return (
    <Container >
      <Banner src={images.home.bannerBG} />
      <ContentContainer >
        {
          !loading ? (
            <Content >
              <Right >
                <Row >
                  {itemCharacters() }
                </Row>
              </Right>
              <Left >
                {
                  cardSelecting ? (
                    <LeftContent >
                      <ImgCard src={cardSelecting.image} />
                      {inforSelecting('NAME', cardSelecting.name ?? 'Charater')}
                      {inforSelecting('ATK', cardSelecting.atk ?? 300)}
                      {inforSelecting('DEF', cardSelecting.def ?? 300)}
                      {inforSelecting('SPEED', cardSelecting.speed ?? 300)}
                      {inforSelecting('HP', cardSelecting.hp ?? 300)}
                    </LeftContent>
                  ) : (
                    'Select character'
                  )
                }
                {
                  cardSelecting ? (
                    <div style={{
                      display: 'flex',
                      alignContent: 'center',
                      textAlign: 'center',
                      justifyContent: 'center',
                      marginTop: 50
                    }}>
                      <ButtonCustom
                        isDisable={cardSelected.length === 3}
                        onClick={cardSelected.length === 3 ? onCreate : null}
                      >
                    Received
                      </ButtonCustom>
                      <ButtonCustom
                        isCancel
                        isDisable
                        onClick={() => onCreate()}
                      >
                    cancel
                      </ButtonCustom>
                    </div>
                  ) : null
                }
              </Left>
            </Content>
          ) : <Loading />
        }

      </ContentContainer>
      <MyModal ref={myModal} />
    </Container>
  )
}

export default GameScreen
