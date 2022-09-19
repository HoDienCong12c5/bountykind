import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { Row, Col, Typography } from 'antd'
import './style.scss'
import { images } from 'config/images'
import Media from 'react-media'
const { Text } = Typography

class HowToUse extends React.PureComponent {
  static async getInitialProps ({ query }) {
    return { query }
  }
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    this.detectDeepLinking()
  }
  detectDeepLinking = () => {
    let id = this.props.router.query ? this.props.router.query.id : ''
    let path = this.props.router ? this.props.router.asPath : ''
    if (id) {
      if (path.includes('campaign')) {
        window.location.href = path.includes('campaign/xcreation') ? `keyring://campaign/xcreation/${id}` : `keyring://campaign/${id}`
      } else if (path.includes('nft-card') || path.includes('receive-link')) {
        window.location.href = `keyring://xcreation/nft-card/${id}`
      }
    }
  }
  render () {
    const { messages, lang } = this.props.locale
    return (
      <div className='how-to-use'>
        <div className='wrapper'>
          <Row style={{ width: '100%', alignSelf: 'center' }} className='home-download-container PB70'>
            <Col className='step-container'>
              <div className='image-donwnload-container MR22'>
                <img src={images.downloadIcon} />
              </div>
              <div className='image-line-container' />
            </Col>
            <Col className='step-content'>
              <Media
                query='(max-width: 568px)'
                render={() => (
                  <>
                    <p className='text text-size-4md'>{messages.howToUse.step1}</p>
                    <p className='flex align-center'>
                      <img src={images.keyringApp} className='MR10' />
                      <span className='text text-size-4md'>{messages.howToUse.keyringProApp}</span>
                    </p>
                  </>
                )}
              />
              <Media
                query='(min-width: 569px)'
                render={() => (
                  <p className='flex align-center'>
                    <span className='text text-size-4md'>{messages.howToUse.step1}</span>
                    <img src={images.keyringApp} className='ML10 MR10' />
                    <span className='text text-size-4md'>{messages.howToUse.keyringProApp}</span>
                  </p>
                )}
              />
              <div className='MT10 MB10'>
                <Text center='center' className='txt-sub-download'>{messages.howToUse.aSpecializedAppIsRequiredToReceiveNFTToken}</Text>
              </div>
              <ul className='list-inline-block'>
                <li className='MR20'>
                  <a href='https://apps.apple.com/us/app/keyring-pro-wallet-management/id1546824976' target='_blank' rel='noopener noreferrer' className='btn-index'>
                    <img src={images.appleIcon[lang]} className='icon-store' />
                  </a>
                </li>
                <li className='MR20'>
                  <a href='https://play.google.com/store/apps/details?id=co.bacoor.keyring' target='_blank' rel='noopener noreferrer' className='btn-index'>
                    <img src={images.googleIcon[lang]} className='icon-store' />
                  </a>
                </li>
                <li>
                  <a href='https://github.com/bacoor-hb/KEYRINGPRO/releases/download/latest/app-release.apk' target='_blank' rel='noopener noreferrer' className='btn-index' >
                    <img src={images.apkIcon[lang]} className='icon-store' />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
          <Row style={{ width: '100%', alignSelf: 'center' }} className='home-download-container PB70'>
            <Col className='step-container'>
              <div className='image-donwnload-container MR22'>
                <img src={images.addAccount} />
              </div>
              <div className='image-line-container' />
            </Col>
            <Col className='step-content'>
              <div>
                <span className='text text-size-4md'>{messages.howToUse.step2}</span>
              </div>
              <div className='MT20'>
                <Text center='center' className='txt-sub-download'>{messages.howToUse.open}</Text>
                <img src={images.keyringApp} width={30} className='MR10 ML10' />
                <Text center='center' className='txt-sub-download'>{messages.howToUse.keyringPro}</Text>
              </div>
              <Row className='MT30' gutter={30}>
                <Col xs={19} md={5} xl={6} align='center' className='MB30'>
                  <img src={images.chooseLanguage[lang]} />
                  <div className='flex align-center justify-center MT25'>
                    <img src={images.first} />
                    <Text center='center' className='text txt-sub-download text-bold ML5 PB0'>{messages.howToUse.chooseLanguage}</Text>
                  </div>
                </Col>
                <Col xs={19} md={5} xl={6} align='center' className='MB30'>
                  <img src={images.createAccount[lang]} />
                  <div className='flex align-center justify-center MT25'>
                    <img src={images.second} />
                    <Text center='center' className='text txt-sub-download text-bold ML5 PB0'>{messages.howToUse.createNewAccount}</Text>
                  </div>
                </Col>
                <Col xs={19} md={5} xl={6} align='center' className='MB30'>
                  <img src={images.selectTomo[lang]} />
                  <div className='flex align-center justify-center MT25'>
                    <img src={images.third} />
                    <Text center='center' className='text txt-sub-download text-bold ML5 PB0'>{messages.howToUse.selectTomoChain}</Text>
                  </div>
                </Col>
                <Col xs={19} md={5} xl={6} align='center'>
                  <img src={images.clickCreate[lang]} />
                  <div className='flex align-center justify-center MT25'>
                    <img src={images.fourth} />
                    <Text center='center' className='text txt-sub-download text-bold ML5 PB0'>{messages.howToUse.clickCreate}</Text>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ width: '100%', alignSelf: 'center' }} className='home-download-container PB70'>
            <Col className='step-container'>
              <div className='image-donwnload-container MR22'>
                <img src={images.connectWallet} />
              </div>
              <div className='image-line-container' />
            </Col>
            <Col className='step-content'>
              <div>
                <span className='text text-size-4md'>{messages.howToUse.step3}</span>
              </div>
              <div className='MT20'>
                <Text center='center' className='txt-sub-download'>{messages.howToUse.openMissSAKEWebsiteChooseConnectToWalletAndBeLinkedToKEYRINGPRO}</Text>
              </div>
              <Row className='MT30' gutter={30}>
                <Col xs={19} md={5} xl={6} align='center' className='MB30'>
                  <img src={images.clickOnConnect[lang]} />
                  <div className='flex align-start justify-start MT25'>
                    <img src={images.first} className='MT2' />
                    <Text center='center' className='text txt-sub-download text-bold text-left ML5 PB0'>{messages.howToUse.clickOnConnectToWallet}</Text>
                  </div>
                </Col>
                <Col xs={19} md={5} xl={6} align='center' className='MB30'>
                  <img src={images.selectKeyringApp[lang]} />
                  <div className='flex align-start justify-start MT25'>
                    <img src={images.second} className='MT2' />
                    <Text center='center' className='text txt-sub-download text-bold text-left ML5 PB0'>{messages.howToUse.selectKEYRINGPROIconAndYourKEYRINGPROappWillBeAutomaticallyOpened}</Text>
                  </div>
                </Col>
                <Col xs={19} md={5} xl={6} align='center'>
                  <img src={images.chooseAccountConnect[lang]} />
                  <div className='flex align-start justify-start MT25'>
                    <img src={images.third} className='MT2' />
                    <Text center='center' className='text txt-sub-download text-bold text-left ML5 PB0'>{messages.howToUse.chooseTheAccountYouWouldLikeToConnect}</Text>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ width: '100%', alignSelf: 'center' }} className='home-download-container PB70'>
            <Col className='step-container'>
              <div className='image-donwnload-container MR22'>
                <img src={images.scanQR} />
              </div>
              <div className='image-line-container' />
            </Col>
            <Col className='step-content'>
              <div>
                <span className='text text-size-4md'>{messages.howToUse.step4}</span>
              </div>
              <div className='MT20'>
                <Text center='center' className='txt-sub-download'>{messages.howToUse.scanQRCodeUsingKEYRINGPROAppToReceiveNFTToken}</Text>
              </div>
              <Row className='MT30'>
                <Col xs={24} md={5} xl={7} align='center'>
                  <img src={images.mobileScan} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ width: '100%', alignSelf: 'center' }} className='home-download-container MB100'>
            <Col className='step-container'>
              <div className='image-donwnload-container MR22'>
                <img src={images.check} />
              </div>
            </Col>
            <Col className='step-content'>
              <div>
                <span className='text text-size-4md'>{messages.howToUse.step5}</span>
              </div>
              <div className='MT20'>
                <Text center='center' className='txt-sub-download'>{messages.howToUse.loginToMissSAKEWebsiteAndCheckIfYouReceived}</Text>
              </div>
              <img src={images.confirmDownload} className='MT30' />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default withRouter(connect(mapStateToProps)(HowToUse))
