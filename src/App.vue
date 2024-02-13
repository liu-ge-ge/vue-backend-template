<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: themeColor,
      },
    }"
  >
    <a-button @click="changeDarkOrLightMode">切换暗黑</a-button>
    <a-button @click="changeThemeColor('#FFD706')">切换主题</a-button>
  </a-config-provider>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/modules/theme'
const themeStore = useThemeStore()

const { themeColor } = storeToRefs(themeStore)
const { changeDarkOrLightMode, changeThemeColor } = themeStore
</script>
<style lang="less">
@import url('./styles/default.less');

#app {
  color: var(--theme-color);
  background-color: var(--background-color);
}
</style>
