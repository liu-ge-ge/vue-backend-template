import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'
import './styles/theme-color.less'
import pinia from './store'
const app = createApp(App)
app.use(pinia)
app.mount('#app')
