import styled from 'styled-components'
export const InforDetailEarthContainer = styled.div`
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-flow: row;
  background-color: transparent;
  color: #fff;
  gap:20px;
`
export const LeftDetailEarth = styled.div`
width: 520px;
padding: 10px;
text-align: left;
margin-left: 10px;
@media screen and (max-width: 768px) {
  width: 100%;
  margin-left: 0px;
}

`
export const RightDetailEarth = styled.div`
padding: 10px; 
max-width: 480px;
@media screen and (max-width: 768px) {
  margin: auto;
}

`
export const TitleInfor = styled.div`
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 15px;
  text-transform: uppercase;
`
export const DescriptionInfor = styled.div`
  font-size: 13px;
  text-align: left;
  max-width: 300px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
  
`
export const ImageInfor = styled.div`
  background-image: url("${(props) => props.src}");
  background-size: cover;
`
export const LineEspecially = styled.div`
  background-image: url("${(props) => props.src}");
  max-width: 340px;
  height: 3px;
  margin-bottom: 15px;
  margin-top: 15px;
`
export const BtnCloseModal = styled.img`
 height: 45px;
  width: 45px;
  &:hover{
    cursor: pointer;
  }
  @media screen and (max-width:768px){
    height: 35px;
    width: 35px;
  }
`
export default () => {}
