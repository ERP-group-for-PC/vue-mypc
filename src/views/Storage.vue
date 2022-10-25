<template>
  <div style="text-align: center;" v-if="breadlist.length == 2">
    <a-table :columns="kccolumns" :data-source="kcdata">
    <template #kwsldetails="{ record }">
      <span>
        <a>查看</a>
      </span>
    </template>
  </a-table>
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
  LaptopOutlined,
  SmileOutlined,
  DownOutlined
} from '@ant-design/icons-vue';
import { defineComponent, ref, reactive, toRaw, UnwrapRef } from 'vue';
import axios from 'axios';

const kccolumns = [
  {
    title: '物料编号',
    dataIndex: 'Material_No',
    key: 'Material_No',
  },
  {
    title: '总数量',
    dataIndex: 'Total_Number',
    key: 'Total_Number',
  },
  {
    title: '库位-数量详情',
    key: 'kwsldetails',
    slots: { customRender: 'kwsldetails' },
  },
];

const kcdata = ref();
/*const kcdata = [
  {
    key: 'wl1',
    Material_No: 'wl001',
    Total_Number: '600',
  },
  {
    key: 'wl2',
    Material_No: 'wl002',
    Total_Number: '56789',
  },
  {
    key: 'wl3',
    Material_No: 'wl003',
    Total_Number: '10000',
  },
];*/

export default defineComponent({
  setup() {
    const kclistsDt = () => {
      axios.get("http://18.136.53.197:9000/get")
        .then(res => {
          // console.log(res)
          kcdata.value = res.data
        })
    }
    kclistsDt()
  return{
    kclistsDt,
      kcdata,
      kccolumns,
    };
  },

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
  