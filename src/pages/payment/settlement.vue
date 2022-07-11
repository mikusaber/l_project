<template>
  <div class="pay">
    <div v-if="state.productInfo" class="pay-item">
      <p class="title">藏品信息</p>
      <div class="shop-info">
        <img
          :src="state.productInfo?.ProductImage"
          v-lazy="state.productInfo?.ProductImage"
          alt=""
        />
        <div class="right">
          <p class="shop-tit">{{ state.productInfo?.ProductName }}</p>
          <p class="price">￥ {{ state.productInfo?.BuyPrice }}</p>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="pay-item">
      <p class="title">支付方式</p>
      <div
        v-for="item in state.payConfig"
        class="pay-way"
        :class="{ ' pay-active': item.value == state.payActive }"
        @click="togglePay(item.value)"
      >
        <template v-if="item.value !== 4">
          <img :src="item.img" alt="" />
          <span>{{ item.label }}</span>
        </template>
        <div v-else class="purseTemp">
          <div class="left">
            <img :src="item.img" alt="" />
            <div>
              <p>{{ item.label }}</p>
              <p class="purse">余额：1086</p>
            </div>
          </div>
          <div class="right">
            <van-button type="primary" size="small" @click.stop="">充值</van-button>
          </div>
        </div>
      </div>
    </div>
    <div style="padding: 0 12px">
      <van-button type="primary" block @click="goPay">立即支付</van-button>
    </div>
    <!-- <van-popup v-model:show="state.popShow" position="bottom" :style="{ height: '30%' }" /> -->
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Toast } from "vant";
import WX from "@/assets/common/pay-wx.png";
import ZFB from "@/assets/common/pay-zfb.png";
import YHK from "@/assets/common/pay-card.png";
import { GetMemberProductInfo, ProductPaid } from "../../httpAction/collection";
let route = useRoute();
let router = useRouter();
const state = reactive({
  productId: route.query?.id || "",
  payActive: "1",
  payConfig: [
    { label: "微信支付", img: WX, value: 1 },
    // { label: "支付宝支付", img: ZFB, value: 2 },
    { label: "钱包支付", img: YHK, value: 4 },
    { label: "银行卡支付", img: YHK, value: 3 },
  ],
  productInfo: null,
  popShow: true,
});
onMounted(() => {
  getInfo();
});
const getInfo = async () => {
  try {
    let params = {
      action: "GetMemberProductInfo",
      Id: state.productId,
    };
    const res = await GetMemberProductInfo(params);
    if (res.code != 0) {
      Toast(res.message);
      return false;
    }
    state.productInfo = res.data;
  } catch (e) {
    console.log(e);
  }
};
const togglePay = (val) => {
  state.payActive = val;
};
const goPay = async () => {
  console.log("???")
  if (state.payActive == "1") {
    window.open(
      `https://www.wanli988.com/pay/shuzi_juhePay_wx_Submit.aspx?action=payProduct&id=${state.productInfo?.Id}`
    );
  } else if (state.payActive == "3") {
    console.log("银行卡支付~");
  }
  return;
  try {
    let params = {
      action: "ProductPaidTest",
      id: state.productInfo?.Id,
    };
    const res = await ProductPaid(params);
    if (res.code != 0) {
      Toast({ message: res.message });
      return false;
    }
    Toast("支付成功~");

    setTimeout(() => {
      router.go(-1);
    }, 300);
  } catch (e) {
    console.log(e);
  }
  //   try {
  //     let params = {
  //       action: "SubmitOrder",
  //       MemberProductId: state.productInfo?.MemberProductId,
  //     };
  //     const res = await SubmitOrder(params);
  //     if (res.code != 0) {
  //       Toast(res.message);
  //       return false;
  //     }
  //     // state.productInfo = res.data;
  //   } catch (e) {
  //     console.log(e);
  //   }
};
</script>

<style lang="scss" scoped>
.pay {
  height: 100%;
  background: #fff;
  .pay-item {
    padding: 16px;
    &:first-child {
      border-radius: 0 0 8px 8px;
    }
    .title {
      padding-left: 16px;
      margin-bottom: 16px;
      font-size: 17px;
      font-weight: 600;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: calc(50% - 9px);
        left: 0;
        width: 5px;
        height: 18px;
        background: var(--van-primary-color);
        border-radius: 3px;
      }
    }
    .shop-info {
      display: flex;
      img {
        width: 125px;
        border-radius: 8px;
      }
      .right {
        padding-left: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .shop-tit {
          font-size: 15px;
          font-weight: 600;
        }
        .price {
          font-size: 20px;
          font-weight: 600;
          color: #ff474e;
        }
      }
    }
    .pay-way {
      margin: 20px 0;
      display: flex;
      align-items: center;
      padding: 12px 16px;
      font-size: 15px;
      border: 1px solid var(--van-gray-4);
      border-radius: 8px;
      font-weight: 600;
      transition: 0.2s;
      &.pay-active {
        border: 1px solid var(--van-primary-color);
        background-color: #1989fa0a;
      }
      img {
        width: 25px;
        margin-right: 12px;
      }
      .purse {
        margin-top: 6px;
        font-weight: 500;
        font-size: 12px;
      }
      .purseTemp {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
        }
        .right{
          button{
            padding: 0 16px;
          }
        }
      }
    }
  }
}
</style>
