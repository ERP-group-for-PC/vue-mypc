<template>
  <div style="text-align: center;">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo vite" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <h1>{{ msg }}</h1>

    <div class="card">
      <button type="button" @click="count++">count is {{ count }}</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>

    <p>
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
      starter
    </p>
    <p>
      Install
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
      in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>
  
<script lang="ts">
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  LaptopOutlined
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';

const count = ref(0);

export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    LaptopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['3']),
      msg: ref<string>("Vue + Vite"),
      count: ref(0),
    };
  },
});
</script>
  
<style>
#components-layout-demo-side .logo {
  height: 128px;
  width: 128px;
  margin: 32px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.read-the-docs {
  color: #888;
}

.logo.vite {
  height: 12em;
  padding: 1.5em;
  will-change: filter;
}

.logo.vue {
  height: 12em;
  padding: 1.5em;
  will-change: filter;
}

.logo.vite:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
</style>
  