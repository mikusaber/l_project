<template>
  <div class="My-Balance">
    <div class="header">
      <p class="tit">当前余额</p>
      <div class="balance">
        <span>CNY</span>
        <p>29.08</p>
      </div>
      <div class="date">
        <span>Date</span>
        <span>{{ exchangeDateTime(new Date(), 40) }}</span>
      </div>
      <div class="config">
        <div  @click="navigeToPage('/my/Recharge')">充值</div>
        <div>提现</div>
      </div>
    </div>
    <div class="cardRow">
      <van-row class="card-row" gutter="24">
        <van-col span="6" class="item">
          <div class="card-img">
            <img src="@/assets/common/order.png" alt="" srcset="" />
          </div>
          <div>账单</div>
        </van-col>
        <van-col span="6" class="item" @click="toPage">
          <div class="card-img green">
            <img src="@/assets/common/bankCard.png" alt="" srcset="" />
          </div>
          <div>银行卡</div>
        </van-col>
        <van-col span="6" class="item">
          <div class="card-img" style="background-color: rgb(253, 221, 117)">
            <img src="@/assets/common/clock.png" alt="" srcset="" />
          </div>
          <div>支付密码</div>
        </van-col>
      </van-row>
    </div>

    <div class="transition-order">
      <div class="transition-tit">
        <h4>最近账单</h4>
        <span>查看更多</span>
      </div>
      <div class="order-box">
        <Empty text="暂时没有交易记录哦~" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";
import { GetPaymentCompanyList } from "@/httpAction/collection";
import { exchangeDateTime } from "@/utils/help";
import { useRouter } from "vue-router";

import Empty from "../../components/Empty.vue";
const router = useRouter();
const state = reactive({
  list: [],
});

onMounted(() => {
  getList();
});
const getList = async () => {
  try {
    let params = {
      action: "GetPaymentCompanyList",
    };
    const res = await GetPaymentCompanyList(params);
    if (res.code != 0) {
      Toast(res.message);
      return false;
    }
    state.list = res.data;
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
const toPage = ()=> {
	router.push("/my/BankCardList");
}
const navigeToPage = (url)=> {
	router.push(url);
}

</script>

<style lang="scss" scoped>
.My-Balance {
  box-sizing: border-box;
  padding: 16px;
  min-height: 100%;
  background-color: #fff;
  .header {
    position: relative;
    padding: 16px;
    background-color: rgb(106, 145, 246);
    border-radius: 16px;
    color: #fff;
    box-shadow: 0 2px 12px 0 rgba(28, 28, 28, 0.3);

    .tit {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.9);
    }
    .balance {
      margin-top: 12px;
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        margin-right: 4px;
        font-size: 14px;
        font-weight: 600;
        padding: 6px 16px 6px 10px;
        border-radius: 4px;
        background: #2980b9;
        background: linear-gradient(
          to left,
          rgba(106, 146, 246, 0.8),
          rgb(66, 117, 247)
        );
      }
      p {
        font-size: 30px;
        font-weight: 600;
      }
    }
    .date {
      margin-top: 40px;
      display: flex;
      //   flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
      font-size: 13px;
      font-style: oblique;
      span:nth-child(1) {
        margin-right: 8px;
      }
      span:nth-child(2) {
        // margin-right: 12px;
        letter-spacing: 1px;
      }
    }
    .config {
      position: absolute;
      top: 15%;
      right: 0;
      font-size: 14px;
      > div {
        padding: 4px 12px;
        background: linear-gradient(to right, #ff6034b7, #ee0a25bf);
        border-radius: 16px 0 0 16px;
        margin-bottom: 22px;
      }
    }
  }
  .cardRow {
    margin-top: 24px;
    font-size: 15px;
    .card-row {
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
        .card-img {
          padding: 16px;
          border-radius: 8px;
          background-color: rgb(217, 233, 254);
          box-shadow: 0 2px 12px 0 rgba(28, 28, 28, 0.15);
          img {
            width: 28px;
          }
          &.green {
            background-color: rgba(16, 201, 98, 0.4);
          }
        }
        > i {
          font-size: 28px;
          color: var(--van-primary-color);
        }
        > div {
          margin-top: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #303133;
          word-break: keep-all;
        }
      }
    }
  }
  .transition-order{
    margin-top: 36px;
    .transition-tit{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      >span{
        font-size: 13px;
      }
    }
  }
}
</style>
