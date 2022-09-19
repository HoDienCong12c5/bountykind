import axios from 'axios'

const baseUrl = process.env.API_GAME
const scholarshipService = {
  putCodeScholarship: async function (contractAddress, nftId, body, token) {
    const url = baseUrl + `/scholarships/code/${contractAddress}/${nftId}`
    const response = await axios({
      url,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: body

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
  getScholarshipList: async function (status = 'posting') {
    const url = baseUrl + `/scholarships?status=${status}`
    const response = await axios({
      url,
      method: 'GET'
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
  postCheckCodeScholarship: async function (contractAddress, nftId, body) {
    const url = baseUrl + `/scholarships/check-code/${contractAddress}/${nftId}`
    const response = await axios({
      url,
      method: 'POST',
      data: body
    })
    return response.data
  },
  getItemScholarshipById: async function (contractAddress, nftId) {
    const url = baseUrl + `/scholarships/${contractAddress}/${nftId}`

    const response = await axios({
      url,
      method: 'GET'
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
  }

}

export default scholarshipService
