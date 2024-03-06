import { Menu, MenuItemType } from '@/api/menu/menu'
import { getPaveRoute } from '@/router/routes'
import { defineStore } from 'pinia'
import UserService from '@/api/user/index'
// 为菜单添加重定向
/**
 * 依据每一个对象的parentId
 * res:[
 *     {
 *          parentId:0,
 *          path:'xxx',
 *          menuId:136
 *          children:[
 *               {
 *                   parentId:136,
 *                   menuId:137
 *               },
 *                   parentId:136,
 *                   menuId:138
 *               }
 *          ]
 *     }
 * ]
 *
 */
function addMenuRedirect(menu, activeIndex = 'l') {
  const MenuList: Array<MenuItemType> = []
  menu.forEach((item, index) => {
    if (item.children && item.children.length) {
      activeIndex = activeIndex + `-${index}`
      MenuList.push({
        ...item,
        activeIndex,
        redirect: item.children[0].path,
        children: addMenuRedirect(item.children, activeIndex),
      })
    } else {
      MenuList.push({ ...item, activeIndex: activeIndex + `-${index}` })
    }
  })
  return MenuList
}

/**
 *
 * @param authorities api返回的源数据数据
 * @param parentId 父菜单Id
 * @returns 返回层级处理完毕的菜单
 */
function menuHandle(authorities: Menu[], parentId = 0) {
  const menuList: Array<MenuItemType> = []
  authorities.forEach(item => {
    if (item.parentId === parentId) {
      // 这里应该继续查找这个菜单下面的所有子菜单
      menuList.push({
        name: item.name,
        path: item.path,
        children: menuHandle(authorities, item.menuId),
        meta: {
          title: item.title,
          icon: item.icon,
        },
        activeIndex: '',
        parentId: item.parentId,
        component: undefined,
        redirect: undefined,
      })
    }
  })
  return menuList
}

interface UserStateType {
  menu: Array<MenuItemType>
  routes: Array<MenuItemType>
  userInfo: {
    nickName?: string
    avatar?: string
    motto?: string
  }
}
export const useUserStore = defineStore('user', {
  state: (): UserStateType => ({
    //菜单
    menu: [],
    //路由
    routes: [],
    userInfo: {},
  }),
  actions: {
    async getWebRoutes() {
      const { authorities, nickName, avatar, motto } =
        await UserService.getUserInfo()
      this.userInfo = {
        nickName,
        avatar,
        motto,
      }
      const menu = addMenuRedirect(menuHandle(authorities))
      this.menu = menu
      return getPaveRoute(menu)
    },
  },
})
