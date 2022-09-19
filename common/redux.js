import Web3Services from 'controller/Web3'
import MetaMaskServices from 'controller/MetaMask'
import WalletConnectServices from 'controller/WalletConnect'
import storeRedux from 'controller/Redux/store/configureStore'
import PageReduxAction from 'controller/Redux/actions/pageActions'
import StorageActions from 'controller/Redux/actions/storageActions'
import { showNotification, getCurrentBrowserLanguage, lowerCase } from './function'
import { CONNECTION_METHOD, METAMASK_INFO, OBSERVER_KEY, COOKIES_STORAGE } from './constants'
import Observer from 'common/observer'
import UserService from 'services/userService'
import CommonService from 'services/commonService'
import TokenService from '../services/tokenService'
import cookiesService from 'services/cookiesService'
import Cookies from 'js-cookie'
const window = require('global/window')
export default class ReduxServices {
  static async callDispatchAction (action) {
    storeRedux.dispatch(action)
  }

  static async refreshInternet (isConnect, isChange) {
    const { locale } = storeRedux.getState()
    const { messages } = locale

    if (isConnect) {
      isChange && showNotification(messages.warnInternerOnline)
    } else {
      showNotification(messages.warnInternerOffline)
    }

    ReduxServices.callDispatchAction(PageReduxAction.setInternet(isConnect))
  }

  static async detectConnectionMethod () {
    const { connectionMethod } = storeRedux.getState()
    switch (connectionMethod) {
    case CONNECTION_METHOD.METAMASK:
      await MetaMaskServices.refresh()
      break
    case CONNECTION_METHOD.PANTOGRAPH:
      await ReduxServices.refreshPantograph()
      ReduxServices.subscribeToPantographEvents()
      break
    case CONNECTION_METHOD.WALLET_CONNECT:
      WalletConnectServices.refresh()
      break
    }
  }

  static subscribeToPantographEvents () {
    const tomochain = window.tomoWeb3 || window.isOwarai
    if (tomochain) {
      tomochain.currentProvider.on('accountsChanged', function (accounts) {
        ReduxServices.refreshPantograph()
        Observer.emit(OBSERVER_KEY.CHANGED_ACCOUNT)
      })
      tomochain.currentProvider.on('networkChanged', function (accounts) {
        ReduxServices.refreshPantograph()
        ReduxServices.resetUser()
      })
      tomochain.currentProvider.on('chainChanged', function (accounts) {
        ReduxServices.refreshPantograph()
      })
    }
  }

  static async onEnablePantograph (callback = null) {
    let currentWeb3 = window.tomoWeb3
    if (currentWeb3 && typeof currentWeb3 !== 'undefined') {
      // Get tomochain network
      currentWeb3.version.getNetwork((err, network) => {
        if (!err) {
          // Enable open pantograph when closed
          const enablePantograph = () => {
            currentWeb3.currentProvider && currentWeb3.currentProvider.enable().then(() => {
              callback && callback()
            })
          }
          currentWeb3.eth.getAccounts((err, accounts) => {
            if (!err) {
              if (!accounts || accounts.length <= 0) {
                enablePantograph()
              }
            }
          })
        }
      })
    }
  }

  static getConnectionMethod () {
    const { connectionMethod } = storeRedux.getState()
    return connectionMethod
  }

  static getWalletConnect () {
    const { walletConnect } = storeRedux.getState()
    return walletConnect
  }

  static getMetaMask () {
    const { metamaskRedux } = storeRedux.getState()
    return metamaskRedux
  }

  static checkIsSigned () {
    const { userData, metamaskRedux, pantograph, walletConnect, connectionMethod } = storeRedux.getState()
    if (userData && userData.address) {
      switch (connectionMethod) {
      case CONNECTION_METHOD.METAMASK:
        return userData.isSigned && lowerCase(metamaskRedux.address) === lowerCase(userData.address)
      case CONNECTION_METHOD.PANTOGRAPH:
        return userData.isSigned && lowerCase(pantograph.account) === lowerCase(userData.address)
      case CONNECTION_METHOD.WALLET_CONNECT:
        return userData.isSigned && lowerCase(walletConnect.address) === lowerCase(userData.address)
      default:
        return false
      }
    }
    return false
  }

