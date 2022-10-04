<template>
    <a-layout class="site-layout">
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <div class="logo">
                <router-link :to="{name: 'Home'}" :style="{color: '#fff'}" @click.native="return2Home">
                    ERP for <br /> PC Manufacture
                </router-link>
            </div>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal"
                :style="{ lineHeight: '64px', outerWidth: '120px' }">
                <a-menu-item key="/Market">
                    <pie-chart-outlined />
                    <span>销售管理</span>
                    <router-link :to="{name: 'Market'}" />
                </a-menu-item>
                <a-menu-item key="/Purchase">
                    <desktop-outlined />
                    <span>采购管理</span>
                    <router-link :to="{name: 'Purchase'}" />
                </a-menu-item>
                <a-menu-item key="/Schedule">
                    <team-outlined />
                    <span>生产计划管理</span>
                    <router-link :to="{name: 'Schedule'}" />
                </a-menu-item>
                <a-menu-item key="/Storage">
                    <file-outlined />
                    <span>库存管理</span>
                    <router-link :to="{name: 'Storage'}" />
                </a-menu-item>
                <a-menu-item key="/Profile">
                    <user-outlined />
                    <span>人事管理</span>
                    <router-link :to="{name: 'Profile'}" />
                </a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout-content :style="{ padding: '0px', marginTop: '72px' }">
            <div :style="{padding: '0 32px 24px', minHeight: '85%' }">
                <router-view />
            </div>
            <hr />
            <a-layout-footer :style="{ textAlign: 'center' }">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout-content>
        <!-- <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>
            <router-link :to="{name: 'Home'}">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb v-if="$route.meta.module">
            <router-link :to="{name: '$route.meta.module'}">{{$route.meta.module}}</router-link>
          </a-breadcrumb>
          <a-breadcrumb-item>
            <router-link :to="{name: '$route.meta.title'}">{{$route.meta.title}}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <router-view />
        <hr />
        <a-layout-footer :style="{ textAlign: 'center' }">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout-content> -->
    </a-layout>
</template>
  
  <!-- <a-sub-menu key="sub1">
    <template #title>
      <span>
        <user-outlined />
        <span>User</span>
      </span>
    </template>
    <a-menu-item key="3">Tom</a-menu-item>
    <a-menu-item key="4">Bill</a-menu-item>
    <a-menu-item key="5">Alex</a-menu-item>
  </a-sub-menu> -->
  
<script lang="ts">
import { ComponentInternalInstance, defineComponent, getCurrentInstance, ref } from 'vue';
import { useRoute } from 'vue-router';

var selectedKeys = ref(['/']);

export default defineComponent({
    setup() {
        const route = useRoute();
        selectedKeys = ref([route.path])
        return {
            selectedKeys,
            msg: ref<string>("Vue + Vite"),
            count: ref(0),
        };
    },
    created() {
        const route = useRoute();
        console.log(route.path);
    },
    methods: {
        return2Home() {
            selectedKeys.value = ['/'];
        },
    },
});
</script>
  
<style lang="scss">
.site-layout {
    height: 100vh;
    overflow: scroll;

    .logo {
        width: 120px;
        height: 31px;
        line-height: 16px;
        color: #fff;

        font: {
            weight: bold;
            family: Times;
        }

        background: rgba(255, 255, 255, 0);
        margin: 16px 24px 16px 0;
        float: left;
    }

    .site-layout-background {
        background: #fff;
    }

    [data-theme='dark'] .site-layout-background {
        background: #141414;
    }
}
</style>