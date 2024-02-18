<template>
  <div class="web-layout">
    <div class="web-layout-left">
      <div class="layout-left-logo">
        <img src="@/assets/logo.png" />
        <span>{{ WEB_PROJECT_NAME }}</span>
      </div>
      <layout-tab></layout-tab>
    </div>
    <div class="web-layout-right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { WEB_PROJECT_NAME } from '@/config/setting'
import LayoutTab from './components/layout-tab/index.vue'
</script>
<style lang="less">
@import './style/index.less';
</style>