  static detectBrowserLanguage () {
    const lang = window.pantographLanguage || getCurrentBrowserLanguage()
    ReduxServices.callDispatchAction(StorageActions.setLocale(lang))
  }

  static getCurrentLang () {
    const { locale } = storeRedux.getState()
    return locale.lang || 'en'
  }

  static setTransferData (transferData) {
    ReduxServices.callDispatchAction(StorageActions.setTransferData({ ...transferData }))
  }

  static async refreshPantograph () {
    const { pantograph } = storeRedux.getState()

    const checkMetaMask = () => {
      return new Promise(async (resolve, reject) => {
        const { pantograph } = storeRedux.getState()
        const isShowLog = false
        const showLogStatus = (message) => {
          isShowLog && console.log(message)
        }

        let newStatus = Object.assign({}, pantograph)
        let currentWeb3 = window.tomoWeb3
        try {
          if (typeof currentWeb3 === 'undefined') {
            if (pantograph.status === METAMASK_INFO.status.Loading) {
              showLogStatus('No web3 detected')
              newStatus.status = METAMASK_INFO.status.NoWeb3
              newStatus.network = 0
              resolve(newStatus)
            } else if (newStatus.status !== METAMASK_INFO.status.NoWeb3) {
              showLogStatus('Lost web3')
              window.location.reload(true)
              newStatus.status = METAMASK_INFO.status.Error
              newStatus.network = 0
              resolve(newStatus)
            } else {
              newStatus.status = METAMASK_INFO.status.NoWeb3
              newStatus.network = 0
              resolve(newStatus)
            }
          } else {
            showLogStatus('web3 detected')

            // Get metamask ether network
            let p1 = new Promise((resolve, reject) => {
              try {
                currentWeb3.version.getNetwork((err, network) => {
                  if (err) {
                    return reject(err)
                  }
                  return resolve(network)
                })
              } catch (e) {
                showLogStatus('Get metamask netWork error' + e)
                return reject(e)
              }
            })
            // Close p1 promise if over time
            let p2 = new Promise(function (resolve, reject) {
              setTimeout(() => {
                return reject(new Error('request timeout'))
              }, 60000)
            })

            Promise.race([p1, p2]).then((networkNew) => {
              const networkParse = parseInt(networkNew)
              const web3 = currentWeb3
              const findNetwork = METAMASK_INFO.network[networkParse]
              showLogStatus('web3 network is ' + (findNetwork || 'Unknown'))

              let network = findNetwork || 'Unknown'
              web3.eth.getAccounts((err, accounts) => {
                showLogStatus('Ethereum Account detected' + accounts + 'newStatus' + newStatus.account)
                if (accounts && newStatus.account && newStatus.account !== accounts[0]) {
                  // Clear data and reload page when change new account
                  ReduxServices.callDispatchAction(StorageActions.setUserData(null))
                  ReduxServices.setUserInfo()
                  newStatus.status = METAMASK_INFO.status.ChangeAccount
                  newStatus.network = network
                  resolve(newStatus)
                }
                if (err) {
                  newStatus.status = METAMASK_INFO.status.Error
                  newStatus.network = network
                  resolve(newStatus)
                } else if (accounts && accounts.length > 0) {
                  newStatus.status = METAMASK_INFO.status.Ready
                  newStatus.network = network
                  newStatus.account = accounts[0].toLowerCase()
                  resolve(newStatus)
                } else {
                  newStatus.status = METAMASK_INFO.status.Locked
                  newStatus.network = 0
                  newStatus.account = null
                  resolve(newStatus)
                }
              })
            }).catch((e) => {
              showLogStatus('Check network error' + e)
              newStatus.status = METAMASK_INFO.status.Locked
              newStatus.network = 0
              newStatus.account = null
              resolve(newStatus)
            })
          }
        } catch (e) {
          newStatus.status = METAMASK_INFO.status.Error
          newStatus.network = 0
          resolve(newStatus)
        }
      })
    }

    const newMetamaskStatus = await checkMetaMask()
    if (newMetamaskStatus && (newMetamaskStatus.status !== pantograph.status || newMetamaskStatus.account !== pantograph.account)) {
      ReduxServices.callDispatchAction(PageReduxAction.setPantograph(newMetamaskStatus))
    }
  }

