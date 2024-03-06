<template>
  <div class="web-header">
    <div class="web-header-left">所属机构:淅川大石桥 L-C 科技</div>
    <div class="web-header-right">
      <div class="header-right-user">
        <a-avatar :size="25"> </a-avatar>
        <span>刘超宾-lc</span>
      </div>
      <div class="line"></div>
      <div class="header-right-btn">
        <div class="web-btn" title="首页">
          <HomeOutlined />
        </div>
        <div class="web-btn" title="注销">
          <LockOutlined />
        </div>
        <div class="web-btn" title="退出登录">
          <PoweroffOutlined />
        </div>
        <div
          class="web-btn"
          title="更多"
          @click="emit('changeThemeState', 'isSidebar', true)"
        >
          <EllipsisOutlined />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  HomeOutlined,
  LockOutlined,
  PoweroffOutlined,
  EllipsisOutlined,
} from '@ant-design/icons-vue'

const emit = defineEmits<{
  (e: 'changeThemeState', state: string, value: boolean): void
}>()
</script>
<style lang="less">
@import './style/index.less';
</style>
