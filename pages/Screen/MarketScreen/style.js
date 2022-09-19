import styled from 'styled-components'
import { Spin, Select } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import MyButton from 'pages/Components/MyButton'

export const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin-bottom: 20px;
`
export const Banner = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  background-image: url("${props => props.src}");
  background-size: cover;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
`
export const BannerMobile = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  background-image: url("${props => props.src}");
  background-size: cover;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
`
export const BannerTitle = styled.span`
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
  font-size: 80px;
  font-family: Millik;
`
export const BannerTitleMobile = styled.span`
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
  font-size: 40px;
  font-family: Millik;
`
export const BannerDes = styled.span`
  text-transform: uppercase;
  font-weight: 500;
  color: #fff;
  font-size: 30px;
  font-family: Abhaya Libre;
`
export const BannerDesMobile = styled.span`
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
  font-size: 24px;
  font-family: Abhaya Libre;
  padding: 0px 15px 0px 15px;
`
export const BannerButton = styled(MyButton)`
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
    margin-bottom: 30px;
    height: 54px;
    font-size: 12px;
  }
`
export const NFTContainer = styled.div`
  width: 100%;
  padding: 40px;
  dislay: flex;
  flex-flow: column wrap;
`
export const NFTContainerMobile = styled.div`
  width: 100%;
  padding: 20px;
  dislay: flex;
  flex-flow: column wrap;
`
export const NFTFilters = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  @media screen and (max-width: 768px) {
    gap: 0px;
  }
`
export const ResultCount = styled.div`
  width: 200px;
  height: 30px;
  color: #000a1d;
  opacity: 0.5;
  font-weight: normal;
  font-size: 15px;
  @media screen and (max-width: 906px) {
    width: 80px;
  }
`
export const ResultCountMobile = styled.div`
  width: 100%;
  height: 30px;
  color: #000a1d;
  opacity: 0.5;
  font-weight: normal;
  font-size: 15px;
  margin-bottom: 10px;
`
export const SearchBar = styled.div`
  flex-grow: 1;
  height: 50px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding-left: 10px;
  padding-right: 20px;
  form {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    height: 100%;
    button {
      border: none;
      outline: none;
      background: transparent;
      img {
        margin-top: -1px;
      }
    }
  }
`
export const SearchBarMobile = styled.div`
  width: 100%;
  height: 50px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding-left: 10px;
  padding-right: 15px;
  margin-bottom: 20px;
  form {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    height: 100%;
    button {
      border: none;
      outline: none;
      background: transparent;
    }
  }
`
export const SearchInput = styled.input`
  flex-grow: 1;
  height: 100%;
  border: none;
  outline: none;
  padding-left: 0px;
  padding-top: 3px;
  box-sizing: border-box;
  margin-left: 10px;
  padding-top: 5px;
  font-family: Abhaya Libre;
  font-size: 16px;
  &::placeholder {
    color: #b3b6bb;
  }
`
export const FilterSelectContainer = styled.div`
  width: 180px;
  height: 50px;
  @media screen and (max-width: 906px) {
    width: 150px;
  }
`
export const FilterSelectContainerMobile = styled.div`
  width: 50%;
  height: 50px;
  box-sizing: border-box;
  background: white;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 768px) {
    width: calc(50% - 10px);
  }
`
export const FilterSelect = styled(Select)`
  width: 100%;
  height: 50px !important;
  border: none !important;
  outline: none;
  border-radius: 0px !important;
  .ant-select-selector {
    height: 50px !important;
    border-radius: 0px !important;
    border: 1px solid #e0e0e0 !important;
    height: auto;
    .ant-select-selection-item {
      display: flex !important;
      align-items: center !important;
      font-family: Abhaya Libre !important;
    } 
  }
  .ant-select-arrow {
    right: 15px !important;
  }
`
export const FilterName = styled.div`
  display: inline-block
  font-family: Abhaya Libre !important;
  font-size: 16px !important;
  padding-left: 5px;
  width: calc(90%);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export const FilterOption = styled(Select.Option)`
  background: red !important;
`
export const NFTs = styled.div`
  padding-top: 30px;
  width: 100%;
`
export const SpinLoading = styled(Spin)``
export const LoadingIcon = styled(LoadingOutlined)`
  font-size: 30px;
  color: #2f80ed;
`
export const ItemContainer = styled.div`

`
export default () => {}
