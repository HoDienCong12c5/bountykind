import { createCancelTokenHandler } from './axiosUtils'
import { REQUEST_TYPE } from 'common/constants'
import BaseService from './baseService'
import axios from 'axios'
const baseUrl = process.env.API_GAME
const MyNFTService = {
  getMyNFTs: function (query) {
    const apiUrl = '/nfts/my-nfts'
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getMyNFTs.name, cancelTokenHandlerObject, query)
  },
  getNFTFilterList: function () {
    const apiUrl = '/nft/filters'
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getNFTFilterList.name, cancelTokenHandlerObject)
  },
  getOwnerDataNFT: function (query) {
    const apiUrl = `/nft/owner-data`
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getOwnerDataNFT.name, cancelTokenHandlerObject, query)
  },
  updateImageNFT: function (nftAddress, id, body) {
    const apiUrl = `/nft-image/${nftAddress}/${id}`
    return BaseService.request(REQUEST_TYPE.PUT, apiUrl, this.updateImageNFT.name, cancelTokenHandlerObject, null, body)
  },
  getImageConvert: function (hash) {
    const apiUrl = `/nft/convert-img/${hash}`
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getImageConvert.name, cancelTokenHandlerObject)
  },
  getUsersRanking: function (query) {
    const apiUrl = '/nft/holders'
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getUsersRanking.name, cancelTokenHandlerObject, query)
  },

  getNFTDetail: async function (address, id) {
    const url = baseUrl + `/nfts/${address}/${id}`
    const response = await axios({
      url
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  uploadPhotoNFT: function (body) {
    const apiUrl = '/photo/nft/upload-from-base64'
    return BaseService.request(REQUEST_TYPE.POST, apiUrl, this.uploadPhotoNFT.name, cancelTokenHandlerObject, null, body)
  },
  createNFT: function (body) {
    const apiUrl = '/hub/nft/create'
    return BaseService.request(REQUEST_TYPE.POST, apiUrl, this.createNFT.name, cancelTokenHandlerObject, null, body)
  }
}

// creating the cancel token handler object
const cancelTokenHandlerObject = createCancelTokenHandler(MyNFTService)

export default MyNFTService
