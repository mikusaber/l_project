/*
 * @Author: xueyang xueyang_xyy@163.com
 * @Date: 2022-05-16 17:50:25
 * @LastEditors: xueyang xueyang_xyy@163.com
 * @LastEditTime: 2022-05-16 21:57:19
 * @FilePath: /Collection/src/router/routes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { asyncRouteMap } from "./_import";
import my from "./pageConfig/_my.js";
import login from "./pageConfig/_login.js";
import home from "./pageConfig/_home.js";
import market from "./pageConfig/_market.js";
let routers = [...login, ...my, ...home, ...market];

asyncRouteMap(routers);

routers = routers = [
  ...routers,
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/404",
    component: () => import("../pages/404.vue"),
    name: "404",
    meta: { title: "404 - 页面未找到" },
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
];

export default routers;
