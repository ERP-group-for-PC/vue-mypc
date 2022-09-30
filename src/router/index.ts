import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: ()=>import("../components/Home.vue"),
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
        path: "/:catchAll(.*)",
        component: ()=>import("../components/NotFound.vue"),
    },
    {
        path: "/Template",
        name: "Template",
        component: ()=>import("../components/Template.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router