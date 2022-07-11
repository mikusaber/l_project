<template>
  <div class="notice_detail">
    <van-skeleton title :row="8" :loading="state.loading">
      <p class="title">{{ state.noticeInfo.Title }}</p>
      <p class="time">{{ state.noticeInfo.PubTimeStr }}</p>
      <div class="rich-content" v-html="state.noticeInfo.Memo"></div>
    </van-skeleton>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { GetNoticeList } from "@/httpAction/index";
const route = useRoute();
const state = reactive({
  noticeId: route?.query.id || "",
  noticeInfo: null,
  loading: true,
});
onMounted(() => {
  getInfo();
});

const getInfo = async () => {
  try {
    let params = {
      action: "GetNoticeInfo",
      Id: state.noticeId,
    };
    const res = await GetNoticeList(params);
    state.noticeInfo = res.data;
    setTimeout(() => {
      state.loading = false;
    }, 300);
  } catch (e) {
    console.log(e);
  }
};
</script>

<style lang="scss" scoped>
.notice_detail {
  box-sizing: border-box;
  padding: 16px;
  min-height: 100%;
  background-color: #fff;
  .title {
    font-size: 18px;
  }
  .time {
    margin-top: 8px;
    font-size: 14px;
    color: var(--van-text-color-2);
  }
}
</style>