  static loginPantograph (showGetMetaMask, callback = null, callbackErr = null) {
    return new Promise(async (resolve, reject) => {
      const signPantograph = (callback = null) => {
        return new Promise(async (resolve, reject) => {
          try {
            const { pantograph, locale } = storeRedux.getState()
            const { messages } = locale
            const address = pantograph.account
            let msgHash = await UserService.getMessageHash()
            let content = await Web3Services.onSignMessage(address, msgHash ? msgHash.token.msgHash : 'MISSSAKE')
            if (content && content.address && content.signature) {
              let newPantograph = Object.assign({}, pantograph)
              ReduxServices.callDispatchAction(PageReduxAction.setPantograph(newPantograph))
              let newUserLogin = Object.assign({}, { address: content.address, sig: content.signature })
              let resUser = await UserService.getUserBySignature(content.signature, address)
              if (resUser && resUser?.accessToken && resUser?.accessToken?.payload && resUser?.accessToken?.payload?.address) {
                newUserLogin = Object.assign(newUserLogin, resUser.accessToken.payload)
                if (resUser?.accessToken?.payload?.address) {
                  // Check already login user
                  newUserLogin.isSigned = true
                  ReduxServices.callDispatchAction(StorageActions.setUserData(newUserLogin))
                  ReduxServices.setUserInfo()
                } else {
                  newUserLogin.address = content.address
                  newUserLogin.isSigned = true
                  // Create new user
                  ReduxServices.callDispatchAction(StorageActions.setUserData(newUserLogin))
                  ReduxServices.setUserInfo()
                }
              } else {
                showNotification(messages.txtWarningSigninMetaMaskError)
                ReduxServices.callDispatchAction(StorageActions.setUserData({}))
                ReduxServices.setUserInfo()
                callbackErr && callbackErr()
                return resolve()
              }
              ReduxServices.refreshUserBalance()
              callback && callback()
              return resolve()
            } else {
              showNotification(messages.txtWarningActiveMetaMask)
              ReduxServices.callDispatchAction(StorageActions.setUserData({}))
              ReduxServices.setUserInfo()
              callbackErr && callbackErr()
              return resolve()
            }
          } catch (error) {
            showNotification(messages.txtWarningActiveMetaMask)
            reject(error)
          }
        })
      }

      const connectWithOutSign = (callback = null) => {
        return new Promise(async (resolve, reject) => {
          try {
            const { pantograph } = storeRedux.getState()
            const address = pantograph.account
            let newPantograph = Object.assign({}, pantograph)
            ReduxServices.callDispatchAction(PageReduxAction.setPantograph(newPantograph))
            let newUserLogin = Object.assign({}, { address, isSigned: true })
            ReduxServices.callDispatchAction(StorageActions.setUserData(newUserLogin))
            ReduxServices.setUserInfo()
            ReduxServices.refreshUserBalance()
            callback && callback()
            return resolve()
          } catch (error) {
            showNotification(messages.txtWarningActiveMetaMask)
            reject(error)
          }
        })
      }

      const { pantograph, locale } = storeRedux.getState()
      const { messages } = locale
      let currentWeb3 = window.tomoWeb3
      try {
        if (!currentWeb3) {
          showGetMetaMask && showGetMetaMask()
          return resolve(null)
        }
        // Check if MetaMask is installed
        if (pantograph.status === METAMASK_INFO.status.NoWeb3) {
          showNotification(messages.txtWarningInstallMetaMask)
          return resolve(null)
        }

        // check network allowed
        const findNetwork = METAMASK_INFO.network[parseInt(process.env.WEB3_NETWORK_ID_ALLOWED)]
        let network = findNetwork || 'Unknown'
        if (pantograph.status === METAMASK_INFO.status.Ready && pantograph.network !== network) {
          showNotification(messages.onlySupportNetwork.replace('[network]', network))
          return resolve(null)
        }

        if (pantograph.account) {
          let isSigned = ReduxServices.checkIsSigned()
          if (!isSigned) {
            signPantograph(callback)
          } else {
            callback && callback()
            return resolve(null)
          }
        } else {
          ReduxServices.onEnablePantograph(() => signPantograph(callback, callbackErr))
          return resolve(null)
        }
      } catch (error) {
        callbackErr && callbackErr()
        return resolve(error)
      }
    })
  }
  static loginMetamask (callback = null, callbackErr = null) {
    return new Promise(async (resolve, reject) => {
      const signMetaMask = (callback = null) => {
        return new Promise(async (resolve, reject) => {
          try {
            const { metamaskRedux, locale } = storeRedux.getState()
            const { messages } = locale
            let msgHash = await UserService.getMessageHash()
            let signature = await MetaMaskServices.signPersonalMessage(metamaskRedux.address, msgHash ? msgHash.token.msgHash : 'MISSSAKE')
            if (signature) {
              let newMetaMask = Object.assign({}, metamaskRedux)
              ReduxServices.callDispatchAction(PageReduxAction.setMetamask(newMetaMask))
              let newUserLogin = Object.assign({}, { address: metamaskRedux.address, sig: signature })
              // let newUserLogin = Object.assign({}, { address: metamaskRedux.address, isSigned: true })
              // ReduxServices.callDispatchAction(StorageActions.setUserData(newUserLogin))
              let resUser = await UserService.getUserBySignature(signature, metamaskRedux.address)
              await cookiesService.setMutilDataCookie(resUser)
              if (resUser && resUser?.accessToken && resUser?.accessToken?.payload && resUser?.accessToken?.payload?.address) {
                // newUserLogin = Object.assign(newUserLogin, resUser.accessToken.payload)
                if (resUser?.accessToken?.payload?.address) {
                  // Check already login user
                  newUserLogin.isSigned = true
                  // newUserLogin.token = resUser?.accessToken?.token
                  // newUserLogin.accessToken = { ...resUser?.accessToken }
                  // newUserLogin.refeshToken = { ...resUser?.refeshToken }
                  ReduxServices.callDispatchAction(StorageActions.setUserData(newUserLogin))
                  ReduxServices.callDispatchAction(StorageActions.setAccessTokenData(resUser?.accessToken))
                  ReduxServices.callDispatchAction(StorageActions.setRefeshTokenData(resUser?.refeshToken))
                  // ReduxServices.callDispatchAction(StorageActions.setAccessTokenData({}))
                  // ReduxServices.callDispatchAction(StorageActions.setRefeshTokenData({}))
                  ReduxServices.setUserInfo()
                } else {
                  newUserLogin.address = metamaskRedux.address
                  newUserLogin.isSigned = true

                  // Create new user
                  ReduxServices.callDispatchAction(StorageActions.setUserData(newUserLogin))
                  ReduxServices.setUserInfo()
                }
              } else {
                showNotification(messages.txtWarningSigninMetaMaskError)
                ReduxServices.callDispatchAction(StorageActions.setUserData({}))
                ReduxServices.setUserInfo()
                callbackErr && callbackErr()
                return resolve()
              }
              ReduxServices.refreshUserBalance()
              callback && callback()
              return resolve()
            } else {
              showNotification(messages.txtWarningActiveMetaMask)
              ReduxServices.callDispatchAction(StorageActions.setUserData({}))
              ReduxServices.setUserInfo()
              callbackErr && callbackErr()
              return resolve()
            }
          } catch (error) {
            showNotification(messages.txtWarningSigninMetaMaskError)
            reject(error)
          }
        })
      }

      const connectWithOutSign = () => {
        return new Promise(async (resolve, reject) => {
          try {
            const { metamaskRedux } = storeRedux.getState()
            let newMetaMask = Object.assign({}, metamaskRedux)
            ReduxServices.callDispatchAction(PageReduxAction.setMetamask(newMetaMask))
            let newUserLogin = Object.assign({}, { address: metamaskRedux.address, isSigned: true })
            ReduxServices.callDispatchAction(StorageActions.setUserData(newUserLogin))
            ReduxServices.setUserInfo()
            ReduxServices.refreshUserBalance()
            callback && callback()
            return resolve()
          } catch (error) {
            showNotification(messages.txtWarningSigninMetaMaskError)
            reject(error)
          }
        })
      }

      const { metamaskRedux, locale } = storeRedux.getState()
      const { messages } = locale
      let currentWeb3 = window.ethereum
      try {
        // Check if MetaMask is installed
        if (!currentWeb3) {
          showNotification(messages.txtWarningInstallMetaMask)
          return resolve(null)
        }

        // check network allowed
        const findNetwork = parseInt(process.env.WEB3_NETWORK_ID_ALLOWED)
        let network = findNetwork || 0
        if (parseInt(metamaskRedux.network) !== network) {
          showNotification(messages.onlySupportNetwork)
          return resolve(null)
        }

        if (metamaskRedux.accounts) {
          let isSigned = ReduxServices.checkIsSigned()
          if (!isSigned) {
            signMetaMask(callback)
          } else {
            callback && callback()
            return resolve(null)
          }
        } else {
          return resolve(null)
        }
      } catch (error) {
        callbackErr && callbackErr()
        return resolve(error)
      }
    })
  }

