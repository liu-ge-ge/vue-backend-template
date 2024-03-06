<template>
  <div class="web-tab">
    <for-tab
      :data="store.menu"
      :activeIndex="activeIndex"
      :activeBgIndex="activeBgIndex"
    ></for-tab>
  </div>
</template>
<script setup lang="ts">
import ForTab from './lv-menu.vue'
import mitt from '@/utils/mitt'
import { onUnmounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
const router = useRouter()
const store = useUserStore()
//控制动效高度
let activeIndex = ref('l-0')
//控制选择的路径 ['l-c','l-0-0','l-0-0-0']
let activeBgIndex = reactive<Array<string>>([])
// 设置默认activeIndex
const defaultActiveIndex = data => {
  let activeStr = ''
  if (data[0] && data[0].children.length) {
    activeStr = defaultActiveIndex(data[0].children[0])
  } else {
    return data.activeIndex
  }
  return activeStr
}
activeIndex.value = defaultActiveIndex(store.menu)
//设置默认activeBgIndex
const switchRoute = (tabIndex: string) => {
  let arr: Array<string> = [tabIndex]
  let lengthArr = tabIndex.split('-')
  //必须是没有children 才可以触发
  let tabIndexCopy = tabIndex
  //这里的作用是把这个路由以上的所有tabindex收集
  for (let i = 0; i < lengthArr.length - 2; i++) {
    tabIndexCopy = tabIndexCopy.slice(0, tabIndexCopy.length - 2)
    arr.unshift(tabIndexCopy)
  }
  return arr
}
activeBgIndex = switchRoute(activeIndex.value)

console.log(activeIndex.value, 'default')

mitt.on('switchTab', (data: string) => {
  console.log(data, 'switchTab-index.uve')
  activeIndex.value = data
})

mitt.on('changeBgIndex', (data: Array<string>) => {
  console.log(data, 'data=================')
  activeBgIndex = data
})

mitt.on('changeRoute', (path: string) => {
  router.push(path)
})

onUnmounted(() => {
  mitt.off('switchTab')
})
</script>
