const home = [
  {
    path: "/home",
    component: "index",
    name: "home",
    meta: {
      title: "首页",
      isShowBack: false,
      isShowIndex: false,
      hideHeader: true,
    },
  },
  {
    path: "/collection",
    component: "collection",
    name: "collection",
    meta: {
      title: "藏品",
      isShowBack: false,
      isShowIndex: false,
      hideHeader: true,
      keepAlive: true,
    },
  },
  {
    path: "/notice",
    component: "notice/notice",
    name: "notice",
    meta: { title: "消息详情", isShowIndex: false },
  },
  {
    path: "/notice-list",
    component: "notice/notice-list",
    name: "notice-list",
    meta: { title: "消息列表", isShowIndex: false },
  },
  {
    path:"/consignment",
    component: "consignment/index",
    name: "consignment",
    meta: { title: "藏品详情", isShowIndex: false },
  }
];
export default home;
