<template>
  <div
    :style="{ width: props.isTheme ? '100%' : '0px' }"
    class="web-theme"
    @click="changeTheme"
  >
    <div
      class="web-theme-sidebar"
      @click.stop=""
      :style="{ width: props.isSidebar ? '300px' : '0px' }"
    >
      <div class="theme-sidebar-compoent">
        <span>开启开黑模式</span>
        <a-switch :checked="props.isDark" @change="chagneDark" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  isSidebar: boolean
  isTheme: boolean
  isDark: boolean
}>()
const emit = defineEmits<{
  (e: 'changeThemeState', state: string, value: boolean): void
}>()

const changeTheme = () => {
  emit('changeThemeState', 'isSidebar', false)
}

const chagneDark = value => {
  emit('changeThemeState', 'isDark', !props.isDark)
  console.log(value, 'value')
}
</script>
<style lang="less">
@import './style/index.less';
</style>
