import { images } from 'config/images'
import { MediumText, NormalText, TitleText } from 'pages/Components/TextSize'
import { ContainerButtonWithRawContinue } from 'pages/Screen/MyNFTDetailScreen/style'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import NumberGame from '../NumberGame'
import Observer from 'common/observer'
import {
  OBSERVER_KEY
} from 'common/constants'
import { useSelector } from 'react-redux'
import GradientText from 'pages/Components/GradientText'
import useOnlineStatus from 'hooks/useOnlineStatus'

const Container = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction: column;
`
const TimeContainer = styled.div`
display: ${props => props.finish ? 'flex' : 'unset'};
justify-content: center;
align-items: baseline;
gap: 16px;
margin-bottom:16px;

`
const TitleTime = styled(MediumText)`
`
const ContentTime = styled(TitleText)`
font-size: ${props => props.finish ? '16px' : '24px'};

`
const ContainerNumber = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  /* grid-gap: 16px; */
  justify-content: center;
  row-gap: 12px;
  margin-top:12px;
`
const ReLoadBoard = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
`
const ImageReload = styled.img`
width:16px;
height:16px;
margin-right: 2px;
`

const TxtNew = styled(MediumText)`
 background: -webkit-linear-gradient(91.83deg, #dd5ee4 0%, #20e7f9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const TxtFinish = styled(NormalText)`
font-size:36px;

`

const PlayGameBountyBelt = ({ openModalAfterGame, updateStatusGame }) => {
  const online = useOnlineStatus()
  const messages = useSelector(state => state.locale.messages)
  const [num, setNum] = useState(0)
  const [preNumber, setPreNumber] = useState(0)
  const [arrFinal, setArrFinal] = useState([])
  const TIME_COUNT = 3000// 30s=3000
  const STEP_TO_WIN = 1
  const [isFinish, setIsFinish] = useState(false)
  const [isLost, setIsLost] = useState(false)
  const decreaseNum = () => {
    setNum((prev) => prev + 1)
  }
  let intervalRef = useRef()
  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 10)
    return () => clearInterval(intervalRef.current)
  }, [])
  useEffect(() => {
    // Lost
    if (num === TIME_COUNT) {
      clearInterval(intervalRef.current)
      openModalAfterGame('lost', messages.bountyBelt.titleLostAfterGame, messages.bountyBelt.descriptionLostAfterGame)
      setIsLost(true)
    }
  }, [num])

  useEffect(() => {
    randomAndCreateArr()
  }, [])
  useEffect(() => {
    if (!online) {
      clearInterval(intervalRef.current)
      setTimeout(() => {
        openModalAfterGame(
          'lost',
          messages.bountyBelt.titleLostAfterGame,
          `The game is over since your network connection is interrupted. To continue to play now, please connect to network before and pay a fee of 5 BWP/time`
        )
        setIsLost(true)
      }, 1000)
    }
  }, [online])
  const userExitGame = () => {

    // clearInterval(intervalRef.current);
    // openModalAfterGame('lost', messages.bountyBelt.titleLostAfterGame, messages.bountyBelt.descriptionLostAfterGame)

  }
  const shuffle = (array) => {
    var tmp; var current; var top = array.length
    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1))
        tmp = array[current]
        array[current] = array[top]
        array[top] = tmp
      }
    }
    return array
  }
  const randomAndCreateArr = () => {
    let arrNumber = []
    for (let i = 1; i <= 30; i++) {
      arrNumber.push(
        {
          _id: i,
          number: i,
          isSelected: false,
          image: null
        }
      )
    }
    setArrFinal(shuffle(arrNumber))
  }
  const onClickNumber = (number) => {
    if (number - preNumber === 1) {
      var myIndex = arrFinal.findIndex(function (item) {
        return item.number === number
      })
      console.log({ myIndex })
      const temp = arrFinal[myIndex]
      arrFinal[myIndex] = { ...temp, isSelected: true }
      setPreNumber(number)
      if (number === STEP_TO_WIN) {
        setIsFinish(true)
        clearInterval(intervalRef.current)
        setTimeout(() => {
          openModalAfterGame('win', 'You Won!', `You will receive award.`)
        }, 1000)
        // post api to win
      }
    } else {
      console.log('wrong')
    }
  }
  const onResetBoard = () => {
    console.log('onReloadBoard')
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(decreaseNum, 10)
    randomAndCreateArr()
    setNum(0)
    setPreNumber(0)
  }
  const onPayToPlay = () => {
  // xu ly tru tien
    onResetBoard()
  }
  useEffect(() => {
    Observer.on(OBSERVER_KEY.AGREE_TO_PAY_GAME_BOUNTY_BELT, onPayToPlay)

    return function cleanup () {
      Observer.removeListener(
        OBSERVER_KEY.AGREE_TO_PAY_GAME_BOUNTY_BELT,
        onPayToPlay
      )
    }
  }, [])
  const switchTabBrowser = () => {
    if (document.hidden) {
      //
    } else {
      if (!isLost) {
        openModalAfterGame(
          'lost',
          'You Lost',
          `The game is over since you have left the game screen for a while. To continue to play now, please pay a fee of 5 BWP/time`
        )
        setIsLost(true)
        clearInterval(intervalRef.current)
      }
    }
  }
  useEffect(() => {
    document.addEventListener('visibilitychange', switchTabBrowser)

    return () =>
      document.removeEventListener('visibilitychange', switchTabBrowser)
  }, [isLost])

  return (
    <Container>
      {isFinish &&
      <GradientText>
        <TxtFinish textTransform>
          Finished
        </TxtFinish>
      </GradientText>

      }
      <TimeContainer finish={isFinish} >

        <TitleTime >
          Time {isFinish && ':'}
        </TitleTime>
        <ContentTime finish={isFinish} >
          {Math.floor(num / 100) < 10 ? '0' + Math.floor(num / 100) : Math.floor(num / 100)} : {num % 100 < 10 ? '0' + Math.floor(num % 100) : Math.floor(num % 100)}
        </ContentTime>

      </TimeContainer>
      {/* <ReLoadBoard onClick={onReloadBoard}>
        <ImageReload src={images.icReloadBoard} />
        <TxtNew textTransform >
          New
        </TxtNew>
      </ReLoadBoard> */}
      <ContainerNumber>
        {
                  arrFinal?.map((item, index) =>
                    (
                      <NumberGame key={index} number={item} onClickNumber={onClickNumber} />
                    )
                  )
        }
      </ContainerNumber>

    </Container>

  )
}

export default PlayGameBountyBelt
