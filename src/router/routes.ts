import Web_Layout from '@/Layout/index.vue'
import { MenuItemType } from '@/api/menu/menu'
import { WEB_ROOT_PATH } from '@/config/setting'
import { RouteRecordRaw } from 'vue-router'
import RedirectLayout from '@/components/RedirectLayout'
const modules = import.meta.glob('/src/views/**/index.vue')
export const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: RedirectLayout,
  },
]

/**处理路由的组件 */
function paveRoute(
  menu: Array<MenuItemType>,
  callback: (route: MenuItemType) => void,
) {
  menu.forEach(menuItem => {
    //有children 的情况
    if (menuItem.children?.length) {
      paveRoute(menuItem.children, callback)
      callback({
        ...menuItem,
        component: void 0,
        children: [],
      })
    } else {
      //没有children的情况
      menuItem.component = getWebComponent(menuItem.path)
      callback(menuItem)
      return
    }
  })
}

//获取第一个菜单下的路由
function getHomePath(menu: Array<MenuItemType>): string {
  //children的第一个菜单
  let homePath = ''
  if (menu[0].children?.length) {
    homePath = getHomePath(menu[0].children)
  } else {
    return menu[0].path || WEB_ROOT_PATH
  }
  return homePath
}

/**
 * 获取铺平后的路由
 * @param menu
 * @returns
 */
export function getPaveRoute(menu: Array<MenuItemType>) {
  const routes: RouteRecordRaw[] = []
  const homePath = getHomePath(menu)
  paveRoute(menu, route => {
    routes.push(route as RouteRecordRaw)
  })
  return {
    path: WEB_ROOT_PATH,
    component: Web_Layout,
    redirect: homePath,
    children: routes,
  }
}

// /**
//  *
//  * @param componentName 组件名称
//  * @returns 组件
//  */

function getWebComponent(componentName?: string) {
  if (componentName) {
    const component = modules[`/src/views${componentName}/index.vue`]
    return component
  }
  return undefined
}
