<template>
  <div class="web-layout">
    <div
      class="web-layout-left"
      :style="{ width: store.collapse ? '250px' : '0px' }"
    >
      <div class="layout-left-logo">
        <img src="@/assets/logo.png" />
        <span>{{ WEB_PROJECT_NAME }}</span>
      </div>
      <layout-tab></layout-tab>
      <div
        :class="[
          store.collapse ? 'layout-left-bottom' : 'layout-left-bottom-fixed',
        ]"
      >
        <div class="left-bottom-btn" @click="changeCollapse">
          <MenuFoldOutlined v-if="store.collapse" />
          <MenuUnfoldOutlined v-else />
        </div>
      </div>
    </div>
    <div class="web-layout-right">
      <layout-header @changeThemeState="changeThemeState"></layout-header>
      <router-view></router-view>
      <layout-footer></layout-footer>
      <layout-theme
        :isSidebar="store.isSidebar"
        :isTheme="isTheme"
        :isDark="store.isDark"
        @changeThemeState="changeThemeState"
      ></layout-theme>
    </div>
  </div>
</template>
<script setup lang="ts">
import { WEB_PROJECT_NAME } from '@/config/setting'
import LayoutTab from './components/layout-tab/index.vue'
import LayoutHeader from './components/layout-header/index.vue'
import LayoutFooter from './components/layout-footer/index.vue'
import LayoutTheme from './components/layout-theme/index.vue'
import { onMounted, ref, watch } from 'vue'
import { useThemeStore } from '@/store/modules/theme'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
const store = useThemeStore()

const isTheme = ref(false)

const changeCollapse = () => {
  store.collapse = !store.collapse
}

const changeThemeState = (state: string, value: boolean) => {
  store[state] = value
  // 控制theme组件的动效
  if (state === 'isSidebar' && value) {
    isTheme.value = true
  } else if (state === 'isSidebar') {
    setTimeout(() => {
      isTheme.value = false
    }, 400)
  }
}

watch(
  () => store.isDark,
  () => {
    store.changeDarkOrLightMode()
  },
)

onMounted(() => {
  window.addEventListener('resize', (e: UIEvent & { target: Window }) => {
    console.log(e.target.innerWidth)
    const window_width = e.target.innerWidth
    if (window_width <= 768 && store.collapse) {
      store.collapse = false
    }
    if (window_width >= 768 && !store.collapse) {
      store.collapse = true
    }
  })

  window.addEventListener('mouseup', () => {
    console.log('松开')
  })
})
</script>
<style lang="less">
@import './style/index.less';
@import './style/index_media.less';
</style>
