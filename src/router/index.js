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
    path: "/menu",
    name: "Menu",
    component: () => import("../views/three/components/menu/index.vue"),
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/three/components/main/index.vue"),
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
      {
        path: "/drag",
        name: "Drag",
        component: () => import("../views/drag/index.vue"),
      },
      {
        path: "/video",
        name: "Video",
        component: () => import("../views/video/index.vue"),
      },
      {
        path: "/swiper",
        name: "Swiper",
        component: () => import("../views/swiper/index.vue"),
      },
      {
        path: "/news",
        name: "News",
        component: () => import("../views/news/index.vue"),
      },
      {
        path: "/three",
        name: "Three",
        component: () => import("../views/three/index.vue"),
      },
      {
        path: "/select",
        name: "Select",
        component: () => import("../views/select/index.vue"),
      },
      {
        path: "/zdes",
        name: "Zdes",
        component: () => import("../views/zdes/index.vue"),
      },
      {
        path: "/textToVoice",
        name: "textToVoice",
        component: () => import("../views/textToVoice/index.vue"),
      },
      {
        path: "/textToVoice/wordToAudio",
        name: "WordToAudio",
        component: () =>
          import("../views/textToVoice/components/WordToAudio.vue"),
      },
      {
        path: "/textToVoice/wordToAudioV2",
        name: "WordToAudioV2",
        component: () =>
          import("../views/textToVoice/components/WordToAudioV2.vue"),
      },
      {
        path: "/textToVoice/audioToWord",
        name: "AudioToWord",
        component: () =>
          import("../views/textToVoice/components/AudioToWord.vue"),
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
