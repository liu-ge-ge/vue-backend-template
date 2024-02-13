import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslint from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          math: 'always',
          additionalData: `@import "${resolve(__dirname, './src/styles/theme-color.less')}";`,
        },
      },
    },
    plugins: [
      vue(),
      eslint(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    build: {
      target: 'chrome63',
      chunkSizeWarningLimit: 2000,
    },
  }
})
