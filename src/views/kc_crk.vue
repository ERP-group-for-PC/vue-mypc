<template>
    <div style="padding:20px 0">
      <a-button type="primary">
        新增出/入库单
      </a-button>
      <a-input-search
      v-model:value="value"
      placeholder="input search text"
      style="width: 200px ;float: right"
      @search="onSearch"
    />
    </div>
    <a-table :columns="crkcolumns" :data-source="crkdata">
      <template #materialdetails="{ record }">
        <span>
          <a>查看</a>
        </span>
      </template>
      <template #crkaction="{ record }">
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
  
  const crkcolumns = [
    {
      title: '出/入库单号',
      dataIndex: 'OutorIn_No',
      key: 'OutorIn_No',
    },
    {
      title: '物料清单',
      key: 'materialdetails',
      slots: { customRender: 'materialdetails' },
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
      key: 'crkaction',
      slots: { customRender: 'crkaction' },
    },
  ];
  
  const crkdata = [
    {
      key: 'crkd1',
      OutorIn_No: 'POC0001',
      Date: '2022.10.13',
      Personnel_No: 'kc003',
      Remarks: '无'
    },
    {
      key: 'crkd2',
      OutorIn_No: 'MOR0105',
      Date: '2021.12.07',
      Personnel_No: 'kc019',
      Remarks: '无'
    },
    {
      key: 'crkd3',
      OutorIn_No: 'COC0018',
      Date: '2022.05.26',
      Personnel_No: 'kc006',
      Remarks: '无'
    },
  ];
  
  export default defineComponent({
    setup() {
      return {
        crkdata,
        crkcolumns,
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