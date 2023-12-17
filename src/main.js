import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import router from "./router";
import axios from "axios";
import store from "./store";
import "./mock/mock";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  const tokenStr = JSON.parse(window.sessionStorage.getItem("token"));
  if (!tokenStr) {
    alert("请先登录账号再访问");
    return next("/login");
  }
  next();
});

new Vue({
  render: (h) => h(App),
  router,
  axios,
  store,
}).$mount("#app");
