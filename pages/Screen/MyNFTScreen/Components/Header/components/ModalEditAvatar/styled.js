import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
import { Input } from 'antd'
import { NormalText, TitleText, MediumText } from 'pages/Components/TextSize'
export const Container = styled.div`
  justify-content: center;

`
export const ContainerAvatar = styled.div`
  margin-top: 30px;
  .user-img {
    max-width: 150px;
  }
`
export const ButtonSave = styled(MyButton)`
  width: 100%;
  border: none;
  background-color: blue;
  color: white;
  font-weight: 600;
  margin-top: 20px;
  &:hover{
    background-color: blue;
}
`
export const ImgBtnEdit = styled.img`
    width:20px;
    margin:10px 10px;
     height:30px;
    &:hover{
        cursor: pointer;
        transform: scale(1.2);
    }
`
export const Description = styled(NormalText)`
  display: flex;
  flex-direction: column;
`
export const InputText = styled(Input)`
  font-size: 13px;
  background: transparent;
  width: 100%;
  border: 1px solid #CACFCC;
  padding: 10px;
  border-radius: 8px;
  &:focus-visible {
    border: 1px solid #CACFCC; 
  }
  &:hover {
    border: 1px solid #CACFCC;}
`
export const TitleUserName = styled(MediumText)`
text-align: left;
margin-top:8px;
margin-bottom:8px;
  `
export const TitleModal = styled(TitleText)`
font-weight:bold;
text-transform: uppercase;
`
export default () => {}
