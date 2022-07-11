<template>
  <van-pull-refresh style="min-height:100%" v-model="state.loading" @refresh="getInfo">
    <div v-if="state.userInfo" class="balance">
      <div class="head-card">
        <img class="head-user" src="@/assets/my/wallet.webp" alt="" />
        <p class="title">总余额(CNY)</p>
        <div class="price">
          <div class="left">￥{{ state.userInfo.AvailableAmount }}</div>
          <div class="right">
            <!-- <van-button type="success" round>充值</van-button> -->
            <span>充值</span>
            <span>提现</span>
          </div>
        </div>
      </div>
      <div class="order-list">
        <p class="list-tit">
          <span class="left">余额明细</span>
          <span class="right">查看全部</span>
        </p>
        <van-list
          v-if="state.list.length"
          v-model="state.listLoading"
          :finished="state.finished"
          :offset="10"
          finish-text="没有更多了"
          @load="onLoad"
        >
          <template #finished>
            <p>没有更多了</p>
          </template>
          <template v-for="item in state.list" :key="item.Id">
            <div class="item">
              <p class="top">
                <span class="item-tit">{{ item.TradeTypeText }}</span>
                <span
                  class="price"
                  :class="item.TradeAmount > 0 ? 'add' : 'reduce'"
                  >{{
                    `${item.TradeAmount > 0 ? "+" : ""}${item.TradeAmount}`
                  }}</span
                >
              </p>
              <p class="bot">
                <span class="intro">{{ item.Remark }}</span>
                <span class="time">{{ item.TradeTimeText }}</span>
              </p>
            </div>
          </template>
        </van-list>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";
import { Storage } from "@/utils/help";
import { GetAmountDetailList } from "@/httpAction/collection";
import { getUserInfo } from "@/httpAction/login";

const state = reactive({
  userInfo: null,
  pageNo: 1,
  pageSize: 20,
  list: [],
  listTotal: 0,
  loading: false,
  listLoading: false,
  finished: false,
});

onMounted(() => {
  onGetUserInfo();
  getList();
});
watch(
  () => state.pageNo,
  () => {
    getList();
  }
);
const getInfo = async () => {
  onGetUserInfo();
  state.loading = true;
  state.list = [];
  state.listTotal = 0;
  if (state.pageNo == 1) {
    getList();
  } else {
    state.pageNo = 1;
  }
};
const onLoad = async () => {
  if (state.list.length >= state.listTotal) {
    return false;
  } else if (state.list.length < state.listTotal && !state.listLoading) {
    state.listLoading = true;
    state.pageNo += 1;
  }
};
const getList = async () => {
  try {
    let params = {
      action: "GetAmountDetailList",
      pageNo: state.pageNo,
      pageSize: state.pageSize,
    };
    const res = await GetAmountDetailList(params);

    state.listLoading = false;
    state.loading = false;
    if (res.code != 0) {
      return false;
    }
    state.listTotal = res.total;
    let list = [...state.list, ...res.data];
    if (list.length >= state.listTotal) {
      state.finished = true;
    } else {
      state.finished = false;
    }
    state.list = list;
  } catch (e) {
    console.log(e);
    state.loading = false;
  }
  // GetAmountDetailList
};
const onGetUserInfo = async () => {
  try {
    const res = await getUserInfo({ action: "GetMemberInfo" });
    if (res.code != 0) {
      Toast(res.message);
      return false;
    }
    let data = {
      type: "L",
      data: {
        action: "add",
        name: "UserInfo",
        value: res.data,
      },
    };
    Storage(data);
    state.userInfo = res.data;
  } catch (e) {
    console.log(e);
  }
};
</script>

<style lang="scss" scoped>
.balance {
  padding: 16px;
  padding-top: 48px;
  .head-card {
    box-sizing: border-box;
    width: 100%;
    background-color: var(--van-primary-color);
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
    padding: 16px 20px;
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);

    .head-user {
      position: absolute;
      left: calc(50% - 30px);
      top: -30px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    }
    .title {
      font-weight: bold;
    }
    .price {
      padding-top: 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        font-size: 28px;
        font-weight: bold;
      }
      .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 600;
        span {
          margin: 6px 0;
        }
      }
    }
  }
  .order-list {
    margin-top: 22px;
    padding: 12px 0;
    .list-tit {
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        font-weight: 600;
      }
      .right {
        font-size: 14px;
        font-weight: 500;
        color: #575757;
      }
    }
    .item {
      margin: 16px 0;
      padding: 16px 20px;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .top {
        display: flex;
        justify-content: space-between;
        .item-tit {
          font-size: 16px;
          font-weight: 600;
        }
        .price {
          font-size: 20px;
          font-weight: 600;
        }
        .add {
          color: var(--van-red);
        }
        .reduce {
          color: var(--van-green);
        }
      }
      .bot {
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: var(--van-gray-8);

        .intro {
          padding-right: 20px;
        }
        .time {
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>
