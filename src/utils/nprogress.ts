import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 100, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body', //指定进度条的父容器
})

export const start = () => {
  NProgress.start()
}
export const close = () => {
  NProgress.done()
}
