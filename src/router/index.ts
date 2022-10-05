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
                path: "/HelloWorld",
                name: "HelloWorld",
                component: ()=>import("../components/HelloWorld.vue"),
                meta: {
                    title: "HelloWorld"
                },
            },
            {
                path: "/Table",
                name: "Table",
                component: ()=>import("../components/Table.vue"),
                meta: {
                    title: "Table",
                },
            },
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