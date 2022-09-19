import { images } from 'config/images'
import React, { useState, useEffect, useRef } from 'react'

import {
  Container,
  MainContainer,
  TitleScreen,
  ImageLogo,
  InputWrapper,
  Button,
  BackContainer,
  ContainerCountdown,
  NumberCountDown,
  ContainerPlaying,
  NumberPlayerContainer,
  NumberPlayer,
  TxtWraning,
  TxtNotice
} from './styled'
import { Form, Spin } from 'antd'

import Input from 'pages/Components/Input'
import { useSelector } from 'react-redux'
import { validateAddress } from 'common/function'
import MyModal from 'pages/Components/MyModal'
import ModalSildeToVerify from './components/ModalSlideToVerify'
import PlayGameBountyBelt from './components/PlayGameBountyBelt'
import ModalAfterGame from './components/ModalAfterGame'
import ModalRankingGamebountyBelt from './components/ModalRankingGameBountyBelt'

import Gradient from 'rgt'
import ModalWarning from './components/ModalWarning'
import useOnlineStatus from 'hooks/useOnlineStatus'
import ModalConncetionNetwork from './components/ModalConnectionNetwork'

const GameBountyBelt = ({ closeGame }) => {
  const online = useOnlineStatus()
  const userData = useSelector(state => state.userData)
  const messages = useSelector(state => state.locale.messages)
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)
  const [numberOfPlays, setNumberOfPlays] = useState(0)
  const [isPlaying, setPlaying] = useState(false)
  const [statusGame, setStatusGame] = useState({ status: '' })
  const [numberCountDown, setNumberCountDown] = useState(3)

  const [form] = Form.useForm()
  const myModal = useRef(null)

  const [formData, setFormData] = useState({
    address: userData?.address ?? ''
  })

  const countDownNum = () => {
    setNumberCountDown((prev) => prev - 1)
  }
  let intervalRef = useRef()

  useEffect(() => {
    if (!online) {
      myModal.current.openModal(
        <ModalConncetionNetwork closeModals={closeModals} />,
        {
          modalWidth: 480
        }
      )
    }
  }, [online])
  useEffect(() => {
    if (statusGame?.status === 'countdown' && numberCountDown < 0) {
      setStatusGame({ status: 'inGame' })
      return () => clearInterval(intervalRef.current)
    }
  }, [numberCountDown, statusGame])
  useEffect(() => {
    if (statusGame?.status === 'countdown' && numberCountDown > 0) {
      intervalRef.current = setInterval(countDownNum, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [statusGame])

  const onCheckAddress = (rule, value) => {
    console.log('onCheckAddress', rule, value)
    if (value === '') {
      return Promise.reject(messages.form.emptyAddress)
    } else if (!validateAddress(value)) {
      return Promise.reject(messages.form.txtWarningInvalidAddess)
    }
  }
  const onSubmit = () => {
    openModalSlideToVerify()
  }
  const onRanking = () => {
    myModal.current.openModal(<ModalRankingGamebountyBelt closeModals={closeModals} />, { modalWidth: 480 })
  }
  const openModalSlideToVerify = () => {
    myModal.current.openModal(<ModalSildeToVerify closeModals={closeModals} setPlaying={setPlaying} setStatusGame={setStatusGame} />, { modalWidth: 480 })
  }
  const openModalAfterGame = (type, title, descriptions) => {
    myModal.current.openModal(
      <ModalAfterGame
        type={type}
        closeModals={closeModals}
        title={title}
        descriptions={descriptions}
        onExitGame={onResetGame}
      />,
      {
        modalWidth: 480,
        closable: false,
        wrapClassName: '',
        maskStyle: {},
        onAfterClose: null
      }
    )
  }
  const closeModals = () => {
    myModal.current && myModal.current.closeModal()
  }

  const onResetGame = () => {
    setPlaying(false)
    setStatusGame({ status: '' })
    setNumberCountDown(3)
  }
  // useEffect(() => {
  //   window.addEventListener('beforeunload', (ev) => {
  //     if (isPlaying) {
  //       ev.preventDefault()
  //       return (ev.returnValue = 'Are you sure you exit game?')
  //     }
  //   })
  // }, [isPlaying])
  const onBack = () => {
    myModal.current.openModal(
      <ModalWarning
        closeModals={closeModals}
        onResetGame={onResetGame}
      />,
      { modalWidth: 480 }
    )
  }
  return (
    <Container>
      <MainContainer>
        {!isPlaying ? (
          <>
            <TitleScreen textTransform>Bouty Belt</TitleScreen>
            <NumberPlayerContainer>
              <NumberPlayer>
                <div>Number of players: </div>
                <div>{numberOfPlayers}</div>
              </NumberPlayer>
              <NumberPlayer>
                <div>Number of plays:</div>
                <div>{numberOfPlays}</div>
              </NumberPlayer>
            </NumberPlayerContainer>

            <ImageLogo draggable='false' src={images.logo} />
            <InputWrapper>
              <Form
                form={form}
                initialValues={formData}
                onValuesChange={(changedValues, allValue) =>
                  setFormData(allValue)
                }
              >
                <Form.Item
                  name={'address'}
                  rules={[{ validator: onCheckAddress }]}
                >
                  <Input
                    className='MT20'
                    placeholder='Input Address'
                    maxLength={50}
                  />
                </Form.Item>
                <p style={{ color: 'white', textAlign: 'right', margin: 0 }}>
                  {formData.address.length}/50
                </p>
              </Form>
            </InputWrapper>
            <Button
              className='MB20 MT20'
              disabled={
                !formData?.address ||
                !validateAddress(formData?.address) ||
                formData?.address.length < 42 ||
                !online
              }
              onClick={() => onSubmit()}
            >
              Start Game
            </Button>
            <Button type={3} onClick={() => onRanking()}>
              Ranking
            </Button>

            <Button className='MT20' type={1} onClick={() => closeGame()}>
              Cancel
            </Button>
            {!online && <TxtNotice>*Please connect to network</TxtNotice>}
          </>
        ) : (
          <>
            {statusGame.status === 'countdown' ? (
              <ContainerCountdown>
                <NumberCountDown>
                  {numberCountDown <= 0 ? 'START' : numberCountDown}
                </NumberCountDown>
                <TxtWraning>
                  Notice: The game will end immediately if you leave the game
                  screen or internet connection is interrupted.
                </TxtWraning>
              </ContainerCountdown>
            ) : statusGame.status === 'inGame' ? (
              <ContainerPlaying>
                <BackContainer>
                  <button
                    onClick={() => {
                      onBack()
                    }}
                  >
                    <img src={images.icBack} />
                  </button>
                </BackContainer>
                <PlayGameBountyBelt openModalAfterGame={openModalAfterGame} />
              </ContainerPlaying>
            ) : (
              <></>
            )}
          </>
        )}
      </MainContainer>
      <MyModal ref={myModal} />
    </Container>
  )
}

export default GameBountyBelt
