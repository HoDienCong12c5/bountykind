import React, { useEffect, useState, useRef } from 'react'
import {
  ContainerHeader,
  Left,
  UserDetail,
  ContainerAvatar,
  AvatarUser
} from './styled'
import { useSelector } from 'react-redux'
import { roundingNumber, ellipsisAddress, detectImageUrl, convertBalanceToWei, copyToClipboard } from 'common/function'
import MyModal from 'pages/Components/MyModal'
import { useQueryClient } from 'react-query'
import { images } from 'config/images'
import { SnippetsOutlined } from '@ant-design/icons'
import GameService from 'services/gameService'
const HeaderMyNFTScreen = (props) => {
  const { addressPlayer } = props
  const queryClient = useQueryClient()
  const myModal = useRef(null)
  // store
  const userInfo = useSelector(state => state.userInfo)
  const userData = useSelector(state => state.userData)
  const contractExchange = useSelector(state => state.settingRedux?.bsc?.contract_exchange)
  const energyContract = useSelector(state => state.settingRedux?.bsc?.contract_energy)
  const tokenBase = useSelector(state => state.settingRedux?.tokenBase)

  // use query

  // use state
  const [inforPlayer, setInforPlayer] = useState({})
  const [loading, setLoading] = useState(true)
  // get data
  useEffect(() => {
    const getToken = async () => {
      const _inforPlayer = await GameService.getInforPlayer(addressPlayer)
      if (_inforPlayer) {
        setInforPlayer(_inforPlayer.data)
        setLoading(false)
      }
    }
    if (addressPlayer) {
      getToken()
    }
  }, [addressPlayer])
  // function
  return (
    <ContainerHeader>
      <Left>
        <ContainerAvatar>
          <div >
            <AvatarUser
              src={detectImageUrl(inforPlayer?.image || images.avatarDefault)}
              size={100}
            />
          </div>

        </ContainerAvatar>
        <UserDetail>
          <div style={{ }}>
            Name
            {
              ` : ${inforPlayer && ellipsisAddress(inforPlayer.username || '')}`
            }
          </div>
          <div>{`Address : ${addressPlayer && ellipsisAddress(addressPlayer, 5, 4)}`} <SnippetsOutlined onClick={() => copyToClipboard(userData?.address)} style={{ marginLeft: 3 }} /></div>
          {/* <div>BWP : {inforPlayer?.bwp}</div>
          <div> Yu Point : {numberWithCommas(roundingNumber(userGameInfo?.yuPoint ?? 0, 3))}</div>
          <div> Energy : {numberWithCommas(roundingNumber(userGameInfo?.energy ?? 0, 3)) }</div> */}
        </UserDetail>
      </Left>
      <MyModal ref={myModal} />
    </ContainerHeader>
  )
}
export default HeaderMyNFTScreen
