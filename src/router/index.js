import { createRouter, createWebHistory } from "vue-router";
import EarthView from "../views/EarthView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/earth",
      name: "EarthView",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/EarthView.vue"),
    },
  ],
});

export default router;
