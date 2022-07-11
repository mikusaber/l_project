<template>
  <div class="notice_list">
    <div
      v-for="i in state.list"
      class="notice_item"
      @click="reviewNotice(i.Id)"
    >
      <div class="left">
        <van-icon name="volume" />
      </div>
      <div class="right">
        <p class="tit">{{ i.Title }}</p>
        <p class="time">{{ i.PubTimeStr }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GetNoticeList } from "@/httpAction/index";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const state = reactive({
  list: [],
  pages: {
    pageNo: 1,
    pageSize: 10,
  },
  total: 0,
});
onMounted(() => {
  getNotice();
});
const getNotice = async () => {
  try {
    let params = {
      action: "GetNoticeList",
      ...state.pages,
    };
    const res = await GetNoticeList(params);
    if (res.code == 0) {
      state.list = res.data;
    }
  } catch (e) {
    console.log(e);
  }
};
const reviewNotice = (id) => {
  let row = { path: "/notice", query: { id } };
  router.push(row);
};
</script>

<style lang="scss" scoped>
.notice_list {
  box-sizing: border-box;
  padding: 16px;
  min-height: 100%;
  background-color: #fff;
  .notice_item {
    display: flex;
    padding: 16px 0;
    border-bottom: 1px solid var(--van-gray-2);
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      border-bottom: none;
    }
    .left {
      align-self: start;
      flex-shrink: 0;
      // font-size: 18px;
      color: var(--van-primary-color);
    }
    .right {
      padding-left: 12px;
      font-size: 17px;
      .tit {
        margin-bottom: 8px;
      }
      .time {
        font-size: 14px;
        color: var(--van-text-color-2);
      }
    }
  }
}
</style>
