<template>
  <div class="web-tab">
    <for-tab
      :sourceCode="store.menu"
      :data="store.menu"
      :activeIndex="activeIndex"
      :activeBgIndex="activeBgIndex"
    ></for-tab>
  </div>
</template>
<script setup lang="ts">
import ForTab from './forTab.vue'
import mitt from '@/utils/mitt'
import { onUnmounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
const router = useRouter()
const store = useUserStore()
console.log(store.menu, 'menu')
//控制动效高度
let activeIndex = ref('l-0')
//控制选择的路径
let activeBgIndex = reactive<Array<string>>([])

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
