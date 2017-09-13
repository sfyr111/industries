import axios from 'axios'
import qs from 'qs'

// const apihost = process.env.NODE_ENV === 'production' ? '/industries' : 'http://61.147.125.60:9080/industries/'
// const apihost = process.env.NODE_ENV === 'http://61.147.125.60:9080/industries/'

axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

/**
 * fetch
 */

// const alert = window.alert
// const Headers = global.Headers
// const fetch = global.fetch

function parseResponse (response) {
  // fetch
  // return Promise.all([response.status, response.statusText, response.json()])
  // axios
  return Promise.all([response.status, response.statusText, response.data])
}

function checkStatus ([status, statusText, data]) {
  if (status >= 200 && status < 300) {
    return data // 返回套的深
  } else {
    let error = new Error(statusText)
    error.status = status
    error.error_message = data
    return Promise.reject(error)
  }
}

// // 实现timeout
// function _fetch (fetchPromise, timeout) {
//   let abortFn = null

//   // 可以reject
//   const abortPromise = new Promise((resolve, reject) => {
//     abortFn = () => {
//       reject(new Error('请求超时'))
//     }
//   })

//   const abortablePromise = Promise.race([
//     fetchPromise,
//     abortPromise
//   ])

//   setTimeout(() => {
//     abortFn()
//   }, timeout)

//   return abortablePromise
// }

/** timeout 示例
 * _fetch(fetch(url), 2000)
 *  .then(res => {
 *    return res
 *  }, err => {
 *    return err
 *  })
 */
// export default {
//   get (url, param = {}, headers = {}, host = apihost) {
//     let reqHeaders = new Headers()
//     reqHeaders.append('Accept', 'application/json')
//     let query = []
//     Object.keys(param).forEach(item => {
//       query.push(`${item}=${encodeURIComponent(param[item])}`)
//     })
//     let params = query.length ? '?' + query.join('&') : ''
//     url = host + url + params
//     let init = {
//       method: 'GET',
//       headers: reqHeaders,
//       // credentials: 'include',
//       cache: 'default',
//       mode: 'cors'
//     }
//     return _fetch(fetch(url, init), 5000).then(parseResponse).then(checkStatus)
//   },
//   post (url, param = {}, headers = {}, host = apihost) {
//     let reqHeaders = new Headers()
//     reqHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
//     reqHeaders.append('Accept', 'application/json')
//     // reqHeaders.append('Access-Control-Allow-Credentials', 'true')
//     url = host + url
//     let init = {
//       method: 'POST',
//       headers: reqHeaders,
//       credentials: 'include',
//       mode: 'cors',
//       body: qs.stringify(param)
//     }
//     return _fetch(fetch(url, init), 5000).then(parseResponse).then(checkStatus)
//   }
// }

// axios.interceptors.request.use(config => {
//   return config
// }, error => {
//   return Promise.reject(error)
// })

// axios.interceptors.response.use(response => {
//   return response
// }, error => {
//   // return Promise.resolve(error.response)
//   return Promise.reject(error)
// })

export default {
  post (url, data) {
    return axios({
      method: 'post',
      // baseURL: 'http://61.147.125.60:9080/industries/',
      baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3002' : '',
      url,
      data: qs.stringify(data),
      timeout: 20000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(response => {
      return response
    }).then(parseResponse).then(checkStatus)
  },
  patch (url, data) {
    return axios({
      method: 'patch',
      // baseURL: 'http://61.147.125.60:9080/industries/',
      baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3002' : '',
      url,
      data: qs.stringify(data),
      timeout: 20000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(response => {
      return response
    }).then(parseResponse).then(checkStatus)
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3002' : '',
      url,
      params, // get参数
      timeout: 20000,
      headers: {
      }
    }).then(response => {
      return response
    }).then(parseResponse).then(checkStatus)
  },
  delete (url, params) {
    return axios({
      method: 'delete',
      baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3002' : '',
      url,
      params, // get参数
      timeout: 20000,
      headers: {
      }
    }).then(response => {
      return response
    }).then(parseResponse).then(checkStatus)
  }
}
