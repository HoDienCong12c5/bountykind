import axios from 'axios'

const axiosInstance = axios.create({
  // withCredentials: process.env.REACT_APP_STATE === 'PRODUCTION',
  baseURL: process.env.API_APP
})

export default axiosInstance
