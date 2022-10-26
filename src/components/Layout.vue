<template>
    <a-layout class="site-layout">
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '105%' }">
            <div class="logo">
                <router-link :to="{name: 'Home'}" :style="{color: '#fff'}">
                    ERP for <br /> PC Manufacture
                </router-link>
            </div>
            <a-row type="flex">
                <a-col :span="20">
                    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal"
                        :style="{ lineHeight: '64px', outerWidth: '120px' }">
                        <a-sub-menu key="Market">
                            <template #title>
                                <router-link v-if="breadlist[1] === 'Market'" :to="{name: 'Market'}">
                                    <pie-chart-outlined />
                                    <span>销售管理</span>
                                </router-link>
                                <router-link v-else :to="{name: 'Market'}" :style="{color: '#fff'}">
                                    <pie-chart-outlined />
                                    <span>销售管理</span>
                                </router-link>
                            </template>
                            <a-menu-item key="Order">
                                <router-link :to="{name: 'Order'}">
                                    订单管理
                                </router-link>
                            </a-menu-item>
                            <a-menu-item key="Customer">
                                <router-link :to="{name: 'Customer'}">
                                    客户管理
                                </router-link>
                            </a-menu-item>
                            <a-menu-item key="Report">
                                <router-link :to="{name: 'Report'}">
                                    销售报表
                                </router-link>
                            </a-menu-item>
                            <a-menu-item key="Forecast">
                                <router-link :to="{name: 'Forecast'}">
                                    销售预测
                                </router-link>
                            </a-menu-item>
                        </a-sub-menu>
                        <a-sub-menu key="Purchase">
                            <template #title>
                                <router-link v-if="breadlist[1] === 'Purchase'" :to="{name: 'Purchase'}">
                                    <desktop-outlined />
                                    <span>采购管理</span>
                                </router-link>
                                <router-link v-else :to="{name: 'Purchase'}" :style="{color: '#fff'}">
                                    <desktop-outlined />
                                    <span>采购管理</span>
                                </router-link>
                            </template>
                            <a-menu-item key="3">Tom</a-menu-item>
                            <a-menu-item key="4">Bill</a-menu-item>
                            <a-menu-item key="5">Alex</a-menu-item>
                        </a-sub-menu>
                        <a-sub-menu key="Schedule">
                            <template #title>
                                <router-link v-if="breadlist[1] === 'Schedule'" :to="{name: 'Schedule'}">
                                    <desktop-outlined />
                                    <span>生产计划管理</span>
                                </router-link>
                                <router-link v-else :to="{name: 'Schedule'}" :style="{color: '#fff'}">
                                    <desktop-outlined />
                                    <span>生产计划管理</span>
                                </router-link>
                            </template>
                            <a-menu-item key="Maintain">Maintain</a-menu-item>
                            <a-menu-item key="Order">Order</a-menu-item>
                            <a-menu-item key="Material">Material</a-menu-item>
                        </a-sub-menu>
                        <a-sub-menu key="Storage">
                            <template #title>
                                <router-link v-if="breadlist[1] === 'Storage'" :to="{name: 'Storage'}">
                                    <desktop-outlined />
                                    <span>库存管理</span>
                                </router-link>
                                <router-link v-else :to="{name: 'Storage'}" :style="{color: '#fff'}">
                                    <desktop-outlined />
                                    <span>库存管理</span>
                                </router-link>
                            </template>
                            <a-menu-item key="3">Tom</a-menu-item>
                            <a-menu-item key="4">Bill</a-menu-item>
                            <a-menu-item key="5">Alex</a-menu-item>
                        </a-sub-menu>
                        <a-sub-menu key="Profile">
                            <template #title>
                                <router-link v-if="breadlist[1] === 'Profile'" :to="{name: 'Profile'}">
                                    <desktop-outlined />
                                    <span>人事管理</span>
                                </router-link>
                                <router-link v-else :to="{name: 'Profile'}" :style="{color: '#fff'}">
                                    <desktop-outlined />
                                    <span>人事管理</span>
                                </router-link>
                            </template>
                            <a-menu-item key="3">Tom</a-menu-item>
                            <a-menu-item key="4">Bill</a-menu-item>
                            <a-menu-item key="5">Alex</a-menu-item>
                        </a-sub-menu>
                    </a-menu>
                </a-col>
                <a-col :span="4">
                    <a-dropdown>
                        <router-link :to="{name: 'Login'}" class="logo user">
                            <robot-filled />
                            账户
                        </router-link>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <a href="javascript:;">消息</a>
                                </a-menu-item>
                                <hr />
                                <a-menu-item>
                                    <a href="javascript:;">个人主页</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a href="javascript:;">切换账号</a>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content :style="{ padding: '72px'}">
            <div :style="{padding: '0 32px 24px', minHeight: '85%' }">
                <a-breadcrumb style="margin: 6px 0 16px" v-if="breadlist[1] != 'NotFound'">
                    <a-breadcrumb-item v-if="breadlist" v-for="crumb in breadlist">
                        <router-link :to="{name: crumb}">{{crumb}}</router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>
                <Home v-if="breadlist.length == 1"></Home>
                <router-view v-else />
            </div>
            <hr />
            <a-layout-footer :style="{ textAlign: 'center' }">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout-content>
    </a-layout>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
    UserOutlined,
    SmileFilled,
    FileOutlined,
    PieChartOutlined,
    DesktopOutlined,
    TeamOutlined,
    RobotFilled
} from '@ant-design/icons-vue';
import Home from '../views/Home.vue'

export default defineComponent({
    components: {
        Home,
        UserOutlined,
        SmileFilled,
        FileOutlined,
        PieChartOutlined,
        DesktopOutlined,
        TeamOutlined,
        RobotFilled,
    },
    setup() {
        return {
            msg: ref<string>("Vue + Vite"),
            count: ref(0),
        };
    },
    data() {
        return {
            selectedKeys: ref<string[]>([]),
            breadlist: ref<string[]>([]),
        };
    },
    created() {
        this.getSelectedKeys();
        this.getBreadcrumb();
    },
    methods: {
        getSelectedKeys() {
            this.selectedKeys = [this.$route.meta.title as string];
            console.log(this.$route.meta.title)
            console.log('selectedKeys: ', this.selectedKeys)
        },
        getBreadcrumb() {
            this.breadlist = [];
            this.$route.matched.forEach(item => {
                this.breadlist.push(item.meta.title as string);
            });
            console.log(this.breadlist);
        },
    },
    watch: {
        $route() {
            this.getBreadcrumb();
            this.getSelectedKeys();
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

    .user {
        width: 140px;
        height: 45px;
        margin: 24px 24px;
        color: rgb(154, 158, 159);
    }

    .site-layout-background {
        background: #fff;
    }

    [data-theme='dark'] .site-layout-background {
        background: #141414;
    }
}
</style>