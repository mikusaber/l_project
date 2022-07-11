<!--
 * @Author: xueyang xueyang_xyy@163.com
 * @Date: 2022-05-19 20:44:09
 * @LastEditors: Zhengzq zhengzq@zzjgtl.com
 * @LastEditTime: 2022-06-24 20:14:07
 * @FilePath: /Collection/src/pages/market/marketDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="marketDetail" v-if="state.detailObj">
    <div class="marketDetail_top">
      <img
        :src="state.detailObj.ProductImage"
        v-lazy="state.detailObj.ProductImage"
      />
    </div>
    <!-- <div v-if="state.detailObj.TokenId" class="head-icon">
      <span class="number">编号</span>
      <div>
        <span>{{ state.detailObj.TokenId }}</span>
      </div>
    </div> -->
    <div class="justifyCenter">
      <div class="marketDetail_title" style="font-weight: 600">
        {{ state.detailObj.ProductName }}
      </div>
      <div class="marketDetail_price">¥ {{ state.detailObj.SalePrice }}</div>
    </div>
    <div class="views"></div>
    <div class="user-info">
      <p class="user-item">
        <span>持有地址</span>
        <span>{{ state.detailObj.Address || "-" }}</span>
      </p>
      <!-- <div class="views"></div> -->

      <!-- <p class="user-item" style="padding-top: 20px">
        <span>交易Hash</span>
        <span>{{ state.detailObj.Hash || "-" }}</span>
      </p> -->
    </div>
    <div class="views"></div>
    <div class="marketDetail_intro">
      <div class="marketDetail_title" style="margin-left: 20px">商品详情</div>
      <div class="text" v-html="state.detailObj.Description"></div>
    </div>

    <div class="marketDetail_bottom">
      <van-button
        v-if="state.detailObj.IsHasStock"
        @click="Buy"
        class="buy-btn"
        block
      >
        <span class="btn-text">
          ¥
          {{ state.detailObj.SalePrice }}
          &nbsp;&nbsp;&nbsp;&nbsp;立即购买</span
        >
      </van-button>
      <van-button
        v-else
        @click="
          () => {
            router.push(`/market/marketList?id=${state.detailObj.ProductId}`);
          }
        "
        class="buy-btn"
        block
      >
        <span class="btn-text">
          ¥
          {{ state.detailObj.SalePrice }}
          &nbsp;&nbsp;&nbsp;&nbsp;去市场看看</span
        ></van-button
      >
      <!-- <div class="right"></div> -->
    </div>
  </div>
</template>
<script setup>
import { Toast } from "vant";
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { GetMarketMemberProductInfo, SubmitOrder } from "@/httpAction/market";
const router = useRouter();
const route = useRoute();
const state = reactive({
  detailObj: null,
  isLoading: false,
});
onMounted(() => {
  getDetail();
});
const onRefresh = () => {
  state.isLoading = true;
  getDetail();
};
const getDetail = async () => {
  try {
    if (route.query.type == "GetMarketMemberProductInfo") {
      let params = {
        id: route.query.id,
        action: route.query.type,
      };
      const res = await GetMarketMemberProductInfo(params);
      state.isLoading = false;
      if (res.code != 0) {
        return false;
      }
      state.detailObj = res.data;
    } else {
      let params = {
        ProductId: route.query.id,
        action: route.query.type,
      };
      const res = await GetMarketMemberProductInfo(params);
      state.isLoading = false;
      if (res.code != 0) {
        return false;
      }
      state.detailObj = res.data;
    }
  } catch (e) {
    state.isLoading = false;
  }
};
const Buy = async () => {
  try {
    let params = {
      action: "SubmitOrder",
      ProductId: state.detailObj.ProductId,
    };
    const res = await SubmitOrder(params);
    if (res.code != 0) {
      Toast(res.message);
      setTimeout(() => {
        getDetail();
      }, 1500);
      return false;
    }
    let { Id, OrderId } = res.data;
    router.push(`/payment?id=${Id}&order=${OrderId}`);
  } catch (e) {
    console.log(e);
  }
};
</script>
<style lang="scss" scoped>
.marketDetail {
  width: 100%;
  min-height: 100%;
  background: #ffffff;
  position: relative;
  .marketDetail_top {
    width: 100%;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .user-info {
    padding: 20px 0;
    .user-item {
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      span {
        &:first-child {
          font-size: 15px;
          font-weight: 500;
        }
        &:last-child {
          font-size: 14px;
          color: #606266;
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .head-icon {
    margin-top: 20px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    font-size: 12px;
    .number {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 600;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--van-primary-color);
      position: relative;
      z-index: 99;
    }
    div {
      display: inline-block;
      background: var(--van-primary-color);
      color: #fff;
      font-weight: 600;
      padding: 2px 12px;
      padding-left: 16px;
      position: relative;
      left: -8px;
      border-radius: 0 4px 4px 0;
      transform: skewX(-20deg);
      span {
        display: inline-block;
        transform: skewX(20deg);
      }
    }
  }
  .justifyCenter {
    padding: 16px;
    padding-top: 8px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .marketDetail_intro {
    padding: 20px 0;
    padding-bottom: 100px;
  }
  .marketDetail_title {
    box-sizing: border-box;
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #333;
  }
  .marketDetail_price {
    box-sizing: border-box;
    font-weight: 600;
    color: #ff474e;
    font-size: 20px;
  }
  .views {
    width: 100%;
    height: 12px;
    background: #f7f7f7;
  }
  .text {
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: 20px;
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #111;
  }
  .marketDetail_bottom {
    width: 100%;
    height: 70px;
    padding: 0 20px;
    box-sizing: border-box;
    box-shadow: 0px 4px 47px rgba(0, 0, 0, 0.1);
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      border-radius: 8px;
      transform: skewX(-20deg);
      transition: 0.2s;
      &:active {
        background-color: #1989fa9e;
        transform: skewX(-20deg) scale(0.95);
      }
      .btn-text {
        display: inline-block;
        transform: skewX(20deg);
      }
    }
    .buy-btn {
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: var(--van-primary-color);
      font-weight: 600;
      color: #ffffff;
      font-size: 16px;
    }
    .gray-btn {
      font-weight: 600;
      color: #ffffff;
      font-size: 16px;
      background-color: var(--van-tab-text-color);
    }
  }
}
</style>
