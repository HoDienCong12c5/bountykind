import React, { PureComponent } from 'react'
import { Layout, Row, Col, Affix, BackTop } from 'antd'
import Header from './Header'
import Footer from './Footer'
import MyModal from 'pages/Components/MyModal'
import Maintenance from 'pages/Components/Maintenance'
import ConnectApp from 'pages/Components/ConnectApp'
import A2hs from 'pages/Components/A2hs/a2hs'
import { isMobile } from 'react-device-detect'
import { OBSERVER_KEY, PAGE_SHOW_SCROLL_TOP, PAGE_SCROLL_HEADER } from 'common/constants'
import Observer from 'common/observer'
import { Router } from 'common/routes'
import logo from '../../static/logo192.png'
import { images } from 'config/images'
const { Content } = Layout

class BaseContainer extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
    this.myModal = React.createRef()
  }
  componentDidMount () {
    Observer.on(OBSERVER_KEY.SIGN_IN, this.handleSignIn)
  }

  componentWillUnmount () {
    Observer.removeListener(OBSERVER_KEY.SIGN_IN, this.handleSignIn)
  }

  closeModal = () => {
    this.myModal.current.closeModal()
  }

  callback = (callback = null) => {
    Observer.emit(OBSERVER_KEY.ALREADY_SIGNED)
    this.closeModal()
    callback && callback()
  }

  callbackErr = (callbackErr = null) => {
    this.closeModal()
    callbackErr && callbackErr()
  }

  handleSignIn = async (callback = null, callbackErr = null) => {
    if (isMobile) {
      Observer.emit(OBSERVER_KEY.SIGN_WALLET_CONNECT)
    } else {
      this.myModal.current.openModal(
        <ConnectApp
          close={this.closeModal}
          callback={() => this.callback(callback)}
          callbackErr={() => this.callbackErr(callbackErr)}
        />, { modalWidth: 500, wrapClassName: 'connect-app-modal' }
      )
    }
  }
  checkPageScrollHeader = () => {
    console.log('Router.pathname', Router.pathname)
    return PAGE_SCROLL_HEADER.includes(Router.pathname)
  }
  renderLayout = () => {
    return (
      <Layout>
        {/* <Affix style={{ zIndex: 100 }}offsetTop={0}>
          <Header />
        </Affix> */}
        {
          this.checkPageScrollHeader() ? (
            <Header />
          ) : (
            <Affix style={{ zIndex: 100 }}offsetTop={0}>
              <Header />
            </Affix>
          )

        }

        <Layout className='layout-container'>
          <Content className='base-content'>
            <Row type='flex' justify='center'>
              <Col span={24}>
                <div className='base-container'>{this.props.children}</div>
              </Col>
            </Row>
          </Content>
        </Layout>

        {
          PAGE_SHOW_SCROLL_TOP.includes(Router.pathname) &&
          <BackTop className={isMobile && 'MB20'} style={{ zIndex: 9999 }}>
            <img src={images.home.iconManagerSlide} />
          </BackTop>
        }
        <Footer />
        <MyModal ref={this.myModal} />
        {isMobile && <A2hs icon={logo} title={'Add To Home Screen'} />}
      </Layout>
    )
  }
  render () {
    return (
      <>
        {
          process.env.MAINTENANCE_MODE === 'true'
            ? <Maintenance />
            : this.renderLayout()
        }
      </>
    )
  }
}

export default BaseContainer
