import { createCancelTokenHandler } from './axiosUtils'
import { REQUEST_TYPE } from 'common/constants'
import BaseService from './baseService'
import axios from 'axios'
const baseUrl = process.env.API_GAME
const CommonService = {
  uploadFile: async function (body) {
    const apiUrl = baseUrl + '/photo/upload'
    const response = await axios({
      method: 'POST',
      url: apiUrl,
      data: body,
      headers: { 'Content-Type': 'multipart/form-data' }
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
  getSetting: async function () {
    const url = baseUrl + '/settings'
    const response = await axios({
      url,
      method: 'GET'
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
  getSearch: function (query) {
    const apiUrl = '/search'
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getSearch.name, cancelTokenHandlerObject, query)
  }
}

// creating the cancel token handler object
const cancelTokenHandlerObject = createCancelTokenHandler(CommonService)

export default CommonService
