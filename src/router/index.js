import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login.vue";
import result from "@/views/result.vue";
import Register from "@/views/register.vue";
import Index from "@/views/Dashboard/index.vue";
import Rate from "@/views/Dashboard/rate.vue";
import Overview from "@/views/Dashboard/overview.vue";
import Users from "@/views/Dashboard/users.vue";
import Calculator from "@/views/Dashboard/calculator.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/result",
    name: "result",
    component: result,
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
      },
      {
        path: "calculator",
        name: "calculator",
        component: Calculator,
      },
      {
        path: "rate",
        name: "rate",
        component: Rate,
      },
      {
        path: "overview",
        name: "overview",
        component: Overview,
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
