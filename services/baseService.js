import axiosInstance from './axiosConfig'
import QueryString from 'query-string'
import { COOKIES_STORAGE } from 'common/constants'
import Cookies from 'js-cookie'
// export default class BaseService {
//   static async request (method, apiUrl, name, cancelTokenHandlerObject, query, body, signature = null) {
//     const AUTH_TOKEN = signature || ReduxServices.getAuthKeyBearer()
//     let url = apiUrl
//     if (query) {
//       url = url + '?' + QueryString.stringify(query)
//     }
//     let config = {
//       method,
//       url
//     }
//     if (cancelTokenHandlerObject) {
//       config.cancelToken = cancelTokenHandlerObject[name].handleRequestCancellation().token
//     }
//     if (AUTH_TOKEN) {
//       config.headers = {
//         Authorization: AUTH_TOKEN
//       }
//     }
//     if (body) {
//       config.data = body
//     }
//     return axiosInstance.request(config).then(function (response) {
//       return response.data
//     }).catch(function (error) {
//       return error
//     })
//   }
// }
const BaseService = {
  request: function (method, apiUrl, name, cancelTokenHandlerObject, query, body, signature = null) {
    console.log('start  get cookie ')
    const check = async () => {
      const AUTH_TOKEN = Cookies.get(COOKIES_STORAGE.ACCESS_TOKEN) || null
      let url = apiUrl
      if (query) {
        url = url + '?' + QueryString.stringify(query)
      }
      let config = {
        method,
        url
      }
      if (cancelTokenHandlerObject) {
        config.cancelToken = cancelTokenHandlerObject[name].handleRequestCancellation().token
      }
      if (AUTH_TOKEN) {
        config.headers = {
          Authorization: AUTH_TOKEN
        }
      }
      if (body) {
        config.data = body
      }
      return axiosInstance.request(config).then(function (response) {
        return response.data
      }).catch(function (error) {
        return error
      })
    }
    return check()
  }
}

export default BaseService
