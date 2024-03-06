import { defineStore } from 'pinia'
import { ThemeState } from '../types/theme'
import { message } from 'ant-design-vue'

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    //是否折叠菜单栏
    collapse: true,
    // 主题工具栏
    isSidebar: false,
    //主题颜色
    themeColor: '#0baed2',
    //是否是暗黑主题
    isDark: false,
  }),
  actions: {
    changeDarkOrLightMode() {
      return new Promise<string>((resolve, reject) => {
        try {
          const isLight = document.body.className === 'light-variable'
          if (isLight) {
            document.body.className = 'dark-variable'
          } else {
            document.body.className = 'light-variable'
          }
          message.success(`已切换为${isLight ? '暗黑' : '明亮'}模式!`)
          resolve(`已切换为${isLight ? '暗黑' : '明亮'}模式!`)
        } catch (error) {
          message.error('切换失败!')
          reject(error)
        }
      })
    },
    //切换主题色
    changeThemeColor(color: string) {
      return new Promise<string>((resolve, reject) => {
        try {
          document
            .getElementsByTagName('body')[0]
            .style.setProperty('--theme-color', color)
          this.themeColor = color
          message.success('切换主题色成功!')
          resolve('切换主题色成功!')
        } catch (error) {
          message.error('切换主题色失败!')
          reject(error)
        }
      })
    },
  },
})
