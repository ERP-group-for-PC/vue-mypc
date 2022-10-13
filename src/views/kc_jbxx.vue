<template>
  <div style="padding:20px 0">
    <a-button type="primary">
      新增库位
    </a-button>
  </div>
  <a-table :columns="kwcolumns" :data-source="kwdata">
    <template #kwdetails="{ record }">
      <span>
        <a>查看</a>
      </span>
    </template>
    <template #kwaction="{ record }">
      <span>
        <a>修改</a>
        <a-divider type="vertical" />
        <a>删除</a>
      </span>
    </template>
  </a-table>
  <a-table :columns="kccolumns" :data-source="kcdata">
    <template #kwsldetails="{ record }">
      <span>
        <a>查看</a>
      </span>
    </template>
  </a-table>
</template>

<script lang="ts">
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

const kwcolumns = [
  {
    title: '库位编号',
    dataIndex: 'Location_No',
    key: 'Location_No',
  },
  {
    title: '库位类型',
    dataIndex: 'Location_Type',
    key: 'Location_Type',
  },
  {
    title: '负责人编号',
    dataIndex: 'PIC_No',
    key: 'PIC_No',
  },
  {
    title: '容量',
    key: 'Capacity',
    dataIndex: 'Capacity',
  },
  {
    title: '存储详情',
    key: 'kwdetails',
    slots: { customRender: 'kwdetails' },
  },
  {
    title: '操作',
    key: 'kwaction',
    slots: { customRender: 'kwaction' },
  },
];

const kwdata = [
  {
    key: 'kw1',
    Location_No: 'kw01',
    Location_Type: '原料仓',
    PIC_No: 'kc001',
    Capacity: '7777m³'
  },
  {
    key: 'kw2',
    Location_No: 'kw02',
    Location_Type: '成品仓',
    PIC_No: 'kc002',
    Capacity: '1000m³'
  },
  {
    key: 'kw3',
    Location_No: 'kw03',
    Location_Type: '零件仓',
    PIC_No: 'kc003',
    Capacity: '3000m³'
  },
];

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

const kcdata = [
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
];

export default defineComponent({
  setup() {
    return {
      kwdata,
      kwcolumns,
      kcdata,
      kccolumns,
    };
  },
  components: {
    SmileOutlined,
    DownOutlined
  },
});
</script>

<style>

</style>