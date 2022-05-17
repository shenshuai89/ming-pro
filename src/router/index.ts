import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/views/Layout.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: "/", component: () =>import("@/views/Home.vue") },
      { path: "/temp", component: () =>import("@/components/home.vue") },
    ],
  },
];

const router = createRouter({ routes, history: createWebHistory() });
export default router;
