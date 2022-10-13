<template>
    <div style="padding:20px 0">
      <a-button type="primary">
        新增移库单
      </a-button>
    </div>
    <a-table :columns="ydcolumns" :data-source="yddata">
      <template #yddetails="{ record }">
        <span>
          <a>查看</a>
        </span>
      </template>
      <template #ydaction="{ record }">
        <span>
          <a>修改</a>
          <a-divider type="vertical" />
          <a>删除</a>
        </span>
      </template>
    </a-table>
  </template>
  
  <script lang="ts">
  import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
  import { defineComponent } from 'vue';
  
  const ydcolumns = [
    {
      title: '移库单号',
      dataIndex: 'Transfer_No',
      key: 'Transfer_No',
    },
    {
      title: '移动清单',
      key: 'yddetails',
      slots: { customRender: 'yddetails' },
    },
    {
      title: '日期',
      dataIndex: 'Date',
      key: 'Date',
    },
    {
      title: '人员编号',
      dataIndex: 'Personnel_No',
      key: 'Personnel_No',
    },
    {
      title: '备注',
      dataIndex: 'Remarks',
      key: 'Remarks',
    },
    {
      title: '操作',
      key: 'ydaction',
      slots: { customRender: 'ydaction' },
    },
  ];
  
  const yddata = [
    {
      key: 'ykd1',
      Transfer_No: 'YK0002',
      Date: '2022.06.20',
      Personnel_No: 'kc030',
      Remarks: '无'
    },
    {
      key: 'ykd2',
      Transfer_No: 'YK0056',
      Date: '2022.01.25',
      Personnel_No: 'kc029',
      Remarks: '无'
    },
    {
      key: 'ykd3',
      Transfer_No: 'YK0100',
      Date: '2021.12.16',
      Personnel_No: 'kc007',
      Remarks: '无'
    },
  ];
  
  export default defineComponent({
    setup() {
      return {
        yddata,
        ydcolumns,
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