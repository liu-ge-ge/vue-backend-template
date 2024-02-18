import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslint from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
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
      viteMockServe({
        mockPath: './src/mock',
        localEnabled: !isBuild,
      }),
    ],
    build: {
      target: 'chrome63',
      chunkSizeWarningLimit: 2000,
    },
    server: {
      open: true,
      port: 8080,
    },
  }
})
