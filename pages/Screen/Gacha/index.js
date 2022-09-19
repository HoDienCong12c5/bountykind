import React, { useEffect, useRef, useState } from 'react'
import MyModal from 'pages/Components/MyModal'
import { Router } from 'common/routes'
import './style.scss'
import {
  Container,
  MainContainer,
  Title,
  MachinesContainer,
  Machine,
  MachineHeader,
  ImageContainer,
  Name
} from './style'
import GachaMachine from './GachaMachine'
import GameService from 'services/gameService'
import { useQuery, useQueryClient } from 'react-query'
import SelectSphere from './SelectSphere'
import { useSelector } from 'react-redux'
import { useGetUserSpheres } from 'hooks/useGetUserSpheres'
import { useGetGachaItems } from 'hooks/useGetGachaItems'
import { images } from 'config/images'
import ApproveModal from 'pages/Components/Modal/ApproveModal'
import Web3Services from 'controller/Web3'
import { REACT_QUERY_KEY, OBSERVER_KEY } from 'common/constants'
import ConfirmModal from 'pages/Components/Modal/ConfirmModal'
import MarketplaceButton from 'pages/Components/Marketplace/Button'
import StartedModal from 'pages/Components/Modal/StartedModal'
import Observer from 'common/observer'
import useAuth from 'hooks/useAuth'
import cookiesService from 'services/cookiesService'
const getGachaCharacters = async () => {
  const response = await GameService.getGachaCharacters()
  return response.data
}

const Gacha = () => {
  const userData = useSelector((state) => state.userData)
  const messages = useSelector((state) => state.locale.messages)
  const { isSigned } = useAuth()
  // useQuery
  const { userSpheres, isLoadingUserSpheres } = useGetUserSpheres(userData?.address, 'item')
  const [characterSpheresByBaseKey, setCharacterSpheresByBaseKey] = useState(null)
  const { gachaItems } = useGetGachaItems()
  const { data: gachaCharacters } = useQuery('gacha-characters', getGachaCharacters)

  const myModal = useRef(null)

  // use state
  const [itemSpheresByBaseKey, setItemSpheresByBaseKey] = useState(null)
  // use effect

  useEffect(() => {
    const _itemSpheresByBaseKey = []
    const _characterSpheresByBaseKey = []
    if (userSpheres?.itemSphereByBaseKey) {
      for (let property in userSpheres.itemSphereByBaseKey) {
        _itemSpheresByBaseKey.push({
          ...userSpheres.itemSphereByBaseKey[property],
          baseKey: property
        })
      }
      setItemSpheresByBaseKey(_itemSpheresByBaseKey)
    }
    if (userSpheres?.characterSphereByBaseKey) {
      for (let property in userSpheres.characterSphereByBaseKey) {
        _characterSpheresByBaseKey.push({
          ...userSpheres.characterSphereByBaseKey[property],
          baseKey: property
        })
      }
      setCharacterSpheresByBaseKey(_characterSpheresByBaseKey)
    }
  }, [userSpheres])
  //
  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }

  const getListRadomGiftNFT = async (baseKey) => {
    const res = await GameService.getGiftNft(baseKey)
    if (res) {
      return res.data
    }
    return []
  }
  const openSelectTypeModal = async (data) => {
    myModal.current.openModal(
      <SelectSphere data={data} onConfirm={onConfirmSelectType} />,
      { wrapClassName: 'gacha-modal', modalWidth: 500 }
    )
  }

  const onConfirmSelectType = async (data) => {
    const { selectedSphere } = data
    const sphereNow = selectedSphere.baseKey
    const listRadom = await getListRadomGiftNFT(sphereNow)
    data.items = listRadom
    data.spheres = selectedSphere.spheres
    openGachaMachineModal(data)
  }

  const openGachaMachineModal = (data) => {
    console.log({ data })
    myModal.current.openModal(
      <GachaMachine data={data} closeModal={closeModal} />,
      { wrapClassName: 'gacha-modal-animation', modalWidth: '100%' }
    )
  }

  return (
    <>
      <Container>
        <MainContainer>
          <Title>{messages.gacha.luckyDraw}</Title>
          <MachinesContainer>
            {gachaCharacters?.length > 0 && (
              <Machine>
                {/* <MachineHeader>History</MachineHeader> */}
                <ImageContainer image={images.gacha.gachaChar} />
                <Name>{messages.gacha.charactersGacha}</Name>
                <MarketplaceButton
                  style={{ marginTop: '26px' }}
                  height='auto'
                  onClick={() => {
                    if (isSigned) {
                      openSelectTypeModal({
                        type: 'character',
                        items: [],
                        spheres: characterSpheresByBaseKey
                      })
                    } else {
                      Observer.emit(OBSERVER_KEY.SIGN_IN)
                    }
                  }}
                >
                  {messages.common.select}
                </MarketplaceButton>
              </Machine>
            )}
            {gachaItems?.length > 0 && !isLoadingUserSpheres && (
              <Machine>
                {/* <MachineHeader>History</MachineHeader> */}
                <ImageContainer image={images.gacha.gachaItem} />
                <Name>{messages.gacha.itemGacha}</Name>
                <MarketplaceButton
                  style={{ marginTop: '26px' }}
                  height='auto'
                  onClick={() => {
                    if (isSigned) {
                      openSelectTypeModal({
                        type: 'item',
                        items: [],
                        spheres: itemSpheresByBaseKey
                      })
                    } else {
                      Observer.emit(OBSERVER_KEY.SIGN_IN)
                    }
                  }}
                >
                  {messages.common.select}
                </MarketplaceButton>
              </Machine>
            )}
          </MachinesContainer>
        </MainContainer>
        <MyModal ref={myModal} />
      </Container>
      {/* <ul className='bg-bubbles'>
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul> */}
    </>

  )
}

export default Gacha
