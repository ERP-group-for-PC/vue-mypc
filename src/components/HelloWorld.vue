<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <file-outlined />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 24px 24px">
        ERP System for Personal Computer
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>
            <router-link :to="{name: 'Home'}">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link :to="{name: 'HelloWorld'}">HelloWorld</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
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
            <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
              >create-vue</a
            >, the official Vue + Vite starter
          </p>
          <p>
            Install
            <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
            in your IDE for a better DX
          </p>
          <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
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
      selectedKeys: ref<string[]>(['1']),
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
