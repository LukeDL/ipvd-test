import { createRouter, createWebHistory } from "vue-router";
import UsersView from "../views/UsersView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: UsersView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    }
  ],
});



// router.beforeEach((to, from, next) => {})

export default router;
