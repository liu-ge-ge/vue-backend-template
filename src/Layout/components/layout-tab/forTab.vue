<template>
  <div
    @click.stop="switchTab(item.activeIndex, item)"
    class="web-tab-item"
    :class="[
      activeBgIndex[activeBgIndex.length - 1] === item.activeIndex &&
      item.children.length === 0
        ? 'web-tab-active-item'
        : '',
    ]"
    :style="{
      paddingLeft: item.parentId === 0 ? 0 : '20px',
      marginBottom: item.parentId === 0 ? '5px' : '',
      paddingTop: item.parentId === 0 || item.children.length ? '40px' : '0px',
      overflow:
        !props.activeIndex?.includes(item.activeIndex) ||
        !props.activeBgIndex.includes(item.activeIndex)
          ? 'hidden'
          : '',
      height:
        props.activeIndex?.includes(item.activeIndex) && item.children.length
          ? menuAutoHeight(item)
          : '40px',
    }"
    v-for="(item, index) in props.data"
    :key="index"
  >
    <div class="tab-item-active-before"></div>
    <div class="tab-item-active-after"></div>
    <!-- item.children.length * 40 + 40 + 'px' -->
    <div
      class="tab-item-parent"
      :class="[
        activeBgIndex.includes(item.activeIndex) ? 'web-tab-active-color' : '',
        item.parentId !== 0 && !props.activeBgIndex.includes(item.activeIndex)
          ? 'web-tab-no-color'
          : '',
      ]"
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
    <div>
      <for-tab
        :sourceCode="data"
        :data="item.children"
        :activeIndex="props.activeIndex"
        :activeBgIndex="props.activeBgIndex"
      ></for-tab>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CreateIcon from '@/components/CreateIcon'
import ForTab from './forTab.vue'
import { MenuItemType } from '@/api/menu/menu'
import mitt from '@/utils/mitt'
const props = defineProps<{
  sourceCode: Array<MenuItemType>
  data: Array<MenuItemType>
  activeIndex: string
  activeBgIndex: Array<string>
}>()

const menuAutoHeight = data => {
  const activeIndex = data.activeIndex
  if (activeIndex === props.activeIndex) {
    //如果相等，就返回data.children.length * 40 + 40 + 'px'
    return data.children.length * 40 + 40 + 'px'
  } else {
    // 如果不相等就拿到源数据向下查找到切换到的tabIndex
    const indexArr = props.activeIndex?.replace('l-', '').split('-') || []
    let depthIndex = 0
    const length = activeIndexDepth(data, indexArr, depthIndex) + 1
    return length * 40 + 'px'
  }
}
// 计算菜单的高度
/**
 *
 * @param sourceCode 点击菜单的数据
 * @param indexArr 点击菜单在源书中的位置
 * @param depthIndex 循环的深度 / 进入到第几层的children
 */
function activeIndexDepth(sourceCode, indexArr, depthIndex = 0) {
  let length = 0
  if (sourceCode && sourceCode.children.length) {
    length += sourceCode.children.length
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
  let lengthArr = tabIndex.split('-')
  //必须是没有children 才可以触发
  if (!data.children.length) {
    //这里就说明是一个可以跳转的路由
    mitt.emit('changeRoute', data.path)
    let tabIndexCopy = tabIndex
    //这里的作用是把这个路由以上的所有tabindex收集
    for (let i = 0; i < lengthArr.length - 2; i++) {
      tabIndexCopy = tabIndexCopy.slice(0, tabIndexCopy.length - 2)
      arr.unshift(tabIndexCopy)
    }
    return arr
  }
  return props.activeBgIndex
}

//切换菜单  , 动效方面
const switchTab = (tabIndex: string, data) => {
  //这里是真正触发路由更新的地方
  mitt.emit('changeBgIndex', switchRoute(tabIndex, data))
  //点击选中的子菜单但是该菜单没有子菜单直接退出
  if (props.activeIndex === data.activeIndex && !data.children.length) return

  //判断点击的这个有没有子菜单
  if (tabIndex === props.activeIndex) {
    if (tabIndex.length > 3) {
      //这里就说明点击的不是顶级菜单，如果不是顶级菜单减去后边两个字符就可以了。
      mitt.emit('switchTab', tabIndex.slice(0, tabIndex.length - 2))
    } else {
      //是顶级菜单
      //本来打开着，但是再次点击就要关闭
      mitt.emit('switchTab', '0')
    }
  } else {
    //两次点击的不是同一个
    //如果点击的是一个有子菜单的子菜单，让它截取一下,关闭其展开状态
    if (
      props.activeIndex.slice(0, props.activeIndex.length - 2) === tabIndex &&
      data.children
    ) {
      mitt.emit('switchTab', tabIndex.slice(0, tabIndex.length - 2))
    } else {
      //说明要再次展开选择的菜单,解决点击展开子菜单其菜单overflow问题
      if (props.activeBgIndex.includes(tabIndex) && data.children) {
        const activeIndex = props.activeBgIndex.indexOf(tabIndex)
        mitt.emit('switchTab', props.activeBgIndex[activeIndex + 1])
      } else {
        mitt.emit('switchTab', tabIndex)
      }
    }
  }
}
</script>
<style lang="less">
@import './style/index.less';
</style>
