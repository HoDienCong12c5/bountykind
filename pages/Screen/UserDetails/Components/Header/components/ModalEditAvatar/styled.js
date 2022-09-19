import styled from 'styled-components'
import { Button } from 'antd'

export const Container = styled.div`
  justify-content: center;
`
export const ContainerAvatar = styled.div`
  margin-top: 30px;
  .user-img {
    max-width: 150px;
  }
`
export const ButtonSave = styled(Button)`
  width: 100%;
  border: none;
  border-radius: 10px;
  background-color: blue;
  color: white;
  font-weight: 600;
  margin-top: 20px;
  &:hover{
    background-color: blue;
}
`
export const ImgBtnEdit = styled.img`
    width:30px;
    margin:10px 10px;
     height:30px;
    &:hover{
        cursor: pointer;
        width:40px;
        height:40px;
    }
`
export default () => {}
