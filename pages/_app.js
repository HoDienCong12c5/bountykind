import React, { Suspense } from 'react'
import ReduxServices from 'common/redux'
import App from 'next/app'
import { Provider } from 'react-redux'
import Head from 'next/head'
import ReduxConnectIntl from 'config/lang'
import { addLocaleData } from 'react-intl'
import intlEN from 'react-intl/locale-data/en'
import intlJA from 'react-intl/locale-data/ja'
import intlCN from 'react-intl/locale-data/zh'
import store from 'controller/Redux/store/configureStore'
import storageActions from 'controller/Redux/actions/storageActions'
import init from 'controller/Redux/lib/initState'
import { checkLocalStoreToRedux } from 'controller/Redux/lib/reducerConfig'
import BaseContainer from 'pages/Container'
import { KEY_STORE, COOKIES_STORAGE } from 'common/constants'
import { getDataLocal } from 'common/function'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'
import './Style/override.less'
import './Style/global.scss'
import UnityLoad from './UnityLoad'
import cookiesService from 'services/cookiesService'
import { isMobile } from 'react-device-detect'
import Cookies from 'js-cookie'
addLocaleData([...intlEN, ...intlJA, ...intlCN])

const queryClient = new QueryClient()

class XCreation extends App {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true
    }
    this.currentInterval = null
  }

  async componentDidMount () {
    try {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
          navigator.serviceWorker.register('/sw.js').then(
            function (registration) {
              console.log(
                'Service Worker registration successful with scope: ',
                registration.scope
              )
            },
            function (err) {
              console.log('Service Worker registration failed: ', err)
            }
          )
        })
      }
      if (process.env.MAINTENANCE_MODE === 'true') {
        this.setState({
          isLoading: false
        })
        return
      }
      const storageRedux = [
        { key: KEY_STORE.SET_LOCALE, action: storageActions.setLocale, init: init.lang },
        { key: KEY_STORE.SET_CONNECTION_METHOD, action: storageActions.setConnectionMethod, init: init.connectionMethod },
        { key: KEY_STORE.SET_USER, action: storageActions.setUserData, init: init.userData },
        { key: KEY_STORE.SET_USER_INFO, action: storageActions.setUserInfo, init: init.userInfo },
        { key: KEY_STORE.SET_SETTING, action: storageActions.setSetting, init: init.setting },
        { key: KEY_STORE.SET_BUY_FFE_TOKEN, action: storageActions.setFFETokenData, init: init.ffeToken },
        { key: KEY_STORE.IS_OPEN_MODAL_WARNING, action: storageActions.setIsOpenModalWarning, init: init.isOpenModal }

      ]
      const promiseArr = storageRedux.map((item) => {
        checkLocalStoreToRedux(store, item.key, item.action, item.init)
      })
      await Promise.all(promiseArr)
      /// //cookies
      const storageCookie = [
        { key: COOKIES_STORAGE.REFESH_TOKEN },
        { key: COOKIES_STORAGE.ACCESS_TOKEN }
      ]

      if (ReduxServices.getUserData()) {
        cookiesService.checkHasCookies(COOKIES_STORAGE.REFESH_TOKEN, true)
        // await Promise.all(promiseArrCookies)
      }

      // in the case reload page: need to wait for detect connection method already in use before showing page

      await ReduxServices.detectConnectionMethod()

      const initDataPromiseArr = [
        ReduxServices.getSettings(),
        ReduxServices.refreshUser()
      ]

      if (getDataLocal(KEY_STORE.SET_SETTING)) {
        // data is already in local store, don't need to wait for get init data
        Promise.all(initDataPromiseArr)
      } else {
        // if user access the fisrt time and don't have data in local store
        await Promise.all(initDataPromiseArr)
      }
    } finally {
      this.setState({
        isLoading: false
      })
    }
    ReduxServices.getBnbPrice()
    setInterval(() => {
      ReduxServices.getBnbPrice()
    }, [10000])
  }

  componentWillUnmount () {
    clearInterval(this.currentInterval)
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Head>
            <title>BountyKinds</title>
            <meta charSet='utf-8' />
            <link rel='shortcut icon' href='/static/favicon.png' />
            <link rel='manifest' href='/static/manifest.json' />
            <link rel='manifest' href='/static/site.webmanifest' />
            <link rel='apple-touch-icon' href='/static/apple-touch-icon.png' />
            <meta httpEquiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
            <meta httpEquiv='Pragma' content='no-cache' />
            <meta httpEquiv='Expires' content='0' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no' />
            <meta name='theme-color' content='#000000' />
          </Head>
          {
            this.state.isLoading ? (
              <div className='loading-container'>
                {/* <img src={images.icLoading} width={70} /> */}
              </div>
            ) : (
              <ReduxConnectIntl>
                <Suspense fallback={null}>
                  <BaseContainer>
                    <Component {...pageProps} />
                    <UnityLoad />
                  </BaseContainer>
                </Suspense>

              </ReduxConnectIntl>
            )
          }
        </Provider>
      </QueryClientProvider>
    )
  }
}

export default XCreation
