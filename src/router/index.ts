import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        component: ()=>import("../components/Layout.vue"),
        children: [
            {
                path: "",
                name: "Home",
                component: ()=>import("../views/Home.vue"),
            },
            {
                path: "/HelloWorld",
                name: "HelloWorld",
                component: ()=>import("../components/HelloWorld.vue"),
            },
            {
                path: "/Table",
                name: "Table",
                component: ()=>import("../components/Table.vue"),
            },
            {
                path: "Market",
                name: "Market",
                component: ()=>import("../views/Market.vue")
            },
            {
                path: "Purchase",
                name: "Purchase",
                component: ()=>import("../views/Purchase.vue")
            },
            {
                path: "Schedule",
                name: "Schedule",
                component: ()=>import("../views/Schedule.vue")
            },
            {
                path: "Storage",
                name: "Storage",
                component: ()=>import("../views/Storage.vue")
            },
            {
                path: "Profile",
                name: "Profile",
                component: ()=>import("../views/Profile.vue")
            },
            {
                path: "/:catchAll(.*)",
                component: ()=>import("../views/NotFound.vue"),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router