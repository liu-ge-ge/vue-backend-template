<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: themeColor,
      },
    }"
  >
    <router-view></router-view>
  </a-config-provider>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/modules/theme'
const themeStore = useThemeStore()

const { themeColor } = storeToRefs(themeStore)
// const { changeDarkOrLightMode, changeThemeColor } = themeStore
</script>
