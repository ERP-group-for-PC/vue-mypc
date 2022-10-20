<template>
  <div style="padding:20px 0">
    <a-button type="primary">
      新增移库单
    </a-button>
  </div>
  <a-table :columns="ydcolumns" :data-source="yddata">
    <template #yddetails="{ record }">
      <span>
        <a @click="showModal1">查看</a>
        <a-modal v-model:visible="visible1" title="存储详情" @ok="handleOk1">
          <a-table :columns="ydqdcolumns" :data-source="ydqddata"></a-table>
        </a-modal>
      </span>
    </template>
    <template #ydaction="{ record }">
      <span>
        <a>编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm v-if="yddata.length" title="确认删除？" @confirm="onDelete(record.key)">
            <a>删除</a>
          </a-popconfirm>
      </span>
    </template>
  </a-table>
</template>

<script lang="ts">
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';

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
const data = [
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

const ydqdcolumns = [
  {
    title: '物料编号',
    dataIndex: 'Material_No',
    key: 'Material_No',
  },
  {
    title: '数量',
    dataIndex: 'Number',
    key: 'Number',
  },
  {
    title: '原始库位',
    dataIndex: 'Original_Location',
    key: 'Original_Location',
  },
  {
    title: '目标库位',
    dataIndex: 'Target_Location',
    key: 'Target_Location',
  },
];
const ydqddata = ref([
  {
    key: 'wlqd1',
    Material_No: 'wl0001',
    Number: 700,
    Original_Location:'kw065',
    Target_Location:'kw102',
  },
  {
    key: 'wlqd2',
    Material_No: 'wl0222',
    Number: 786,
    Original_Location:'kw001',
    Target_Location:'kw012',
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

    const yddata = ref(data);
      const onDelete = (key: string) => {
        yddata.value = yddata.value.filter(item => item.key !== key);
    };

    return {
      yddata,
      ydcolumns,
      visible,
      handleOk,
      showModal,
      ydqddata,
      ydqdcolumns,
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