<template>
  <div style="padding:20px 0">
    <a-button type="primary" @click="showModal">新增盘点单</a-button>
    <a-modal v-model:visible="visible" title="新增盘点单" @ok="handleOk">
      <a-form ref="formRef" :model="dynamicValidateForm" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="盘点单号" v-bind="validateInfos.no">
          <a-input v-model:value="modelRef.no" placeholder="请输入盘点单号" />
        </a-form-item>
        <a-form-item 
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      :label="index === 0 ? '盘点清单' : ' '"
      :name="['domains', index, 'value']"
      :rules="{
        required: true,
        message: '请输入调整详情',
        trigger: 'change',
      }"
    >
      <a-input
        v-model:value="domain.value"
        placeholder="格式：物料编号-库位编号-±差额"
        style="width: 100%"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="dashed" style="float: right" @click="addDomain">
        <PlusOutlined />
        添加调整详情
      </a-button>
    </a-form-item>
        <a-form-item label="时间">
          <a-date-picker
            v-model:value="modelRef.date1"
            show-time
            type="date"
            placeholder="请选择盘点时间"
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
  <a-table :columns="pdcolumns" :data-source="pddata">
    <template #pddetails="{ record }">
      <span>
        <a @click="showModal1">查看</a>
      <a-modal v-model:visible="visible1" title="盘点清单" @ok="handleOk1">
        <a-table :columns="pdqdcolumns" :data-source="pdqddata"></a-table>
      </a-modal>
      </span>
    </template>
    <template #pdaction="{ record }">
      <span>
        <a @click="showModal2">编辑</a>
        <a-modal v-model:visible="visible2" title="修改盘点单" @ok="handleOk2">
      <a-form ref="formRef" :model="dynamicValidateForm" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="盘点单号" v-bind="validateInfos.no">
          <a-input v-model:value="modelRef.no" placeholder="请输入盘点单号" />
        </a-form-item>
        <a-form-item 
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      :label="index === 0 ? '盘点清单' : ' '"
      :name="['domains', index, 'value']"
      :rules="{
        required: true,
        message: '请输入调整详情',
        trigger: 'change',
      }"
    >
      <a-input
        v-model:value="domain.value"
        placeholder="格式：物料编号-库位编号-±差额"
        style="width: 100%"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="dashed" style="float: right" @click="addDomain">
        <PlusOutlined />
        添加调整详情
      </a-button>
    </a-form-item>
        <a-form-item label="时间">
          <a-date-picker
            v-model:value="modelRef.date1"
            show-time
            type="date"
            placeholder="请选择盘点时间"
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
          <a-button type="primary" @click.prevent="onSubmit">修改</a-button>
          <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
        <a-divider type="vertical" />
        <a-popconfirm v-if="pddata.length" title="确认删除？" @confirm="onDelete(record.key)">
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
    const visible2 = ref<boolean>(false);
    const showModal2 = () => {
      visible2.value = true;
    };
    const handleOk2 = (e: MouseEvent) => {
      console.log(e);
      visible2.value = false;
    };

    const pddata = ref(data);
    const onDelete = (key: string) => {
      pddata.value = pddata.value.filter(item => item.key !== key);
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
          message: '请输入盘点单号',
        },
      ],
      material: [
        {
          required: true,
          message: '请输入物料编号、对应库位编号及数量',
        },
      ],
      date1: [
        {
          required: true,
          message: '请选择调整时间',
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
      visible2,
      handleOk2,
      showModal2,
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
      searchvalue,
      onsearch,
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