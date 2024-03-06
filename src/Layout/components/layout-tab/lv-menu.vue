<template>
  <div
    @click.stop="switchTab(item.activeIndex, item)"
    class="web-tab-item"
    :class="webTabItemClass(item)"
    :style="webTabItemStyle(item)"
    v-for="(item, index) in props.data"
    :key="index"
  >
    <!-- 选中项的圆角 -->
    <div class="tab-item-active-before"></div>
    <div class="tab-item-active-after"></div>
    <!-- item.children.length * 40 + 40 + 'px' -->
    <div
      class="tab-item-parent"
      :class="tabItemClass(item)"
      :style="{
        width: item.parentId === 0 ? '100%' : '230px',
      }"
    >
      <div class="tab-item-icon">
        <CreateIcon :icon="item.meta.icon"></CreateIcon>
      </div>
      <div class="tab-item-title">{{ item.meta.title }}</div>
      <div class="tab-item-down" :style="{ paddingRight: '20px', zIndex: 10 }">
        <!-- DownOutlined -->
        <CreateIcon
          :icon="
            props.activeIndex.includes(item.activeIndex)
              ? 'UpOutlined'
              : 'DownOutlined'
          "
          v-if="item.children.length"
        ></CreateIcon>
      </div>
    </div>
    <!-- 子集 -->
    <!-- <div> -->
    <lv-menu
      :data="item.children"
      :activeIndex="props.activeIndex"
      :activeBgIndex="props.activeBgIndex"
    ></lv-menu>
    <!-- </div> -->
  </div>
</template>

<script lang="ts" setup>
import CreateIcon from '@/components/CreateIcon'
import LvMenu from './lv-menu.vue'
import { MenuItemType } from '@/api/menu/menu'
import mitt from '@/utils/mitt'

const props = defineProps<{
  // 要渲染的数据
  data: Array<MenuItemType>
  activeIndex: string
  activeBgIndex: Array<string>
}>()

// class 'web-tab-item'
const webTabItemClass = item => {
  return props.activeBgIndex[props.activeBgIndex.length - 1] ===
    item.activeIndex && item.children.length === 0
    ? 'web-tab-active-item'
    : ''
}

//style
const webTabItemStyle = item => {
  /**
   * parentId === 0 说明是顶级菜单
   */
  let isTopMenu = item.parentId === 0
  return {
    paddingLeft: isTopMenu ? 0 : '20px',
    marginBottom: isTopMenu ? '5px' : '',
    paddingTop: isTopMenu || item.children.length ? '40px' : '0px',
    overflow:
      !props.activeIndex?.includes(item.activeIndex) ||
      !props.activeBgIndex.includes(item.activeIndex)
        ? 'hidden'
        : '',
    height:
      props.activeIndex?.includes(item.activeIndex) && item.children.length
        ? menuAutoHeight(item)
        : '40px',
  }
}

// 每一个menu的样式
const tabItemClass = item => {
  return [
    props.activeBgIndex.includes(item.activeIndex)
      ? 'web-tab-active-color'
      : '',
    item.parentId !== 0 && !props.activeBgIndex.includes(item.activeIndex)
      ? 'web-tab-no-color'
      : '',
  ]
}

const menuAutoHeight = data => {
  // l-0-0
  const activeIndex = data.activeIndex
  // 说明一个都没有点
  if (activeIndex === props.activeIndex) {
    //如果相等，就返回data.children.length * 40 + 40 + 'px'
    return data.children.length * 40 + 40 + 'px'
  } else {
    // 如果不相等，就拿到源数据向下查找到切换到的activeIndex
    // [0,0,0]
    const indexArr = props.activeIndex?.replace('l-', '').split('-') || []
    const length = activeIndexDepth(data, indexArr) + 1
    //每一个菜单的高度都为40px
    return length * 40 + 'px'
  }
}

// 计算菜单的深度
/**
 *
 * @param sourceCode 点击菜单的数据
 * @param indexArr 点击菜单在源书中的位置
 * @param depthIndex 循环的深度 / 进入到第几层的children
 * @return 就是当前选中的activeIndex 有多深
 */
function activeIndexDepth(sourceCode, indexArr, depthIndex = 0) {
  let length = 0
  //结束条件
  if (sourceCode && sourceCode.children.length) {
    //要累加子菜单的长度children
    length += sourceCode.children.length
    //递归，indexArr[depthIndex + 1] 用于获取当前是children中的哪一个数据
    length += activeIndexDepth(
      sourceCode.children[indexArr[depthIndex + 1]],
      indexArr,
      depthIndex + 1,
    )
  } else {
    return 0
  }
  return length
}

//切换菜单，实际路由控制，主要管控颜色变化方面
/**
 *
 * @param tabIndex 真正触发的地方
 * @param data
 */
const switchRoute = (tabIndex: string, data) => {
  let arr: Array<string> = [tabIndex]
  // [0,0,0]
  let lengthArr = tabIndex.split('-')
  //必须是没有children 才可以触发
  if (!data.children.length) {
    //这里就说明是一个可以跳转的路由
    mitt.emit('changeRoute', data.path)
    let tabIndexCopy = tabIndex
    //这里的作用是把这个路由以上的所有tabindex收集
    for (let i = 0; i < lengthArr.length - 2; i++) {
      // 这里-2 是为了忽略最后一级子菜单
      tabIndexCopy = tabIndexCopy.slice(0, tabIndexCopy.length - 2)
      arr.unshift(tabIndexCopy)
    }
    return arr
  }
  // 如果单击的是有子菜单的菜单
  return props.activeBgIndex
}

//切换菜单  , 动效方面
/**
 * @params tabIndex 点击menu的activeIndex
 * @params data 点击menu的数据
 */
const switchTab = (tabIndex: string, data) => {
  //先切换activeBgIndex
  mitt.emit('changeBgIndex', switchRoute(tabIndex, data))
  //点击选中的子菜单但是该菜单没有子菜单直接退出

  if (props.activeIndex === tabIndex && !data.children.length) {
    return
  } else if (tabIndex === props.activeIndex) {
    // 说明和上一次点击的是一样的
    //1. 这里大于3说明不是顶级菜单
    //2. 0 是关闭所有展开
    tabIndex.length > 3
      ? mitt.emit('switchTab', tabIndex.slice(0, -2))
      : mitt.emit('switchTab', '0')
  } else if (props.activeIndex.slice(0, -2) === tabIndex && data.children) {
    //关闭选中菜单的展开形态
    mitt.emit('switchTab', tabIndex.slice(0, -2))
  } else if (props.activeBgIndex.includes(tabIndex) && data.children) {
    //说明要再次展开选择的菜单,和上一个else是对立的
    /**
     * ['l-0','l-0-0','l-0-0-0'] 中查找 l-0
     */

    //查找点击的索引
    const activeIndex = props.activeBgIndex.indexOf(tabIndex)
    mitt.emit('switchTab', props.activeBgIndex[activeIndex + 1])
  } else {
    mitt.emit('switchTab', tabIndex)
  }
}
</script>
<style lang="less">
@import './style/index.less';
</style>
