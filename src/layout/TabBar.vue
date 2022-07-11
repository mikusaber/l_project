<template>
  <div v-if="state.isShow">
    <van-tabbar v-model="state.active">
      <van-tabbar-item name="home" icon="wap-home" @click="to('home')"
        >首页</van-tabbar-item
      >
      <van-tabbar-item name="market" icon="shopping-cart" @click="to('market')"
        >市场</van-tabbar-item
      >
      <van-tabbar-item
        name="collection"
        icon="gem"
        @click="to('collection')"
        >藏品</van-tabbar-item
      >
      <van-tabbar-item name="my" icon="manager" @click="to('my')"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, watch, reactive, onMounted } from "vue";
import router from "@/router";
let state = reactive({
  active: "home",
  isShow: false,
  meta: {},
});
const whitePaths = ["home", "market", "collection", "my"];
watch(
  () => router.currentRoute.value,
  (val) => {
    state.isShow = whitePaths.includes(val.name);
    state.meta = val.meta;
    if (whitePaths.includes(val.name)) {
      state.isShow = true;
      state.active = val.name;
    }
    CheckContent();
  },
  { immediate: true, deep: true }
);
onMounted(() => {
  CheckContent();
});
function CheckContent() {
  console.log(state.isShow);
  let ele = document.getElementsByClassName("content")[0];

  if (!state.isShow) {
    if (ele) ele.style.height = `calc(100vh - 46px)`;
    console.log("Tab栏取消", ele);
  }
  if (state.meta.hideHeader) {
    if (ele) ele.style.height = `calc(100vh - 46px)`;
  }
}
const to = (name) => {
  router.push({
    name: name,
  });
};
</script>

<style lang="scss" scoped></style>
