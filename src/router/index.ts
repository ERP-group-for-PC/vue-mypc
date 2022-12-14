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
                path: "Market",
                name: "Market",
                component: () => import("../views/Market.vue"),
                meta: {
                    title: "Market",
                },
                children: [
                    {
                        path: "Order",
                        name: "Order",
                        component: () => import("../views/Market/Sup/Order.vue"),
                        meta: {
                            title: "Order",
                        },
                    },
                    {
                        path: "Customer",
                        name: "Customer",
                        component: () => import("../views/Market/Sup/Customer.vue"),
                        meta: {
                            title: "Customer",
                        },
                    },
                    {
                        path: "Report",
                        name: "Report",
                        component: () => import("../views/Market/Sup/Report.vue"),
                        meta: {
                            title: "Report",
                        },
                    },
                    {
                        path: "Forecast",
                        name: "Forecast",
                        component: () => import("../views/Market/Sup/Forecast.vue"),
                        meta: {
                            title: "Forecast",
                        },
                    },
                ],
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
                        path: "kc_crk",
                        name: "(Ex-)Warehouse",
                        component: () => import("../views/kc_crk.vue"),
                        meta: {
                            title: "(Ex-)Warehouse",
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