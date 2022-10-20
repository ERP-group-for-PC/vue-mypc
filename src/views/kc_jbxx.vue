<template>
  <div style="padding:20px 0">
    <a-button type="primary" @click="showModal">新增库位</a-button>
    <a-modal v-model:visible="visible" title="新增库位" @ok="handleOk">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="库位编号" v-bind="validateInfos.name">
          <a-input v-model:value="modelRef.name" placeholder="请输入库位编号" />
        </a-form-item>
        <a-form-item label="库位类型" v-bind="validateInfos.region">
          <a-select v-model:value="modelRef.region" placeholder="请选择库位类型">
            <a-select-option value="原料仓">原料仓</a-select-option>
            <a-select-option value="成品仓">成品仓</a-select-option>
            <a-select-option value="零件仓">零件仓</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="负责人编号" v-bind="validateInfos.type">
          <a-select v-model:value="modelRef.type" placeholder="请选择负责人编号">
            <a-select-option value="kc001">kc001</a-select-option>
            <a-select-option value="kc002">kc002</a-select-option>
            <a-select-option value="kc003">kc003</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click.prevent="onSubmit">创建</a-button>
          <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
  <a-table :columns="kwcolumns" :data-source="kwdata" bordered>
    <template v-for="col in ['change_Location_No', 'change_Location_Type', 'change_PIC_No', 'change_Capacity']"
      #[col]="{ text, record }" :key="col">
      <div>
        <a-input 
        v-if="editableData[record.key]" 
        v-model:value="editableData[record.key][col]" 
        style="margin: -5px 0" 
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template #kwdetails="{ look }">
      <span>
        <a>查看</a>
      </span>
    </template>
    <template #kwaction="{ record }">
      <span>
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a @click="save(record.key)">保存</a>
            <a-popconfirm title="取消此次编辑？" @confirm="cancel(record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">编辑</a>
          </span>
          <a-divider type="vertical" />
          <a-popconfirm v-if="kwdata.length" title="确认删除？" @confirm="onDelete(record.key)">
            <a>删除</a>
          </a-popconfirm>
        </div>
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

const useForm = Form.useForm;
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

    const visible = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };
    const modelRef = reactive({
      name: '',
      region: undefined,
      type: [],
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: '请输入库位编号',
        },
      ],
      region: [
        {
          required: true,
          message: '请选择库位类型',
        },
      ],
      type: [
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
      kclistsDt,
      kcdata,
      kccolumns,
      visible,
      handleOk,
      showModal,
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