import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
import { ShareAltOutlined } from '@ant-design/icons'
export const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin: auto auto;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column wrap;
  }
`
export const ImageContainer = styled.div`
`
export const ButtonShare = styled(ShareAltOutlined)`
  color: #c4a5f8;
  font-size: 20px;
  margin: 10px;
  margin-top: 5px;
`
export const ButtonMoreDetails = styled(MyButton)``
export const ImageBlock = styled.img`
  width: 25px;
  opacity: 0.8;
`
export default () => {}
