import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
import { ShareAltOutlined } from '@ant-design/icons'
import { NormalText, MediumText } from 'pages/Components/TextSize'
import { List } from 'antd'
import { COLOR } from 'common/constants'

export const Container = styled.div`
  color: white;
  background: ${(props) =>
    props.odd ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};
`
export const ContainerNFT = styled.div`
  display: flex;
  flex-direction: row wrap;
  align-items: center;
  padding:0px 12px;
  position: relative;
`
export const ContentNFT = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  width: 60%;
`
export const AvatarNFT = styled.img`
  min-width: 100px;
  margin: 10px 0px;
  margin-right: 10px;
  border-radius: 8px;
  object-fit: contain;

  @media screen and (max-width: 568px) {
    /* min-width: 60px; */
    /* width: 270px; */
    width: 40%;
  }
`
export const NameNFT = styled(MediumText)`
  font-weight: 600;
  display: block;
  align-items: baseline;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Description = styled(NormalText)``
export const ContainerOwner = styled.div`
  display: flex;
  flex-direction: row wrap;
`
export const AddressOwner = styled(NormalText)`
  cursor: pointer;
  color: #c4a5f8;
  &:hover {
    text-decoration: underline;
    font-weight: bold;
  }
`
export const PasswordNFT = styled(NormalText)`
  color: green;
`

export const IconShare = styled(ShareAltOutlined)`
position: absolute;
top:10px;
right:15px;
font-size: 20px;
  color: #c4a5f8;
  &:hover {
    cursor: pointer;
  }
`
export const ContainerOption = styled.div`
  justify-content: space-around;
  height: 100%;
  align-items: center;
  text-align: center;
  margin: 10px;
`
export const ButtonMoreDetails = styled(MyButton)`
  height: 35px;
  padding: 0px 10px;
`
export const ImageBlock = styled.img`
  width: 16px;
  opacity: 0.8;
  margin-right:6px;
`
export const ContainerList = styled(List)`
  border: 1px solid ${COLOR.white2};
  border-radius: 12px;
  .ant-list-item {
    margin-bottom: 0px !important;
  }
`
export default () => {}
