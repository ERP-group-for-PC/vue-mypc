<template>
  <div style="text-align: center;" v-if="breadlist.length == 2">
    <h2>欢迎使用库存管理模块</h2>
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

</style>
  