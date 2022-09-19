import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import StorageAction from 'controller/Redux/actions/storageActions'
import { Dropdown } from 'antd'
import jaLocale from 'moment/locale/ja'
import enLocale from 'moment/locale/en-au'
import moment from 'moment'
import { images } from 'config/images'
import { DropdownLang, LangItem } from './style'
const configRenderLanguage = [
  {
    title: 'En',
    lang: 'en',
    src: images.flags['en']
  },
  {
    title: '日本語',
    lang: 'ja',
    src: images.flags['ja']
  },
  {
    title: '中文',
    lang: 'cn',
    src: images.flags['cn']
  }
]

class LanguageSwitcher extends React.PureComponent {
  onSetLocale = (lang) => () => {
    const { setLocale } = this.props
    setLocale && setLocale(lang)
    switch (lang) {
    case 'en':
      moment.updateLocale('en', enLocale, {
        monthsShort: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
      })
      break
    case 'ja':
      moment.updateLocale('ja', jaLocale, {
        monthsShort: [
          '1月', '2月', '3月', '4月', '5月', '6月',
          '7月', '8月', '9月', '10月', '11月', '12月'
        ]
      })
      moment.updateLocale('ja', {
        weekdays: ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)']
      })
      break
    case 'cn':
      moment.updateLocale('ja', jaLocale, {
        monthsShort: [
          '1月', '2月', '3月', '4月', '5月', '6月',
          '7月', '8月', '9月', '10月', '11月', '12月'
        ]
      })
      moment.updateLocale('ja', {
        weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      })
      break
    }
  }

  menuLanguage = () => {
    let { lang } = this.props.locale
    let selectOptionList = configRenderLanguage

    return (
      <React.Fragment>
        {selectOptionList.map((item, index) => (
          <LangItem key={index} onClick={this.onSetLocale(item.lang)} isSelected={item.lang === lang}>
            {/* <img className='flags' alt={item.title} src={item.src} /> */}
            <span
              style={{
                textTransform: 'uppercase'
              }}
            >
              {item.lang}
            </span>
          </LangItem>
        ))}
      </React.Fragment>
    )
  }
  render () {
    const { lang } = this.props.locale
    let currentSelectedObj = configRenderLanguage.find(
      (obj) => obj.lang === lang
    )
    return (
      <Dropdown
        overlayStyle={{
          borderRadius: 10,
          border: '1px solid rgba(255, 255, 255, 0.3)',
          background: 'rgb(25, 25, 25)'
        }}
        placement={'bottomLeft'} overlay={this.menuLanguage} overlayClassName='overlay-header' trigger={['click']}>
        <DropdownLang
          style={{
            height: 'auto',
            paddingLeft: 0,
            paddingBottom: 10
          }}

          onClick={e => e.preventDefault()}>
          {/* <img
            className='selected-flag'
            alt={currentSelectedObj.title}
            src={currentSelectedObj.src}
          /> */}
          {/* <span className='text text-bold text-color-5 PR8'>{currentSelectedObj.title}</span> */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            color: 'white',
            alignItems: 'center'
          }}>
            <img src={images.home.iconLanguage} />
            <div>{currentSelectedObj.title} </div>
          </div>

        </DropdownLang>
      </Dropdown>
    )
  }
}
const mapStateToProps = (state) => ({
  locale: state.locale
})
const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: bindActionCreators(StorageAction.setLocale, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher)
