import type { Role } from '../role/role'
import type { Menu } from '../menu/menu'
export interface User {
  userId: number
  username: string
  avatar: string
  nickName: string
  motto: string
  email: string
  status: number
  authorities: Menu[]
  roles: Role[]
}
