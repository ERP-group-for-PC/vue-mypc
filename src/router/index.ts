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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                        path: "Order",
                        name: "Order",
                        component: ()=>import("../views/Market/Sup/Order.vue"),
                        meta: {
                            title: "Order",
                        },
                    },
                    {
                        path: "Customer",
                        name: "Customer",
                        component: ()=>import("../views/Market/Sup/Customer.vue"),
                        meta: {
                            title: "Customer",
                        },
                    },
                    {
                        path: "Report",
                        name: "Report",
                        component: ()=>import("../views/Market/Sup/Report.vue"),
                        meta: {
                            title: "Report",
                        },
                    },
                    {
                        path: "Forecast",
                        name: "Forecast",
                        component: ()=>import("../views/Market/Sup/Forecast.vue"),
                        meta: {
                            title: "Forecast",
=======
                        path: "Dingdan",
                        name: "Dingdan",
                        component: ()=>import("../views/Market/Dingdan.vue"),
                        meta: {
                            title: "Dingdan",
>>>>>>> 2022/10/06 mjd market commit
=======
                        path: "Order",
                        name: "Order",
                        component: ()=>import("../views/Market/Sup/Order.vue"),
=======
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
>>>>>>> ea3d7044625949165ca2149c232ca8f7dc47d8dc
                        meta: {
                            title: "Report",
                        },
                    },
                    {
<<<<<<< HEAD
                        path: "Customer",
                        name: "Customer",
                        component: ()=>import("../views/Market/Sup/Customer.vue"),
                        meta: {
                            title: "Customer",
                        },
                    },
                    {
                        path: "Report",
                        name: "Report",
                        component: ()=>import("../views/Market/Sup/Report.vue"),
                        meta: {
                            title: "Report",
                        },
                    },
                    {
                        path: "Forecast",
                        name: "Forecast",
                        component: ()=>import("../views/Market/Sup/Forecast.vue"),
                        meta: {
                            title: "Forecast",
>>>>>>> 2022/10/11 mjd commit
=======
                        path: "Forecast",
                        name: "Forecast",
                        component: () => import("../views/Market/Sup/Forecast.vue"),
                        meta: {
                            title: "Forecast",
>>>>>>> ea3d7044625949165ca2149c232ca8f7dc47d8dc
                        },
                    },
                ],
            },
            {
                path: "Purchase",
                name: "Purchase",
<<<<<<< HEAD
                component: ()=>import("../views/Purchase.vue"),
=======
                component: () => import("../views/Purchase.vue"),
>>>>>>> ea3d7044625949165ca2149c232ca8f7dc47d8dc
                meta: {
                    title: "Purchase",
                },
            },
            {
                path: "Schedule",
                name: "Schedule",
<<<<<<< HEAD
                component: ()=>import("../views/Schedule.vue"),
=======
                component: () => import("../views/Schedule.vue"),
>>>>>>> ea3d7044625949165ca2149c232ca8f7dc47d8dc
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