import request from '@/utils/request'
import { WebApiResult } from '../index'
import type { LoginApiResult, LoginData } from './login'
import { setWebToken } from '@/utils/token'
// import { useUserStore } from '@/store/modules/user'
// const { setWebRoutes } = useUserStore()
class LoginService {
  async Login(data: LoginData) {
    const res = await request.post<WebApiResult<LoginApiResult>>('/login', data)
    if (res.data.code === 0) {
      setWebToken(res.data.data?.access_token)
      //设置user 的路由
      // setWebRoutes(res.data.data?.user?.authorities)
      return res.data.message
    }
    return Promise.reject(new Error(res.data.message))
  }
}

export default new LoginService()
