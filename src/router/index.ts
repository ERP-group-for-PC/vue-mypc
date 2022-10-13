import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../components/Layout.vue"),
        meta: {
            title: "Home",
        },
        children: [
            {
                path: "/HelloWorld",
                name: "HelloWorld",
                component: () => import("../components/HelloWorld.vue"),
                meta: {
                    title: "HelloWorld"
                },
            },
            {
                path: "/Table",
                name: "Table",
                component: () => import("../components/Table.vue"),
                meta: {
                    title: "Table",
                },
            },
            {
                path: "Market",
                name: "Market",
                component: () => import("../views/Market.vue"),
                meta: {
                    title: "Market",
                },
            },
            {
                path: "Purchase",
                name: "Purchase",
                component: () => import("../views/Purchase.vue"),
                meta: {
                    title: "Purchase",
                },
            },
            {
                path: "Schedule",
                name: "Schedule",
                component: () => import("../views/Schedule.vue"),
                meta: {
                    title: "Schedule",
                },
            },
            {
                path: "Storage",
                name: "Storage",
                component: () => import("../views/Storage.vue"),
                meta: {
                    title: "Storage",
                },
                children: [
                    {
                        path: "kc_jbxx",
                        name: "Base Information",
                        component: () => import("../views/kc_jbxx.vue"),
                        meta: {
                            title: "Base Information",
                        },
                    },
                    {
                        path: "kc_rk",
                        name: "Warehouse",
                        component: () => import("../views/kc_rk.vue"),
                        meta: {
                            title: "Warehouse",
                        },
                    },
                    {
                        path: "kc_ck",
                        name: "Ex-Warehouse",
                        component: () => import("../views/kc_ck.vue"),
                        meta: {
                            title: "Ex-Warehouse",
                        },
                    },
                    {
                        path: "kc_yd",
                        name: "Movement",
                        component: () => import("../views/kc_yd.vue"),
                        meta: {
                            title: "Movement",
                        },
                    },
                    {
                        path: "kc_pdtz",
                        name: "Check&Adjust",
                        component: () => import("../views/kc_pdtz.vue"),
                        meta: {
                            title: "Check&Adjust",
                        },
                    }
                ],
            },
            {
                path: "Profile",
                name: "Profile",
                component: () => import("../views/Profile.vue"),
                meta: {
                    title: "Profile",
                },
            },
            {
                path: "/:catchAll(.*)",
                component: () => import("../views/NotFound.vue"),
                meta: {
                    title: "NotFound",
                },
            },
        ],
    },
    {
        path: "/Login",
        name: "Login",
        component: () => import("../views/Login.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router