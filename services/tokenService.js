import { createCancelTokenHandler } from './axiosUtils'
import axios from 'axios'

const baseUrl = process.env.API_GAME
const TokenService = {
  getTokenByAddress: async function (tokenAddress) {
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
  }
}

// creating the cancel token handler object
const cancelTokenHandlerObject = createCancelTokenHandler(TokenService)

export default TokenService
