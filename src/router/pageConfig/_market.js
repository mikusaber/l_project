// market
/*
 * @Author: xueyang xueyang_xyy@163.com
 * @Date: 2022-05-16 17:50:25
 * @LastEditors: Zhengzq zhengzq@zzjgtl.com
 * @LastEditTime: 2022-06-09 22:03:20
 * @FilePath: /Collection/src/router/pageConfig/_my.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const market = [
  {
    path: "/market",
    component: "market/index",
    name: "market",
    meta: {
      title: "市场",
      isShowBack: false,
      isShowIndex: false,
      hideHeader: true,
      keepAlive: true,
    },
  },
  {
    path: "/market/marketList",
    component: "market/marketList",
    name: "marketList",
    meta: {
      title: "藏品列表",
      isShowBack: true,
      isShowIndex: false,
    },
  },
  {
    path: "/market/marketList/marketDetail",
    component: "market/marketDetail",
    name: "marketDetail",
    meta: { title: "藏品详情", isShowBack: true, isShowIndex: false },
  },
  {
    path: "/payment",
    component: "payment/settlement",
    name: "payment",
    meta: { title: "支付", isShowBack: true, isShowIndex: false },
  },
];
export default market;
