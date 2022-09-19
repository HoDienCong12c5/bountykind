import { images } from 'config/images'

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
export const RELOAD_MY_NFT = 'RELOAD_MY_NFT'

export const KEY_STORE = {
  SET_CONNECTION_METHOD: 'SET_CONNECTION_METHOD',
  SET_LOCALE: 'SET_LOCALE',
  SET_USER: 'SET_USER',
  SET_SETTING: 'SET_SETTING',
  SET_USER_INFO: 'SET_USER_INFO',
  SET_BUY_FFE_TOKEN: 'SET_BUY_FFE_TOKEN',
  SET_TRANSFER_DATA: 'SET_TRANSFER_DATA',
  IS_OPEN_MODAL_WARNING: 'IS_OPEN_MODAL_WARNING',
  REFESH_TOKEN: 'REFESH_TOKEN',
  ACCESS_TOKEN: 'ACCESS_TOKEN'
}

export const REQUEST_TYPE = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
}

export const LOCALE_DATA = {
  JA: 'ja',
  CN: 'cn',
  EN: 'en'
}

export const CONNECTION_METHOD = {
  METAMASK: 'METAMASK',
  WALLET_CONNECT: 'WALLET_CONNECT',
  PANTOGRAPH: 'PANTOGRAPH'
}

export const METAMASK_INFO = {
  status: {
    Loading: 'loading',
    NoWeb3: 'noweb3',
    Error: 'error',
    Locked: 'locked',
    ChangeAccount: 'changeaccount',
    Ready: 'ready'
  },
  network: {
    1: 'Mainnet',
    2: 'Morden',
    3: 'Ropsten',
    4: 'Rinkeby',
    42: 'Kovan',
    56: 'Binance Smart Chain Mainnet',
    97: 'Binance Smart Chain Testnet',
    88: 'TomoChain Mainnet',
    89: 'TomoChain Testnet',
    5777: 'Private'
  }
}

export const LINK_SUPPORT = {
  PANTOGRAPH_CHROME:
    'https://chrome.google.com/webstore/detail/pantograph/ocfgfhicacgipgpiapepehhpidbhijkl?hl=en',
  PANTOGRAPH_FIREFOX: 'https://addons.mozilla.org/vi/firefox/addon/pantograph/',
  PANTOGRAPH_IOS:
    'https://apps.apple.com/vn/app/pantograph-networking-app/id1504033778',
  PANTOGRAPH_GOOGLE:
    'https://play.google.com/store/apps/details?id=pantograph.bacoor.crypto.co'
}

export const BSC_RPC = {
  56: {
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    chainId: '0x38',
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'Binance',
      symbol: 'BNB',
      decimals: 18
    },
    blockExplorerUrls: ['https://bscscan.com']
  },
  97: {
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    chainId: '0x61',
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'Binance',
      symbol: 'BNB',
      decimals: 18
    },
    blockExplorerUrls: ['https://devnet.bscscan.com']
  }
}

export const OBSERVER_KEY = {
  SIGN_IN: 'SIGN_IN',
  ALREADY_SIGNED: 'ALREADY_SIGNED',
  CHANGED_ACCOUNT: 'CHANGED_ACCOUNT',
  UPDATE_MY_DOMAINS: 'UPDATE_MY_DOMAINS',
  SIGN_WALLET_CONNECT: 'SIGN_WALLET_CONNECT',
  REFRESH_PAGE: 'REFRESH_PAGE',
  TXHASH_RECEIVED: 'TXHASH_RECEIVED',
  LOGOUT: 'LOGOUT'
}

export const WALLET_CONNECT_APP = [
  {
    name: 'KEYRING PRO',
    icon: images.download.keyring,
    mobile: {
      native: 'keyring:',
      universal: 'https://keyring.app'
    }
  },
  {
    name: 'METAMASK',
    icon: images.download.metamask2,
    mobile: {
      native: 'metamask:',
      universal: 'https://metamask.app.link'
    }
  },
  {
    name: 'TRUST',
    icon: images.download.trust,
    mobile: {
      native: 'trust:',
      universal: 'https://link.trustwallet.com'
    }
  },
  {
    name: 'PREMA Wallet',
    icon: images.icPrema,
    mobile: {
      native: 'prema:',
      universal: 'https://premanft.com'
    }
  }
]

export const DEEP_LINKING = {
  KEYRING: 'https://keyring.app/wc?uri=',
  PREMA: 'https://premanft.com/wc?uri=',
  KEYRINGWEBSITE_TESTNET: 'https://sign-dev.keyringpro.com',
  KEYRINGWEBSITE: 'https://sign.keyringpro.com',
  PREMA_WEB_TESTNET: 'https://sign-dev.premanft.com',
  PREMA_WEB: 'https://sign.premanft.com'
}

