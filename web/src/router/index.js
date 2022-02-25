import { createRouter, createWebHistory } from "vue-router";
import UsersView from "../views/UsersView.vue";
import store from "@/store";

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
    },
  ],
});

/**
 * route guard thar checks if store.state.session.id is not empty
 * if it is empty, redirect to login page
 */

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
  if (!store.state.session.id && to.name !== "login") {
    return { name: "login" };
  }
});

export default router;
