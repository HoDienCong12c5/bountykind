import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
import { Button, Avatar } from 'antd'
import { EditOutlined } from '@ant-design/icons'
export const ContainerHeader = styled.div`
  width: 100%;
  max-width: 1550px;
  display: flex;
  flex-direction: row;
  background:transparent;
  display: flex;
  flex-flow: row wrap;
  gap:20px;;
  @media screen and (max-width: 768px) {
    flex-description: column wrap;
    display: unset;
  }
`
export const Left = styled.div`
  width: 100%;
  min-width: 300px;  
  padding:16px;
    display: flex; 
    justify-content: center;   
    
 
`
export const ContainerAvatar = styled.div`
  height: 100px;
  border-radius: 50%;
  margin-right: 15px;
`
export const AvatarUser = styled(Avatar)`
  size: 100px;
  &:hover {
    cursor: pointer;
     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`
export const UserDetail = styled.div`
 display: flex;
    flex-flow: column;
    justify-content: center;
`
export const Right = styled.div`
  display: flex;
  @media screen and (max-width: 1199px) {
    flex-description: column wrap;
    display: unset;
  }
`

export const ItemToken = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  background: #1f232b;
  padding: 20px;
  border-radius: 15px;
  margin-right: 20px;
  @media screen and (max-width: 1399px) {
    margin: 10px;
  }
`
export const IconToken = styled.div`
  height: 100px;
  width: 100px;
  padding: 10px;
`
export const DetailToken = styled.div``
export const NameToken = styled.div`
  font-size: 18px;
  font-weight: bold;
`
export const Amount = styled.div`
  font-size: 16x;
`
export const EditImg = styled(EditOutlined)`
  position:absolute;
  top:50%;

`
export const ContainerOptions = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10;
    marginTop: 20
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
  @media screen and (max-width: 768px) {
    font-size: 12px; 
  }
`
export const ButtonClaim = styled.button`
  height: 23px;
  width: 40px;
  border-radius: 5px;
  padding:0px; 
  color: #fff;
  font-size: 10px;
  cursor: pointer;
  margin-left: 5px;
  background: linear-gradient(90deg, #2c91c0 0%, #5bcbe4 100%);
`
export default () => { }
