import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'
import './styles/theme-color.less'
import './styles/default.less'
import './styles/fun.less'
import pinia from './store'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
