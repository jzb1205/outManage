import axios from 'axios'

axios.defaults.timeout = 20000
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.baseURL = 'http://112.74.105.152:8089/manage/'

axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = JSON.parse(token)
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)
/**
 * 封装post方法
 * @param {String} url 。
 * @param {Object} params 。
 * @returns {Promise} 。
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}
/**
 * 封装get请求
 * @param {String} url .
 * @param {Object} params .
 * @returns {Promise} .
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}