export const PAGE_MOBILE_HIDE_HEADER_FOOTER = [
  '/Screen/MyNFTScreen/Subview/MyNFTDetailMobile'
]

export const PAGE_SHOW_SCROLL_TOP = [
  '/Screen/MarketScreen',
  '/Screen/MyNFTScreen',
  '/Screen/HomeScreen',
  '/'
]
export const PAGE_NOT_SIGNED = [
  '/Screen/MyNFTScreen',
  '/Screen/MyNFTScreen/Components/SellNFT',
  '/Screen/MyNFTDetailScreen',
  '/Screen/MyNFTScreen/Components/ChangePriceNFT'
]
export const PAGE_SCROLL_HEADER = [
  '/Screen/HomeScreen',
  '/'
]

export const REACT_QUERY_KEY = {
  GET_MY_NFTS: 'GET_MY_NFTS',
  GET_NFT_FILTERS: 'GET_NFT_FILTERS',
  GET_USER_GAME_INFO: 'GET_USER_GAME_INFO',
  GET_SPHERES: 'GET_SPHERES',
  GET_SPHERE_DETAILS: 'GET_SPHERE_DETAILS',
  GET_GACHA_ITEMS: 'GET_GACHA_ITEMS',
  GET_FIATS: 'GET_FIATS',
  GET_TOKEN_SYMBOLS: 'GET_TOKEN_SYMBOLS',
  GET_TOKEN_PRICE_IN_WEI: 'GET_TOKEN_PRICE_IN_WEI',
  GET_SPHERE_ONCHAIN_DETAILS: 'GET_SPHERE_ONCHAIN_DETAILS',
  GET_USER_SPHERES: 'GET_USER_SPHERES',
  GET_SELLING_NFTS: 'GET_SELLING_NFTS',
  GET_USD_TO_TOKEN: 'GET_USD_TO_TOKEN',
  GET_USER_ITEMS: 'GET_USER_ITEMS',
  GET_NFT_DETAILS: 'GET_NFT_DETAILS',
  GET_USER_NFTS: 'GET_USER_NFTS',
  GET_ORDER_HISTORY: 'GET_ORDER_HISTORY',
  GET_LIST_TOKEN_LIST: 'GET_LIST_TOKEN_LIST',
  GET_LIST_TOKEN_FIAT: 'GET_LIST_TOKEN_FIAT',
  GET_TYPE_FIATS: 'GET_TYPE_FIATS',
  GET_PRICE_TO_WEI: 'GET_PRICE_TO_WEI'
}

export const MARKET_FILTERS_TYPE = {
  CHARACTER: 'character',
  ITEM: 'item',
  SAPPHIRE: 'sapphire'
}
export const ICON_BUTTON_ESPECIALLY = {
  anima: {
    icon: images.iconTypeGame.iconAttribute.iconAnima,
    iconHover: images.iconTypeGame.iconAttribute.iconAnimaSelected
  },
  aqua: {
    icon: images.iconTypeGame.iconAttribute.iconAqua,
    iconHover: images.iconTypeGame.iconAttribute.iconAquaSelected
  },
  earth: {
    icon: images.iconTypeGame.iconAttribute.iconEarth,
    iconHover: images.iconTypeGame.iconAttribute.iconEarthSelected
  },
  eleking: {
    icon: images.iconTypeGame.iconAttribute.iconEleking,
    iconHover: images.iconTypeGame.iconAttribute.iconElekiSelected
  },
  ignis: {
    icon: images.iconTypeGame.iconAttribute.iconIgnis,
    iconHover: images.iconTypeGame.iconAttribute.iconIgnisSelected
  },
  plant: {
    icon: images.iconTypeGame.iconAttribute.iconPlant,
    iconHover: images.iconTypeGame.iconAttribute.iconPlantSelected
  }
}
export const COOKIES_STORAGE = {
  ACCESS_TOKEN: 'accessToken',
  REFESH_TOKEN: 'refeshToken',
  EXP_ACCESS_TOKEN: 'EXP_ACCESS_TOKEN',
  EXP_REFESH_TOKEN: 'EXP_REFESH_TOKEN'
}
export const COLOR = {
  red: 'red',
  white: 'white',
  green: 'green',
  yellow: 'yellow',
  white1: 'rgba(255, 255, 255, 0.9)',
  white2: 'rgba(255, 255, 255, 0.6)',

  purple: 'rgba(100, 61, 167, 1)',
  blue: 'blue'
}
