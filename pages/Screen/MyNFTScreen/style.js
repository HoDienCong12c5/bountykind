import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
import { Pagination, Tabs, Input } from 'antd'
import { MediumText } from 'pages/Components/TextSize'
export const Container = styled.div`
  width: 100%;
  background: black;
  height: 100%;
 margin-top:60px;
  max-width:1550px;
  margin: 0 auto;
  margin-top:60px;
  min-height: calc(100vh - 50px);
  @media screen and (max-width: 1700px) {
    max-width: 1350px;
    padding: 0 50px;
    } 
    @media screen and (max-width: 768px) {
    padding:0 20px;
  }
 

`
export const InnerContainer = styled.div`
  width: 100%;
  background: transparent;
  color: white;
  max-width:1550px;
  margin: 0 auto;
  gap:20px;;
    display: flex;
    flex-flow: column;
`
export const Content = styled.div`
  width: 100%;
  margin: 0 auto; 
  gap: 8px;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-description: column wrap;
    display: unset;
  }  
  background: transparent !important;
  margin-top: -10px;
`
export const LeftContent = styled.div`
  width: 20%;
  min-width: 200px;
  background-color: transparent;
  @media screen and (max-width: 768px) {
    max-width: unset;
    width: 100%;
  
  }
`
export const RightContentContainer = styled.div`
  width: calc(80% - 20px);
  @media screen and (max-width: 1111px) {
    width: calc(100% - 206px);
  }
  padding: 0px 0px 20px 12px;
  background-color: transparent;
  margin-top: 10px;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: auto;
    background:transparent;
    padding:0px;
  }
  /* flex:1;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  WORD-BREAK: BREAK-ALL; */

`
export const RightContentDetails = styled.div`
`
export const BuyButton = styled(MyButton)`
  width: 200px;
  height: 50px;
  border: none;
  outline: none;
  background: linear-gradient(90deg, #2c91c0 0%, #5bcbe4 100%);
  text-transform: uppercase;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  margin-top: 30px;
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

export const AvatarNFT = styled.div`
  width: 150px;
  height: 200px;
  margin: 0px auto;
  background-image: url(${(props) => props.src});
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
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 600;
`

export const ItemLeftMenu = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  padding: 15px;
  &:hover {
    background: rgb(58, 58, 60);
    cursor: pointer;
  }
`
export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
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
  @media screen and (max-width: 768px) {
    padding:0px;
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
    position:relative;
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
export const Line = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: ${(props => props.marginBottom || '0px')};
`

export const ItemsContainer = styled.div`
 width:calc(100% - 67px );
  height: 100%;
  align-self: stretch;
  flex-flow: row wrap;
  justify-content: flex-start;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-gap: 20px;
  @media screen and (max-width: 1350px) {
    width: calc(100% - 49px );
  grid-template-columns: 25% 25% 25% 25%;
  }
    @media screen and (max-width: 1120px) {
    width:calc(100% - 33px );
  grid-template-columns: 33% 33% 33%;
  }
   @media screen and (max-width: 899px) {
    width: calc(100% - 20px );
  grid-template-columns: 50% 50%;
  }
    @media screen and (max-width: 768px) {
    width: calc(100% - 24px );
  grid-template-columns: 33% 33% 33%;
    grid-gap: 16px;
      
    }
      @media screen and (max-width: 599px) {
    width: calc(100% - 16px );
  grid-template-columns: 50% 50%;
    grid-gap: 16px;
      
    }
`
export const OptionContainer = styled.div`
  width: 100%; 
  display: flex;
  flex-flow: row wrap; 
  text-align:center;
  

`
export const Option = styled(MediumText)`
  position: relative;
  height:50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 15px;
  padding-right: 15px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: bold;
  cursor: pointer;
  text-transform:uppercase;
  margin-bottom:3px;
  margin-top:9px;
  &:first-child {
    padding-left:0px;
  }
  &.selected {
    color: rgba(255, 255, 255, 1);
    ${'' /* &::after{
      position: absolute;
      content: "";
      width: 100%;
      height: 2px;
      background: #1877F2;
      left: 0;
      bottom: 0;
      animation: onSelected 0.25s ease;
      @keyframes onSelected {
        from {
          width: 0px;
        }
        to {
          width: 100%;
        }
      }
    } */}
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

export default () => { }
