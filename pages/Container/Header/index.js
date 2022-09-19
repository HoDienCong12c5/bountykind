import React, { useEffect, useState, useRef } from 'react'
import ReduxServices from 'common/redux'
import WalletConnectServices from 'controller/WalletConnect'
import { useSelector } from 'react-redux'
import { Link, Router } from 'common/routes'
import {
  OBSERVER_KEY,
  CONNECTION_METHOD,
  PAGE_MOBILE_HIDE_HEADER_FOOTER,
  PAGE_NOT_SIGNED
} from 'common/constants'
import { Menu, Dropdown } from 'antd'
import CustomLink from 'pages/Components/CustomLink'
import ExternalLink from 'pages/Components/ExternalLink'
import Media from 'react-media'
import Observer from 'common/observer'
import { images } from 'config/images'
import useAuth from 'hooks/useAuth'
import { detectImageUrl, ellipsisAddress, openMyModal } from 'common/function'
import { LayoutHeader, Container, LeftSide, RightSide, Logo, AvatarWrapper, AvatarImg, MenuHeader, MenuHeaderItem, ButtonConnect, ButtonConnectMobile, MobileMenuToggle, MobileMenu, MobileMenuItem, HeaderMobileMenu, Address } from './style'
import './style.scss'
import GameService from 'services/gameService'
import ModalWarningLogOut from 'pages/Components/ModalWarningLogOut'
import MyModal from 'pages/Components/MyModal'
import { isMobile } from 'react-device-detect'
import ModalRequestDesktop from '../components/ModalRequestDesktop'
const Header = () => {
  const { isSigned } = useAuth()
  // use store
  const userData = useSelector(state => state.userData)
  const userInfo = useSelector(state => state.userInfo)
  const connectionMethod = useSelector(state => state.connectionMethod)
  const { messages } = useSelector(state => state.locale)
  const myModal = useRef(null)
  // use state

  const [isOpenMobileMenu, setOpenMobileMenu] = useState(false)

  const openModalSignIn = async () => {
    await Observer.emit(OBSERVER_KEY.SIGN_IN)
    ReduxServices.setIsOpenModalWarning(true)
    closeModals()
  }
  const openLogOut = async () => {
    openMyModal(myModal, <ModalWarningLogOut
      login={openModalSignIn}
      cancel={() => myModal?.current && myModal?.current.closeModal()}
    />)
  }
  const closeModals = () => {
    myModal.current && myModal.current.closeModal()
  }

  useEffect(() => {
    Observer.on(OBSERVER_KEY.LOGOUT, () => openLogOut())
  }, [])

  // useEffect(() => {
  //   openMyModal(myModal, <GameBountyBelt closeGame={closeModals} />, { modalWidth: 480, closable: false, wrapClassName: '', maskStyle: {}, onAfterClose: null, isEscClose: false }
  //   )
  // }, [])
  useEffect(() => {
    if (userData?.isNewUser) {
      Router.pushRoute('/receive-characters')
    }
  }, [userData?.isNewUser])

  // function
  const backHome = () => {
    Router.pushRoute('/')
  }
  const handleSignIn = async () => {
    Observer.emit(OBSERVER_KEY.SIGN_IN)
    ReduxServices.setIsOpenModalWarning(true)
  }
  const handleSignOut = async () => {
    if (PAGE_NOT_SIGNED.includes(Router.pathname)) {
      await Router.pushRoute('/')
    }
    ReduxServices.setIsOpenModalWarning(false)
    setTimeout(async () => {
      if (connectionMethod === CONNECTION_METHOD.WALLET_CONNECT) {
        await WalletConnectServices.killSession()
      } else {
        await ReduxServices.resetUser()
      }
    }, 1000)
  }
  const clickMenu = (item, key, keyPath, domEvent) => {
    if (item.key === '7') {
      const getGameCharactersUser = async (owner, queryString) => {
        const characterOfGames = await GameService.getGameCharactersUser(
          owner,
          queryString
        )
        if (characterOfGames && characterOfGames?.data) {
          if (characterOfGames.data.total >= 3) {
            Router.pushRoute('/playGame')
          } else {
            Router.pushRoute('/receive-characters')
          }
        }
      }
      if (userData?.address && isSigned) {
        getGameCharactersUser(userData.address, '?limit=10&status=active')
      } else {
        Router.pushRoute('/receive-characters')
      }
    }
  }
  const clickBoard = async () => {
    if (isMobile) {
      setOpenMobileMenu(false)
      myModal.current.openModal(
        <ModalRequestDesktop closeModals={closeModals} />,
        { wrapClassName: 'gacha-modal', modalWidth: 500 }
      )
    } else {
      const getGameCharactersUser = async (owner, queryString) => {
        const characterOfGames = await GameService.getGameCharactersUser(
          owner,
          queryString
        )
        if (characterOfGames && characterOfGames?.data) {
          if (characterOfGames.data.total >= 3) {
            redirectPage('/playGame')
          } else {
            redirectPage('/receive-characters')
          }
        }
      }
      if (userData?.address && isSigned) {
        getGameCharactersUser(userData.address, '?limit=10&status=active')
      } else {
        Router.pushRoute('/receive-characters')
      }
    }
  }
  const renderMainNav = (mode = 'horizontal') => {
    return (
      <MenuHeader onClick={clickMenu} mode={mode} >
        <Menu.Item key={1}>
          <CustomLink route='/'>
            <MenuHeaderItem>{messages.home.title}</MenuHeaderItem>
          </CustomLink>
        </Menu.Item>
        <Menu.Item key={2}>
          <CustomLink route='/store'>
            <MenuHeaderItem>{messages.store.title}</MenuHeaderItem>
          </CustomLink>
        </Menu.Item>
        <Menu.Item key={3}>
          <CustomLink route='/marketplace?attributes.type=character'>
            <MenuHeaderItem>{messages.market.title}</MenuHeaderItem>
          </CustomLink>
        </Menu.Item>
        <Menu.Item key={9}>
          <CustomLink route='/gacha'>
            <MenuHeaderItem>{messages.gacha.title}</MenuHeaderItem>
          </CustomLink>
        </Menu.Item>
        <Menu.Item key={7}>
          <MenuHeaderItem>{messages.mainNav.board}</MenuHeaderItem>
        </Menu.Item>
        <Menu.Item key={4}>
          <ExternalLink url='https://swap-bsc.keyring.app/'>
            <MenuHeaderItem>{messages.mainNav.trade}</MenuHeaderItem>
          </ExternalLink>
        </Menu.Item>
        {/* <Menu.Item key={5}>
          <ExternalLink url='https://www.bnbchain.world/en/bridge'>
            <MenuHeaderItem>{messages.mainNav.bridge}</MenuHeaderItem>
          </ExternalLink>
        </Menu.Item> */}
        {/* <Menu.Item key={6}>
          <ExternalLink url=''>
            <MenuHeaderItem>{messages.mainNav.whitepaper}</MenuHeaderItem>
          </ExternalLink>
        </Menu.Item> */}
        <Menu.Item key={8}>
          <CustomLink route='/scholarship'>
            <MenuHeaderItem>{messages.mainNav.scholarship}</MenuHeaderItem>
          </CustomLink>
        </Menu.Item>
      </MenuHeader>
    )
  }

  const renderAccountNav = (isDesktop = false) => (
    <Menu style={{ marginTop: 5, offset: { repeat: 10 } }}>
      {
        isDesktop || <Menu.Item key='profile'>
          <Link route='/my-nfts'>{messages.mainNav.profile}</Link>
        </Menu.Item>
      }

      <Menu.Item key='logout'>
        <a onClick={handleSignOut}>{messages.connectApp.disconnect}</a>
      </Menu.Item>
    </Menu>
  )

  const renderDesktop = () => {
    return (
      <Container>
        <LeftSide>
          <Logo onClick={backHome} src={images.logo} />
          {renderMainNav()}
        </LeftSide>
        <RightSide isSign={isSigned}>
          {/* <div className='MR30'>
            <LanguageSwitcher />
          </div> */}
          {isSigned && (
            <AvatarWrapper onClick={() => Router.pushRoute('/my-nfts')}>
              <AvatarImg
                src={
                  userInfo?.image
                    ? detectImageUrl(userInfo?.image)
                    : images.avatarDefault
                }
              />
              {userInfo?.username && (
                <Address>
                  {userInfo?.username?.startsWith('0x') &&
                  userInfo?.username?.length === 42 &&
                  userInfo?.username === userData.address
                    ? ellipsisAddress(userInfo?.username, 5, 4)
                    : userInfo?.username}
                </Address>
              )}
            </AvatarWrapper>
          )}

          {isSigned ? (
            <Dropdown
              placement='bottomRight'
              overlay={() => renderAccountNav(true)}
              trigger='click'
              overlayClassName='overlay-header'
              align={{ offset: [0, 0] }}
            >
              <img
                src={images.icConnect}
                className='ML20 MR20'
                style={{ width: 20 }}
              />

              {/* <DownOutlined style={{ color: 'white', marginLeft: 5 }} /> */}
            </Dropdown>
          ) : (
            <ButtonConnect onClick={handleSignIn}>
              {/* <img src={images.icConnect} className='MR9' /> */}
              <span>{messages.connectApp.connectTo}</span>
              <img src={images.icConnect} className='ML35' />

              {/* <DownOutlined style={{ marginLeft: 35 }} /> */}
            </ButtonConnect>
          )}
        </RightSide>
        <MyModal ref={myModal} />
      </Container>
    )
  }

  const redirectPage = (path) => {
    Router.pushRoute(path)
    setOpenMobileMenu(false)
  }

  const renderMobile = () => {
    return (
      <Container>
        <LeftSide>
          <Logo onClick={backHome} src={images.logo} />
        </LeftSide>
        <RightSide>
          {isSigned ? (
            <Dropdown
              placement='bottomRight'
              overlay={renderAccountNav}
              trigger='click'
              overlayClassName='overlay-header'

            >
              <AvatarWrapper>
                <AvatarImg src={userInfo?.image ? detectImageUrl(userInfo?.image) : images.avatarDefault} />
              </AvatarWrapper>
            </Dropdown>
          ) : (
            <ButtonConnectMobile onClick={handleSignIn}>
              <span>{messages.connectApp.connectTo}</span>
              <img src={images.icConnect} className='ML35' />

            </ButtonConnectMobile>
          )}
          <MobileMenuToggle onClick={() => { setOpenMobileMenu(true) }}>
            <img src={images.icHamburgerWhite} />
          </MobileMenuToggle>
          {isOpenMobileMenu &&
          <MobileMenu height={window.innerHeight + 'px'}>
            <HeaderMobileMenu onClick={() => { setOpenMobileMenu(false) }}>
              <img src={images.icWhiteClose} />
            </HeaderMobileMenu>
            <MobileMenuItem
              className={Router.asPath.includes()}
              onClick={() => { redirectPage('/') }}>{messages.home.title}</MobileMenuItem>
            <MobileMenuItem
              onClick={() => { redirectPage('/store') }} >{messages.store.title}</MobileMenuItem>
            <MobileMenuItem
              onClick={() => { redirectPage('/marketplace?attributes.type=character') }}>{messages.market.title}</MobileMenuItem>
            <MobileMenuItem
              onClick={() => { redirectPage('/gacha') }}>{messages.gacha.title}</MobileMenuItem>
            <MobileMenuItem
              onClick={() => clickBoard()}>{messages.mainNav.board}</MobileMenuItem>
            <MobileMenuItem
              onClick={() => { redirectPage('/scholarship') }}>{messages.mainNav.scholarship}</MobileMenuItem>
          </MobileMenu>
          }
        </RightSide>
        <MyModal ref={myModal} />
      </Container>
    )
  }
  return (
    <>
      <Media
        query='(min-width: 1073px)'
        render={() => (
          <LayoutHeader>
            {renderDesktop()}
          </LayoutHeader>
        )}
      />
      <Media
        query='(max-width: 1072px)'
        render={() => PAGE_MOBILE_HIDE_HEADER_FOOTER.includes(Router.pathname) ? <></> : <LayoutHeader>
          {renderMobile()}
        </LayoutHeader>}
      />

    </>
  )
}

export default Header
