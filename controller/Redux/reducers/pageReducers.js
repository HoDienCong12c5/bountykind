import createReducer from '../lib/reducerConfig'
import { KEY_PAGE } from '../lib/constants'
import initState from '../lib/initState'

export const internetRedux = createReducer(initState.internet, {
  [KEY_PAGE.SET_INTERNET] (state, action) {
    return action.payload
  }
})

export const pantograph = createReducer(initState.pantograph, {
  [KEY_PAGE.SET_PANTOGRAPH] (state, action) {
    return action.payload
  }
})

export const metamaskRedux = createReducer(initState.metamaskRedux, {
  [KEY_PAGE.SET_METAMASK_INFO] (state, action) {
    return action.payload
  }
})

export const walletConnect = createReducer(initState.walletConnect, {
  [KEY_PAGE.SET_WALLET_CONNECT] (state, action) {
    return action.payload
  }
})

export const balanceRedux = createReducer(initState.balanceRedux, {
  [KEY_PAGE.SET_BALANCE] (state, action) {
    return action.payload
  }
})

export const bnbPriceRedux = createReducer(initState.bnbPriceRedux, {
  [KEY_PAGE.SET_BNB_PRICE] (state, action) {
    return action.payload
  }
})
export const isOpenModalWarning = createReducer(initState.isloading, {
  [KEY_PAGE.SET_BNB_PRICE] (state, action) {
    return action.payload
  }
})
