import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Router } from 'common/routes'
import WalletConnectServices from 'controller/WalletConnect'
import MetaMaskServices from 'controller/MetaMask'
import { Menu, Button, Row, Col, Drawer } from 'antd'
import StorageAction from 'controller/Redux/actions/storageActions'
import { CONNECTION_METHOD, OBSERVER_KEY, PAGE_MOBILE_HIDE_HEADER_FOOTER, PAGE_SCROLL_HEADER } from 'common/constants'
import MyModal from 'pages/Components/MyModal'
import Observer from 'common/observer'
import { isMobile, isAndroid } from 'react-device-detect'
import ExternalLink from 'pages/Components/ExternalLink'
import Media from 'react-media'
import { images } from 'config/images'
import {
  LayoutFooter,
  FooterContainer,
  RowContainer,
  Subscribe,
  ChangeLanguage,
  IconMoreLink,
  BlockContent,
  MenuMobileDrawer,
  MenuMobileNav
} from './style'
import {
  MenuHeader,
  MenuHeaderItem
} from '../Header/style'
import { Form } from 'antd'
import './style.scss'
import ReduxServices from 'common/redux'
import WalletConnect from 'pages/Components/WalletConnect'
import BlogPage from './Components/BLogPage'
import LanguageSwitcher from 'pages/Components/LanguageSwitcher'
import FormEmail from './Components/FormEmail'
const iconMoreSocialInternet = [
  {
    select: images.home.iconSocialInternet.twitter,
    key: 'twitter',
    link: 'twitter.com'
  },
  {
    select: images.home.iconSocialInternet.face,
    key: 'face'
  },
  {
    select: images.home.iconSocialInternet.instagram,
    key: 'instagram'
  },
  {
    select: images.home.iconSocialInternet.youtube,
    key: 'youtube'
  },
  {
    select: images.home.iconSocialInternet.socialInternet2,
    key: 'socialInternet2'
  },
  {
    select: images.home.iconSocialInternet.socialInternet5,
    key: 'socialInternet5'
  },
  {
    select: images.home.iconSocialInternet.socialInternet7,
    key: 'socialInternet7'
  }
]
const Footer = () => {
  const myModal = useRef()
  const { messages } = useSelector(state => state.locale)
  const showMarket = useSelector(state => state.settingRedux.others?.showMarket ?? false)
  const dispatch = useDispatch()
  const dispatchSetConnectionMethod = (method) => dispatch(StorageAction.setConnectionMethod(method))
  // useState
  const [indexSelected, setIndexSelected] = useState('blog')
  const [formData, setFormData] = useState({
    email: 'Email@example.com'
  })
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [visibleMenu, setVisibleMenu] = useState(false)
  const [visibileLogin, setVisibleLogin] = useState(false)

  // useEffect
  useEffect(() => {
    Observer.on(OBSERVER_KEY.SIGN_WALLET_CONNECT, onConnect)
    Observer.on(OBSERVER_KEY.ALREADY_SIGNED, onSigned)
    return function cleanup () {
      Observer.removeListener(OBSERVER_KEY.SIGN_WALLET_CONNECT, onConnect)
      Observer.removeListener(OBSERVER_KEY.ALREADY_SIGNED, onSigned)
    }
  }, [])
  const onSigned = () => {
    setVisibleLogin(false)
  }
  const showDrawer = () => {
    dispatchSetConnectionMethod(CONNECTION_METHOD.WALLET_CONNECT)
    setVisible(true)
    setVisibleMenu(false)
  }
  const closeDrawer = () => {
    setVisible(false)
    setVisibleMenu(false)
  }
  const toggleMenuDrawer = () => {
    setVisible(false)
    setVisibleMenu(!visibleMenu)
  }
  // const closeModal = () => {
  //   myModal.current.closeModal()
  // }
  const showModalConnectWallet = () => {
    closeDrawer()
    dispatchSetConnectionMethod(CONNECTION_METHOD.WALLET_CONNECT)
    if (isMobile && isAndroid) {
      WalletConnectServices.initialize()
    } else {
      setVisibleLogin(true)
      // myModal.current.openModal(<ModalConnectWalletMb closeModal={closeModal} />, { wrapClassName: 'connect-wallet-mb', modalWidth: 350 })
    }
  }
  const onConnect = () => {
    if (window.tomoWeb3) {
      onConnectViaWeb3MobleBrowser()
    } else {
      if (window.ethereum) {
        dispatchSetConnectionMethod(CONNECTION_METHOD.METAMASK)
        MetaMaskServices.initialize()
      } else {
        showDrawer()
      }
    }
  }

  const onConnectViaWeb3MobleBrowser = async () => {
    dispatchSetConnectionMethod(CONNECTION_METHOD.PANTOGRAPH)
    await ReduxServices.refreshPantograph()
    ReduxServices.loginPantograph(
      () => { },
      callback,
      callbackErr
    )
  }

  const callback = (callback = null) => {
    Observer.emit(OBSERVER_KEY.ALREADY_SIGNED)
    callback && callback()
  }

  const callbackErr = (callbackErr = null) => {
    callbackErr && callbackErr()
  }

  const onClick = (key) => {
    switch (key) {
    case 'blog':
      // setIndexSelected('blog')
      break
    case 'support':
      // setIndexSelected('support')
      break
    case 'fap':
      // setIndexSelected('fap')
      break
    case 'privatePolicy':
      // setIndexSelected('privatePolicy')
      break
    case 'termsOfService':
      // setIndexSelected('termsOfService')
      break
    default:
      // setIndexSelected('game')
      break
    }
  }

  const pressEmail = (e) => {
  }

  const mouseHoverIcon = (key) => {
    switch (key) {
    case 'face':

      break

    default:
      break
    }
  }
  const checkRoutePage = () => {
    return [
      '/Screen/HomeScreen',
      '/'
    ].includes(Router.pathname) ? 0 : 100
  }
  const renderDesktop = () => {
    return (
      <FooterContainer >
        <RowContainer flexStart>
          <ChangeLanguage >
            <LanguageSwitcher />
          </ChangeLanguage>
          <Subscribe>
            Subscribe to be first to learn about Bountykinds updates
          </Subscribe>
        </RowContainer>
        <RowContainer flexEnd>
          <div style={{ display: 'flex', flexDirection: 'row', flexFlow: 'row', gap: 15 }}>
            <BlogPage
              title='Blog'
              onClick={() => onClick('blog')}
              isSelect={indexSelected === 'blog'}
            />
            <BlogPage
              title='Support'
              onClick={() => onClick('support')}
              isSelect={indexSelected === 'support'}
            />
            <BlogPage
              title='Fap'
              onClick={() => onClick('fap')}
              isSelect={indexSelected === 'fap'}
            />
            <BlogPage
              title='Private Policy'
              onClick={() => onClick('privatePolicy')}
              isSelect={indexSelected === 'privatePolicy'}
            />
            <BlogPage
              title='Terms Of Service'
              onClick={() => onClick('termsOfService')}
              isSelect={indexSelected === 'termsOfService'}
            />
          </div>
          <FormEmail
            formData={formData}
            form={form}
            submitFormEmail={pressEmail}
            setFormData={setFormData}
          />
        </RowContainer>
        <br />
        <RowContainer >
          <BlogPage
            onClick={() => onClick('game')}
            isSelect={indexSelected === 'game'}
            isEspecially
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {iconMoreSocialInternet.map((item, index) => (
              <IconMoreLink
                key={item.select}
                onClick={() => mouseHoverIcon(item.key)}
                src={item.select}
              />
            ))}
          </div>
        </RowContainer>
      </FooterContainer>
    )
  }
  const renderMainNav = (mode = 'horizontal') => {
    return (
      <MenuHeader mode={mode} >
        <Menu.Item key={4}>
          <ExternalLink url='https://swap-bsc.keyring.app/'>
            <MenuHeaderItem>{messages.mainNav.trade}</MenuHeaderItem>
          </ExternalLink>
        </Menu.Item>
        <Menu.Item key={5}>
          <ExternalLink url=''>
            <MenuHeaderItem>{messages.mainNav.bridge}</MenuHeaderItem>
          </ExternalLink>
        </Menu.Item>
        <Menu.Item key={6}>
          <ExternalLink url=''>
            <MenuHeaderItem>{messages.mainNav.whitepaper}</MenuHeaderItem>
          </ExternalLink>
        </Menu.Item>
      </MenuHeader>
    )
  }

  const renderMobile = () => {
    return (
      <>
        <FooterContainer >
          <RowContainer flexStart>
            <ChangeLanguage >
              <LanguageSwitcher />
            </ChangeLanguage>

          </RowContainer>
          <RowContainer >
            <Subscribe>
            Subscribe to be first to learn about Bountykinds updates
            </Subscribe>
          </RowContainer>
          <br />
          <FormEmail
            formData={formData}
            form={form}
            submitFormEmail={pressEmail}
            setFormData={setFormData}
          />
          <br />

          <RowContainer >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {iconMoreSocialInternet.map((item, index) => (
                <IconMoreLink
                  key={item.select}
                  onClick={() => mouseHoverIcon(item.key)}
                  src={item.select}
                />
              ))}
            </div>
          </RowContainer>
          <br />

          <RowContainer flexEnd>
            <div style={{ display: 'flex', flexDirection: 'row', flexFlow: 'row', gap: 15 }}>
              <BlogPage
                title='Blog'
                onClick={() => onClick('blog')}
                isSelect={indexSelected === 'blog'}
              />
              <BlogPage
                title='Support'
                onClick={() => onClick('support')}
                isSelect={indexSelected === 'support'}
              />
              <BlogPage
                title='Fap'
                onClick={() => onClick('fap')}
                isSelect={indexSelected === 'fap'}
              />
              <BlogPage
                title='Private Policy'
                onClick={() => onClick('privatePolicy')}
                isSelect={indexSelected === 'privatePolicy'}
              />

            </div>
          </RowContainer>
          <br />
          <RowContainer >
            <BlogPage
              title='Terms Of Service'
              onClick={() => onClick('termsOfService')}
              isSelect={indexSelected === 'termsOfService'}
            />
          </RowContainer>

          <br />
          <RowContainer >
            <BlogPage
              onClick={() => onClick('game')}
              isSelect={indexSelected === 'game'}
              isEspecially
            />
          </RowContainer>
        </FooterContainer>

        <Drawer
          height={'auto'}
          placement={'bottom'}
          onClose={closeDrawer}
          visible={visible}
          title={messages.connectApp.connectToAWallet}
          closeIcon={<img src={images.icCloseDrawer} />}
        >
          <BlockContent>
            <p>By connecting a wallet, you agree to Bountykinds <a href='/term' target='_blank' className='text' style={{ color: '#F6541D' }}>Terms of use</a> and ackowledge that you have read and understand the <a href='/policy' target='_blank' className='text' style={{ color: '#F6541D' }} >Bountykinds protocol disclaimer.</a></p>
          </BlockContent>
          <Button style={{ borderRadius: '12px', fontWeight: '700' }} block className='ant-big-btn btn-wallet-connect MT20' onClick={showModalConnectWallet}>
            <span>WalletConnect</span>
            <img src={images.download.walletconnect} width={20} />
          </Button>
        </Drawer>
        <MenuMobileDrawer
          zIndex={99}
          placement={'bottom'}
          onClose={closeDrawer}
          visible={visibleMenu}
          closable={false}
          src={images.home.bannerBG}
        >
          <MenuMobileNav>
            {renderMainNav('vertical')}
          </MenuMobileNav>
        </MenuMobileDrawer>
      </>

    )
  }
  return (
    <LayoutFooter
      marginTop={checkRoutePage}
    >
      <Media
        query='(min-width: 1073px)'
        render={() => renderDesktop()}
      />
      <Media
        query='(max-width: 1072px)'
        render={() => PAGE_MOBILE_HIDE_HEADER_FOOTER.includes(Router.pathname) ? <></> : renderMobile()}
      />
      <MyModal ref={myModal} />
      <WalletConnect visible={visibileLogin} onCancel={() => setVisibleLogin(false)} />
    </LayoutFooter>
  )
}

export default Footer
