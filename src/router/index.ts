import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: ()=>import("../components/Layout.vue"),
        meta: {
            title: "Home",
        },
        children: [
            {
                path: "Market",
                name: "Market",
                component: ()=>import("../views/Market.vue"),
                meta: {
                    title: "Market",
                },
            },
            {
                path: "Purchase",
                name: "Purchase",
                component: ()=>import("../views/Purchase.vue"),
                meta: {
                    title: "Purchase",
                },
            },
            {
                path: "Schedule",
                name: "Schedule",
                component: ()=>import("../views/Schedule.vue"),
                meta: {
                    title: "Schedule",
                },
                children: [
                    {
                        path: "Maintain",
                        name: "Maintain",
                        component: ()=>import("../views/Schedule/Maintain.vue"),
                        meta: {
                            title: "Maintain",
                        },
                    },
                    {
                        path: "Mission",
                        name: "Mission",
                        component: ()=>import("../views/Schedule/Mission.vue"),
                        meta: {
                            title: "Mission",
                        },
                    },
                    {
                        path: "Order",
                        name: "Order",
                        component: ()=>import("../views/Schedule/Order.vue"),
                        meta: {
                            title: "Order",
                        },
                    },
                    {
                        path: "Material",
                        name: "Material",
                        component: ()=>import("../views/Schedule/Material.vue"),
                        meta: {
                            title: "Material",
                        },
                    },
                ],
            },
            {
                path: "Storage",
                name: "Storage",
                component: ()=>import("../views/Storage.vue"),
                meta: {
                    title: "Storage",
                },
            },
            {
                path: "Profile",
                name: "Profile",
                component: ()=>import("../views/Profile.vue"),
                meta: {
                    title: "Profile",
                },
            },
            {
                path: "/:catchAll(.*)",
                component: ()=>import("../views/NotFound.vue"),
                meta: {
                    title: "NotFound",
                },
            },
        ],
    },
    {
        path: "/Login",
        name: "Login",
        component: ()=>import("../views/Login.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router