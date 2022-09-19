import React, { useEffect, useState, useRef } from 'react'
import {
  ContainerHeader,
  Left,
  Right,
  UserDetail,
  DetailToken,
  Buttons,
  ContainerAvatar,
  ItemToken,
  Amount,
  NameToken,
  ContainerOptions,
  AvatarUser,
  ButtonClaim,
  IconEditInAvatar,
  Icon,
  ContainerAvatarProfile,
  ContainerIconToken,
  NumberToken,
  Address,
  ContainerUserName
} from './styled'
import { useSelector } from 'react-redux'
import MyModal from 'pages/Components/MyModal'
import ChargeAndSwap from '../ChargeToken'
import { Router } from 'common/routes'
import { useGetUserGameInfo } from 'hooks/useGetUserGameInfo'
import Web3Services from 'controller/Web3'
import { useQueryClient } from 'react-query'
import { REACT_QUERY_KEY } from 'common/constants'
import { images } from 'config/images'
import { EditOutlined, SnippetsOutlined } from '@ant-design/icons'
import ModalExchange from './components/ModalExchange'
import ModalEditAvatar from './components/ModalEditAvatar'
import UserService from 'services/userService'
import GameService from 'services/gameService'
import ReduxServices from 'common/redux'
import ExchangeToYuModal from './components/ExchangeToYuModal'
import {
  isNotEnoughGas,
  showNotification, roundingNumber, ellipsisAddress, detectImageUrl, convertBalanceToWei, numberWithCommas, copyToClipboard
} from 'common/function'
import ConfirmModal from 'pages/Components/Modal/ConfirmModal'
import Refill from 'pages/Components/Modal/Refill'
import './style.scss'
import cookiesService from 'services/cookiesService'
const HeaderMyNFTScreen = (props) => {
  const queryClient = useQueryClient()
  const myModal = useRef(null)
  // store
  const userInfo = useSelector(state => state.userInfo)
  const userData = useSelector(state => state.userData)
  const energyContract = useSelector(state => state.settingRedux?.bsc?.contract_energy)
  const tokenBase = useSelector(state => state.settingRedux?.tokenBase)
  const messages = useSelector(state => state.locale.messages)
  // use query
  const { userGameInfo } = useGetUserGameInfo()

  // use state
  const [YuToken, setYuToken] = useState({})
  const [EnergyToken, setEnergyToken] = useState({})
  const [yuPoint, setYuPoint] = useState(null)

  // get data
  useEffect(() => {
    if (userGameInfo?.yuPoint) {
      setYuPoint(Number(userGameInfo?.yuPoint))
    }
  }, [userGameInfo?.yuPoint])

  useEffect(() => {
    if (userData && tokenBase && energyContract) {
      getToken('yu')
      getToken('energy')
    }
  }, [userGameInfo?.yuPoint, userGameInfo?.energy, userData, tokenBase, energyContract, yuPoint])

  const getToken = async (type) => {
    if (type === 'yu') {
      const balance = await Web3Services.getTokenBalance(userData.address, tokenBase.address)
      setYuToken({
        amount: balance,
        symbol: tokenBase.symbol,
        contract: tokenBase.address
      })
    } else {
      const balance = await Web3Services.getTokenBalance(userData.address, energyContract)
      const symbolTemp = await Web3Services.getTokenSymbol(energyContract)
      if (balance && symbolTemp) {
        setEnergyToken({
          amount: balance,
          symbol: 'Energy',
          contract: energyContract
        })
      }
    }
  }
  // function
  const onSwapToken1 = () => {
    // Router.push('/infor-user')
  }
  const onSwapToken2 = () => {

  }

  const editProfile = (type) => {
    if (type === 'name') {
      myModal.current.openModal(
        <ModalEditAvatar
          onSaveUpdate={() => saveEditProfile('image')}
          userData={userData}
          onSave={saveEditProfile}
          textOld={userGameInfo?.username}
        />
      )
    }
    if (type === 'image') {
      myModal.current.openModal(

        <ModalEditAvatar
          onSaveUpdate={() => saveEditProfile('image')}
          userData={userData}
          onSave={saveEditProfile}
          textOld={userGameInfo?.username}
        />
      )
    }
  }
  const saveEditProfile = async (type, data) => {
    if (type === 0) {
      const res = await UserService.updateUser({
        username: data
      }, await cookiesService.getCookiesByName())
      if (res) {
        queryClient.invalidateQueries([REACT_QUERY_KEY.GET_USER_GAME_INFO])
        closeModals()
      }
    }
    if (type === 'image') {
      ReduxServices.setUserInfo()
      queryClient.invalidateQueries([REACT_QUERY_KEY.GET_USER_GAME_INFO])
      closeModals()
    }
  }

  const chargeYuPointToToken = async (e) => {
    await cookiesService.checkHasCookies()
    const confirmBefore = async () => {
      myModal.current.openModal(
        <ModalExchange
          title={`${messages.token.claimYu}`}
          description={`${messages.token.desYu}`}
          finish={closeModals}
        />,
        { closable: false }
      )
    }
    const confirmAfter = async () => {
      queryClient.invalidateQueries([REACT_QUERY_KEY.GET_USER_GAME_INFO])
      setYuPoint(Number(yuPoint) - Number(e))
      getToken('yu')
      myModal.current.openModal(
        <ModalExchange
          title={`${messages.token.claimYu}`}
          description={`${messages.token.desYu}`}
          noLoading
          isFinish
          finish={closeModals}
        />
      )
      getToken('yu')
    }
    if (Number(e) > 0 && Number(e) <= Number(userGameInfo?.yuPoint)) {
      try {
        confirmBefore()
        const confirm = await GameService.changePointToToken(
          {
            type: 'yu',
            point: Number(e)
          },
          await cookiesService.getCookiesByName()
        )
        if (confirm?.data?.message === 'success') {
          confirmAfter()
        }
      } catch (e) {
        // console.log('e', e.message)
        closeModals()
        if (e.message === 'Request failed with status code 500') {
          showNotification(messages.token.errorYu)
        } else {
          showNotification(messages.errors.somethingWrong)
        }
      }
    }
  }

  const closeModals = () => {
    myModal.current && myModal.current.closeModal()
  }

  const showRefillModal = (type) => {
    myModal.current.openModal(
      <Refill
        type={type}
        YuToken={YuToken}
        EnergyToken={EnergyToken}
        myModal={myModal}

      />, { wrapClassName: 'my-nft-detail-modal', modalWidth: 500 })
  }
  const onExchange = (yuPointToExchange) => {
    chargeYuPointToToken(yuPointToExchange)
  }

  const showExchangeToYuModal = () => {
    myModal.current.openModal(
      <ExchangeToYuModal
        title={`${messages.token.claimYu}`}
        helperText={messages.token.enterAmountHelper}
        closeModal={closeModals}
        data={userGameInfo}
        onExchange={onExchange}
        myModal={myModal} />, { wrapClassName: 'my-nft-detail-modal', modalWidth: 500 })
  }

  return (
    <ContainerHeader>
      <Left>

        <UserDetail>
          <ContainerAvatarProfile onClick={() => editProfile('image')}>
            <IconEditInAvatar>
              <Icon onClick={() => editProfile('name')} src={images.icEditProfile} />

            </IconEditInAvatar>
            <AvatarUser
              src={userInfo?.image ? detectImageUrl(userInfo?.image) : images.avatarDefault}
              size={100}
            />
          </ContainerAvatarProfile>
          <ContainerUserName >
            <Address>
              {
                `  ${(userGameInfo?.username?.length === 42 && userGameInfo?.username?.startsWith('0x') &&
                  userGameInfo?.username === userData.address) ? ellipsisAddress(userGameInfo?.username || '', 5, 4) : (userGameInfo?.username ?? '')}`
              }
            </Address>
            <div>
              <Icon onClick={() => editProfile('name')} src={images.icEditProfile} />
            </div>

          </ContainerUserName>

          <div>{`Address : ${userData?.address && ellipsisAddress(userData?.address || 0, 5, 4)}`} <Icon onClick={() => copyToClipboard(userData?.address)} src={images.icCopyProfile} />
          </div>
          <div>BWP : {userGameInfo?.bwp}</div>
          <div> Yu Point : <NumberToken>{numberWithCommas(roundingNumber(yuPoint ?? 0, 3))}</NumberToken> {userGameInfo && <ButtonClaim onClick={() => showExchangeToYuModal()}>Claim</ButtonClaim>}</div>
          <div> Energy :<NumberToken>{numberWithCommas(roundingNumber(userGameInfo?.energy ?? 0, 3))}</NumberToken>  </div>

        </UserDetail>
      </Left>
      <Right>
        <ItemToken>

          <DetailToken>
            <ContainerAvatar>
              <ContainerIconToken>
                <img
                  style={{ width: 50, height: 50 }}
                  src='https://ipfs.pantograph.app/ipfs/QmctCXjXVUpTD7XeBuZYY1g7HZ2XSF1saggE5AKtoeCg2s?filename=YU.png'
                />
              </ContainerIconToken>

            </ContainerAvatar>
            <Amount style={{ textAlign: 'center' }}>{numberWithCommas(roundingNumber(YuToken.amount ?? 0, 3))}</Amount>

            <NameToken style={{ textAlign: 'center' }}>{` ${YuToken.symbol ?? '...'} Token`}</NameToken>
            <ContainerOptions >
              <Buttons type={1} onClick={onSwapToken1} >
                {messages.common.swapMore}
              </Buttons>
              <Buttons onClick={() => showRefillModal(1)}>{messages.common.charge}</Buttons>
            </ContainerOptions>
          </DetailToken>
        </ItemToken>
        <ItemToken>

          <DetailToken>
            <ContainerAvatar>
              <ContainerIconToken>
                <img
                  style={{ width: 50, height: 50 }}
                  src='https://ipfs.pantograph.app/ipfs/QmbyfzNQM3dox23fnD6orbSHszb5RCrEsXEweoQeMftCPR?filename=FFE.png'
                />
              </ContainerIconToken>

            </ContainerAvatar>

            <Amount style={{ textAlign: 'center' }}>{numberWithCommas(roundingNumber(EnergyToken.amount ?? 0, 3))}</Amount>
            <NameToken style={{ textAlign: 'center' }}>{EnergyToken.symbol} Token</NameToken>
            <ContainerOptions style={{ marginTop: 10 }}>
              <Buttons type={1} onClick={onSwapToken2}>
                {messages.common.swapMore}
              </Buttons>
              <Buttons onClick={() => showRefillModal(2)}>{messages.common.charge}</Buttons>
            </ContainerOptions>
          </DetailToken>
        </ItemToken>

      </Right>
      <MyModal ref={myModal} />
    </ContainerHeader>
  )
}
export default HeaderMyNFTScreen
