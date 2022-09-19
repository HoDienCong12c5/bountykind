import React, { useEffect, useState, useRef } from 'react'
import { images } from 'config/images'
import {
  Container,
  Banner,
  Content,
  ContentContainer,
  ListCharacterDetails,
  ListCharacter,
  ItemCharacter,
  ImgCharacter,
  ImgCard,
  InforCharacter,
  ContainerContent,
  Line,
  InforDetail,
  CharacterDetails,
  OptionSelectButtonContainer,
  ButtonSelect,
  ButtonSelect as ButtonReceived,
  ButtonNoThanks as ButtonCancel,
  ButtonNoThanks,
  ContentCharacter
} from './styled'
import './style.scss'
import Loading from 'pages/Components/Loading'
import { showNotification } from 'common/function'
import { Router } from 'common/routes'
import AttributeNFT from './components/AttributeNFT'
import GameService from 'services/gameService'
import { useSelector, useDispatch } from 'react-redux'
import MyModal from 'pages/Components/MyModal'
import ModalReceived from './ModalReceived'
import useAuth from 'hooks/useAuth'
import ModalGetCharacters from './components/ModalGetCharacters'
import ModalReceivedCharacters from './components/ModalReceivedCharacters'
import ReduxServices from 'common/redux'
import Observer from 'common/observer'
import { OBSERVER_KEY } from 'common/constants'
import cookiesService from 'services/cookiesService'
const MAX_NUMBER = 3

