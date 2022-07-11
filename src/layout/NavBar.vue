<!--
 * @Author: xueyang xueyang_xyy@163.com
 * @Date: 2022-05-09 15:11:04
 * @LastEditors: Zhengzq zhengzq@zzjgtl.com
 * @LastEditTime: 2022-06-23 15:03:24
 * @FilePath: /space-system/src/layout/NavBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <van-nav-bar
    v-if="state.meta && !state.meta.hideHeader"
    :class="{navBar:state.meta.fullHeight}"
    border
    fixed
    placeholder
    :title="state.meta.title"
    left-text=""
    left-arrow
    @click-left="onClickLeft"
    @click-right="handleIndex"
  >
    <template #left>
      <div v-if="state.meta.isShowBack !== false" class="leftBack">
        <img v-if="!state.meta.fullHeight" src="@/assets/common/left.png" alt="" />
        <img v-else src="@/assets/common/left-white.png" alt="" />
      </div>
    </template>
    <template #right>
      <div v-if="state.meta.isShowIndex !== false" class="rightIndex">首页</div>
    </template>
  </van-nav-bar>
</template>

<script setup>
import { reactive, toRaw, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
const state = reactive({
  meta: {},
});
watch(
  () => router.currentRoute.value,
  (val) => {
    let { meta } = val;
    state.meta = meta;
  },
  { immediate: true, deep: true }
);
onMounted(() => {
  console.log(state.meta);
});
const onClickLeft = () => {
  console.log(history);
  history.back();
};
const handleIndex = () => {
  router.push({
    path: "/home",
  });
};
</script>

<style lang="scss" scoped>
.navBar {
  ::v-deep .van-nav-bar {
    background: transparent;
    color: #fff;
    &::after {
      display: none;
    }
  }
  ::v-deep .van-nav-bar__content {
    background: transparent;
  }
  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}
.leftBack {
  padding: 0 8px;
  width: 24px;
  // height: 24px;
  > img {
    width: 100%;
    height: 100%;
  }
}
.rightIndex {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
</style>
