import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'

createApp(App).use(router).mount('#app')
axios.defaults.baseURL = 'api'