  static loginWalletConnect (callback = null, callbackErr = null) {
    return new Promise(async (resolve, reject) => {
      const { walletConnect, locale } = storeRedux.getState()
      const { messages } = locale
      try {
        if (!walletConnect.connector) {
          showNotification(messages.txtWarningSigninMetaMaskError)
          return resolve(null)
        }

        // check network allowed
        const findNetwork = parseInt(process.env.WEB3_NETWORK_ID_ALLOWED)
        let network = findNetwork || 0
        if (walletConnect.chainId !== network) {
          showNotification(messages.onlySupportNetwork.replace('[network]', network))
          ReduxServices.updateWalletConnect({ connected: false })
          walletConnect.connector.killSession()
          return resolve(null)
        }

        if (walletConnect.address) {
          let isSigned = ReduxServices.checkIsSigned()
          if (!isSigned) {
            ReduxServices.signWalletConnect(callback, callbackErr)
          } else {
            callback && callback()
            return resolve(null)
          }
        } else {
          ReduxServices.callDispatchAction(StorageActions.setUserData(null))
          ReduxServices.setUserInfo()
          return resolve(null)
        }
      } catch (error) {
        callbackErr && callbackErr()
        return resolve(error)
      }
    })
  }

  static walletConnectWithoutSign (callback = null, callbackErr = null) {
    return new Promise(async (resolve, reject) => {
      const { walletConnect, locale } = storeRedux.getState()
      const { messages } = locale
      try {
        let newUserLogin = Object.assign({}, { address: walletConnect.address, isSigned: true })

        ReduxServices.callDispatchAction(StorageActions.setUserData(newUserLogin))
        ReduxServices.setUserInfo()
        ReduxServices.refreshUserBalance()
        callback && callback()
        return resolve()
      } catch (error) {
        showNotification(messages.txtWarningActiveMetaMask)
        callbackErr && callbackErr()
        reject(error)
      }
    })
  }

