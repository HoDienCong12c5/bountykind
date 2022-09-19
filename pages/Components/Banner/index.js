import React from 'react'
import Media from 'react-media'
import './style.scss'

class Banner extends React.PureComponent {
  render () {
    return (
      <div className='banner-container'>
        <Media queries={{
          small: '(max-width: 567px)',
          large: '(min-width: 568px)'
        }}>
          {matches => (
            <>
              {matches.small && <div className='banner-bg-mobile'><img src={this.props.imagesBgMobile} /></div>}
              {matches.large && <div className='banner-bg-desktop'><img src={this.props.imagesBackground} /></div>}
            </>
          )}
        </Media>
      </div>
    )
  }
}

export default Banner
