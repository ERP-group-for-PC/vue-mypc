<template>
  <div style="padding:20px 0">
    <a-button type="primary" @click="showModal">新增库位</a-button>
    <a-modal v-model:visible="visible" title="新增库位" @ok="handleOk">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="库位编号" v-bind="validateInfos.no">
          <a-input v-model:value="modelRef.no" placeholder="请输入库位编号" />
        </a-form-item>
        <a-form-item label="库位类型" v-bind="validateInfos.type">
          <a-select v-model:value="modelRef.type" placeholder="请选择库位类型">
            <a-select-option value="原料仓">原料仓</a-select-option>
            <a-select-option value="成品仓">成品仓</a-select-option>
            <a-select-option value="零件仓">零件仓</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="负责人编号" v-bind="validateInfos.person">
          <a-input v-model:value="modelRef.person" placeholder="请输入负责人编号" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click.prevent="onSubmit">创建</a-button>
          <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
  <a-table :columns="kwcolumns" :data-source="kwdata" bordered>
    <template #kwdetails="{ look }">
      <span>
        <a @click="showModal1">查看</a>
        <a-modal v-model:visible="visible1" title="存储详情" @ok="handleOk1">
          <a-table :columns="ccxqcolumns" :data-source="ccxqdata"></a-table>
        </a-modal>
      </span>
    </template>
    <template #kwaction="{ record }">
      <div>
        <span>
          <a @click="showModal2">编辑</a>
          <a-modal v-model:visible="visible2" title="修改库位信息" @ok="handleOk2">
            <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-item label="库位编号" v-bind="validateInfos.no">
                <a-input v-model:value="modelRef.no" placeholder="请输入库位编号" />
              </a-form-item>
              <a-form-item label="库位类型" v-bind="validateInfos.type">
                <a-select v-model:value="modelRef.type" placeholder="请选择库位类型">
                  <a-select-option value="原料仓">原料仓</a-select-option>
                  <a-select-option value="成品仓">成品仓</a-select-option>
                  <a-select-option value="零件仓">零件仓</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="负责人编号" v-bind="validateInfos.person">
                <a-input v-model:value="modelRef.person" placeholder="请输入负责人编号" />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click.prevent="onSubmit">修改</a-button>
                <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
               </a-form-item>
            </a-form>
          </a-modal>
        </span>
        <a-divider type="vertical" />
        <a-popconfirm v-if="kwdata.length" title="确认删除？" @confirm="onDelete(record.key)">
          <a>删除</a>
        </a-popconfirm>
      </div>
    </template>
  </a-table>
</template>

<script lang="ts">
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, reactive, toRaw, UnwrapRef } from 'vue';
import { Form } from 'ant-design-vue';
import axios from 'axios';
import { cloneDeep } from 'lodash-es';

const kwcolumns = [
  {
    title: '库位编号',
    dataIndex: 'Location_No',
    key: 'Location_No',
    width: '15%',
    slots: { customRender: 'change_Location_No' },
  },
  {
    title: '库位类型',
    dataIndex: 'Location_Type',
    key: 'Location_Type',
    width: '15%',
    slots: { customRender: 'change_Location_Type' },
  },
  {
    title: '负责人编号',
    dataIndex: 'PIC_No',
    key: 'PIC_No',
    width: '15%',
    slots: { customRender: 'change_PIC_No' },
  },
  {
    title: '容量',
    key: 'Capacity',
    dataIndex: 'Capacity',
    width: '15%',
    slots: { customRender: 'change_Capacity' },
  },
  {
    title: '存储详情',
    key: 'kwdetails',
    width: '15%',
    slots: { customRender: 'kwdetails' },
  },
  {
    title: '操作',
    key: 'kwaction',
    width: '15%',
    slots: { customRender: 'kwaction' },
  },
];

interface DataItem {
  key: string,
  Location_No: string,
  Location_Type: string,
  PIC_No: string,
  Capacity: string
}
const data: DataItem[] = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i.toString(),
    Location_No: `Edrward ${i}`,
    Location_Type: 'string',
    PIC_No: `London Park no. ${i}`,
    Capacity: '2'
  });
}
/*const kwdata = ref([
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
]);*/

const ccxqcolumns = [
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
];
const ccxqdata = ref([
  {
    key: 'wlqd1',
    Material_No: 'wl0001',
    Number: 800,
  },
  {
    key: 'wlqd2',
    Material_No: 'wl0222',
    Number: 1234,
  },
]);

const useForm = Form.useForm;
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
    const visible2 = ref<boolean>(false);
    const showModal2 = () => {
      visible2.value = true;
    };
    const handleOk2 = (e: MouseEvent) => {
      console.log(e);
      visible2.value = false;
    };

    const modelRef = reactive({
      no: '',
      type: [],
      person: '',
    });
    const rulesRef = reactive({
      no: [
        {
          required: true,
          message: '请输入库位编号',
        },
      ],
      type: [
        {
          required: true,
          message: '请选择库位类型',
        },
      ],
      person: [
        {
          required: true,
          message: '请选择负责人编号',
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
    const onSubmit = () => {
      validate()
        .then(() => {
          console.log(toRaw(modelRef));
        })
        .catch(err => {
          console.log('error', err);
        });
    };

    const kwdata = ref(data);
    const onDelete = (key: string) => {
      kwdata.value = kwdata.value.filter(item => item.key !== key);
    };
    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
    const edit = (key: string) => {
      editableData[key] = cloneDeep(kwdata.value.filter(item => key === item.key)[0]);
    };
    const save = (key: string) => {
      Object.assign(kwdata.value.filter(item => key === item.key)[0], editableData[key]);
      delete editableData[key];
    };
    const cancel = (key: string) => {
      delete editableData[key];
    };
    return {
      kwdata,
      kwcolumns,
      onDelete,
      editableData,
      edit,
      save,
      cancel,
      visible,
      handleOk,
      showModal,
      ccxqdata,
      ccxqcolumns,
      visible1,
      handleOk1,
      showModal1,
      visible2,
      handleOk2,
      showModal2,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      validateInfos,
      resetFields,
      modelRef,
      onSubmit,
    };
  },
  components: {
    SmileOutlined,
    DownOutlined
  },

});
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>