  static signWalletConnect (callback = null, callbackErr = null) {
    return new Promise(async (resolve, reject) => {
      const { walletConnect, locale } = storeRedux.getState()
      const { messages } = locale
      try {
        const address = walletConnect.address
        let msgHash = await UserService.getMessageHash()
        let signature = await WalletConnectServices.signPersonalMessage(msgHash && msgHash.token ? msgHash.token.msgHash : 'MISSSAKE', address)
        if (signature) {
          let newUserLogin = Object.assign({}, { address: walletConnect.address, sig: signature, isSigned: true })
          let resUser = await UserService.getUserBySignature(signature, walletConnect.address)
          await cookiesService.setMutilDataCookie(resUser)
          if (resUser) {
            newUserLogin = Object.assign(newUserLogin, resUser.accessToken.payload)
            if (resUser.accessToken.payload.address) {
              // Check already login user
              newUserLogin.isSigned = true
              ReduxServices.callDispatchAction(StorageActions.setUserData(newUserLogin))

              ReduxServices.setUserInfo()
            } else {
              newUserLogin.address = walletConnect.address
              newUserLogin.isSigned = true
              // Create new user
              ReduxServices.callDispatchAction(StorageActions.setUserData(newUserLogin))
              ReduxServices.setUserInfo()
            }
          } else {
            WalletConnectServices.killSession()
            showNotification(messages.txtWarningSigninMetaMaskError)
            ReduxServices.callDispatchAction(StorageActions.setUserData({}))
            ReduxServices.setUserInfo()
            callbackErr && callbackErr()
            return resolve()
          }
          ReduxServices.refreshUserBalance()
          callback && callback()
          return resolve()
        } else {
          WalletConnectServices.killSession()
          showNotification(messages.txtWarningActiveMetaMask)
          ReduxServices.callDispatchAction(StorageActions.setUserData({}))
          ReduxServices.setUserInfo()
          callbackErr && callbackErr()
          return resolve()
        }
      } catch (error) {
        showNotification(messages.txtWarningActiveMetaMask)
        reject(error)
      }
    })
  }

