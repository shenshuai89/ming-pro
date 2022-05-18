import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/components/container/index.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: "/", component: () => import("@/views/Home.vue") },
      {
        path: "/chooseIcon",
        component: () => import("@/views/chooseIcon.vue"),
      },
      {
        path: "/chooseArea",
        component: () => import("@/views/chooseArea.vue"),
      },
      {
        path: "/notification",
        component: () => import("@/views/notification.vue"),
      },
    ],
  },
];

const router = createRouter({ routes, history: createWebHistory() });
export default router;
