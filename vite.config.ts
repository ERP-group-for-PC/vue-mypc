import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from "@rollup/plugin-alias";
import Components from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import path from 'path'

let devServer = {
  host: 'localhost',  // 本地主机
  port: 5000,  // 端口号的配置
  open: true,  // 自动打开浏览器
  proxy: {
    '/api': {   //  拦截以 /api 开头的接口
      target: 'http://40.00.100.100:3002',//设置你调用的接口域名和端口号 别忘了加http
      changeOrigin: true,    //这里true表示实现跨域
      secure: false, // 如果是https接口，需要配置这个参数
      pathRewrite: {
        '^/api': '/',  //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/api/user/add'，直接写‘/api/user/add’即可
      },
    },
  }
}

function pathResolve(dir: string) {
  return path.resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    alias(),
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/api': path.resolve(__dirname, './src/api'),
      '@/assets': path.resolve(__dirname, './src/assets'),
      '@/components': path.resolve(__dirname, './src/components'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve("src/assets/css/base.less")}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
})
