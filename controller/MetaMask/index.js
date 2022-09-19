import ReduxServices from 'common/redux'
import MetaMaskOnboarding from '@metamask/onboarding'
import Observer from 'common/observer'
import { isMobile } from 'react-device-detect'
import { OBSERVER_KEY, BSC_RPC } from 'common/constants'
import { showNotification, destroyNotification } from 'common/function'
import { convertUtf8ToHex } from '@walletconnect/utils'
import WalletConnectServices from 'controller/WalletConnect'
let onboarding

export default class MetaMaskServices {
  static async initialize () {
    try {
      if (!onboarding) {
        onboarding = new MetaMaskOnboarding()
      }
      if (!MetaMaskOnboarding.isMetaMaskInstalled() && !isMobile) {
        onboarding.startOnboarding()
      } else {
        onboarding.stopOnboarding()
        let accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        if (accounts.length > 0) {
          this.onConnect(accounts)
          // subscribe to events
          this.subscribeToEvents()
        } else {
          let accounts = await this.enableMetaMask()
          this.onConnect(accounts)
          // subscribe to events
          this.subscribeToEvents()
        }
      }
    } catch (error) {
      console.log('initialize', error)
    }
  }

  static async refresh () {
    try {
      const { accounts } = ReduxServices.getMetaMask()
      if (window.ethereum) {
        await window.ethereum
          .request({ method: 'eth_accounts' })
          .then(this.handleNewAccounts)
          .then(this.subscribeToEvents())
        this.getNetworkAndChainId()
      } else if (accounts && accounts.length > 0) {
        this.onConnect(accounts)
        // subscribe to events
        this.subscribeToEvents()
      }
    } catch (error) {
      console.log('refresh', error)
    }
  }

  static subscribeToEvents () {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum.on('chainChanged', this.handleNewChain)
      window.ethereum.on('networkChanged', this.handleNewNetwork)
      window.ethereum.on('accountsChanged', this.handleNewAccounts)
    }
  }

  static async getNetworkAndChainId () {
    try {
      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      })
      let acceptChainData = BSC_RPC[parseInt(process.env.WEB3_NETWORK_ID_ALLOWED)]
      if (chainId === acceptChainData.chainId) {
        this.handleNewChain(chainId)
      } else {
        ReduxServices.resetUser()
        destroyNotification()
        showNotification(
          `Wrong network! Please switch chain to ${acceptChainData.chainName}`
        )
        await this.addNewChain(process.env.WEB3_NETWORK_ID_ALLOWED)
        // Reload page
        window.location.reload()
      }

      const networkId = await window.ethereum.request({
        method: 'net_version'
      })
      this.handleNewNetwork(networkId)
    } catch (err) {
      console.error(err)
    }
  }

  static handleNewChain (chainId) {
    let acceptChainData = BSC_RPC[parseInt(process.env.WEB3_NETWORK_ID_ALLOWED)]
    if (chainId === acceptChainData.chainId) {
      ReduxServices.updateMetaMask({
        chainId
      })
    } else {
      ReduxServices.resetUser()
      destroyNotification()
      showNotification(
        `Wrong network! Please switch chain to ${acceptChainData.chainName}`
      )
    }
  }

  static handleNewNetwork (networkId) {
    ReduxServices.updateMetaMask({
      network: networkId
    })
  }

  static handleNewAccounts (accounts) {
    const address = accounts[0]
    ReduxServices.updateMetaMask({
      accounts,
      address
    })
  }

  static async addNewChain (chainId) {
    let chainData = BSC_RPC[parseInt(chainId)]
    if (chainData && MetaMaskOnboarding.isMetaMaskInstalled()) {
      return new Promise((resolve, reject) => {
        // Sign transaction
        window.ethereum
          .request({ method: 'wallet_addEthereumChain', params: [chainData] })
          .then((result) => {
            // Returns result successfully
            return resolve(result)
          })
          .catch((error) => {
            // Error returned when rejected
            return reject(error)
          })
      })
    } else {
      return null
    }
  }

  static signPersonalMessage (address, message) {
    const msgParams = [
      convertUtf8ToHex(message),
      address
    ]
    if (window.ethereum) {
      return new Promise((resolve, reject) => {
        // Sign transaction
        window.ethereum
          .request({ method: 'personal_sign', params: msgParams })
          .then((result) => {
            // Returns signed transaction
            return resolve(result)
          })
          .catch((error) => {
            // Error returned when rejected
            return reject(error)
          })
      })
    } else {
      return null
    }
  }

  static async onConnect (accounts) {
    const address = accounts[0]
    const callbackSignIn = () => {
      Observer.emit(OBSERVER_KEY.ALREADY_SIGNED)
    }
    await this.getNetworkAndChainId()
    // update redux state
    await ReduxServices.updateMetaMask({
      accounts,
      address
    })
    ReduxServices.loginMetamask(callbackSignIn)
  }
}
