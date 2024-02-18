import { WEB_TOKEN_NAME } from '@/config/setting'

//获取token值
export function getWebToken() {
  const token = localStorage.getItem(WEB_TOKEN_NAME)

  return token
}

//设置token值
export function setWebToken(token?: string) {
  if (token) {
    localStorage.setItem(WEB_TOKEN_NAME, token)
  }
}
