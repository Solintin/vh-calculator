import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login.vue";
import Client_Calculator from "@/views/calculator.vue";
import Register from "@/views/register.vue";
import Index from "@/views/Dashboard/index.vue";
import Rate from "@/views/Dashboard/rate.vue";
import Tariff from "@/views/Dashboard/tariff.vue";
import Overview from "@/views/Dashboard/overview.vue";
import Users from "@/views/Dashboard/users.vue";
import Calculator from "@/views/Dashboard/calculator.vue";
import store from "@/store";

const routeGuard = (to, from, next) => {
  const { userType } = store.getters.data;
  const { isLoggedIn } = store.getters.data;

  if (
    to.matched.some((record) => record.meta.requiresClientLogin) &&
    isLoggedIn
  ) {
    next();
  } else if (
    to.matched.some((record) => record.meta.requiresLogin) &&
    userType === "Admin" &&
    isLoggedIn
  ) {
    next();
  } else {
    next("/");
  }
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/calculator",
    name: "calculator-app",
    component: Client_Calculator,
    meta: {
      requiresClientLogin: true,
    },
    beforeEnter: routeGuard,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/admin",
    name: "admin",
    component: Index,
    children: [
      {
        path: "users",
        name: "users",
        component: Users,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "calculator",
        name: "calculator",
        component: Calculator,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "rate",
        name: "rate",
        component: Rate,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "tariff",
        name: "Tariff",
        component: Tariff,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "overview",
        name: "overview",
        component: Overview,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
    ],
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
