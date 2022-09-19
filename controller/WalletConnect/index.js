import ReduxServices from 'common/redux'
import WalletConnect from '@walletconnect/client'
import { convertUtf8ToHex } from '@walletconnect/utils'
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal'
import Observer from 'common/observer'
import { OBSERVER_KEY } from 'common/constants'
import { getDataLocal, saveDataLocal, removeDataLocal } from 'common/function'
import { isMobile } from 'react-device-detect'
import { WALLET_CONNECT_APP } from 'config/wallet-connect/registry'

const DEFAULT_BRIDGE = 'https://bridge.keyringpro.com'
const INITIAL_STATE = {
  connector: null,
  connected: false,
  chainId: 0,
  accounts: [],
  address: '',
  session: {}
}
let connector

export default class WalletConnectServices {
  static async initialize () {
    try {
      connector = new WalletConnect({
        bridge: DEFAULT_BRIDGE,
        qrcodeModal: WalletConnectQRCodeModal,
        session: INITIAL_STATE.session
      })

      // update redux state
      ReduxServices.updateWalletConnect({ connector })
      if (!connector.connected) {
        // create new session
        await connector.createSession({ chainId: parseInt(process.env.WEB3_NETWORK_ID_ALLOWED) })
      } else {
        // get updated accounts and chainId
        const { accounts, chainId, peerMeta } = connector
        console.log('initialize')
        this.onConnect(connector, accounts, chainId, peerMeta)
      }

      // subscribe to events
      this.subscribeToEvents()
    } catch (error) {
      console.log('initialize', error)
    }
  }

  static async initializeMobile () {
    try {
      // create new connector
      connector = new WalletConnect({ bridge: DEFAULT_BRIDGE, session: INITIAL_STATE.session })

      // update redux state
      ReduxServices.updateWalletConnect({ connector })

      // check if already connected
      if (!connector.connected) {
        // create new session
        await connector.createSession({ chainId: parseInt(process.env.WEB3_NETWORK_ID_ALLOWED) })
      } else {
        // get updated accounts and chainId
        console.log('initialize mobile')
        const { accounts, chainId, peerMeta } = connector
        this.onConnect(connector, accounts, chainId, peerMeta)
      }

      // subscribe to events
      this.subscribeToEvents()

      return connector
    } catch (error) {
      console.log('initializeMobile', error)
    }
  }

  static async refresh () {
    try {
      let walletConnect = ReduxServices.getWalletConnect()
      const prevConnector = walletConnect.connector

      if (!prevConnector) {
        // create new connector
        // connector = new WalletConnect({ bridge: DEFAULT_BRIDGE, session: {} })
      } else {
        let oldSession = getDataLocal('wallet_connect_session')
        connector = new WalletConnect({ session: oldSession || prevConnector.session, bridge: DEFAULT_BRIDGE })
      }

      // update redux state
      ReduxServices.updateWalletConnect({ connector })

      console.log(connector.connected, 'refresh')
      // check if already connected
      if (!connector.connected) {
        // create new session
        await connector.createSession({ chainId: parseInt(process.env.WEB3_NETWORK_ID_ALLOWED) })
      } else {
        // get updated accounts and chainId
        const { accounts, chainId, peerMeta } = connector
        console.log('refresh')
        this.onConnect(connector, accounts, chainId, peerMeta)
      }

      // subscribe to events
      this.subscribeToEvents()
    } catch (error) {
      console.log('refresh', error)
    }
  }

