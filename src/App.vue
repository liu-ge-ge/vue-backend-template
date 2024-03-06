<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: themeColor,
      },
      algorithm: themeStore.isDark
        ? theme.darkAlgorithm
        : theme.defaultAlgorithm,
    }"
  >
    <router-view></router-view>
  </a-config-provider>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/modules/theme'
import { theme } from 'ant-design-vue'
const themeStore = useThemeStore()

const { themeColor } = storeToRefs(themeStore)
// const { changeDarkOrLightMode, changeThemeColor } = themeStore
</script>