  static async refreshUser () {
    const { userData } = storeRedux.getState()
    const isSigned = ReduxServices.checkIsSigned()
    if (isSigned) {
      let resUser = await UserService.getUserBySignature(userData.sig, userData.address)
      if (resUser && resUser?.accessToken && resUser?.accessToken?.payload && resUser?.accessToken?.payload?.address) {
        let newUser = {
          ...userData,
          ...resUser.accessToken.payload
        }
        ReduxServices.callDispatchAction(StorageActions.setUserData(newUser))
        ReduxServices.setUserInfo()
        ReduxServices.refreshUserBalance()
      } else {
        ReduxServices.callDispatchAction(StorageActions.setUserData(null))
        ReduxServices.setUserInfo()
      }
    }
  }

  static async refreshUserBalance () {
    const { userData } = storeRedux.getState()
    const isSigned = ReduxServices.checkIsSigned()

    const balanceResult = {
      balanceETH: 0
    }
    if (isSigned) {
      const promiseResult = await Promise.all([
        Web3Services.getBalance(userData.address)
      ])
      balanceResult.balanceETH = promiseResult[0]
    }

    ReduxServices.callDispatchAction(PageReduxAction.setBalance({ ...balanceResult }))
  }

  static async refreshTomoPrice () {
    let tomoPrice = await Web3Services.getTokenFiat('TOMO')
    ReduxServices.callDispatchAction(PageReduxAction.setTomoPrice(tomoPrice))
  }

  static resetUser () {
    ReduxServices.callDispatchAction(StorageActions.setUserData(null))
    ReduxServices.setUserInfo()
  }

  static getAuthKeyBearer () {
    const { userData } = storeRedux.getState()
    if (userData && userData.token) {
      return 'Bearer ' + userData.token
    } else {
      return ''
    }
  }

