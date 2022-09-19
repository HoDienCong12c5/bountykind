import React from 'react'
import { Router } from 'common/routes'
import { connect } from 'react-redux'
import './style.scss'

class Error404Screen extends React.PureComponent {

  backToHome = () => {
    Router.pushRoute('/')
  }

  render () {
    const { locale } = this.props
    const { messages } = locale
    return (
      <div className='error-page-container'>
        <div className='content-banner'>
          <p className='heading1'>{messages.errors.pageNotFound}</p>
          <div onClick={this.backToHome} className='back-to-home-btn'>{messages.common.backToHome}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.locale
})

export default connect(mapStateToProps)(Error404Screen)
