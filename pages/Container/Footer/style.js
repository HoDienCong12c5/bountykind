import styled from 'styled-components'
import { Layout, Drawer, Input } from 'antd'
import { ButtonConnect } from '../Header/style'
export const LayoutFooter = styled(Layout.Footer)`
  padding: 0;
  background: black;
  margin-top: ${props => props.marginTop ?? 20}px;
  margin-bottom: 50px;
  padding: 0px;
`
export const FooterContainer = styled.div`
  align-items: center;
  margin: auto;
  max-width: 1550px;
  margin: 0 auto;  
  @media screen and (max-width: 1700px) {
    max-width: 1350px;
    padding: 0 50px;
   }
  @media screen and (max-width: 768px){
    padding: 0 20px;
  }

`

export const Subscribe = styled.div`
  font-size: 12px;
  color: #fff; 
  opacity: 0.6; 
  text-align: right;
  align-items: ;
`
export const InputContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  font-family: Inter, sans-serif;
  @media screen and (max-width: 768px) {
    width: 70%;
    }
`
export const InputCustom = styled(Input)`
  padding: 5px;
  font-size: 11px;
  padding-left: 10px;
`
export const IconMoreLink = styled.img`
  height: 18px;
  width: 18px;
  margin: 10px;
  margin-left: 0px; 
  opacity: 0.6;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`
export const ChangeLanguage = styled.div`
  opacity: 0.6;
  display:flex;
  flex-flow: row wrap;
  color: #fff;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`
export const RowContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0px 0px 0px 0px;
  align-content: center;
  width:100%;
  align-items: ${props => (props.flexEnd ? 'flex-end' : props.flexStart ? 'flex-start' : 'center')};
`
export const BlockContent = styled.div`
 background: #F2F2F2;
  border-radius: 12px;
  padding: 10px 15px;
  word-wrap: break-word;
  a, p{
    margin-bottom: 0px !important;
    word-wrap: break-word;
  }
`
export const MenuMobileDrawer = styled(Drawer)` 
  .ant-drawer-content-wrapper {
    height: calc(100vh - 60px) !important;
  }
  .ant-drawer-header {
    padding: 19px 22px;
    background: #2F80ED;
    border: none;
  }
  .ant-drawer-content {
    background-image: url("${props => props.src}");
    border-radius: 0;
    background-size: cover;
  }
  .ant-drawer-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
export const MenuMobileNav = styled.div`
  transform: translateY(-60px);
  .ant-menu-vertical {
    text-align: center;
    .ant-menu-item {
      font-size: 24px;
    }
  }
`

export default () => {}
