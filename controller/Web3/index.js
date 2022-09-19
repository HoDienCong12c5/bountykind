import Web3 from 'web3'
import WalletConnectServices from 'controller/WalletConnect'
import ReduxServices from 'common/redux'
import {
  convertBalanceToWei,
  convertWeiToBalance,
  roundingNumber,
  lowerCase
} from 'common/function'
import { BSC_RPC, CONNECTION_METHOD, NULL_ADDRESS } from 'common/constants'
import converter from 'hex2dec'
import abiMarket from './abiMarket'
let window = require('global/window')

export default class Web3Services {
  static createWeb3Provider () {
    let web3 = new Web3()
    let walletConnect = ReduxServices.getWalletConnect()
    const connectionMethod = ReduxServices.getConnectionMethod()
    if (connectionMethod === CONNECTION_METHOD.PANTOGRAPH && window.tomoWeb3) {
      web3.setProvider(window.tomoWeb3.currentProvider)
    } else if (
      connectionMethod === CONNECTION_METHOD.METAMASK &&
      window.ethereum
    ) {
      web3.setProvider(window.ethereum)
    } else if (
      connectionMethod === CONNECTION_METHOD.WALLET_CONNECT &&
      walletConnect &&
      walletConnect.chainId !== 0
    ) {
      web3.setProvider(
        new Web3.providers.HttpProvider(
          BSC_RPC[walletConnect.chainId].rpcUrls[0]
        )
      )
    } else {
      web3.setProvider(
        new Web3.providers.HttpProvider(
          BSC_RPC[parseInt(process.env.WEB3_NETWORK_ID_ALLOWED)].rpcUrls[0]
        )
      )
    }
    return web3
  }
  static async onSignMessage (address, nonce) {
    return new Promise((resolve, reject) => {
      try {
        let currentWeb3 = this.createWeb3Provider()
        currentWeb3.eth.personal.sign(
          currentWeb3.utils.fromUtf8(nonce),
          address,
          (err, signature) => {
            if (err) return reject(err)
            return resolve({ address, signature })
          }
        )
      } catch (e) {
        console.log('Sign message error', e)
        return resolve()
      }
    })
  }
  static async getNetwork () {
    return new Promise(async (resolve, reject) => {
      let web3 = this.createWeb3Provider()
      web3.eth
        .getChainId()
        .then((network) => {
          resolve(network)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  static async enableMetaMask () {
    return new Promise(async (resolve, reject) => {
      let web3 = this.createWeb3Provider()
      web3.currentProvider
        .enable()
        .then((accounts) => {
          resolve(accounts)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  static async getAccounts () {
    return new Promise(async (resolve, reject) => {
      let web3 = this.createWeb3Provider()
      web3.eth
        .getAccounts()
        .then((accounts) => {
          resolve(accounts)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  static callGetDataWeb3 (contract, method, param) {
    // method.encodeABI
    const dataTx = contract.methods[method](...param).encodeABI()
    return dataTx
  }
  static async estimateGas (rawTransaction) {
    return new Promise(async (resolve, reject) => {
      let web3 = this.createWeb3Provider()
      web3.eth.estimateGas(rawTransaction, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }

  static async getBalance (address, decimal = 18) {
    return new Promise(async (resolve, reject) => {
      let web3 = this.createWeb3Provider()
      web3.eth.getBalance(address, (err, balance) => {
        if (err) {
          resolve(0)
        }
        resolve(balance ? convertWeiToBalance(balance, decimal) : 0)
      })
    })
  }

  static async approveAllNFT (
    fromUserAddress,
    nftAddress,
    operatorAddress,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      const approvalAllData = this.getTokenApproveAllDataTxs(
        nftAddress,
        operatorAddress
      )
      let approve = {
        to: nftAddress,
        data: approvalAllData,
        isCallBackErr: true,
        callBeforeFunc: callbackBeforeDone,
        callbackFunc: callbackAfterDone,
        callbackErrFunc: callbackRejected
      }
      this.postBaseSendTxs(fromUserAddress, [approve], true)
        .then((res) => {
          resolve(res[0])
        })
        .catch((err) => {
          callbackRejected(err)
          reject(err)
        })
    })
  }
  static async approveTokenAmount (
    fromUserAddress,
    tokenAddress,
    tokenDecimals,
    contractAddress,
    amount,
    isApproveMaximum,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      let approve = {
        to: tokenAddress,
        isCallBackErr: true,
        data: this.encodeApproveTxs(
          tokenAddress,
          contractAddress,
          isApproveMaximum
            ? '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
            : convertBalanceToWei(amount, tokenDecimals)
        ),
        callBeforeFunc: callbackBeforeDone,
        callbackFunc: callbackAfterDone,
        callbackErrFunc: callbackRejected
      }

      this.postBaseSendTxs(fromUserAddress, [approve], true)
        .then((res) => {
          resolve(res[0])
        })
        .catch((err) => {
          console.log('buyNFT - error: ', err)
          reject(err)
        })
    })
  }
  static async getTokenBalance (address, contractAddress, decimalToken = 18) {
    console.log({ contractAddress })
    return new Promise(async (resolve, reject) => {
      try {
        const minABI = [
          {
            constant: true,
            inputs: [
              {
                name: 'owner',
                type: 'address'
              }
            ],
            name: 'balanceOf',
            outputs: [
              {
                name: '',
                type: 'uint256'
              }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
          }
        ]
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(minABI, contractAddress)
        contract.methods.balanceOf(address).call((err, balance) => {
          if (err) {
            resolve(0)
          }
          const tokenBalance = convertWeiToBalance(balance, decimalToken)
          resolve(tokenBalance)
        })
      } catch (err) {
        resolve(0)
      }
    })
  }

  static async getNonce (address) {
    return new Promise(async (resolve, reject) => {
      let web3 = this.createWeb3Provider()
      web3.eth.getTransactionCount(address, (err, res) => {
        if (err) {
          resolve(0)
        }
        resolve(res)
      })
    })
  }

  static async getGasPrice () {
    return new Promise(async (resolve, reject) => {
      let web3 = this.createWeb3Provider()
      web3.eth.getGasPrice((err, res) => {
        if (err) {
          resolve(0)
        }
        resolve(res)
      })
    })
  }
  static checkApprovedForAll (ownerAddress, nftAddress, contractApproveForSend) {
    return new Promise(async (resolve, reject) => {
      const abiApproveAll = [
        {
          constant: true,
          inputs: [
            {
              name: 'owner',
              type: 'address'
            },
            {
              name: 'operator',
              type: 'address'
            }
          ],
          name: 'isApprovedForAll',
          outputs: [
            {
              name: '',
              type: 'bool'
            }
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contractTokenApprove = new web3.eth.Contract(
        abiApproveAll,
        nftAddress
      )
      contractTokenApprove.methods
        .isApprovedForAll(ownerAddress, contractApproveForSend)
        .call((err, res) => {
          if (err) {
            resolve(false)
          }
          resolve(res)
        })
    })
  }

  static getTokenApproveAllDataTxs (
    addressApprove,
    contractApproveForSend,
    approved = true
  ) {
    const abiApproveAll = [
      {
        constant: false,
        inputs: [
          {
            name: 'to',
            type: 'address'
          },
          {
            name: 'approved',
            type: 'bool'
          }
        ],
        name: 'setApprovalForAll',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ]
    let web3 = this.createWeb3Provider()
    const contractTokenApprove = new web3.eth.Contract(
      abiApproveAll,
      addressApprove
    )
    const dataTx = contractTokenApprove.methods
      .setApprovalForAll(contractApproveForSend, approved)
      .encodeABI()
    return dataTx
  }
  static async getApproved (gameAddress, tokenId) {
    return new Promise(async (resolve, reject) => {
      const abiApprove = [
        {
          constant: true,
          inputs: [
            {
              name: 'tokenId',
              type: 'uint256'
            }
          ],
          name: 'getApproved',
          outputs: [
            {
              name: '',
              type: 'address'
            }
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(abiApprove, gameAddress)
      contract.methods.getApproved(tokenId).call((err, result) => {
        if (err) {
          resolve(0)
        }
        resolve(result)
      })
    })
  }
  static encodeApproveTxs (
    addressApprove,
    contractApproveForSend,
    approveValue
  ) {
    const approveABI = [
      {
        constant: false,
        inputs: [
          {
            name: '_spender',
            type: 'address'
          },
          {
            name: '_value',
            type: 'uint256'
          }
        ],
        name: 'approve',
        outputs: [
          {
            name: 'success',
            type: 'bool'
          }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ]
    let web3 = this.createWeb3Provider()
    const contractTokenApprove = new web3.eth.Contract(
      approveABI,
      addressApprove
    )
    const dataTx = contractTokenApprove.methods
      .approve(contractApproveForSend, approveValue)
      .encodeABI()
    return dataTx
  }
  static encodeApproveNFT (
    addressApprove,
    contractApproveForSend,
    approveValue
  ) {
    const approveABI = [
      {
        constant: true,
        inputs: [
          {
            name: 'to',
            type: 'address'
          },
          {
            name: 'tokenId',
            type: 'uint256'
          }
        ],
        name: 'approve',
        outputs: [],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }
    ]
    let web3 = this.createWeb3Provider()
    const contractTokenApprove = new web3.eth.Contract(
      approveABI,
      addressApprove
    )
    const dataTx = contractTokenApprove.methods
      .approve(contractApproveForSend, approveValue)
      .encodeABI()
    return dataTx
  }
  static async checkAllowance (coinContract, owner, spender) {
    return new Promise(async (resolve, reject) => {
      try {
        const minABI = [
          {
            constant: true,
            inputs: [
              {
                name: 'owner',
                type: 'address'
              },
              {
                name: 'spender',
                type: 'address'
              }
            ],
            name: 'allowance',
            outputs: [
              {
                name: '',
                type: 'uint256'
              }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
          }
        ]
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(minABI, coinContract)
        contract.methods.allowance(owner, spender).call((err, balance) => {
          if (err) {
            resolve(0)
          }
          resolve(balance)
        })
      } catch (err) {
        resolve(0)
      }
    })
  }

  static async getGameInfo (gameAddress, contractMarket) {
    return new Promise(async (resolve, reject) => {
      try {
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(abiMarket, contractMarket)
        contract.methods.Games(gameAddress).call((err, result) => {
          if (err) {
            resolve(null)
          }
          resolve(result)
        })
      } catch (err) {
        resolve(null)
      }
    })
  }

  static async getGameFees (gameAddress, contractMarket) {
    const minAbi = [
      {
        constant: true,
        inputs: [
          {
            name: '_game',
            type: 'address'
          }
        ],
        name: 'getGameFees',
        outputs: [
          {
            name: '',
            type: 'string[]'
          },
          {
            name: '',
            type: 'address[]'
          },
          {
            name: '',
            type: 'uint256[]'
          },
          {
            name: '',
            type: 'uint256'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }
    ]
    return new Promise(async (resolve, reject) => {
      try {
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(minAbi, contractMarket)
        contract.methods.getGameFees(gameAddress).call((err, result) => {
          if (err) {
            resolve(null)
          }
          resolve(result)
        })
      } catch (err) {
        resolve(null)
      }
    })
  }

  static async getTokenDecimal (coinContract) {
    return new Promise(async (resolve, reject) => {
      try {
        const minABI = [
          {
            constant: true,
            inputs: [],
            name: 'decimals',
            outputs: [
              {
                name: '',
                type: 'uint8'
              }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
          }
        ]
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(minABI, coinContract)
        contract.methods.decimals().call((err, balance) => {
          if (err) {
            resolve(0)
          }
          resolve(balance)
        })
      } catch (err) {
        resolve(0)
      }
    })
  }

  static async getTokenSymbol (coinContract) {
    return new Promise(async (resolve, reject) => {
      try {
        const minABI = [
          {
            constant: true,
            inputs: [],
            name: 'symbol',
            outputs: [
              {
                name: '',
                type: 'string'
              }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
          }
        ]
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(minABI, coinContract)
        contract.methods.symbol().call((err, balance) => {
          if (err) {
            resolve(0)
          }
          resolve(balance)
        })
      } catch (err) {
        resolve(0)
      }
    })
  }

  static async getToken2USD (symbol, decimals, contractFiat) {
    const minAbi = [
      {
        constant: true,
        inputs: [
          {
            name: '__symbol',
            type: 'string'
          }
        ],
        name: 'getToken2USD',
        outputs: [
          {
            name: '_symbolToken',
            type: 'string'
          },
          {
            name: '_token2USD',
            type: 'uint256'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }
    ]
    return new Promise(async (resolve, reject) => {
      try {
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(minAbi, contractFiat)
        contract.methods.getToken2USD(symbol).call((err, res) => {
          if (err) {
            console.log(err)
            resolve(0)
          }
          resolve(convertWeiToBalance(res?._token2USD, decimals))
        })
      } catch (err) {
        console.log('err', err)
        return resolve(0)
      }
    })
  }

  static async trackingTxs (hash, callback, receipt) {
    if (
      receipt === undefined ||
      receipt === null ||
      receipt.blockNumber === null ||
      receipt.blockNumber === undefined
    ) {
      let web3 = new Web3()
      web3.setProvider(
        new Web3.providers.HttpProvider(
          BSC_RPC[parseInt(process.env.WEB3_NETWORK_ID_ALLOWED)].rpcUrls[0]
        )
      )
      web3.eth.getTransactionReceipt(hash, (err, result) => {
        if (!err) {
          setTimeout(() => {
            this.trackingTxs(hash, callback, result)
          }, 500)
        }
      })
    } else {
      callback && callback(receipt)
    }
  }
  static async postBaseSendTxs (from, arrSend, isNeedCovert = false) {
    return new Promise(async (resolve, reject) => {
      let web3 = this.createWeb3Provider()
      web3.eth.getChainId(async (err, network) => {
        let chainId = '0x1'
        if (!err) {
          chainId = '0x' + network
        }

        const isTestnet = chainId === '0x4'
        const nonce = await this.getNonce(from)

        const promise = arrSend.map(async (item, index) => {
          return new Promise(async (resolve, reject) => {
            const {
              to,
              data,
              value,
              percent,
              gasPrice,
              extraRateGas = 1.1,
              callbackData,
              callbackFunc,
              callBeforeFunc,
              isCallBackErr,
              callbackErrFunc,
              additionalData
            } = item
            const newGasPrice = parseFloat(
              gasPrice
                ? convertBalanceToWei(gasPrice, 9)
                : await this.getGasPrice()
            )
            let rawTransaction = {
              nonce: nonce + index,
              to,
              from,
              gasPrice: newGasPrice || 250000000,
              data
            }

            if (!isTestnet) {
              rawTransaction.chainId = chainId
            }

            if (percent) {
              rawTransaction.gasPrice = newGasPrice * percent
            }

            if (value) {
              rawTransaction.value = converter.decToHex(
                isNeedCovert ? convertBalanceToWei(value) : `${value}`
              )
            }
            this.estimateGas(rawTransaction)
              .then(async (gas) => {
                const gasFinal =
                  converter.decToHex(
                    roundingNumber(gas * extraRateGas, 0).toString()
                  ) || gas
                rawTransaction.gas = gasFinal
                rawTransaction.gasLimit = gasFinal
                const connectionMethod = ReduxServices.getConnectionMethod()
                if (connectionMethod === CONNECTION_METHOD.WALLET_CONNECT) {
                  if (additionalData) {
                    rawTransaction.data =
                      '--' +
                      JSON.stringify(additionalData) +
                      '--' +
                      rawTransaction.data
                  }
                  WalletConnectServices.sendTransaction(rawTransaction)
                    .then((res) => {
                      // call before call next callBackData
                      if (callBeforeFunc && res) {
                        callBeforeFunc && callBeforeFunc(res)
                      }

                      if (callbackData) {
                        const callbackAfterDone = (receipt) => {
                          if (
                            receipt &&
                            receipt.status &&
                            receipt.status === true
                          ) {
                            setTimeout(() => {
                              this.postBaseSendTxs(from, callbackData)
                            }, 500)
                          } else {
                            if (isCallBackErr) {
                              callbackErrFunc(err)
                            }
                            reject(err)
                          }
                        }
                        this.trackingTxs(res, callbackAfterDone)
                      }

                      if (callbackFunc) {
                        const callbackAfterDone = (receipt) => {
                          if (
                            receipt &&
                            receipt.status &&
                            receipt.status === true
                          ) {
                            callbackFunc && callbackFunc(res)
                          } else {
                            if (isCallBackErr) {
                              callbackErrFunc(err)
                            }
                            reject(err)
                          }
                        }

                        this.trackingTxs(res, callbackAfterDone)
                      }
                      resolve(res)
                    })
                    .catch((err) => {
                      if (isCallBackErr) {
                        callbackErrFunc(err)
                      }
                      reject(err)
                    })
                } else {
                  // using the event emitter
                  web3.eth
                    .sendTransaction(rawTransaction)
                    .on('transactionHash', function (hash) {
                      // call before call next callBackData
                      if (callBeforeFunc && hash) {
                        callBeforeFunc && callBeforeFunc(hash)
                      }
                      resolve(hash)
                    })
                    .on('receipt', function (receipt) {
                      if (callbackData) {
                        setTimeout(() => {
                          Web3Services.postBaseSendTxs(from, callbackData)
                        }, 500)
                      }

                      if (callbackFunc) {
                        callbackFunc(receipt.transactionHash)
                      }
                    })
                    .on('error', function (error) {
                      console.error()
                      if (isCallBackErr) {
                        callbackErrFunc(error)
                      }
                      reject(error)
                    })
                }
              })
              .catch((err) => {
                console.log(`estimateGas - error`)
                if (isCallBackErr) {
                  callbackErrFunc(err)
                }
                reject(err)
              })
          })
        })
        Promise.all(promise)
          .then((result) => {
            resolve(result)
          })
          .catch((err) => {
            console.log('postBaseSendTxs - error: ', err)
            reject(err)
          })
      })
    })
  }

  static async getOwnerOfNFT (address, tokenId) {
    return new Promise(async (resolve, reject) => {
      try {
        const minABI = [
          {
            constant: true,
            inputs: [
              {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
              }
            ],
            name: 'ownerOf',
            outputs: [
              {
                internalType: 'address',
                name: '',
                type: 'address'
              }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
          }
        ]
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(minABI, address)
        contract.methods.ownerOf(tokenId).call((err, result) => {
          if (err) {
            resolve(null)
          }
          resolve(result)
        })
      } catch (err) {
        resolve(null)
      }
    })
  }

  static async checkOwnerNFT (fromAddress, gameAddress, tokenId) {
    return new Promise(async (resolve, reject) => {
      try {
        const ownerAddress = await this.getOwnerOfNFT(gameAddress, tokenId)
        if (lowerCase(ownerAddress) !== lowerCase(fromAddress)) {
          return resolve(false)
        }
        return resolve(true)
      } catch (err) {
        return resolve(false)
      }
    })
  }

  static async sendDirectNFT (
    fromAddress,
    toAddress,
    nftAddress,
    nftId,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          'inputs': [
            {
              'internalType': 'address',
              'name': 'to',
              'type': 'address'
            },
            {
              'internalType': 'uint256',
              'name': 'tokenId',
              'type': 'uint256'
            }
          ],
          'name': 'transfer',
          'outputs': [],
          'stateMutability': 'nonpayable',
          'type': 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(minABI, nftAddress)
      const dataTx = contract.methods
        .transfer(toAddress, nftId)
        .encodeABI()

      const transferData = {
        to: nftAddress,
        data: dataTx,
        callBeforeFunc: callbackBeforeDone,
        callbackFunc: callbackAfterDone
      }

      this.postBaseSendTxs(fromAddress, [transferData], true)
        .then((res) => {
          resolve(res[0])
        })
        .catch((err) => {
          callbackRejected(err)
          console.log('sendDirectNFT - error: ', err)
          reject(err)
        })
    })
  }

  static async buyNFT (
    fromUserAddress,
    contractBuyNFT,
    gameAddress,
    orderId,
    fiatAddress,
    fiatSymbol,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          constant: false,
          inputs: [
            {
              name: '_game',
              type: 'address'
            },
            {
              name: '_orderId',
              type: 'uint256'
            },
            {
              name: '_fiatBuy',
              type: 'address'
            },
            {
              name: '_symbolFiatBuy',
              type: 'string'
            }
          ],
          name: 'buy',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(minABI, contractBuyNFT)
      const dataTx = this.callGetDataWeb3(contract, 'buy', [
        gameAddress,
        orderId,
        fiatAddress,
        fiatSymbol
      ])
      const buyData = {
        to: contractBuyNFT,
        value: 0,
        data: dataTx,
        callBeforeFunc: callbackBeforeDone,
        isCallBackErr: true,
        callbackFunc: callbackAfterDone,
        callbackErrFunc: callbackRejected
      }

      this.postBaseSendTxs(fromUserAddress, [buyData], false)
        .then((res) => {
          resolve(res[0])
        })
        .catch((err) => {
          console.log('buyNFT - error: ', err)
          reject(err)
        })
    })
  }

  static async buyPackage (
    fromUserAddress,
    contractPackage,
    amount,
    type,
    value,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          constant: false,
          inputs: [
            {
              name: '_num',
              type: 'uint256'
            },
            {
              name: '_typeNFT',
              type: 'uint256'
            }
          ],
          name: 'buyNFT',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(minABI, contractPackage)
      const dataTx = this.callGetDataWeb3(contract, 'buyNFT', [amount, type])
      let buyData = {
        to: contractPackage,
        data: dataTx,
        callBeforeFunc: callbackBeforeDone,
        isCallBackErr: true,
        callbackFunc: callbackAfterDone,
        callbackErrFunc: callbackRejected
      }
      if (value) {
        buyData.value = value
      }
      this.postBaseSendTxs(fromUserAddress, [buyData], false)
        .then((res) => {
          resolve(res[0])
        })
        .catch((err) => {
          console.log('buyPackage - error: ', err)
          reject(err)
        })
    })
  }

  static async setPriceFee (
    fromUserAddress,
    contractMarket,
    orderId,
    gameAddress,
    gameId,
    priceJPY,
    tokenFiats,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          constant: false,
          inputs: [
            {
              name: '_orderId',
              type: 'uint256'
            },
            {
              name: '_game',
              type: 'address'
            },
            {
              name: '_tokenIds',
              type: 'uint256[]'
            },
            {
              name: '_Price',
              type: 'uint256'
            },
            {
              name: '_fiat',
              type: 'address[]'
            }
          ],
          name: 'setPriceFee',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(minABI, contractMarket)
      const dataTx = this.callGetDataWeb3(contract, 'setPriceFee', [
        orderId,
        gameAddress,
        [gameId],
        convertBalanceToWei(priceJPY),
        tokenFiats
      ])
      const setPriceData = {
        to: contractMarket,
        data: dataTx,
        value: 0,
        callBeforeFunc: callbackBeforeDone,
        isCallBackErr: true,
        callbackFunc: callbackAfterDone,
        callbackErrFunc: callbackRejected
      }

      this.postBaseSendTxs(fromUserAddress, [setPriceData], true)
        .then((res) => {
          resolve(res[0])
        })
        .catch((err) => {
          console.log('setPriceFee - error: ', err)
          reject(err)
        })
    })
  }

  static async getTokenPrice (nftAddress, nftId) {
    return new Promise(async (resolve, reject) => {
      try {
        const contractAddresses = ReduxServices.getContractAddress()
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(
          contractAddresses.abiMarket
            ? JSON.parse(contractAddresses.abiMarket)
            : abiMarket,
          contractAddresses.contractMarket
        )
        contract.methods.getTokenPrice(nftAddress, nftId).call((err, res) => {
          if (err) {
            return resolve(null)
          }
          resolve(res)
        })
      } catch (err) {
        resolve(null)
      }
    })
  }

  static async getIsbuyByFeeToken (contractNft) {
    try {
      let web3 = this.createWeb3Provider()
      const minABI = [
        {
          constant: true,
          inputs: [],
          name: 'buyByFeeToken',
          outputs: [
            {
              name: '',
              type: 'bool'
            }
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        }
      ]
      const contract = new web3.eth.Contract(minABI, contractNft)
      const isBuyFeeToken = await contract.methods.buyByFeeToken().call()
      return isBuyFeeToken
    } catch (error) {
      return error
    }
  }

  static async removePrice (
    fromUserAddress,
    contractMarket,
    gameAddress,
    orderId,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          constant: false,
          inputs: [
            {
              name: '_game',
              type: 'address'
            },
            {
              name: '_orderId',
              type: 'uint256'
            }
          ],
          name: 'removePrice',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(minABI, contractMarket)
      const dataTx = this.callGetDataWeb3(contract, 'removePrice', [
        gameAddress,
        orderId
      ])

      const removePriceData = {
        to: contractMarket,
        data: dataTx,
        value: 0,
        callBeforeFunc: callbackBeforeDone,
        callbackFunc: callbackAfterDone,
        isCallBackErr: true,
        callbackErrFunc: callbackRejected
      }

      this.postBaseSendTxs(fromUserAddress, [removePriceData], true)
        .then((res) => {
          resolve(res[0])
        })
        .catch((err) => {
          // callbackRejected(err)
          reject(err)
        })
    })
  }
  static async getUserNfts (userAddress, nftType, contractAddress) {
    const minAbi = [
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'address'
          },
          {
            name: '',
            type: 'uint256'
          }
        ],
        name: 'userNfts',
        outputs: [
          {
            name: '',
            type: 'bool'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }
    ]
    return new Promise(async (resolve, reject) => {
      try {
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(minAbi, contractAddress)
        contract.methods.userNfts(userAddress, nftType).call((err, res) => {
          if (err) {
            resolve(null)
          }
          resolve(res)
        })
      } catch (err) {
        console.log('err', err)
        return resolve(null)
      }
    })
  }

  static async createNFT (
    fromAddress,
    type,
    contractAddress,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          constant: false,
          inputs: [
            {
              name: 'user',
              type: 'address'
            },
            {
              name: '_type',
              type: 'uint256'
            }
          ],
          name: 'create',
          outputs: [
            {
              name: '',
              type: 'uint256'
            }
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(minABI, contractAddress)
      const dataTx = contract.methods.create(fromAddress, type).encodeABI()

      const createData = {
        to: contractAddress,
        data: dataTx,
        callBeforeFunc: callbackBeforeDone,
        callbackFunc: callbackAfterDone
      }

      this.postBaseSendTxs(fromAddress, [createData], true)
        .then((res) => {
          resolve(res[0])
        })
        .catch((err) => {
          callbackRejected(err)
          console.log('error: ', err)
          reject(err)
        })
    })
  }
  static async getMinFee (gameAddress, decimals) {
    return new Promise(async (resolve, reject) => {
      const abiMinFee = [
        {
          constant: true,
          inputs: [],
          name: 'minFee',
          outputs: [
            {
              name: '',
              type: 'uint256'
            }
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        }
      ]
      try {
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(abiMinFee, gameAddress)
        contract.methods.minFee().call((err, result) => {
          if (err) {
            resolve(0)
          }
          resolve(convertWeiToBalance(result, decimals))
        })
      } catch (err) {
        resolve(0)
      }
    })
  }
  static async getTokenFeeAddress (gameAddress) {
    return new Promise(async (resolve, reject) => {
      const abiMinFee = [
        {
          constant: true,
          inputs: [],
          name: 'feeToken',
          outputs: [
            {
              name: '',
              type: 'address'
            }
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        }
      ]
      try {
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(abiMinFee, gameAddress)
        contract.methods.feeToken().call((err, result) => {
          if (err) {
            resolve(null)
          }
          resolve(result)
        })
      } catch (err) {
        resolve(null)
      }
    })
  }
  static async getNumberNFTSold (type, contractNFT) {
    try {
      const abiMinFee = [
        {
          constant: true,
          inputs: [
            {
              name: '_type',
              type: 'uint256'
            }
          ],
          name: 'getNumberNFTSold',
          outputs: [
            {
              name: '_numberNFTSold',
              type: 'uint256'
            }
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(abiMinFee, contractNFT)
      const soldNumber = contract.methods.getNumberNFTSold(type).call()
      return soldNumber
    } catch (err) {
      return err
    }
  }
  static async getLimitNFT (type, contractNFT) {
    try {
      const abiMinFee = [
        {
          constant: true,
          inputs: [
            {
              name: '_type',
              type: 'uint256'
            }
          ],
          name: 'getLimitNFT',
          outputs: [
            {
              name: 'limit',
              type: 'uint256'
            }
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(abiMinFee, contractNFT)
      const limitNft = contract.methods.getLimitNFT(type).call()
      return limitNft
    } catch (err) {
      return err
    }
  }
  static async checkIsInsufficientBalance (
    userAddress,
    tokenAddress,
    tokenDecimals = 18,
    totalAmount
  ) {
    let tokenBalance
    if (tokenAddress === NULL_ADDRESS) {
      tokenBalance = await this.getBalance(userAddress)
    } else {
      tokenBalance = await Web3Services.getTokenBalance(
        userAddress,
        tokenAddress,
        tokenDecimals
      )
    }
    console.log(tokenBalance)
    if (Number(tokenBalance) < Number(totalAmount)) {
      return true
    } else {
      return false
    }
  }

  static async buyTicket (
    fromAddress,
    contractAddress,
    ticket,
    typeTicket,
    timestamp,
    v,
    r,
    s,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_ticket',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'typeticket',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'timestamp',
              type: 'uint256'
            },
            {
              internalType: 'uint8',
              name: 'v',
              type: 'uint8'
            },
            {
              internalType: 'bytes32',
              name: 'r',
              type: 'bytes32'
            },
            {
              internalType: 'bytes32',
              name: 's',
              type: 'bytes32'
            }
          ],
          name: 'buyTicket',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(minABI, contractAddress)
      const dataTx = contract.methods
        .buyTicket(ticket, typeTicket, timestamp, v, r, s)
        .encodeABI()

      const data = {
        from: fromAddress,
        to: contractAddress,
        data: dataTx,
        callBeforeFunc: callbackBeforeDone,
        callbackFunc: callbackAfterDone
      }

      this.postBaseSendTxs(fromAddress, [data], true)
        .then((res) => {
          resolve(res[0])
        })
        .catch((err) => {
          callbackRejected(err)
          console.log('error: ', err)
          reject(err)
        })
    })
  }

  static async retire (
    fromAddress,
    contractAddress,
    tokenIds,
    tokenAmount,
    timestamp,
    v,
    r,
    s,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          inputs: [
            {
              internalType: 'uint256[]',
              name: 'tokenIds',
              type: 'uint256[]'
            },
            {
              internalType: 'uint256',
              name: 'tokenAmount',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'timestamp',
              type: 'uint256'
            },
            {
              internalType: 'uint8',
              name: 'v',
              type: 'uint8'
            },
            {
              internalType: 'bytes32',
              name: 'r',
              type: 'bytes32'
            },
            {
              internalType: 'bytes32',
              name: 's',
              type: 'bytes32'
            }
          ],
          name: 'retire',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(minABI, contractAddress)
      const dataTx = contract.methods
        .retire(tokenIds, tokenAmount, timestamp, v, r, s)
        .encodeABI()

      const data = {
        from: fromAddress,
        to: contractAddress,
        data: dataTx,
        callBeforeFunc: callbackBeforeDone,
        callbackFunc: callbackAfterDone
      }

      this.postBaseSendTxs(fromAddress, [data], true)
        .then((res) => {
          resolve(res[0])
        })
        .catch((err) => {
          callbackRejected(err)
          console.log('error: ', err)
          reject(err)
        })
    })
  }
  static async deposit (
    fromAddress,
    addToken,
    amount,
    contractAddress,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'token',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: '_amount',
              type: 'uint256'
            }
          ],
          name: 'depositToken',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(minABI, contractAddress)
      const dataTx = contract.methods.depositToken(addToken, amount).encodeABI()

      const data = {
        from: fromAddress,
        to: contractAddress,
        data: dataTx,
        callBeforeFunc: callbackBeforeDone,
        callbackFunc: callbackAfterDone
      }

      this.postBaseSendTxs(fromAddress, [data], false)
        .then((res) => {
          resolve(res[0])
        })
        .catch((err) => {
          callbackRejected(err)
          console.log('error: ', err)
          reject(err)
        })
    })
  }
  // static async buyStorePackage (
  //   fromUserAddress,
  //   contractAddress,
  //   typeId,
  //   tokenAddress,
  //   value,
  //   callbackBeforeDone,
  //   callbackAfterDone,
  //   callbackRejected
  // ) {
  //   return new Promise(async (resolve, reject) => {
  //     const minABI = [
  //       {
  //         inputs: [
  //           {
  //             internalType: 'uint256',
  //             name: 'typeId',
  //             type: 'uint256'
  //           },
  //           {
  //             internalType: 'address',
  //             name: 'tokenBuy',
  //             type: 'address'
  //           }
  //         ],
  //         name: 'buyNFT',
  //         outputs: [],
  //         stateMutability: 'payable',
  //         type: 'function'
  //       }
  //     ]
  //     let web3 = this.createWeb3Provider()
  //     const contract = new web3.eth.Contract(minABI, contractAddress)
  //     const dataTx = this.callGetDataWeb3(contract, 'buyNFT', [
  //       typeId,
  //       tokenAddress
  //     ])
  //     let buyData = {
  //       to: contractAddress,
  //       data: dataTx,
  //       callBeforeFunc: callbackBeforeDone,
  //       isCallBackErr: true,
  //       callbackFunc: callbackAfterDone,
  //       callbackErrFunc: callbackRejected
  //     }
  //     if (value) {
  //       buyData.value = value
  //     }
  //     this.postBaseSendTxs(fromUserAddress, [buyData], false)
  //       .then((res) => {
  //         resolve(res[0])
  //       })
  //       .catch((err) => {
  //         console.log('buyPackage - error: ', err)
  //         reject(err)
  //       })
  //   })
  // }
  static async buyStorePackage (
    fromUserAddress,
    contractAddress,
    _erc721,
    _typeNFT,
    _numItems,
    _fiat,
    value,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          'inputs': [
            {
              'internalType': 'address',
              'name': '_erc721',
              'type': 'address'
            },
            {
              'internalType': 'uint256',
              'name': '_typeNFT',
              'type': 'uint256'
            },
            {
              'internalType': 'uint256',
              'name': '_numItems',
              'type': 'uint256'
            },
            {
              'internalType': 'address',
              'name': '_fiat',
              'type': 'address'
            }
          ],
          'name': 'buyNFT',
          'outputs': [],
          'stateMutability': 'payable',
          'type': 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(minABI, contractAddress)
      const dataTx = this.callGetDataWeb3(contract, 'buyNFT', [
        _erc721,
        _typeNFT,
        _numItems,
        _fiat
      ])
      let buyData = {
        to: contractAddress,
        data: dataTx,
        callBeforeFunc: callbackBeforeDone,
        isCallBackErr: true,
        callbackFunc: callbackAfterDone,
        callbackErrFunc: callbackRejected
      }

      if (value) {
        buyData.value = value
      }

      this.postBaseSendTxs(fromUserAddress, [buyData], false)
        .then((res) => {
          resolve(res[0])
        })
        .catch((err) => {
          console.log('buyPackage - error: ', err)
          reject(err)
        })
    })
  }
  static async getPackageDetails (typeId, contractAddress) {
    try {
      const abiMinFee = [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          name: 'typeNFTs',
          outputs: [
            {
              internalType: 'uint256',
              name: 'id',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'pricesUsd',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'numItems',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(abiMinFee, contractAddress)
      const packageDetails = contract.methods.typeNFTs(typeId).call()
      return packageDetails
    } catch (err) {
      return err
    }
  }

  static async getFiats (contractAddress) {
    try {
      const abiMinFee = [
        {
          'constant': true,
          'inputs': [],
          'name': 'getFiats',
          'outputs': [
            {
              'name': '',
              'type': 'address[]'
            }
          ],
          'payable': false,
          'stateMutability': 'view',
          'type': 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(abiMinFee, contractAddress)
      const fiats = contract.methods.getFiats().call()
      return fiats
    } catch (err) {
      return err
    }
  }

  static async getTokenToUSDPrice (symbol, contractAddress) {
    try {
      const abiMinFee = [
        {
          constant: true,
          inputs: [
            {
              name: '__symbol',
              type: 'string'
            }
          ],
          name: 'getToken2USD',
          outputs: [
            {
              name: '_symbolToken',
              type: 'string'
            },
            {
              name: '_token2USD',
              type: 'uint256'
            }
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(abiMinFee, contractAddress)
      const usdPrice = contract.methods.getToken2USD(symbol).call()
      return usdPrice
    } catch (err) {
      return err
    }
  }

  static async getTokenIdToWei (price, symbol, contractAddress) {
    try {
      const abiMinFee = [
        {
          'constant': true,
          'inputs': [
            {
              'name': 'price',
              'type': 'uint256'
            },
            {
              'name': '_symbol',
              'type': 'string'
            }
          ],
          'name': 'tokenId2wei',
          'outputs': [
            {
              'name': '',
              'type': 'uint256'
            }
          ],
          'payable': false,
          'stateMutability': 'view',
          'type': 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(abiMinFee, contractAddress)
      const weiAmt = contract.methods.tokenId2wei(price, symbol).call()
      return weiAmt
    } catch (err) {
      return err
    }
  }

  static async buyTicketByNft (
    fromUserAddress,
    ticketId,
    sphereContractAddress,
    nftId,
    drawContractAddress,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      const minABI = [
        {
          'inputs': [
            {
              'internalType': 'uint256',
              'name': '_ticket',
              'type': 'uint256'
            },
            {
              'internalType': 'address',
              'name': 'erc721',
              'type': 'address'
            },
            {
              'internalType': 'uint256',
              'name': 'tokenId',
              'type': 'uint256'
            }
          ],
          'name': 'buyTicketByNFT',
          'outputs': [],
          'stateMutability': 'nonpayable',
          'type': 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(minABI, drawContractAddress)
      const dataTx = this.callGetDataWeb3(contract, 'buyTicketByNFT', [
        ticketId,
        sphereContractAddress,
        nftId
      ])
      let data = {
        to: drawContractAddress,
        data: dataTx,
        callBeforeFunc: callbackBeforeDone,
        isCallBackErr: true,
        callbackFunc: callbackAfterDone,
        callbackErrFunc: callbackRejected
      }
      this.postBaseSendTxs(fromUserAddress, [data], false)
        .then((res) => {
          resolve(res[0])
        })
        .catch((err) => {
          console.log('buyTicketByNft - error: ', err)
          reject(err)
        })
    })
  }
  static async getAmountTokenBuyUSD (symbol, price, contractAddress) {
    const ABIMin = [
      {
        'constant': true,
        'inputs': [
          {
            'name': 'price',
            'type': 'uint256'
          },
          {
            'name': '_symbol',
            'type': 'string'
          }
        ],
        'name': 'tokenId2wei',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      }
    ]
    let web3 = this.createWeb3Provider()
    const contract = new web3.eth.Contract(ABIMin, contractAddress)
    const WeiAmount = await contract.methods.tokenId2wei(price, symbol).call()
    const tokenAmount = convertWeiToBalance(WeiAmount)
    return tokenAmount
  }
  static async getFeeAmount (gameAddress) {
    return new Promise(async (resolve, reject) => {
      try {
        const minABI = [
          {
            inputs: [],
            name: 'feeAmount',
            outputs: [
              {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
              }
            ],
            stateMutability: 'view',
            'type': 'function'
          }
        ]
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(minABI, gameAddress)
        contract.methods.feeAmount().call((err, balance) => {
          if (err) {
            resolve(0)
          }
          resolve(balance)
        })
      } catch (err) {
        resolve(0)
      }
    })
  }
  static async scholarshipNFT (
    fromUserAddress,
    nftAddress,
    nftId,
    ratio,
    durationTime,
    checkHash,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const minABI = [
          {
            'inputs': [
              {
                'internalType': 'uint256',
                'name': 'tokenId',
                'type': 'uint256'
              },
              {
                'internalType': 'uint256',
                'name': 'duration',
                'type': 'uint256'
              },
              {
                'internalType': 'uint256',
                'name': 'ratio',
                'type': 'uint256'
              },
              {
                'internalType': 'bool',
                'name': 'checkHash',
                'type': 'bool'
              }
            ],
            'name': 'setDeposit',
            'outputs': [],
            'stateMutability': 'nonpayable',
            'type': 'function'
          }
        ]

        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(minABI, nftAddress)
        const datTx = this.callGetDataWeb3(contract, 'setDeposit', [
          nftId,
          durationTime,
          ratio,
          checkHash
        ])
        const dataScholarship = {
          from: fromUserAddress,
          to: nftAddress,
          value: 0,
          data: datTx,
          callBeforeFunc: callbackBeforeDone,
          callbackFunc: callbackAfterDone,
          isCallBackErr: true,
          callbackErrFunc: callbackRejected

        }
        this.postBaseSendTxs(fromUserAddress, [dataScholarship], true)
          .then((res) => {
            resolve(res[0])
          })
          .catch((err) => {
            // callbackRejected(err)
            reject(err)
          })
      } catch (err) {
        resolve(0)
      }
    })
  }
  static async withDrawNFT (
    fromUserAddress,
    gameAddress,
    nftId,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const ABI = [
          {
            'inputs': [
              {
                'internalType': 'uint256',
                'name': 'offerId',
                'type': 'uint256'
              }
            ],
            'name': 'withdraw',
            'outputs': [],
            'stateMutability': 'nonpayable',
            'type': 'function'
          }
        ]
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(ABI, gameAddress)
        console.log({ contract })
        const dataTx = this.callGetDataWeb3(contract, 'withdraw', [nftId])
        const data = {
          from: fromUserAddress,
          to: gameAddress,
          value: 0,
          data: dataTx,
          callBeforeFunc: callbackBeforeDone,
          callbackFunc: callbackAfterDone,
          isCallBackErr: true,
          callbackErrFunc: callbackRejected
        }
        this.postBaseSendTxs(fromUserAddress, [data], true)
          .then((res) => {
            resolve(res[0])
          }
          ).catch((err) => {
            callbackRejected(err)
            reject(err)
          }
          )
      } catch (error) {
        resolve(0)
      }
    })
  }
  static async rentNFT (
    myAddress,
    addressContract,
    nftId,
    timestamp,
    v,
    r,
    s,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      const ABI = [
        {
          'inputs': [
            {
              'internalType': 'uint256',
              'name': 'tokenId',
              'type': 'uint256'
            },
            {
              'internalType': 'uint256',
              'name': 'timestamp',
              'type': 'uint256'
            },
            {
              'internalType': 'uint8',
              'name': 'v',
              'type': 'uint8'
            },
            {
              'internalType': 'bytes32',
              'name': 'r',
              'type': 'bytes32'
            },
            {
              'internalType': 'bytes32',
              'name': 's',
              'type': 'bytes32'
            }
          ],
          'name': 'setUser',
          'outputs': [],
          'stateMutability': 'nonpayable',
          'type': 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(ABI, addressContract)
      const dataTx = this.callGetDataWeb3(contract, 'setUser', [
        nftId,
        timestamp, v, r, s ])
      const data = {
        from: myAddress,
        to: addressContract,
        value: 0,
        data: dataTx,
        callBeforeFunc: callbackBeforeDone,
        callbackFunc: callbackAfterDone,
        isCallBackErr: true,
        callbackErrFunc: callbackRejected
      }

      this.postBaseSendTxs(myAddress, [data], true)
        .then((res) => {
          resolve(res[0])
        })
        .catch((err) => {
          console.log('rentNFT - error: ', err)
          reject(err)
        })
    })
  }
  static async continueDepositNFT (
    fromUserAddress,
    gameAddress,
    offerId,
    callbackBeforeDone,
    callbackAfterDone,
    callbackRejected
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const ABI = [
          {
            'inputs': [
              {
                'internalType': 'uint256',
                'name': 'offerId',
                'type': 'uint256'
              }
            ],
            'name': 'continueDeposit',
            'outputs': [],
            'stateMutability': 'nonpayable',
            'type': 'function'
          }
        ]
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(ABI, gameAddress)
        console.log({ contract })
        const dataTx = this.callGetDataWeb3(contract, 'continueDeposit', [offerId])
        const data = {
          from: fromUserAddress,
          to: gameAddress,
          value: 0,
          data: dataTx,
          callBeforeFunc: callbackBeforeDone,
          callbackFunc: callbackAfterDone,
          isCallBackErr: true,
          callbackErrFunc: callbackRejected
        }
        this.postBaseSendTxs(fromUserAddress, [data], true)
          .then((res) => {
            resolve(res[0])
          }
          ).catch((err) => {
            callbackRejected(err)
            reject(err)
          }
          )
      } catch (error) {
        resolve(0)
      }
    })
  }
  static async getTokensList (coinContract) {
    return new Promise(async (resolve, reject) => {
      try {
        const minABI = [
          {
            'inputs': [],
            'name': 'getTokensList',
            'outputs': [
              {
                'internalType': 'address[]',
                'name': '',
                'type': 'address[]'
              }
            ],
            'stateMutability': 'view',
            'type': 'function'
          }
        ]
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(minABI, coinContract)
        contract.methods.getTokensList().call((err, list) => {
          if (err) {
            resolve([])
          }
          resolve(list)
        })
      } catch (err) {
        resolve(0)
      }
    })
  }
  static async getTokensFiat (coinContract, _fiat) {
    return new Promise(async (resolve, reject) => {
      try {
        const minABI = [
          {
            'inputs': [
              {
                'internalType': 'address',
                'name': '_fiat',
                'type': 'address'
              }
            ],
            'name': 'getTokensFiat',
            'outputs': [
              {
                'internalType': 'string',
                'name': '_symbol',
                'type': 'string'
              },
              {
                'internalType': 'bool',
                'name': '_existed',
                'type': 'bool'
              },
              {
                'internalType': 'uint256',
                'name': 'index',
                'type': 'uint256'
              }
            ],
            'stateMutability': 'view',
            'type': 'function'
          }
        ]
        let web3 = this.createWeb3Provider()
        const contract = new web3.eth.Contract(minABI, coinContract)
        contract.methods.getTokensFiat(_fiat).call((err, list) => {
          if (err) {
            resolve([])
          }
          resolve(list)
        })
      } catch (err) {
        resolve(0)
      }
    })
  }
  static async getTypeNFT (contractAddress, _typeNFT, _erc721) {
    try {
      const abiMinFee = [
        {
          'inputs': [
            {
              'internalType': 'address',
              'name': '_erc721',
              'type': 'address'
            },
            {
              'internalType': 'uint256',
              'name': '_typeNFT',
              'type': 'uint256'
            }
          ],
          'name': 'getTypeNFT',
          'outputs': [
            {
              'components': [
                {
                  'internalType': 'uint256',
                  'name': 'price',
                  'type': 'uint256'
                }
              ],
              'internalType': 'struct CompanyPackage.TypeNFT',
              'name': '',
              'type': 'tuple'
            }
          ],
          'stateMutability': 'view',
          'type': 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(abiMinFee, contractAddress)
      const fiats = contract.methods.getTypeNFT(_erc721, _typeNFT).call()
      return fiats
    } catch (err) {
      return err
    }
  }
  static async getPrice2wei (contractAddress, _price, _fiatBuy) {
    try {
      const abiMinFee = [
        {
          'inputs': [
            {
              'internalType': 'uint256',
              'name': '_price',
              'type': 'uint256'
            },
            {
              'internalType': 'address',
              'name': '_fiatBuy',
              'type': 'address'
            }
          ],
          'name': 'price2wei',
          'outputs': [
            {
              'internalType': 'uint256',
              'name': '',
              'type': 'uint256'
            }
          ],
          'stateMutability': 'view',
          'type': 'function'
        }
      ]
      let web3 = this.createWeb3Provider()
      const contract = new web3.eth.Contract(abiMinFee, contractAddress)
      const fiats = contract.methods.price2wei(_price, _fiatBuy).call()
      return fiats
    } catch (err) {
      return err
    }
  }
}
