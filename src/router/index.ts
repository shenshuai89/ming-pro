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
      {
        path: "/menu",
        component: () => import("@/views/menu.vue"),
      },
      {
        path: "/time",
        component: () => import("@/views/chooseTime.vue"),
      },
      {
        path: "/city",
        component: () => import("@/views/chooseCity.vue"),
      },
      {
        path: "/form",
        component: () => import("@/views/form.vue"),
      },
      {
        path: "/table",
        component: () => import("@/views/table.vue"),
      },
      {
        path: "/modalForm",
        component: () => import("@/views/modalForm.vue"),
      },
      {
        path: "/calendar",
        component: () => import("@/views/calendar.vue"),
      },
      {
        path: "/progress",
        component: () => import("@/views/progress.vue"),
      },
    ],
  },
];

const router = createRouter({ routes, history: createWebHistory() });
export default router;
