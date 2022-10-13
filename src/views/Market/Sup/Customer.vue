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
        <a-form-item label="Customer Account">
          <a-input v-model:value="formState.account" placeholder="username(necessary)" />
        </a-form-item>
        <a-form-item label="Tel">
          <a-input v-model:value="formState.tel" placeholder="phone number(unnecessary)" />
        </a-form-item>
        <a-form-item label="Email">
          <a-input v-model:value="formState.email" placeholder="email address(unnecessary)" />
        </a-form-item>
        <a-form-item label="Address">
          <a-input v-model:value="formState.address" placeholder="address" />
        </a-form-item>
        <a-form-item label="Labels">
          <a-checkbox-group v-model:value="formState.tags[0]" :options="level" />
          <br />
          <br />
          <a-checkbox-group v-model:value="formState.tags[1]" :options="tags" />
          <br />
          <br />
          <a-checkbox-group v-model:value="formState.tags[2]" :options="career" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-table v-if="data.length === 0" :style="{minHeight: '62vh'}">
      <a-empty :image="simpleImage" />
    </a-table>
    <a-table v-else :columns="columns" :data-source="data" :style="{minHeight: '53vh'}">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'account'">
          <span>
            <smile-outlined />
            Account
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'account'">
          <a>
            {{ record.account }}
          </a>
        </template>
        <template v-else-if="column.key === 'contact'">
          <span v-if="record.contact.tel">
            {{ record.contact.tel }}
          </span>
          <br v-if="record.contact.tel" />
          <a v-if="record.contact.email">
            {{ record.contact.email }}
          </a>
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag v-for="tag in record.tags" :key="tag"
              :color="tag === level[2] ? 'volcano' : tag === level[1] ? 'orange' : tag === level[0] ? 'green' : 'geekblue'">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a>Invite 一 {{ record.account }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" />
            <a>一键开盒</a>
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

const level = ['nice', 'common', 'moderate'];
const tags = ['developer', 'business', 'government', 'artist', 'scientist', 'hacker'];
const career = ['student', 'teacher', 'salaryman'];

const columns = [
  {
    title: 'Account',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: 'Tel&Email',
    dataIndex: 'contact',
    key: 'contact',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

const data = ref([
  {
    key: '1',
    account: 'John Brown',
    contact: {
      tel: '183-0945-2932',
    },
    address: 'New York No. 1 Lake Park',
    tags: [level[1], 'developer', 'student'],
  },
  {
    key: '2',
    account: 'Jim Green',
    contact: {
      email: 'jim888@outxxx.com',
    },
    address: 'London No. 1 Lake Park',
    tags: ['moderate', 'business'],
  },
  {
    key: '3',
    account: 'Joe Black',
    contact: {
      tel: '180-3203-3311',
      email: 'joe_233@ducc.edu.us',
    },
    address: 'Sidney No. 1 Lake Park',
    tags: ['nice', 'teacher'],
  },
]);

interface FormState {
  account: string;
  tel: string;
  email: string;
  address: string;
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
      account: '',
      tel: '',
      email: '',
      address: '',
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
        account: formState.account,
        contact: {
          tel: formState.tel,
          email: formState.email,
        },
        address: formState.address,
        tags: newTags,
      });
      console.log(data);
    };
    return {
      data,
      columns,
      level,
      tags,
      career,
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
      if (!this.formState.account || this.formState.tags.length === 0 || !this.formState.address) {
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
  };
};
</style>