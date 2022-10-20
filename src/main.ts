import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';//1.�������
import 'element-plus/dist/index.css';
import router from './router/index'
import STable from '@surely-vue/table';
import 'ant-design-vue/dist/antd.css';
import Vue from 'vue'

const app = createApp(App);

createApp(App).use(router).use(STable).use(ElementPlus).mount('#app');
