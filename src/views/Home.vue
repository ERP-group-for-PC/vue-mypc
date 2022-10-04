<template>
  <a-breadcrumb style="margin: 6px 0 16px">
    <a-breadcrumb-item>
      <router-link :to="{name: 'Home'}">Home</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
  <ul>
    <li>
      <router-link :to="{name: 'HelloWorld'}">HelloWorld</router-link>
    </li>
    <li>
      <router-link :to="{name: 'Table'}">Table</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
const selectedKeys = ref<string[]>(['0']);
export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
  },
  setup() {
    console.log(selectedKeys.value);
    return {
      selectedKeys,
    };
  },
});
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
