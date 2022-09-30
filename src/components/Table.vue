<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <file-outlined />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 24px 24px">
        ERP System for Personal Computer
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>
            <router-link :to="{name: 'Home'}">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link :to="{name: 'Table'}">Table</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div>
          <a-table :columns="columns" :data-source="data">
            <template #headerCell="{ column }">
              <template v-if="column.key === 'name'">
                <span>
                  <smile-outlined />
                  Name
                </span>
              </template>
            </template>
        
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <a>
                  {{ record.name }}
                </a>
              </template>
              <template v-else-if="column.key === 'tags'">
                <span>
                  <a-tag
                    v-for="tag in record.tags"
                    :key="tag"
                    :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                  >
                    {{ tag.toUpperCase() }}
                  </a-tag>
                </span>
              </template>
              <template v-else-if="column.key === 'action'">
                <span>
                  <a>Invite 一 {{ record.name }}</a>
                  <a-divider type="vertical" />
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
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';

const columns = [
  {
      name: 'Name',
      dataIndex: 'name',
      key: 'name',
  },
  {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
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

const data = [
  {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
  },
  {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
  },
  {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
  },
];

export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    SmileOutlined,
    DownOutlined,
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
    };
  },
  setup() {
    return {
      data,
      columns,
    };
  },
});
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
  