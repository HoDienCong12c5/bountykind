import { createCancelTokenHandler } from './axiosUtils'
import { REQUEST_TYPE, COOKIES_STORAGE } from 'common/constants'
import BaseService from './baseService'
import ReduxServices from 'common/redux'
import axios from 'axios'
import cookiesService from 'services/cookiesService'
import Cookies from 'js-cookie'
const baseUrl = process.env.API_GAME
const UserService = {
  getMessageHash: async function () {
    const url = baseUrl + '/users/msg-hash'
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return { 'token': response.data.data }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getUserBySignature: async function (sign, address) {
    const url = baseUrl + `/users/sign/${address}`
    const response = await axios({
      url,
      method: 'POST',
      headers: {
        Authorization: sign
      }
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
  refeshAccessToken: async function (refeshToken) {
    const url = baseUrl + '/users/refesh-token'
    if (refeshToken) {
      const response = await axios({
        url,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refeshToken}`
        }
      })
      if (response.status === 200) {
        return response.data.data
      } else {
        return {
          message: 'error',
          status: 'error'
        }
      }
    } else {
      // ReduxServices.loginMetamask()
      // return cookiesService.getAllCookie()
      return false
    }
  },
  updateUser: async function (body, auth) {
    const url = baseUrl + `/users`
    const response = await axios({
      url,
      method: 'PUT',
      data: body,
      headers: {
        Authorization: `Bearer ${auth}`
      }
    })
    if (response.status === 200) {
      return response.data
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getUserInfo2: async function (auth) {
    // const apiUrl = `/user/${address}`
    // return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getUserInfo2.name, cancelTokenHandlerObject)
    const url = baseUrl + `/users/detail`
    const response = await axios({
      url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth}`
      }
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
  getUserInfo: function () {
    const sign = ReduxServices.getToken()?.token
    const apiUrl = `/user/info`
    return BaseService.request(REQUEST_TYPE.GET, apiUrl, this.getUserInfo.name, cancelTokenHandlerObject, null, null, sign)
  },
  getDataCookiesFromServer: async function () {
    const url = baseUrl + '/users/cookies'
    const response = await axios({
      url,
      method: 'Get'
    })
    if (response.status === 200) {
      return response.data.data
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  }
}

// creating the cancel token handler object
const cancelTokenHandlerObject = createCancelTokenHandler(UserService)

export default UserService
