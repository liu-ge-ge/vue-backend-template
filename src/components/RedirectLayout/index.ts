/**
 * 解决动态路由添加后，查找不到该路由的警告错误
 */
import { defineComponent, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'RedirectLayout',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const routes = router.getRoutes()
    const hasRoute =
      routes.filter(item => {
        return item.path === route.fullPath
      }).length > 0
    if (hasRoute) {
      router.replace({ path: route.fullPath })
    }

    return () => h('div')
  },
})