  static subscribeToEvents () {
    if (!connector) {
      return
    }

    connector.on('session_update', (error, payload) => {
      console.log('session_request', error, payload)
      if (error) {
        throw error
      }

      // get updated accounts and chainId
      const { accounts, chainId } = payload.params[0]
      this.onSessionUpdate(accounts, chainId)
    })

    connector.on('session_request', (error, payload) => {
      console.log('session_request', error, payload)
      if (error) {
        throw error
      }
    })

    connector.on('connect', (error, payload) => {
      console.log('connect', error, payload)
      if (error) {
        throw error
      }

      // get updated accounts and chainId
      const { accounts, chainId, peerMeta } = payload.params[0]
      this.onConnect(connector, accounts, chainId, peerMeta)
      saveDataLocal('wallet_connect_session', connector.session)
    })

    connector.on('disconnect', (error, payload) => {
      console.log('disconnect', error, payload)
      if (error) {
        throw error
      }

      // delete connector
      this.onDisconnect()
    })
  }

  static onSessionUpdate (accounts, chainId) {
    const address = accounts[0]
    // update redux state
    ReduxServices.updateWalletConnect({
      chainId,
      accounts,
      address
    })
  }

  static async onConnect (connector, accounts, chainId, peerMeta) {
    const address = accounts[0]
    const { name } = peerMeta
    const appConnected = WALLET_CONNECT_APP.find(e => e.name.toLowerCase().startsWith(name.toLowerCase()))
    const callbackSignIn = () => {
      Observer.emit(OBSERVER_KEY.ALREADY_SIGNED)
    }
    // update redux state
    await ReduxServices.updateWalletConnect({
      connector,
      connected: true,
      chainId,
      accounts,
      address,
      session: connector.session,
      appConnected
    })
    ReduxServices.loginWalletConnect(callbackSignIn)
  }

  static onDisconnect () {
    this.resetApp()
  }

  static resetApp () {
    // update redux state
    ReduxServices.updateWalletConnect(INITIAL_STATE)
    ReduxServices.resetUser()
    Observer.emit(OBSERVER_KEY.CHANGED_ACCOUNT)
    removeDataLocal('wallet_connect_session')
  }

  static killSession = () => {
    if (connector) {
      connector.killSession()
    }
    this.resetApp()
  }

  static formatIOSMobile = (uri, entry) => {
    const encodedUri = encodeURIComponent(uri)
    return entry.universalLink
      ? `${entry.universalLink}/wc?uri=${encodedUri}`
      : entry.deepLink
        ? `${entry.deepLink}${entry.deepLink.endsWith(':') ? '//' : '/'}wc?uri=${encodedUri}`
        : ''
  }

  static deeplinkOpenApp = () => {
    const walletConnect = ReduxServices.getWalletConnect()
    if (isMobile && walletConnect.appConnected) {
      if (walletConnect.appConnected.name.startsWith('KEYRING')) {
        window.location.href = walletConnect.appConnected.universalLink + '/wc?uri=wc:' + walletConnect.session.handshakeTopic + '@1'
      } else {
        window.location.href = WalletConnectServices.formatIOSMobile(walletConnect.connector.uri, walletConnect.appConnected)
      }
    }
  }

  static sendTransaction (tx) {
    let walletConnect = ReduxServices.getWalletConnect()
    const { connector } = walletConnect
    if (!(connector && connector.connected)) {
      this.killSession()
      return
    }

    return new Promise((resolve, reject) => {
      // Sign transaction
      connector
        .sendTransaction(tx)
        .then((result) => {
          // Returns signed transaction
          return resolve(result)
        })
        .catch((error) => {
          // Error returned when rejected
          return reject(error)
        })
    })
  }

  static signPersonalMessage (message, address) {
    let walletConnect = ReduxServices.getWalletConnect()
    const { connector } = walletConnect
    if (!(connector && connector.connected)) {
      this.killSession()
      return
    }
    const msgParams = [
      convertUtf8ToHex(message),
      address
    ]

    return new Promise((resolve, reject) => {
      // Sign transaction
      connector
        .signPersonalMessage(msgParams)
        .then((result) => {
          // Returns signed transaction
          return resolve(result)
        })
        .catch((error) => {
          // Error returned when rejected
          return reject(error)
        })
    })
  }
}
