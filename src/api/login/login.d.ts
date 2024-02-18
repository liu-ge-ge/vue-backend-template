import type { User } from '../user/user'
export interface LoginApiResult {
  access_token?: string
  user?: User
}

export interface LoginData {
  username: string
  password: string
}
