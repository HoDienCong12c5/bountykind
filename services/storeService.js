import { createCancelTokenHandler } from './axiosUtils'
import { REQUEST_TYPE } from 'common/constants'
import BaseService from './baseService'
import axios from 'axios'

const baseUrl = process.env.API_GAME
const StoreService = {
  getNFTs: function (query, notCancel = false) {
    const apiUrl = '/hub/store'
    if (notCancel) {
      return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getNFTs.name, null, query)
    }
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getNFTs.name, cancelTokenHandlerObject, query)
  },
  getNFT: async function (nftAddress, id) {
    const url = baseUrl + `/store/${nftAddress}/${id}`
    const response = await axios({
      url
    })
    if (response.status === 200) {
      return response.data.data
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  createStore: function (body) {
    const apiUrl = '/store/create'
    return BaseService.request(REQUEST_TYPE.POST, apiUrl, this.createStore.name, cancelTokenHandlerObject, null, body)
  },
  sellNFT: function (body) {
    const apiUrl = '/store'
    return BaseService.request(REQUEST_TYPE.PATCH, apiUrl, this.sellNFT.name, cancelTokenHandlerObject, null, body)
  },
  removeNFT: function (body) {
    const apiUrl = '/store'
    return BaseService.request(REQUEST_TYPE.DELETE, apiUrl, this.removeNFT.name, cancelTokenHandlerObject, null, body)
  },
  getOrderHistoryNFT: function (nftAddress, query) {
    const apiUrl = `/store/order-history/${nftAddress}`
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getOrderHistoryNFT.name, cancelTokenHandlerObject, query)
  },
  getRelatedNFT: function (nftAddress, query) {
    const apiUrl = `/store/related-items/${nftAddress}`
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getRelatedNFT.name, cancelTokenHandlerObject, query)
  },
  getPackageById: function (id) {
    const apiUrl = `/package/${id}`
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getPackageById.name, cancelTokenHandlerObject)
  },
  getPackageRelated: function (id) {
    const apiUrl = `/package/related/${id}`
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getPackageRelated.name, cancelTokenHandlerObject)
  },
  getCountPackage: function (query) {
    const apiUrl = `/count-package`
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getCountPackage.name, cancelTokenHandlerObject, query)
  },
  buyNFT: function (body) {
    const apiUrl = '/store/buy'
    return BaseService.request(REQUEST_TYPE.POST, apiUrl, this.buyNFT.name, cancelTokenHandlerObject, null, body)
  },
  getTotalPackageStore: function (query) {
    const apiUrl = `/hub/store/total-package`
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getTotalPackageStore.name, cancelTokenHandlerObject, query)
  },
  getSalesNFTs: function (query) {
    const apiUrl = `/sales/nfts`
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getSalesNFTs.name, cancelTokenHandlerObject, query)
  },
  getSellingNFTs: function (query) {
    const apiUrl = `/store`
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getSellingNFTs.name, cancelTokenHandlerObject, query)
  },
  getSellingNFTsWithQueryString: async function (queryString) {
    console.log({ queryString })
    const url = baseUrl + `/store${queryString !== ' ' ? queryString : ''}${queryString !== ' ' ? '&' : '?'}limit=10`
    // const url = baseUrl + `/store${queryString}`

    const response = await axios({
      url
    })
    if (response.status === 200) {
      return response.data.data
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getNFTDetails: function (nftAddress, id) {
    const apiUrl = `/store/${nftAddress}/${id}`
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getNFTDetails.name, cancelTokenHandlerObject, null)
  },
  getTokenInfo: async function (tokenAddress) {
    const url = baseUrl + `/tokens/${tokenAddress}`
    const response = await axios({
      url
    })
    if (response.status === 200) {
      return {
        ...response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getRelatedItems: function (nftAddress, id) {
    const apiUrl = `store/related-items/${nftAddress}?id=${id}`
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getRelatedItems.name, cancelTokenHandlerObject, null)
  },
  getOrderHistory: function (nftAddress, query) {
    const apiUrl = `store/order-history/${nftAddress}`
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getOrderHistory.name, cancelTokenHandlerObject, query)
  }
}

// creating the cancel token handler object
const cancelTokenHandlerObject = createCancelTokenHandler(StoreService)

export default StoreService
