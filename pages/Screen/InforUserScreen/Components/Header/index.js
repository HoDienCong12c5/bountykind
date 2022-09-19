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
  ContainerOptions
} from './styled'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import { ellipsisAddress } from 'common/function'
import MyModal from 'pages/Components/MyModal'
const HeaderMyNFTScreen = (props) => {
  const { userName, address } = props
  const userData = useSelector(state => state.userData)
  const myModal = useRef(null)

  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }
  const onChangeAmount = e => {
    console.log(e)
  }
  return (
    <ContainerHeader>
      <Left>
        <ContainerAvatar>
          <Avatar size={100} />
        </ContainerAvatar>
        <UserDetail>
          <div>Name : Cong</div>
          <div>{`Address : ${ellipsisAddress(userData?.address)}`}</div>
          <div>Level : 1</div>
        </UserDetail>
      </Left>

      <MyModal ref={myModal} />
    </ContainerHeader>
  )
}
export default HeaderMyNFTScreen
