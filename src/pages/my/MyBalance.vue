<template>
  <div class="My-Balance">
    <div class="header">
      <div>
        <p class="tit">可用资产(元)</p>
        <p class="balance">{{ state.AvailableAmount.toFixed(2) || "0" }}</p>
      </div>
      <div>
        <p class="tit">总资产(元)</p>
        <p class="balance">{{ state.TotalAmount.toFixed(2) || "0" }}</p>
      </div>
    </div>
    <div class="content">
      <div
        v-for="(item, i) in state.list"
        :key="i"
        class="card-item"
        @click="toInfo"
      >
        <div class="top">{{ item.CompanyName }}</div>
        <div class="bottom">
          <div class="price">
            <span>￥</span> <b>{{ item.TotalAmount }}</b>
          </div>

          <!-- <div class="goPay">去开户</div> -->
        </div>
      </div>

      <p class="helpText">
        * 所有资金均由第三方持牌支付机构进行支付/托管及清算。
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { GetPaymentCompanyList } from "@/httpAction/collection";
const router = useRouter();
const state = reactive({
  AvailableAmount: 0,
  TotalAmount: 0,
  list: [],
});

onMounted(() => {
  getList();
});
const getList = async () => {
  try {
    let params = {
      action: "MyAccountWallet",
    };
    const res = await GetPaymentCompanyList(params);
    if (res.code != 0) {
      Toast(res.message);
      return false;
    }
    let { AvailableAmount, TotalAmount, PaymentAcounts } = res.data;
    state.list = PaymentAcounts;
    state.AvailableAmount = AvailableAmount;
    state.TotalAmount = TotalAmount;

    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
const toInfo = () => {
  router.push("/my/BalanceInfo");
};
</script>

<style lang="scss" scoped>
.My-Balance {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  max-width: 750px;
  margin: 0 auto;
  z-index: 0;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  user-select: none;
  .header {
    position: relative;
    padding: 80px 16px 32px 16px;
    display: flex;
    justify-content: space-around;
    text-align: center;
    background-color: rgb(106, 145, 246);
    border-radius: 0 0 24px 24px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    color: #fff;
    .tit {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
    }
    .balance {
      margin-top: 12px;
      font-size: 24px;
      font-weight: 600;
    }
    &::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 30px;
      border-radius: 8px;
      background-color: #fff;
      left: 50%;
      top: 95px;
    }
  }
  .content {
    flex: 1;
    padding: 0 16px;
    padding-top: 24px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .card-item {
      position: relative;
      padding: 16px;
      border-radius: 12px;
      font-size: 16px;
      height: 70px;
      background-color: #ee0a2499;
      color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        transform: scale(0.98);
      }
      &::after {
        content: "";
        position: absolute;
        top: 8%;
        right: 2%;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(255, 255, 255, 0.6);
        transform: skew(20deg, 10deg);
      }
      .top {
        font-style: oblique;
      }
      .bottom {
        .goPay {
          font-size: 15px;
        }
        .price {
          b {
            font-size: 24px;
          }
        }
      }
    }
    .helpText {
      font-size: 13px;
    }
  }
}
</style>
