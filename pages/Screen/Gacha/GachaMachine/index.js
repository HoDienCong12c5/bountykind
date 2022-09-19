import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'react-lottie'
import gachaEffect from './Effect.json'
import gachaMobileEffect from './Effect-mobile.json'
import Media from 'react-media'
import {
  ButtonGroup,
  ButtonGroupMobile,
  CancelButton,
  Container,
  LottieContainer,
  PlayButton,
  ResultImage,
  ResultImageMobile
} from './style'
import GameService from 'services/gameService'
import { useQueryClient } from 'react-query'
import { REACT_QUERY_KEY, COOKIES_STORAGE } from 'common/constants'
import { useSelector } from 'react-redux'
import Observer from 'common/observer'
import Web3Services from 'controller/Web3'
import cookiesService from 'services/cookiesService'
const GachaMachine = ({ data, closeModal }) => {
  const contractGacha = useSelector(
    (state) => state.settingRedux?.bsc?.contract_gacha
  )
  const messages = useSelector((state) => state.locale.messages)
  const userData = useSelector((state) => state.userData)
  const { items, selectedSphere } = data
  const [result, setResult] = useState(null)
  const [isOpen, setOpen] = useState(false)
  const [isShowNft, setShowNft] = useState(false)
  const [isShowDetailsModal, setShowDetailModal] = useState(false)
  const queryClient = useQueryClient()
  const videoRef = useRef()
  const [actionLoading, setActionLoading] = useState(false)

  // use effect
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setShowNft(true)
        setActionLoading(false)
      }, 2700)
    }
  }, [isOpen])

  useEffect(() => {
    if (result) {
      videoRef.current.playbackRate = 1
      setOpen(true)
    }
  }, [result])

  useEffect(() => {
    if (videoRef) {
      videoRef.current.playbackRate = 1
    }
  }, [videoRef])

  const getGachaResult = async (txHash) => {
    const response = await GameService.getGachaResult(await cookiesService.getCookiesByName(), txHash)
    queryClient.invalidateQueries(REACT_QUERY_KEY.GET_USER_SPHERES)
    return response.data
  }

  const handlePlay = async () => {
    setActionLoading(true)
    const isApproved = await Web3Services.checkApprovedForAll(
      userData?.address,
      data.spheres[0].contractAddress,
      contractGacha
    )
    if (isApproved) {
      buyTicketByNft()
    } else {
      const callbackBeforeDone = () => {}
      const callbackAfterDone = () => {
        buyTicketByNft(data)
      }
      const callbackRejected = () => {
        setActionLoading(false)
      }
      await Web3Services.approveAllNFT(
        userData?.address,
        data.spheres[0].contractAddress,
        contractGacha,
        callbackBeforeDone,
        callbackAfterDone,
        callbackRejected
      )
    }
  }

  const buyTicketByNft = async () => {
    const callbackBeforeDone = () => {
      videoRef.current.playbackRate = 5
    }
    const callbackAfterDone = async (txHash) => {
      const res = await getGachaResult(txHash)
      setResult(res)
    }
    const callbackRejected = () => {
      setActionLoading(false)
    }
    const ticketId = Math.round(Date.now() + Math.random())
    Web3Services.buyTicketByNft(
      userData?.address,
      ticketId,
      data.spheres[0].contractAddress,
      data.spheres[0].nftId,
      contractGacha,
      callbackBeforeDone,
      callbackAfterDone,
      callbackRejected
    )
  }
  return isShowDetailsModal ? (
    <Container
      onClick={() => closeModal && closeModal()}
      image='https://64.media.tumblr.com/4f1524f07829aac074bd4044a64b3b15/tumblr_piref8qXoS1qeyvpto1_500.gifv'
    />
  ) : (
    <Container
      image={
        'https://i.pinimg.com/originals/0c/ad/37/0cad37072b28bdd009b7021e7bd981da.gif'
      }
    >
      <LottieContainer>
        <Media
          queries={{
            small: '(max-width: 768px)',
            large: '(min-width: 769px)'
          }}
        >
          {(matches) => (
            <>
              {matches.small && (
                <>
                  <video
                    ref={videoRef}
                    className='video'
                    muted
                    autoPlay
                    loop
                    src={'/videos/gachaBG-mobile.mp4'}
                  />
                  <Lottie
                    style={{
                      pointerEvents: 'none'
                    }}
                    className='lottie'
                    options={{
                      loop: false,
                      autoplay: false,
                      animationData: gachaMobileEffect
                    }}
                    isPaused={!isOpen}
                  />
                  {isShowNft && (
                    <ResultImageMobile
                      image={
                        items.filter((item) => item.key === result.key)[0].data
                          .image
                      }
                    />
                  )}
                  {!actionLoading && !result && (
                    <ButtonGroupMobile>
                      <CancelButton width={'50%'} type={1} onClick={() => closeModal()}>Cancel</CancelButton>
                      <PlayButton width={'50%'} onClick={handlePlay}>Play</PlayButton>
                    </ButtonGroupMobile>
                  )}
                  {!actionLoading && result && (
                    <ButtonGroupMobile>
                      <PlayButton width={'50%'} onClick={() => closeModal()}>OK</PlayButton>
                    </ButtonGroupMobile>
                  )}
                </>
              )}
              {matches.large && (
                <>
                  <video
                    ref={videoRef}
                    className='video'
                    muted
                    autoPlay
                    loop
                    src={'/videos/gachaBG.mp4'}
                  />
                  <Lottie
                    style={{
                      pointerEvents: 'none'
                    }}
                    className='lottie'
                    options={{
                      loop: false,
                      autoplay: false,
                      animationData: gachaEffect
                    }}
                    isPaused={!isOpen}
                  />
                  {isShowNft && (
                    <ResultImage
                      image={
                        items.filter((item) => item.key === result.key)[0].data
                          .image
                      }
                    />
                  )}
                  {!actionLoading && !result && (
                    <ButtonGroup>
                      <CancelButton width={'15%'} type={1} onClick={() => closeModal()}>{messages.common.cancel}</CancelButton>
                      <PlayButton width={'15%'} onClick={handlePlay}>{messages.common.play}</PlayButton>
                    </ButtonGroup>
                  )}
                  {!actionLoading && result && (
                    <ButtonGroup>
                      <PlayButton width={'15%'} onClick={() => closeModal()}>OK</PlayButton>
                    </ButtonGroup>
                  )}
                </>
              )}
            </>
          )}
        </Media>
      </LottieContainer>
    </Container>
  )
}

export default GachaMachine
