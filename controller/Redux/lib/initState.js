import { METAMASK_INFO } from 'common/constants'

var initState = {
  lang: 'ja',
  userData: null,
  userInfo: null,
  connectionMethod: null,
  metamaskRedux: {
    network: 0,
    accounts: [],
    address: ''
  },
  pantograph: {
    status: METAMASK_INFO.status.Loading,
    network: 0,
    chainId: 0,
    account: ''
  },
  walletConnect: {
    connector: {},
    chainId: 0,
    accounts: [],
    address: '',
    session: {},
    appConnected: null
  },
  internet: true,
  isloading: true,
  setting: {},
  transferData: {},
  cart: [],
  tokensRedux: [],
  balanceRedux: {
    balanceETH: 0
  },
  bnbPriceRedux: 0,
  ffeToken: [],
  isOpenModal: false,
  accessToken: {},
  refeshToken: {}
}

export default initState
