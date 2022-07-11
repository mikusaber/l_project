/*
 * @Author: xueyang xueyang_xyy@163.com
 * @Date: 2022-05-16 17:50:25
 * @LastEditors: Zhengzq zhengzq@zzjgtl.com
 * @LastEditTime: 2022-06-22 21:38:47
 * @FilePath: /Collection/src/router/pageConfig/_my.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const my = [
  {
    path: "/my",
    component: "my/index",
    name: "my",
    meta: {
      title: "我的",
      isShowBack: true,
      isShowIndex: false,
      hideHeader: true,
    },
  },
  {
    path: "/my/RealView",
    component: "my/RealView",
    name: "RealView",
    meta: { title: "实名认证", isShowBack: true, isShowIndex: false },
  },
  {
    path: "/my/card",
    component: "my/card",
    name: "card",
    meta: { title: "我的银行卡", isShowBack: true, isShowIndex: false },
  },
  {
    path: "/my/card/cardAdd",
    component: "my/cardAdd",
    name: "cardAdd",
    meta: { title: "添加银行卡", isShowBack: true, isShowIndex: false },
  },
  {
    path: "/my/balance",
    component: "my/balance",
    name: "balance",
    meta: { title: "账户余额", isShowBack: true, isShowIndex: false },
  },
  {
    path: "/my/MyBalance",
    component: "my/MyBalance",
    name: "MyBalance",
    meta: {
      title: "我的钱包",
      isShowBack: true,
      isShowIndex: false,
      fullHeight: true,
    },
  },
  {
    path: "/my/BalanceInfo",
    component: "my/BalanceInfo",
    name: "BalanceInfo",
    meta: {
      title: "钱包详情",
      isShowBack: true,
      isShowIndex: false,
    },
  },
  {
    path: "/my/BankCardList",
    component: "my/BankCardList",
    name: "BankCardList",
    meta: {
      title: "银行卡列表",
      isShowBack: true,
      isShowIndex: false,
    },
  },
  {
    path: "/my/Recharge",
    component: "my/Recharge",
    name: "Recharge",
    meta: {
      title: "充值",
      isShowBack: true,
      isShowIndex: false,
    },
  },
];
export default my;
