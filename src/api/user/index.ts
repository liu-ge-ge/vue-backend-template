import request from '@/utils/request'
import { User } from './user'

class UserService {
  async getUserInfo(): Promise<User> {
    const res = await request.get('/auth/user')
    if (res.data.code === 0 && res.data.data) {
      return res.data.data
    }
    return Promise.reject(new Error(res.data.message))
  }
}

export default new UserService()
