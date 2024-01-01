import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/frame",
    name: "Frame",
    component: () => import("../components/Frame.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/notice",
        name: "Notice",
        component: () => import("../views/notice/Notice.vue"),
        redirect: "/notice/UnRead",
        children: [
          {
            path: "/notice/unRead",
            name: "UnRead",
            component: () => import("../views/notice/UnRead.vue"),
          },
          {
            path: "/notice/read",
            name: "Read",
            component: () => import("../views/notice/Read.vue"),
          },
        ],
      },
      {
        path: "/manage/admin",
        name: "Admin",
        component: () => import("../views/manage/Admin.vue"),
      },
      {
        path: "/manage/employees",
        name: "Employees",
        component: () => import("../views/manage/Employees.vue"),
      },
      {
        path: "/personal",
        name: "Personal",
        component: () => import("../views/Personal.vue"),
      },
      {
        path: "/map",
        name: "Map",
        component: () => import("../views/map/index.vue"),
      },
      {
        path: "/testRef",
        name: "TestRef",
        component: () => import("../views/testRef/index.vue"),
      },
      {
        path: "/attrs",
        name: "Attrs",
        component: () => import("../views/$attrs/index.vue"),
      },
      {
        path: "/eltree",
        name: "Eltree",
        component: () => import("../views/eltree/index.vue"),
      },
      {
        path: "/lottery",
        name: "Lottery",
        component: () => import("../views/choujiang/index.vue"),
      },
      {
        path: "/editor",
        name: "Editor",
        component: () => import("../views/editor/index.vue"),
      },
      {
        path: "/tab",
        name: "Tab",
        component: () => import("../views/table/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

export default router;
