<template>
  <div class="collection_list">
    <div v-for="(item, i) in props.list" class="item">
      <div class="item_img">
        <div v-if="item.Status == 1 && item.PaySecond" class="pay-time">
          <!-- <span>待支付：05:20</span> -->
          <span>待支付</span>
          <div class="count-down">
            <van-count-down :time="item.PaySecond * 1000" @finish="timeDown">
              <template #default="timeData">
                <span class="time-text block">{{
                  autoZero(timeData.minutes)
                }}</span>
                <span class="time-text colon">:</span>
                <span class="time-text block">{{
                  autoZero(timeData.seconds)
                }}</span>
              </template>
            </van-count-down>
          </div>
        </div>
        <van-image class="img" :src="item.ProductImage" v-lazy="item.ProductImage"></van-image>
      </div>
      <div class="coll_title">{{ item.ProductName }}</div>
      <div class="item_view1">
        <van-tag
          v-if="item.Status == 1"
          size="medium"
          style="font-size: 13px"
          plain
          type="warning"
          >{{ item.StatusText }}</van-tag
        >
        <van-tag
          v-if="item.Status == 2"
          size="medium"
          style="font-size: 13px"
          plain
          type="success"
          >{{ item.StatusText }}</van-tag
        >
        <van-tag
          v-if="item.Status == 3"
          size="medium"
          style="font-size: 13px"
          plain
          type="warning"
          >{{ item.StatusText }}</van-tag
        >
        <van-tag
          v-if="item.Status == 4"
          size="medium"
          style="font-size: 13px"
          plain
          type="warning"
          >{{ item.StatusText }}</van-tag
        >
        <van-tag
          v-if="item.Status == 5"
          size="medium"
          style="font-size: 13px"
          plain
          type="success"
          >{{ item.StatusText }}</van-tag
        >
        <!-- <div class="status">{{ item.StatusText }}</div> -->
        <div class="price price-c">
          ¥
          {{
            item.Status == 3 || item.Status == 4
              ? item.SalePrice
              : item.BuyPrice
          }}
        </div>
      </div>
      <div class="paying">
        <van-button
          v-if="item.Status == 1"
          class="btn"
          type="success"
          size="small"
          style="font-size: 12px"
          @click="paying(item.Id)"
          >去支付</van-button
        >
        <van-button
          v-if="item.Status == 2"
          class="btn"
          type="primary"
          size="small"
          style="font-size: 12px"
          @click="emit('onSale', item)"
          >去寄售</van-button
        >
        <van-button
          v-if="props.type == 'onSale'"
          :disabled="item.Status != 3"
          class="btn"
          type="primary"
          size="small"
          style="font-size: 12px; margin-right: 8px"
          @click="emit('onSale', { ...item, type: 'update' })"
          >修改售价</van-button
        >
        <van-button
          v-if="props.type == 'onSale'"
          :disabled="item.Status != 3"
          class="btn"
          type="danger"
          size="small"
          style="font-size: 12px"
          @click="CancelSaleProduct(item.Id)"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          >取消寄售</van-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { Toast } from "vant";
import { reactive } from "vue";
import { ProductPaid, CancelOnSaleProduct } from "@/httpAction/collection";
import { useRouter } from "vue-router";
import { autoZero } from "@/utils/help";
import _ from "lodash";
const router = useRouter();
const emit = defineEmits(["getList", "resetPage"]);
const props = defineProps({
  type: {
    type: String,
  },
  list: {
    type: Array,
    default: [],
  },
});
const state = reactive({
  list: props.list,
  SaleProductShow: false,
});
const timeDown = _.debounce(function () {
  emit("resetPage");
}, 1000);
const CancelSaleProduct = async (id) => {
  try {
    let params = {
      action: "CancelOnSaleProduct",
      id,
    };
    const res = await CancelOnSaleProduct(params);
    if (res.code != 0) {
      Toast({ message: res.message });
      return false;
    }
    Toast({ message: "取消成功~" });
    setTimeout(() => {
      emit("resetPage");
    }, 800);
  } catch (e) {
    console.log(e);
  }
};
const paying = async (id) => {
  router.push(`/payment?id=${id}`);
};
</script>

<style lang="scss" scoped>
.collection_list {
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  padding: 0 10px 0 20px;
  box-sizing: border-box;
  padding-bottom: 30px;
  .item {
    width: 47%;
    padding-bottom: 12px;
    margin: 0 3% 10px 0;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;

    .item_img {
      width: 100%;
      height: 160px;
      position: relative;

      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .pay-time {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background-color: #00000080;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        font-size: 15px;
        font-weight: 600;
        .time-text {
          color: #fff;
        }
        span {
          margin: 4px 0;
        }
      }
    }
    .coll_title {
      padding: 0 10px;
      box-sizing: border-box;
      margin-top: 10px;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      color: #000000;
    }
    .item_view1 {
      padding: 0 10px;
      box-sizing: border-box;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .status {
        font-family: "PingFang SC";
        font-style: normal;
        font-size: 14px;
        color: #a5a5a5;
      }
      .price {
        font-style: normal;
        font-weight: 600;
        font-size: 17px;
        color: #e34d59;
      }
    }
    .paying {
      margin-top: 10px;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      .item {
        width: 47%;
        padding-bottom: 8px;
        margin: 0 3% 10px 0;
        background: #ffffff;
        border-radius: 10px;
        .item_img {
          width: 100%;
          height: 160px;
          position: relative;
          .cover {
            border-radius: 10px 10px 0 0;
            position: absolute;
            width: 100%;
            height: 160px;
            background: rgba(0, 0, 0, 0.5);
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            color: #fbf3fe;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-family: "PingFang SC";
            .waitimg {
              width: 20px;
              height: 20px;
            }
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px 10px 0 0;
          }
        }
        .coll_title {
          padding: 0 5px;
          box-sizing: border-box;
          margin-top: 10px;
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          color: #000000;
        }
        .item_view1 {
          padding: 0 5px;
          box-sizing: border-box;
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          .status {
            font-family: "PingFang SC";
            font-style: normal;
            font-size: 14px;
            color: #a5a5a5;
          }
          .price {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: #e34d59;
          }
        }
        .paying {
          margin-top: 10px;
          padding: 0 5px;
          box-sizing: border-box;
          display: flex;
          justify-content: flex-end;
          div {
            font-family: "PingFang SC";
            font-style: normal;
            font-size: 14px;
            width: 80px;
            height: 30px;
            border: 1px solid #5899f1;
            border-radius: 15px;
            text-align: center;
            letter-spacing: 1px;
            line-height: 30px;
            color: #fff;
            background: #5899f1;
          }
        }
      }
    }
  }
}
</style>
