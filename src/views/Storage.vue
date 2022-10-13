<template>
  <div style="text-align: center;" v-if="breadlist.length == 2">
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
  </div>
  <router-view v-else></router-view>
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
      msg: ref<string>("Vue + Vite"),
      count: ref(0),
      selectedKeys: ref<string[]>([]),
      breadlist: ref<string[]>([]),
    };
  },
  created() {
    this.getSelectedKeys();
    this.getBreadcrumb();
  },
  methods: {
    getSelectedKeys() {
      this.selectedKeys = [this.$route.path];
    },
    getBreadcrumb() {
      this.breadlist = [];
      this.$route.matched.forEach(item => {
        this.breadlist.push(item.meta.title as string);
      });
      console.log(this.breadlist);
    },
  },
  watch: {
    $route() {
      this.getBreadcrumb();
      this.getSelectedKeys();
    },
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
  