import React, { Component } from 'react'
import { connect } from 'react-redux'
import { images } from 'config/images'
import './style.scss'

class MetamaskExtensionHelp extends Component {
  render () {
    const { locale } = this.props
    const { messages } = locale
    return (

      <div>
        <div className='row  text text-center metamask-extension'>
          <div style={{ height: '70%' }}>
            <img src={images.signInPantograph} className='img-wanna-play-desktop' />
          </div>
          <div className='text text-center bottom-content' style={{ height: '30%' }}>
            <p className='txt-wanna-title MT10'>
              {messages.guide.signInMetamask}
            </p>
            <p className='txt-wanna-content'>
              {messages.guide.openBrowserMetamask}
            </p>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

export default connect(mapStateToProps)(MetamaskExtensionHelp)
