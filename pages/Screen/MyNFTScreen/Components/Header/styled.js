import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
import { DivAll, DivRadius } from 'pages/Components/DivBasic'
import { Avatar } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import { MediumText, NormalText, TitleText } from 'pages/Components/TextSize'
export const ContainerHeader = styled.div`
  width: 100%;
  max-width: 1550px;
  display: flex;
  flex-direction: row;
  background: transparent;
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  @media screen and (max-width: 768px) {
    display: unset;
  }
`
export const Left = styled(DivAll)`
  display: flex;
  width: 20%;
  min-width: 200px;
  align-items: center;
  padding: 16px;
  @media screen and (max-width: 1205px) {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
`
export const ContainerAvatar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const AvatarUser = styled(Avatar)`
  size: 100px;
  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transform: scale(1.1);
  }
`
export const UserDetail = styled.div`
  width: 100%;
  color: #fff;
  align-items: center;
  justify-content: center;
`
export const Right = styled.div`
  display: flex;
  width: calc(80% - 20px);
  gap: 20px;
  @media screen and (max-width: 1205px) {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    flex-description: column wrap;
    display: unset;
  }
`

export const ItemToken = styled(DivAll)`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  padding: 20px;
  gap: 16px;
  flex: 1;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    margin: 16px 0px;
    padding: 16px;
  }
`
export const IconToken = styled.div`
  height: 100px;
  width: 100px;
  padding: 10px;
`
export const DetailToken = styled.div`
  width: 100%;
`
export const NameToken = styled(NormalText)`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 12px;
`
export const Amount = styled(TitleText)`
  font-style: normal;
  font-weight: 300;
  line-height: 46px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`
export const EditImg = styled(EditOutlined)`
  position: absolute;
  top: 50%;
`
export const ContainerOptions = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 10;
  margin-top: 10px;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 15px;
`
export const Buttons = styled(MyButton)`
  height: 40px;
  border: none;
  outline: none;
  background: linear-gradient(90deg, #2c91c0 0%, #5bcbe4 100%);
  text-transform: uppercase;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  flex: 1;
  min-width: 100px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`
export const ButtonClaim = styled(MyButton)`
  height: 23px;
  width: 40px;
  padding: 0px;
  color: #fff;
  font-size: 10px;
  cursor: pointer;
  margin-left: 5px;
`
export const Icon = styled.img`
  height: 20px;
  width: 20px;
  margin-left: 5px;
  &:hover {
    cursor: pointer;
  }
`
export const IconEditInAvatar = styled.div`
  position: absolute;
  z-index: 2;
  top: 36px;
  left: 36px;
  @media screen and (max-width: 1205px) {
    left: 48.5%;
  }
  @media screen and (max-width: 768px) {
    left: 46%;
  }
  cursor: pointer;
`
export const ContainerAvatarProfile = styled.div`
  width: 100%;
  position: relative;
`
export const ContainerIconToken = styled.div`
  padding: 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-bottom: 6px;
`
export const NumberToken = styled.span`
  line-height: 130%;
  letter-spacing: 0.05em;
`
export const Address = styled.div`
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 1205px) {
    max-width: 100%;
  }
`
export const ContainerUserName = styled.div`
  margin-top: 10;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 1205px) {
    align-items: center;
    justify-content: center;
  }
`
export default () => {}
