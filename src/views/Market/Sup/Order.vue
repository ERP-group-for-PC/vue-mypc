<template>
  <div>
    <a-space direction="horizon">
      <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
      <a-input-search 
      :style="{paddingLeft: '120vh',}" 
      v-model:value="searchValue" 
      placeholder="input search text" 
      enter-button
      @search="onSearch" />
    </a-space>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk" @cancel="handleCancel">
      <template #footer>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
      <a-alert v-if="imcomplete"
      message="You may forget to input some information, please check again!" 
      type="warning" 
      closable />
      <br />
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="订单编号">
              <a-input v-model:value="formState.Order_No" placeholder="Order_No(necessary)" />
          </a-form-item>
          <a-form-item label="客户代码">
              <a-input v-model:value="formState.Customer_No" placeholder="Customer_No(necessary)" />
          </a-form-item>
          <a-form-item label="订单时间">
              <a-input v-model:value="formState.Order_Time" placeholder="Order_Time" />
          </a-form-item>
          <a-form-item label="收货地址">
              <a-input v-model:value="formState.Shipto_Address" placeholder="Shipto_Address" />
          </a-form-item>
          <a-form-item label="发货地址">
              <a-input v-model:value="Shipping_Address" placeholder="Shipping_Address" />
          </a-form-item>

          <a-form-item label="Labels">
              <a-checkbox-group v-model:value="formState.tags[0]" :options="type" />
              <br />
              <br />
              <a-checkbox-group v-model:value="formState.tags[1]" :options="status" />
          </a-form-item>
      </a-form>
    </a-modal>
    <a-table v-if="data.length === 0" :style="{minHeight: '62vh'}">
      <a-empty :image="simpleImage" />
    </a-table>
    <a-table v-else :columns="columns" :data-source="data" :style="{minHeight: '53vh'}">


        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'Order_No'">
                <a>
                    {{ record.Order_No }}
                </a>
            </template>

            <template v-if="column.key === 'Customer_No'">
                <a>
                    {{ record.Customer_No }}
                </a>
            </template>

            <template v-if="column.key === 'Order_Time'">
                <a>
                    {{ record.Order_Time }}
                </a>
            </template>

            <template v-if="column.key === 'Shipto_Address'">
                <a>
                    {{ record.Shipto_Address }}
                </a>
            </template>

            <template v-if="column.key === 'Shipping_Address'">
                <a>
                    {{ record.Shipping_Address }}
                </a>
            </template>

            <template v-else-if="column.key === 'tags'">
                <span>
                    <a-tag v-for="tag in record.tags" :key="tag"
                           :color="tag === type[3] ? 'green' :tag === type[2] ? 'volcano' :tag === type[1] ? 'orange' : tag === type[0] ? 'green' : 'geekblue'">
                        {{ tag.toUpperCase() }}
                    </a-tag>
                </span>
            </template>

            <template v-else-if="column.key === 'action'">
                <span>
                    <a>Delete</a>
                    <a-divider type="vertical" />
                    <a class="ant-dropdown-link">
                        More actions
                        <down-outlined />
                    </a>
                </span>
            </template>
        </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { Empty } from 'ant-design-vue';
import { defineComponent, ref, toRaw, reactive } from 'vue';
import type { UnwrapRef } from 'vue';
import { ElNotification as notify } from 'element-plus'


 const type = ['供货', '退货', '异常状态','完成'];
 const tags = ['校核中', '发货中', '订单完成', '退货中', '退货完成',''];


const columns = [
  {
    title: '订单编号',
    dataIndex: 'Order_No',
    key: 'Order_No',
    },
    {
        title: 'Customer_No',
        dataIndex: 'Customer_No',
        key: 'Customer_No',
    },
    {
        title: 'Order_Time',
        dataIndex: 'Order_Time',
        key: 'Order_Time',
    },
    {
        title: '收货地址',
        dataIndex: 'Shipto_Address',
        key: 'Shipto_Address',
    },
  {
    title: '发货地址',
    dataIndex: 'Shipping_Address',
    key: 'Shipping_Address',
  },
  {
    title: '订单状态',
      dataIndex: 'tags',
      key: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

    const data = ref([
        {
            key: '1',
            Order_No: 'John Brown',
            Customer_No: 'BH-123',
            Order_Time:'2020-10-10',
            Shipto_Address: '理塘',
            Shipping_Address:'沈阳',
            tags: [type[3], tags[5],],
        },
    ]);

interface FormState {
  Order_No: string;
  Customer_No: string
  Order_Time:string
  Shipto_Address: string;
 Shipping_Address: string;
  tags: string[];
}

export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
  },
  setup() {
    const loading = ref<boolean>(false);
    const visible = ref<boolean>(false);
    const keyCount = ref<number>(data.value.length);
    const imcomplete = ref<boolean>(false);
    const formState: UnwrapRef<FormState> = reactive({
     Order_No: '',
     Customer_No:'',
     Order_Time:'',
     Shipto_Address: '',
     Shipping_Address:'',
      tags: [],
    });
    const searchValue = ref<string>();
    const onSubmit = () => {
      console.log('submit!', toRaw(formState));
      let newTags = [] as string[];
      console.log('tags!', formState.tags);
      for (let i = 0; i < formState.tags.length; i++) {
        console.log('tag!', formState.tags[i]);
        newTags.push(formState.tags[i][0]);
      }
      data.value.push({
        key: keyCount.value.toString(),
        Order_No: formState.Order_No,
        Order_Time: formState.Order_Time,
        Customer_No: formState.Customer_No,
        Shipto_Address: formState.Shipto_Address,
        Shipping_Address: formState.Shipping_Address,
        tags: newTags,
      });
      console.log(data);
    };
    return {
      data,
      columns,
      type,
      tags,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      visible,
      loading,
      keyCount,
      labelCol: { style: { width: '150px' } },
      wrapperCol: { span: 14 },
      formState,
      onSubmit,
      imcomplete,
      searchValue,
    };
  },
  methods: {
    handleAdd() {
      this.visible = true;
    },
    handleOk() {
      this.imcomplete = false;
      this.loading = true;
      if (!this.formState.Order_No || this.formState.tags.length === 0 || !this.formState.Shipto_Address) {
        this.imcomplete = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
        return;
      }
      setTimeout(() => {
        this.loading = false;
        this.visible = false;
      }, 2000);
      this.keyCount++;
      this.onSubmit();
      console.log(this.formState.tags);
    },
    handleCancel() {
      this.imcomplete = false;
      this.visible = false;
    },
    onSearch() {

    },
  },
});
</script>

<style lang="scss">
.warning {
  padding-bottom: 16px;
  color: red;
  font: {
    family: Times;
    weight: bold;
  }

  ;
}

;
</style>