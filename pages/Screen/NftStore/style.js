import styled from 'styled-components'
import { Select, Pagination } from 'antd'
import { TitleText } from 'pages/Components/TextSize'
export const Container = styled.div`
  width: 100%;
  background: transparent ;
  height: 100%;
`
export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  max-width: 1550px;
  margin:0 auto;
   @media screen and (max-width: 1700px) {
    max-width: 1350px;

    padding: 0 50px;
   }
   @media screen and (max-width: 768px) {
    padding: 0 20px;
   }
`

export const TypeSelector = styled.div`
  width: 100%;
  padding-top: 50px;
  display: flex;
  flex-flow: row wrap;
  background: black !important;
`

export const Type = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 15px;
  padding-right: 15px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-bottom: 4px solid transparent;
  cursor: pointer;
  &.selected {
    border-bottom: 4px solid #1877F2;
  }
`

export const NftsContainer = styled.div`
  display: grid;
  width:calc(100% - 80px );
  flex-flow: row wrap;
  justify-content: flex-start;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-gap:20px;
  margin-right: 130px;
  @media screen and (max-width: 1350px) {
    width: calc(100% - 59px );
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

export const RightContainer = styled.div`
  width: calc(80% - 5px);
  display: flex;
  flex-flow: column wrap;
  padding-bottom: 20px;
  padding-left: 20px;
  background: black !important;
  min-height: 100vh;
   @media screen and (max-width: 1699px) {
    width: 80%;
  }
  @media screen and (max-width: 1111px) {
    width: calc(100% - 202px);
  }
  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
    margin: auto auto;
    padding-left: 0px;
  }
`

export const TopFilter = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding-top: 21px;
  @media (max-width: 768px) {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
`

export const Amount = styled(TitleText)`
  color: white;
  font-weight: bold;
  padding-bottom:12px;
  @media (max-width: 768px) {
    padding-bottom: 10px;
  }
`

export const TableModeToggle = styled.div`
  height: 40px;
  width: 80px;
  background: red;
  display: flex;
  flex-flow: row wrap;
  border-radius: 8px;
  overflow: hidden;
`

export const ModeOption = styled.div`
  height: 100%;
  width: 40px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    filter: brightness(120%);
  }
  img {
    width: 20px;
  }
  &.selected {
    background: #1877F2;
  }
`

export const RightFilter = styled.div`
  height: 40px;
  display: flex;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    justify-content: flex-end;
    height:auto;
  }
`

export const FilterSelect = styled(Select)`
  margin-right: 15px;
  width: 200px;
  @media (max-width: 768px) {
    flex: 1;
  }
  .ant-select-selector {
    background: black !important;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
  }
`

export const FilterOption = styled(Select.Option)``

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
export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
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
  position:relative;
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
  @media screen and (max-width: 768px) {
    padding-right:0px;
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
