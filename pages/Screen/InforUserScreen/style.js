import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
import { Row, Tabs, Input, Pagination } from 'antd'
const { TabPane } = Tabs
export const Container = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding:10px;
`
export const Content = styled.div`
  width: 100%;
  padding-right:15px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 16px 25px 16px;
  @media screen and (max-width: 768px) {
    flex-description: column wrap;
    display: unset;
  }

`
export const LeftContent = styled.div`
  width: 30%;
  min-width: 250px;
  max-width: 300px;
  background:#1c1f25;
  border-radius: 10px;
  border:1px solid #282c34;
  height: auto;
  @media screen and (max-width: 768px) {
    max-width: unset;
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
  }
`
export const RightContent = styled.div`
width: 100%;
padding: 0px 10px 20px 20px;
background-color: #1c1f25; 
border-radius: 10px;
border:1px solid #282c34;
margin-left: 10px @media screen and (max-width: 768px) {
  padding: 10px;
  margin: auto;
  width:90%;
}
`
export const BuyButton = styled(MyButton)`
  width: 200px;
  height: 50px;
  border: none;
  outline : none;
  background: linear-gradient(90deg, #2c91c0 0%, #5bcbe4 100%);
  text-transform: uppercase;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  margin-top:30px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 12px;
    height: 54px;
   }
`
export const InputSearch = styled(Input.Search)`
width: 90%;
min-width: unset;
border-radius: 5px;
background: transparent;
margin-bottom: 10px;
margin-top: 10px;
@media screen and (max-width: 768px) {
  margin: 0px auto;
}
.ant-input-affix-wrapper {
  border: 1px solid #9b9292;
}
`
export const MobileFiltersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding-right: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  &.active {
    height: auto;
    animation: appear 0.2s;
  }
  &.inactive {
    height: 60px;
  }
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
export const NFTDetails = styled.div`
  display: flex;
  flex-flow: column wrap;
  overflow: hidden;
  background: #1f232b;
  color: white;
  padding: 10px;
  cursor: pointer;
  width: 240px;
  height: 350px;
  align-items: center;
  flex-flow: column wrap;
  justify-content: center;  
  margin: 15px; 
  border-radius: 6px; 
  border: 1px solid;
  border-image: ${props => props.isCharacter ? ' linear-gradient(0deg, #fc5c7d, #6a82fb)' : 'wheat'};
  border-image-slice: 1;
  border-image-radius: 6px;
  transition: transform 0.25s ease, border 0.25s ease, box-shadow 0.25s ease;
  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.25);
    transform: translate(0, -5px);
    animation: onHoverAnimation 1s infinite alternate ease;
  }
  @keyframes onHoverAnimation{
    0%{
      border: 2px solid;
      border-image: linear-gradient(0deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    10% {
      border: 2px solid;
      border-image: linear-gradient(36deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    20% {
      border: 2px solid;
      border-image: linear-gradient(72deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    30%{
      border: 2px solid;
      border-image: linear-gradient(108deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    40%{
      border: 2px solid;
      border-image: linear-gradient(144deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    50%{
      border: 2px solid;
      border-image: linear-gradient(180deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    60%{
      border: 2px solid;
      border-image: linear-gradient(216deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    70%{
      border: 2px solid;
      border-image: linear-gradient(252deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    80%{
      border: 2px solid;
      border-image: linear-gradient(288deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    90%{
      border: 2px solid;
      border-image: linear-gradient(324deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    100% {
      border: 2px solid;
      border-image: linear-gradient(360deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
  }
`

export const AvatarNFT = styled.div`
  width: 150px;
  height: 200px;
  margin: 0px auto;   
  background-image: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`
export const TypeToken = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap; 
`
export const NameToken = styled.div`
  font-size: 16px;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
`
export const Level = styled.div`
font-size: 16px;
`
export const ItemLeftMenu = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap; 
  padding: 15px;
  &:hover{
    background:rgb(58, 58, 60);
    cursor: pointer;
  }
`
export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
`
export const MyPagination = styled(Pagination)`
  height: 35px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  svg {
    color: white;
  }
  input {
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 4px !important;
    background: #1f232b !important;
    height: 35px !important;
    margin-top: -10px !important;
  }
  .ant-pagination-slash {
    color: white;
  }
  .ant-pagination-simple-pager {
    color: white;
    font-weight: bold;
  }
`
export const ToggleFilter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  height: 60px;
  button {
    background: transparent;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 6px 20px 6px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`
export const NumberFilter = styled.div`
  position: absolute;
  top: -10px;
  right: -3px;
  background-color: #828282;
  border-radius: 50%;
  padding: 0px 7px;
`
export default () => {}
