<template>
  <div style="padding:20px 0">
    <a-button type="primary" @click="showModal">新增出/入库单</a-button>
    <a-modal v-model:visible="visible" title="新增出/入库单" @ok="handleOk">
      <a-form ref="formRef" :model="dynamicValidateForm" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="出/入库单号" v-bind="validateInfos.no">
          <a-input v-model:value="modelRef.no" placeholder="请输入出/入库单号" />
        </a-form-item>
        <a-form-item 
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      :label="index === 0 ? '物料详情' : ' '"
      :name="['domains', index, 'value']"
      :rules="{
        required: true,
        message: '请输入物料详情',
        trigger: 'change',
      }"
    >
      <a-input
        v-model:value="domain.value"
        placeholder="格式：物料编号-库位编号-数量"
        style="width: 100%"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="dashed" style="float: right" @click="addDomain">
        <PlusOutlined />
        添加物料详情
      </a-button>
    </a-form-item>
        <a-form-item label="时间">
          <a-date-picker
            v-model:value="modelRef.date1"
            show-time
            type="date"
            placeholder="请选择出/入库时间"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="人员编号" v-bind="validateInfos.person">
          <a-input v-model:value="modelRef.person" placeholder="请输入操作人员编号" />
        </a-form-item>
        <a-form-item label="备注" v-bind="validateInfos.mark">
          <a-input v-model:value="modelRef.mark" placeholder="请输入备注" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click.prevent="onSubmit">创建</a-button>
          <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-input-search 
      v-model:value="searchvalue" 
      placeholder="请输入搜索关键词" 
      style="width: 200px ;float: right"
      @search="onsearch" 
    />
  </div>
  <a-table :columns="crkcolumns" :data-source="crkdata">
    <template #materialdetails="{ record }">
      <span>
        <a @click="showModal1">查看</a>
        <a-modal v-model:visible="visible1" title="物料清单" @ok="handleOk1">
          <a-table :columns="wlqdcolumns" :data-source="wlqddata"></a-table>
        </a-modal>
      </span>
    </template>
    <template #crkaction="{ record }">
      <span>
        <a>编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm v-if="crkdata.length" title="确认删除？" @confirm="onDelete(record.key)">
            <a>删除</a>
          </a-popconfirm>
      </span>
    </template>
  </a-table>
</template>
  
<script lang="ts">
import { SmileOutlined, DownOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, reactive, toRaw, UnwrapRef} from 'vue';
import { Form } from 'ant-design-vue';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';

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

const data = [
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

const wlqdcolumns = [
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
    title: '数量',
    dataIndex: 'Number',
    key: 'Number',
  },
];
const wlqddata = ref([
  {
    key: 'wlqd1',
    Material_No: 'wl0001',
    Location_No: 'kw001',
    Number: 800,
  },
  {
    key: 'wlqd2',
    Material_No: 'wl0222',
    Location_No: 'kw007',
    Number: 1234,
  },
]);

interface Domain {
  value: string;
  key: number;
}

const useForm = Form.useForm;
export default defineComponent({
  setup() {
    const searchvalue = ref<string>('');
    const onsearch = (searchValue: string) => {
      console.log('use value', searchValue);
      console.log('or use this.value', searchvalue.value);
    };

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

    const crkdata = ref(data);
    const onDelete = (key: string) => {
      crkdata.value = crkdata.value.filter(item => item.key !== key);
    };

    const modelRef = reactive({
      no: '',
      material: '',
      date1: undefined,
      person: '',
      mark: '',
    });
    const rulesRef = reactive({
      no: [
        {
          required: true,
          message: '请输入出/入库单号',
        },
      ],
      material: [
        {
          required: true,
          message: '请输入物料编号及对应库位编号',
        },
      ],
      date1: [
        {
          required: true,
          message: '请选择出/入库时间',
        },
      ],
      person: [
        {
          required: true,
          message: '请选择操作人员编号',
        },
      ],
      mark: [
        {
          required: false,
          message: '请输入备注',
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

    const formRef = ref();
    const dynamicValidateForm: UnwrapRef<{ domains: Domain[] }> = reactive({
      domains: [],
    });
    const submitForm = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', dynamicValidateForm.domains);
        })
        .catch((error: ValidateErrorEntity<any>) => {
          console.log('error', error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const removeDomain = (item: Domain) => {
      let index = dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.domains.splice(index, 1);
      }
    };
    const addDomain = () => {
      dynamicValidateForm.domains.push({
        value: '',
        key: Date.now(),
      });
    };

    return {
      crkdata,
      crkcolumns,
      wlqddata,
      wlqdcolumns,
      searchvalue,
      onsearch,
      visible,
      handleOk,
      showModal,
      visible1,
      handleOk1,
      showModal1,
      onDelete,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      validateInfos,
      resetFields,
      modelRef,
      onSubmit,
      formRef,
      dynamicValidateForm,
      submitForm,
      resetForm,
      removeDomain,
      addDomain,
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