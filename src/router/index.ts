import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useUserStore } from '@/store/modules/user'
import { getWebToken } from '@/utils/token'
import { WEB_NO_LOGIN, WEB_ROOT_PATH } from '@/config/setting'
const router = createRouter({
  history: createWebHistory(),
  routes,
})

/**
 * to : 即将要进入的目标
 * from : 当前到衡阳正要离开的路由
 */
router.beforeEach(async (to, from) => {
  console.log(to, from)
  //判断是否登录
  if (!getWebToken()) {
    //没有登录
    if (!WEB_NO_LOGIN.includes(to.path)) {
      console.log('没有登录')
      return {
        path: '/login',
        replace: true,
      }
    }
    return
  } else {
    console.log('登录了!')
    //登录了即将进入入login
    if (to.path === '/login') {
      return {
        path: WEB_ROOT_PATH,
      }
    } else {
      const userStore = useUserStore()
      //当添加完路由后，要重新再进来，但是要判断是否添加过这个路由了，否则会无限添加
      if (!userStore.menu.length) {
        router.addRoute(await userStore.getWebRoutes())
        return {
          ...to,
          replace: true,
        }
      }
    }
  }
})

export default router
