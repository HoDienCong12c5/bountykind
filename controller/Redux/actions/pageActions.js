import { KEY_PAGE } from '../lib/constants'

export default class PageReduxAction {
  static setInternet (payload) {
    return {
      type: KEY_PAGE.SET_INTERNET,
      payload
    }
  }
  static setPantograph (payload) {
    return {
      type: KEY_PAGE.SET_PANTOGRAPH,
      payload
    }
  }
  static setMetamask (payload) {
    return {
      type: KEY_PAGE.SET_METAMASK_INFO,
      payload
    }
  }
  static setWalletConnect (payload) {
    return {
      type: KEY_PAGE.SET_WALLET_CONNECT,
      payload
    }
  }
  static setBalance (payload) {
    return {
      type: KEY_PAGE.SET_BALANCE,
      payload
    }
  }
  static setBnbPrice (payload) {
    return {
      type: KEY_PAGE.SET_BNB_PRICE,
      payload
    }
  }
}
