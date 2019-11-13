import axios from 'axios'
import Vue from 'vue'
import qs from 'querystring'
const vm = new Vue()

axios.defaults.withCredentials = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.baseURL='http://localhost:8082/'

// product
// 'http://beidou.edianlai.com/beidou/api'
// axios.defaults.baseURL = '/beidou/api'

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post' && config.headers['Content-Type'] !== 'multipart/form-data') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  vm.$toast('错误的传参')
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  const { status, data, msg } = response.data

  if (response.status === 200) {
    const except = (status === -9 && response.config.url.indexOf('web_get_goods') > -1)
    if (status > -1 || except) {
      return data
    } else {
      vm.$toast(msg || '操作失败')
      return Promise.reject(new Error(msg || '操作失败'))
    }
    // if (status === '403') {
    //   vm.$toast('你还未登录')
    //   location.href = '/#login'
    //   location.reload()
    // }
  } else {
    vm.$toast('与服务器连接失败')
    return Promise.reject(new Error('与服务器连接失败'))
  }
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 403:
        error.message = '没有访问权限'
        break
      case 500:
        error.message = '服务器发生错误了'
        break
      case 502:
        error.message = '连接服务器超时'
        break
      default:
    }
    vm.$toast(error.message)
  }
  return Promise.reject(error)
})

export default axios
