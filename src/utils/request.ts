import { WEB_API_URL, WEB_TOKEN_NAME } from '@/config/setting'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { getWebToken, setWebToken } from './token'
import { Modal } from 'ant-design-vue'
import { WebApiResult } from '@/api'

const service = axios.create({
  baseURL: WEB_API_URL,
})

/**
 * 请求拦截器
 */

service.interceptors.request.use(
  config => {
    //添加token
    const token = getWebToken()
    if (token && config.headers) {
      config.headers[WEB_TOKEN_NAME] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

/**
 * 响应拦截器
 */

service.interceptors.response.use(
  (response: AxiosResponse<WebApiResult<unknown>>) => {
    if (response.data?.code === 401) {
      Modal.info({
        title: '警告!',
        content: '登录已过期，请退出重新登录！',
        okText: '重新登录',
        onOk: () => {},
      })
      return Promise.reject(new Error(response.data.message))
    }
    //token 自动续期
    const token = response.headers[WEB_TOKEN_NAME.toLowerCase()]
    if (token) {
      setWebToken(token)
    }
    return response
  },
  error => {
    return Promise.reject(error)
  },
)

export default service
