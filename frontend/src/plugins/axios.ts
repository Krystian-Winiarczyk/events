import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
  baseURL: 'http://127.0.0.1:3001/',
})

export default axiosIns
