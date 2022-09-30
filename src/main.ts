import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import 'ant-design-vue/dist/antd.css';

createApp(App).use(router).mount('#app')
