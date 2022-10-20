<template>
  <div>
    <a-space direction="horizon">
      <a-button 
        class="editable-add-btn" 
        style="margin-bottom: 8px" 
        @click="handleAdd('addCusModal')"
      >
        Add
      </a-button>
      <a-input-search 
        :style="{paddingLeft: '120vh',}" 
        v-model:value="searchValue" 
        placeholder="input search text"
        enter-button @search="onSearch" 
      />
    </a-space>
    <a-modal 
      v-model:visible="visible.addCusModal" 
      title="Basic Modal" 
      @ok="handleOk('addCusModal')" 
      @cancel="handleCancel('addCusModal')"
    >
      <template #footer>
        <a-button 
          key="back" 
          @click="handleCancel('addCusModal')"
        >
          Return
        </a-button>
        <a-button 
          key="submit" type="primary" 
          :loading="loading" 
          @click="handleOk('addCusModal')"
        >
          Submit
        </a-button>
      </template>
      <a-alert 
        v-if="imcomplete" 
        message="You may forget to input some information, please check again!" 
        type="warning"
        closable 
      />
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
          <a v-if="formState.account" @click="showDrawer('showAddDrawer', formState.account)">Edit Address</a>
          <span v-else>Edit Address</span>
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
        <template v-else-if="column.key === 'address'">
          <a @click="showDrawer('showAddDrawer', record.account)">Show Address</a>
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
            <a-divider type="vertical" />
            <a @click="deleteCustomer">Delete</a>
            <a-divider type="vertical" />
            <a>一键开盒</a>
            <a-divider type="vertical" />
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                <span>
                  More actions
                  <DownOutlined />
                </span>
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0">
                    <a target="_blank" rel="noopener noreferrer" @click="relatedOrders">
                      查看关联订单
                    </a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a target="_blank" rel="noopener noreferrer" @click="showHistory">
                      查看购买统计
                    </a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </span>
        </template>
      </template>
    </a-table>
    <a-drawer
      v-model:visible="visible.showAddDrawer"
      class="custom-class"
      :title="showedAccount"
      placement="right"
      @after-visible-change="afterVisibleChange"
    >
      <a-list
        :loading="initLoading"
        item-layout="horizontal"
        :data-source="list"
        size="default"
        :style="{ color: 'red', textAlign: 'left' }"
      >
        <template #loadMore>
          <div
            v-if="!initLoading && !loading"
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
          >
            <a-button @click="onLoadMore">loading more</a-button>
          </div>
        </template>
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <a key="list-loadmore-edit">edit</a>
              <a key="list-loadmore-more">delete</a>
            </template>
            <a-skeleton avatar :title="false" :loading="!!item.listLoading" active>
              <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
                <template #title>
                  <a href="https://www.antdv.com/">{{ item.address }}</a>
                </template>
              </a-list-item-meta>
            </a-skeleton>
          </a-list-item>
        </template>
      </a-list>
      <div :style="{ textAlign: 'center' }">
        <a-button 
          size="large" 
          shape="circle" 
          :style="{ textAlign: 'center', background: '#fff', marginTop: '12px' }"
        >
          <template #icon>
            <plus-outlined :style="{ color: 'aqua' }" />
          </template>
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { SmileOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { Empty } from 'ant-design-vue';
import { defineComponent, ref, toRaw, reactive } from 'vue';
import { UnwrapRef, onMounted, nextTick } from 'vue';
import axios from 'axios'
import { AxiosResponse } from 'axios'
import path from 'path'
import { get } from '../../../api/api'

const level = ['nice', 'common', 'moderate'];
const tags = ['developer', 'business', 'government', 'artist', 'scientist', 'hacker'];
const career = ['student', 'teacher', 'salaryman'];
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

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

interface FormState {
  account: string;
  tel: string;
  email: string;
  tags: string[];
};

interface ListData {
  account: string;
  contact: {
    tel: string;
    email: string;
  };
  tags: string[];
};

interface Visible {
  [key: string]: boolean;
};

var showedAccount = ref<string>();

export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
    PlusOutlined,
  },
  setup() {
    const data = ref<ListData[]>([]);
    const assignData = (res: AxiosResponse) => {
      for (var i = 0; i < res.data.data.length; ++i) {
        var le;
        var le_rate = res.data.data[i]['level'];
        if (le_rate > 0.7) {
          le = level[0];
        }
        else if (le_rate > 0.5) {
          le = level[1];
        }
        else {
          le = level[2];
        }
        var tags = [le];
        if (res.data.data[i]['career']) {
          tags.push(res.data.data[i]['career']);
        }
        if (res.data.data[i]['tags']) {
          tags.push(res.data.data[i]['tags']);
        }
        data.value.push({
          account: res.data.data[i]['account'],
          contact: {
            tel: res.data.data[i]['tel'],
            email: res.data.data[i]['email'],
          },
          tags: tags,
        });
      }
      console.log(data.value);
    }
    const dataGet = () => {
      get("http://localhost:3001", {}, assignData);
    };
    dataGet();
    const loading = ref<boolean>(false);
    const visible: UnwrapRef<Visible> = reactive({
      addCusModal: false,
      showAddDrawer: false,
      addAddModal: false,
    });
    const keyCount = ref<number>(data.value.length);
    const imcomplete = ref<boolean>(false);
    const formState: UnwrapRef<FormState> = reactive({
      account: '',
      tel: '',
      email: '',
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
        account: formState.account,
        contact: {
          tel: formState.tel,
          email: formState.email,
        },
        tags: newTags,
      });
      console.log(data);
    };
    const afterVisibleChange = (bool: boolean) => {
      console.log('visible', bool);
    };

    const initLoading = ref(true);
    const listLoading = ref(false);
    const address = ref([]);
    const list = ref([]);

    onMounted(() => {
      fetch(fakeDataUrl)
        .then(res => res.json())
        .then(res => {
          initLoading.value = false;
          address.value = res.results;
          list.value = res.results;
        });
    });

    const onLoadMore = () => {
      listLoading.value = true;
      list.value = address.value.concat(
        [...new Array(count)].map(() => ({ listLoading: true, address: '' })),
      );
      fetch(fakeDataUrl)
        .then(res => res.json())
        .then(res => {
          const newData = address.value.concat(res.results);
          listLoading.value = false;
          address.value = newData;
          list.value = newData;
          nextTick(() => {
            // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
            // In real scene, you can using public method of react-virtualized:
            // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
            window.dispatchEvent(new Event('resize'));
          });
        });
    };

    return {
      data,
      dataGet,
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
      afterVisibleChange,
      imcomplete,
      searchValue,
      showedAccount,
      listLoading,
      initLoading,
      address,
      list,
      onLoadMore,
    };
  },
  methods: {
    handleAdd(winTags: string) {
      this.visible[winTags] = true;
      console.log(winTags, this.visible[winTags]);
    },
    showDrawer(winTags: string, account: string) {
      this.visible[winTags] = true;
      showedAccount.value = account;
      console.log(this.visible[winTags]);
    },
    handleOk(winTags: string) {
      this.imcomplete = false;
      this.loading = true;
      if (!this.formState.account || this.formState.tags.length === 0) {
        this.imcomplete = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
        return;
      }
      setTimeout(() => {
        this.loading = false;
        this.visible[winTags] = false;
      }, 2000);
      this.keyCount++;
      this.onSubmit();
      console.log(this.formState.tags);
    },
    handleCancel(winTags: string) {
      this.imcomplete = false;
      this.formState.account = '';
      this.formState.email = '';
      this.formState.tel = '';
      this.formState.tags = [];
      this.visible[winTags] = false;
    },
    onSearch() {

    },
    deleteCustomer() {

    },
    relatedOrders() {

    },
    showHistory() {

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