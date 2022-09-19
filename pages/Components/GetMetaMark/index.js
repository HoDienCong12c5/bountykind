import React, { Component } from 'react'
import { connect } from 'react-redux'
import { images } from 'config/images'
import { isAndroid, isMobile } from 'react-device-detect'
import { withRouter } from 'next/router'
import { Row, Col, Button } from 'antd'
import './style.scss'

class GetMetaMask extends Component {
  render () {
    const { locale, onOpenPlugin, onLinkingMoble } = this.props
    const { messages } = locale
    return isMobile ? (
      <div className='row text text-center get-metamask'>
        
      </div>
    ) : (
      <div className='row text text-center get-metamask'>
        <Row>
          <Col span={24}>
            <p className='text text-uppercase text-color-4 text-size-1x'>Please connect with the app</p>
          </Col>
          <Col span={24}>
            <div className='flex justify-center MT20 MB20'>
              <div className='flex align-center'>
                <img src={images.icPantograph} className='MR5' width={30} />
                <span className='text text-bold text-size-3x text-color-2 PB0'>Pantograph</span>
              </div>
              <Button className='ML10' onClick={onOpenPlugin}>Download</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <p className='text text-uppercase text-color-4 text-size-1x MT20'>Please use the following browsers</p>
          </Col>
          <Col span={24}>
            <div className='flex justify-center  MT20 MB20'>
              <div className='flex align-center'>
                <img src={images.icChrome} className='flex MR5' width={20} />
                <span className='text text-bold text-size-3x text-color-2 PB0'>Google Chrome</span>
              </div>
              <div className='flex align-center ML50'>
                <img src={images.icBrave} className='MR5' width={20} />
                <span className='text text-bold text-size-3x text-color-2 PB0'>Brave</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData,
  pantograph: state.pantograph
})

export default connect(mapStateToProps)(withRouter(GetMetaMask))
