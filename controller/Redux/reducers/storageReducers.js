import createReducer from '../lib/reducerConfig'
import MessageVI from 'static/Assets/Lang/ja.json'
import MessageEN from 'static/Assets/Lang/en.json'
import MessageCN from 'static/Assets/Lang/cn.json'
import { KEY_STORE } from 'common/constants'
import initState from '../lib/initState'
const localeJA = {
  lang: 'ja',
  messages: MessageVI
}

const localeEN = {
  lang: 'en',
  messages: MessageEN
}

const localeCN = {
  lang: 'cn',
  messages: MessageCN
}

export const locale = createReducer(localeEN, {
  [KEY_STORE.SET_LOCALE] (state, action) {
    switch (action.payload) {
    case 'en':
      return localeEN
    case 'ja':
      return localeJA
    case 'cn':
      return localeCN
    default:
      return localeEN
    }
  }
})

export const connectionMethod = createReducer(initState.connectionMethod, {
  [KEY_STORE.SET_CONNECTION_METHOD] (state, action) {
    return action.payload
  }
})

export const userData = createReducer(initState.userData, {
  [KEY_STORE.SET_USER] (state, action) {
    return action.payload
  }
})

export const userInfo = createReducer(initState.userInfo, {
  [KEY_STORE.SET_USER_INFO] (state, action) {
    return action.payload
  }
})

export const settingRedux = createReducer(initState.setting, {
  [KEY_STORE.SET_SETTING] (state, action) {
    return action.payload
  }
})

export const transferDataRedux = createReducer(initState.transferData, {
  [KEY_STORE.SET_TRANSFER_DATA] (state, action) {
    return action.payload
  }
})

export const ffeTokenRedux = createReducer(initState.ffeToken, {
  [KEY_STORE.SET_BUY_FFE_TOKEN] (state, action) {
    return action.payload
  }
})
export const isOpenModalWarning = createReducer(initState.isOpenModal, {
  [KEY_STORE.IS_OPEN_MODAL_WARNING] (state, action) {
    return action.payload
  }
})
export const accessToken = createReducer(initState.accessToken, {
  [KEY_STORE.ACCESS_TOKEN] (state, action) {
    return action.payload
  }
})
export const refeshToken = createReducer(initState.refeshToken, {
  [KEY_STORE.REFESH_TOKEN] (state, action) {
    return action.payload
  }
})
