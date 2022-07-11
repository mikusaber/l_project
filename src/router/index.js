import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes.js";
const whitePaths = ["login","404","forget"];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach((to, from, next) => {
  console.log(document.getElementById("scrollCon"))
  
  document.title = (to.meta && to.meta.title) || "数字藏品";
  // 判断有没有登录
  if (localStorage.getItem("Token") || whitePaths.includes(to.name)) {
    next();
  } else {
    router.push("login");
    // next();

  }
});
export default router;
