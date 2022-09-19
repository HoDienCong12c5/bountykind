import styled from 'styled-components'
import { Layout, Button, Menu, Drawer, Avatar } from 'antd'
import { NormalText } from 'pages/Components/TextSize'
export const LayoutHeader = styled(Layout.Header)`
  height: 50px;
  line-height: 50px;
  background: #000000;
  z-index: 9999;
  margin:auto;
  transition: top 0.3s;
  top: ${(props) => props.top ?? 0}px;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  padding: 0px;
`

export const Container = styled.div`
  display: flex;
  font-family: 'URW DIN Arabic', sans-serif;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1550px;
  user-select: none;
  position: relative;
  z-index: 100;
  margin:0 auto;
  @media screen and (max-width: 1700px) {
    max-width: 1350px;

    padding: 0 50px;
   }
   @media screen and (max-width: 768px) {
    padding: 0 20px;
   }
  
`

export const LeftSide = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
`

export const RightSide = styled.div`
  display: flex;
  background:${props => props.isSign ? 'rgba(255, 255, 255, 0.1)' : 'unset'} ;
  padding: 0 15px;
  padding-right:0px;
`

export const Logo = styled.img`
  cursor: pointer;
  width: 100px;
  margin-right: 100px;
`

export const AvatarWrapper = styled.div`
  cursor: pointer;
  position: relative;
  height: 56px;
  top: -3px;
  display: flex;
  gap:10px;
  align-items: center;
  @media screen and (max-width:1072px) {
  margin-right:12px;
  }
  @media screen and (min-width: 769px) {
    height: 50px;
    top: -2px;
  }
`

export const Address = styled(NormalText)`
  text-overflow: ellipsis;
  overflow: hidden;
  max-width:100px;
`
export const AvatarImg = styled(Avatar)`
  width: 30px;
  height: 30px;
`

export const MenuHeader = styled(Menu)`
  color: #fff;
  .ant-menu-item-selected {
    color: #fff;
    &::after {
      border: none !important;
    }
  }
  .ant-menu-item {
    &::after {
      border: none !important;
    }
    &:hover::after {
      border: none !important;
    }
    &:hover {
      color: white !important;
    }
  }
`

export const MenuHeaderItem = styled.span`
  font-size: 24px;
  text-transform: uppercase;
  display: inline-block;
  font-weight: 600;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  @media screen and (min-width: 769px) {
    font-size: 13px;
  }
`

export const ButtonConnect = styled(Button)`
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.1);
  border: 0px solid #1b4154;
  color: #fff;
  height: 50px;
  padding: 10px 15px 10px 15px;
  align-self: stretch;
    height:50px;
    margin-bottom:4px;


  &:hover,
  &:focus {
    background: #1a557e;
    background-image: linear-gradient(
      to right,
      rgba(221, 94, 228, 0.6),
      rgba(32, 231, 249, 0.6)
    );
    color: #fff;
    height:50px;
    margin-bottom:4px;

  }
  @media screen and (max-width: 1072px) {
      margin-right: 12px;
    }
`

export const ButtonConnectMobile = styled(ButtonConnect)`
  height: 50px;
  padding: 10px 22px 10px 15px;
`

export const MenuMobile = styled.div`
  margin-left: 30px;
  cursor: pointer;
`

export const MobileMenuToggle = styled.div`
  height: 100%;
  padding: 0px 0px 0px 30px;
  width: 20px;
  img {
    width: 100%;
    
  }
  cursor: pointer;
  @media (max-width: 1072px) {
  padding: 0px;

  }
`

export const MobileMenu = styled.div`
  position: fixed;
  width: 100%;
  height: ${(props) => props.height};
  background: #13161b;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  color: white;
  align-items: center;
  transform-origin: right;
  animation: onOpenMobileMenu 0.25s ease;
  box-sizing: border-box;
  gap: 10px;
  @keyframes onOpenMobileMenu {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }
`

export const HeaderMobileMenu = styled.div`
  width: 100%;
  text-align: right;
  position: absolute;
  top: 0;
  left: 0;
  padding-right: 20px;
`

export const MobileMenuItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  &.selected {
    color: #1877f2;
  }
`

export default () => {}