  static getAuthKey () {
    const { userData } = storeRedux.getState()
    if (userData && userData.sig) {
      return userData.sig + '|' + userData.address
    } else {
      return ''
    }
  }

  static async getSettings () {
    let configs = {}
    const promiseResult = await Promise.all([
      CommonService.getSetting()
    ])
    if (promiseResult[0]) {
      let tokenBase
      if (promiseResult[0].bsc && promiseResult[0].bsc.contract_token) {
        tokenBase = await TokenService.getTokenByAddress(promiseResult[0].bsc.contract_token)
      }
      configs = { ...configs, ...promiseResult[0], tokenBase }
    }
    ReduxServices.callDispatchAction(StorageActions.setSetting(configs))
  }

  static getSettingRedux () {
    const { settingRedux } = storeRedux.getState()
    return settingRedux || {}
  }

  static getContractAddress () {
    const { settingRedux } = storeRedux.getState()
    return {
      abiMarket: settingRedux.abi_market,
      contractMarket: settingRedux.address_market,
      contractNFT: settingRedux.address_ud_nft,
      contractUDSupport: JSON.parse(settingRedux.address_ud_support),
      resellerID: settingRedux.resellerID
    }
  }

  static getLocale () {
    const { locale } = storeRedux.getState()
    return locale || {}
  }

  static async updateWalletConnect (data) {
    const { walletConnect } = storeRedux.getState()
    let newWalletConnect = {
      ...walletConnect,
      ...data
    }
    ReduxServices.callDispatchAction(PageReduxAction.setWalletConnect({ ...newWalletConnect }))
  }

  static async updateMetaMask (data) {
    const { metamaskRedux } = storeRedux.getState()
    let newMetaMask = {
      ...metamaskRedux,
      ...data
    }
    ReduxServices.callDispatchAction(PageReduxAction.setMetamask({ ...newMetaMask }))
  }

  static async getBnbPrice () {
    // const settings = ReduxServices.getSettingRedux()
    // if (settings?.bsc.contract_fiat) {
    //   const tokenSymbol = 'BNB'
    //   const tokenDecimal = 18
    //   const resPriceUSD = await Web3Services.getToken2USD(tokenSymbol, tokenDecimal, settings?.bsc.contract_fiat)
    ReduxServices.callDispatchAction(PageReduxAction.setBnbPrice(0))
    // }
  }

  static async setUserInfo () {
    const { userData } = storeRedux.getState()
    if (userData && userData.address) {
      const res = await UserService.getUserInfo2(await cookiesService.getCookiesByName())
      ReduxServices.callDispatchAction(StorageActions.setUserInfo(res))
    }
  }

  static async addFFETokenData (data) {
    ReduxServices.callDispatchAction(StorageActions.setFFETokenData(data))
  }
  static getRefeshToken () {
    const { userData } = storeRedux.getState()
    return userData.refeshToken
  }
  static getIsOpenModalWarning () {
    const { isOpenModalWarning } = storeRedux.getState()
    return isOpenModalWarning
  }
  static setIsOpenModalWarning (data) {
    ReduxServices.callDispatchAction(StorageActions.setIsOpenModalWarning(data))
  }
  static getUserData () {
    const { userData } = storeRedux.getState()
    return userData
  }
  static getAccessToken () {
    const { accessToken } = storeRedux.getState()
    return accessToken
  }
  static getToken (name = COOKIES_STORAGE.EXP_ACCESS_TOKEN) {
    const { accessToken, refeshToken } = storeRedux.getState()
    if (name === COOKIES_STORAGE.ACCESS_TOKEN) {
      return accessToken
    }
    return refeshToken
  }
  static getExpToken (name = COOKIES_STORAGE.EXP_ACCESS_TOKEN) {
    const { accessToken, refeshToken } = storeRedux.getState()
    if (name === COOKIES_STORAGE.EXP_ACCESS_TOKEN) {
      return accessToken?.payload?.exp
    }

    return refeshToken?.payload?.exp
  }
}
