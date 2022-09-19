import { KEY_STORE } from 'common/constants'
import { saveDataLocal } from 'common/function'

export default class StorageActions {
  static setLocale (payload) {
    saveDataLocal(KEY_STORE.SET_LOCALE, payload)
    return {
      type: KEY_STORE.SET_LOCALE,
      payload
    }
  }

  static setConnectionMethod (payload) {
    saveDataLocal(KEY_STORE.SET_CONNECTION_METHOD, payload)
    return {
      type: KEY_STORE.SET_CONNECTION_METHOD,
      payload
    }
  }

  static setUserData (payload) {
    saveDataLocal(KEY_STORE.SET_USER, payload)
    return {
      type: KEY_STORE.SET_USER,
      payload
    }
  }

  static setUserInfo (payload) {
    saveDataLocal(KEY_STORE.SET_USER_INFO, payload)
    return {
      type: KEY_STORE.SET_USER_INFO,
      payload
    }
  }

  static setSetting (payload) {
    saveDataLocal(KEY_STORE.SET_SETTING, payload)
    return {
      type: KEY_STORE.SET_SETTING,
      payload
    }
  }

  static setTransferData (payload) {
    saveDataLocal(KEY_STORE.SET_TRANSFER_DATA, payload)
    return {
      type: KEY_STORE.SET_TRANSFER_DATA,
      payload
    }
  }

  static setFFETokenData (payload) {
    saveDataLocal(KEY_STORE.SET_BUY_FFE_TOKEN, payload)
    return {
      type: KEY_STORE.SET_BUY_FFE_TOKEN,
      payload
    }
  }
  static setIsOpenModalWarning (payload) {
    saveDataLocal(KEY_STORE.IS_OPEN_MODAL_WARNING, payload)
    return {
      type: KEY_STORE.IS_OPEN_MODAL_WARNING,
      payload
    }
  }

  static setAccessTokenData (payload) {
    saveDataLocal(KEY_STORE.ACCESS_TOKEN, payload)
    return {
      type: KEY_STORE.ACCESS_TOKEN,
      payload
    }
  }
  static setRefeshTokenData (payload) {
    saveDataLocal(KEY_STORE.REFESH_TOKEN, payload)
    return {
      type: KEY_STORE.REFESH_TOKEN,
      payload
    }
  }
}