const GameScreen = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.userData)
  const { isSigned } = useAuth()
  const myModal = useRef(null)

  const [loading, setLoading] = useState(true)
  const [cardSelected, setCardSelected] = useState([])
  const [cardList, setCardList] = useState([])
  const [cardSelecting, setCardSelecting] = useState(null)
  const [alowSelect, setAllowSelect] = useState(false)
  const [totalCharacters, setTotalCharacters] = useState(0)
  const messages = useSelector(state => state.locale.messages)
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
    if (isSigned) {
      const getGameCharactersUser = async (owner, queryString) => {
        const characterOfGames = await GameService.getGameCharactersUser(
          owner,
          queryString
        )
        if (characterOfGames && characterOfGames?.data) {
          setTotalCharacters(characterOfGames.data.total)
        }
      }
      if (userData?.address) {
        getGameCharactersUser(userData.address, '?limit=10')
      }
    }
  }, [userData?.address, isSigned])
  const onClickBtnGoToStartGame = () => {
    if (totalCharacters >= 3) {
      Router.pushRoute('/playGame')
    } else {
      myModal.current.openModal(<ModalGetCharacters closeModal={closeModal} />, { modalWidth: 480, closable: false, wrapClassName: '', maskStyle: {}, onAfterClose: null })
    }
    console.log('onClickBtnGoToStartGame')
  }
  useEffect(() => {
    const getDataCharaters = async () => {
      const res = await GameService.getGameCharacters()
      if (res.data) {
        setCardList(res.data)
        setLoading(false)
      }
    }
    if (userData?.isReceived && isSigned) {
      myModal.current.openModal(<ModalReceived onClickBtn={onClickBtnGoToStartGame} />, { modalWidth: 480, closable: false, wrapClassName: '', maskStyle: {}, onAfterClose: null })
    } else {
      getDataCharaters()
    }
    return () => {
      dispatch({ type: 'SET_USER', payload: { ...userData, isNewUser: false } })
    }
  }, [totalCharacters])

  const onCreate = async () => {
    if (isSigned) {
      let listMintCha = []
      cardSelected.map(item => {
        listMintCha.push(item.key)
      })
      const minting = await GameService.mintCharacters(listMintCha, await cookiesService.getCookiesByName())

      if (minting && minting?.status === 'success') {
        myModal.current.openModal(<ModalReceivedCharacters title={messages.receiveSuccess} description={messages.warningReceive} onclickBtn={() => {
          Router.pushRoute('/my-nfts')
        }} />, { modalWidth: 480, closable: false, wrapClassName: '', maskStyle: {}, onAfterClose: null })

        //
      } else {
        console.log('error', minting)
      }
    } else {
      openModalSignIn()
    }

    // Router.pushRoute('/playGame')
  }
  const itemCharacters = () => {
    return (
      cardList.map((item, index) => {
        let isSelected = cardSelected.findIndex(e => e.key === item.key) !== -1
        return (
          <ItemCharacter opacity={!!isSelected} key={index} style={{ margin: 13 }}>
            <ContentCharacter
              className={'game-screen__card-item' + (isSelected ? ' selected' : '')}
              onClick={() => { if (alowSelect)toggleCardSelected(item) }}
              src={item.image}

            >
              <img
                src={isSelected ? images.icSelectedCharacter : images.icSelectCharacter}
                style={{
                  color: 'white',
                  padding: 2,
                  height: 20,
                  width: 20,
                  borderRadius: 10
                }}
              />
            </ContentCharacter>
          </ItemCharacter>

        )
      })
    )
  }
  const openModalSignIn = async () => {
    await Observer.emit(OBSERVER_KEY.SIGN_IN)
    ReduxServices.setIsOpenModalWarning(true)
  }
  const btnCancelButtonNoThanks = () => {
    if (isSigned) {
      if (userData?.isNewUser || !isSigned) {
        console.log('isNewUser', userData)
        Router.pushRoute('/')
      } else if (totalCharacters < 3 && isSigned) {
        console.log('not Received')
        myModal.current.openModal(<ModalGetCharacters closeModal={closeModal} />, { modalWidth: 480, wrapClassName: '', onAfterClose: null })
      }
    } else {
      openModalSignIn()
    }
  }

  const OptionSelect = () => {
    return <div style={{ width: '100%', fontSize: '16px' }}>
      <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          {messages.receiveCharacters.youNeedToHaveAtLeast3CharactersToJoinTheGame}
        </div>
        <div className='MT20 MB20'>
          {messages.receiveCharacters.wouldYouLikeToSelectYourCharactersFromThisListAndPlayForFreeInOneWeek}
        </div>
      </div>
      <OptionSelectButtonContainer >

        <ButtonNoThanks type={3} onClick={() => {
          btnCancelButtonNoThanks()
        }}>
          {messages.common.noThanks}
        </ButtonNoThanks>
        <ButtonSelect

          allow
          onClick={() => {
            if (isSigned) {
              setAllowSelect(true)
            } else {
              openModalSignIn()
            }
          }}
          htmlType='submit'
          className='ML15'
          loading={false}
          disabled={false}
        >
          {messages.common.select}
        </ButtonSelect>
      </OptionSelectButtonContainer>

    </div>
  }
  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }

  return (
    <Container >
      <ContentContainer
      >
        <img src={'https://ipfs.pantograph.app/ipfs/QmRCuDUYGLyr8UYbxKSCYwGsgu3Z7aHrJaYU4jVD9ZxCCX?filename=Frame%20592.png'}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 0
          }}
        />
        <div style={{ zIndex: 100, position: 'relative' }}>
          {!loading ? (
            <ContainerContent >
              <div>
                <ListCharacter>
                  {alowSelect && itemCharacters()}
                </ListCharacter>
              </div>
              <div style={{ width: '100%' }}>
                {
                  cardSelecting && <Line className='MB20 MT20' />
                }
                <ListCharacterDetails >
                  {
                    cardSelecting ? (
                      <>
                        <CharacterDetails >
                          <ImgCharacter >
                            <ImgCard src={cardSelecting?.image} />
                          </ImgCharacter>
                          <InforCharacter >
                            <AttributeNFT
                              titleAttribute={messages.attributes}
                              titleBaseStats={messages.baseStats.title}
                              hp={cardSelecting?.hp}
                              attack={cardSelecting?.atk}
                              defend={cardSelecting?.def}
                              speed={cardSelecting?.speed}
                              critical={cardSelecting?.critical}
                              luck={cardSelecting?.luck}
                              typeElement={cardSelecting?.element ?? 'dieencong'}
                            />

                          </InforCharacter>
                        </CharacterDetails>
                        <div>
                          <div className='MT20'>
                            <OptionSelectButtonContainer>
                              <ButtonCancel type={3} onClick={() => btnCancelButtonNoThanks()}>
                                {messages.common.cancel}
                              </ButtonCancel>
                              <ButtonReceived
                                allow={cardSelected.length < 3}
                                onClick={cardSelected.length === 3 ? onCreate : null}
                                htmlType='submit'
                                className='ML15'
                                // loading={actionLoading}
                                disabled={cardSelected.length < 3}
                              >
                                {messages.common.received}
                              </ButtonReceived>
                            </OptionSelectButtonContainer>
                          </div>
                        </div>
                      </>

                    ) : (
                      !alowSelect && <OptionSelect />
                    )
                  }

                </ListCharacterDetails>
              </div>
            </ContainerContent>
          )
            : (
              <Loading />
            )}
        </div>

      </ContentContainer>
      <MyModal ref={myModal} />
    </Container>
  )
}

export default GameScreen
