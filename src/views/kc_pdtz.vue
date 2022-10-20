<template>
    <div style="padding:20px 0">
      <a-button type="primary">
        新增盘点单
      </a-button>
    </div>
    <a-table :columns="pdcolumns" :data-source="pddata">
      <template #pddetails="{ record }">
        <span>
          <a @click="showModal1">查看</a>
        <a-modal v-model:visible="visible1" title="存储详情" @ok="handleOk1">
          <a-table :columns="pdqdcolumns" :data-source="pdqddata"></a-table>
        </a-modal>
        </span>
      </template>
      <template #pdaction="{ record }">
        <span>
          <a>编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm v-if="pddata.length" title="确认删除？" @confirm="onDelete(record.key)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </template>
    </a-table>
  </template>
  
  <script lang="ts">
  import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref } from 'vue';
  
  const pdcolumns = [
    {
      title: '盘点单号',
      dataIndex: 'Inventory_Number',
      key: 'Inventory_Number',
    },
    {
      title: '盘点清单',
      key: 'pddetails',
      slots: { customRender: 'pddetails' },
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
      key: 'pdaction',
      slots: { customRender: 'pdaction' },
    },
  ];
  const data = [
    {
      key: 'pdd1',
      Inventory_Number: 'PD0001',
      Date: '2022.01.23',
      Personnel_No: 'kc013',
      Remarks: '无'
    },
    {
      key: 'pdd2',
      Inventory_Number: 'PD0022',
      Date: '2022.10.10',
      Personnel_No: 'kc009',
      Remarks: '无'
    },
    {
      key: 'pdd3',
      Inventory_Number: 'PD0111',
      Date: '2021.07.18',
      Personnel_No: 'kc060',
      Remarks: '部分损坏'
    },
  ];

  const pdqdcolumns = [
  {
    title: '物料编号',
    dataIndex: 'Material_No',
    key: 'Material_No',
  },
  {
    title: '库位编号',
    dataIndex: 'Location_No',
    key: 'Location_No',
  },
  {
    title: '差额',
    dataIndex: 'Difference',
    key: 'Difference',
  },
];
const pdqddata = ref([
  {
    key: 'wlqd1',
    Material_No: 'wl0001',
    Location_No: 'kw152',
    Difference: 8,
  },
  {
    key: 'wlqd2',
    Material_No: 'wl0222',
    Location_No: 'kw021',
    Difference: 666,
  },
]);
  
  export default defineComponent({
    setup() {
      const visible = ref<boolean>(false);
      const showModal = () => {
        visible.value = true;
      };
      const handleOk = (e: MouseEvent) => {
        console.log(e);
        visible.value = false;
      };
      const visible1 = ref<boolean>(false);
      const showModal1 = () => {
        visible1.value = true;
      };
      const handleOk1 = (e: MouseEvent) => {
        console.log(e);
        visible1.value = false;
      };

      const pddata = ref(data);
      const onDelete = (key: string) => {
        pddata.value = pddata.value.filter(item => item.key !== key);
    };

      return {
        pddata,
        pdcolumns,
        visible,
        handleOk,
        showModal,
        pdqddata,
        pdqdcolumns,
        visible1,
        handleOk1,
        showModal1,
        onDelete,
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