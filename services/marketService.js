import axios from 'axios'

const baseUrl = process.env.API_GAME

const MarketService = {
  getAllMarketFilters: async function () {
    const url = baseUrl + `/settings/filter`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data,
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

export default MarketService
