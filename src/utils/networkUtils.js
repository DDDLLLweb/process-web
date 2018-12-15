import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
// import { message, Modal } from 'antd'
import moment from 'moment'
import { codeMap } from '../utils/enums'
import { default as config } from './config'
const { api, baseURL, CORS, YQL } = config
const { basic } = api
/*
 * Network utility functions
 */

// let failed = false

// Default config of axios
console.info(`API Server: ${baseURL}`)
axios.defaults = Object.assign(axios.defaults, {
  baseURL,
  timeout: 10000,
  withCredentials: true,
  xsrfCookieName: 'el-xsrf',
  xsrfHeaderName: 'el-xsrf',
})

// 给所有get请求加上时间戳
axios.interceptors.request.use(
  (config) => {
    if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params,
      }
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  },
)

axios.interceptors.request.use((request) => {
  return request
})

axios.interceptors.response.use((response) => {
  return response
})

// anti-CSRF
const RESULT_CODE = 'el-result-code' // WebUtil#RESULT_CODE
const AUTHIZARION = 'PS_ACCESS_TOKEN'
let _csrfHeaders
const csrf = (() => axios.get(basic.csrf)
  .then((res) => {
    const csrfToken = res.headers[RESULT_CODE]
    _csrfHeaders = headers => ({ ...headers, 'el-xsrf': csrfToken }) // WebUtil#XSRF_NAME
  }))

const makeHeaders = headers => {
  const accessToken = localStorage.getItem(AUTHIZARION)
  console.log('---===--,{}', accessToken)
  return Object.assign({}, _csrfHeaders(headers), { 'Authorization': `Bearer ${accessToken}` })
}

// Helpers
const errorDecoder = code => code && codeMap.filter(c => c.code === code)[0].message
const serializeDate = d => moment(d).format('YYYY-MM-DD')
const paramsSerializer = params => qs.stringify(params, { serializeDate })

//
const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options

  const cloneData = lodash.cloneDeep(data)

  try {
    let domain = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domain = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
      url = url.slice(domain.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url
  } catch (e) {
    // message.error(e.message)
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 4000,
      }, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve({ statusText: 'OK', status: 200, data: result })
      })
    })
  } else if (fetchType === 'YQL') {
    url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${encodeURIComponent(qs.stringify(options.data))}'&format=json`
    data = null
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
        headers: makeHeaders(),
        paramsSerializer,
      })
    case 'post':
      return axios.post(url,
        cloneData,
        {
          headers: makeHeaders(),
        },
      )
    case 'form':
      return axios.post(url,
        {},
        {
          params: cloneData,
          headers: makeHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
          paramsSerializer,
        },
      )
    case 'delete':
      return axios.delete(url, {
        headers: makeHeaders(),
        data: cloneData,
      })
    case 'put':
      return axios.put(url,
        cloneData,
        {
          headers: makeHeaders(),
        })
    case 'patch':
      return axios.patch(url,
        cloneData,
        {
          headers: makeHeaders(),
        })
    case 'upload':
      return axios.post(url,
        data,
        {
          timeout: 100000,
          headers: makeHeaders({
            'Content-Type': 'multipart/form-data',
            // 'X-Requested-With': 'XMLHttpRequest',
          }),
        })
    default:
      return axios(options)
  }
}

const request = (options) => {
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`

    if (window.location.origin !== origin) {
      if (CORS && CORS.indexOf(origin) > -1) {
        options.fetchType = 'CORS'
      } else if (YQL && YQL.indexOf(origin) > -1) {
        options.fetchType = 'YQL'
      } else {
        options.fetchType = 'JSONP'
      }
    }
  }

  return fetch(options).then((response) => {
    const { headers, status } = response
    let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data
    if (headers[RESULT_CODE] && headers[RESULT_CODE] !== 'OK') {
      return {
        success: false,
        message: errorDecoder(headers[RESULT_CODE]),
        status,
        data,
      }
    }
    return {
      success: true,
      message: errorDecoder(headers[RESULT_CODE]),
      status,
      data,
    }
  }).catch((error) => {
    const { response } = error
    if (response) {
      // if (error.response.status === 401) {
      // !failed && Modal.error({
      //   title: '登陆超时',
      //   content: '请重新登陆',
      //   okText: '好',
      //   onOk: () => {
      //     setTimeout(() => {
      //       window.location.href = '/login'
      //     }, 3)
      //   },
      // })
      // failed = true
      // } else if (error.response.status === 410) {
      //   Modal.error({
      //     title: '警告',
      //     content: '您的账号已经在其它设备登录，您被迫下线',
      //     okText: '好',
      //     onOk: () => {
      //       setTimeout(() => {
      //         window.location.href = '/login'
      //       }, 3)
      //     },
      //   })
      // } else if (error.response.status === 500) {
      //   return { success: false, status: 500, message: '服务端错误！' }
      // }
      const { headers, status, data } = response
      const otherData = data
      const msg = data.message || headers[RESULT_CODE]
      return { success: false, status, message: msg, ...otherData }
    }
    // const status = 600
    // const msg = 'Network Error'
    // return { success: false, status, message: msg }
  })
}

export { request, csrf }
