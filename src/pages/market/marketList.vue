<template>
  <div class="market">
    <van-pull-refresh
      style="min-height: 100%"
      v-model="state.isLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-if="state.list.length"
        style="min-height: 100%; padding-bottom: 50px"
        v-model="state.loading"
        :finished="state.finished"
        :offset="10"
        finish-text="没有更多了"
        @load="onLoad"
      >
        <template #finished>
          <p>没有更多了</p>
        </template>
        <div class="market_list">
          <div
            class="market_item"
            v-for="(item, index) in state.list"
            :key="index"
            @click="handleTo(item)"
          >
            <div class="market_top" :class="{ mask: item.Status != 3 }">
              <div class="text-status" v-if="item.Status != 3">
                {{ item.StatusText }}
              </div>

              <img :src="item.ProductImage" v-lazy="item.ProductImage" alt="" />
            </div>
            <div class="market_title">{{ item.ProductName }}</div>
            <!-- <div class="market_stock">收藏者1</div> -->
            <div class="market_price">
              <div>
                <span>¥</span>
                {{ item.SalePrice }}
              </div>
              <img src="@/assets/market/next.svg" alt="" />
            </div>
          </div>
        </div>
      </van-list>
      <Empty
        :text="state.loading ? '数据加载中...' : '暂时没有数据哦~'"
        v-else
      />
    </van-pull-refresh>
  </div>
</template>
<script setup>
import { Toast } from "vant";
import { reactive, ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { GetMarketMemberProductList } from "@/httpAction/market";
import Empty from "../../components/Empty.vue";
const router = useRouter();
const route = useRoute();
const state = reactive({
  list: [],
  isLoading: false,
  loading: false,
  finished: false,
  listQuery: {
    pageNo: 1,
    pageSize: 10,
  },
  listTotal: 0,
});
onMounted(() => {
  // getList();
});
watch(
  () => state.listQuery,
  () => getList(),
  { deep: true, immediate: true }
);
const onRefresh = () => {
  state.loading = true;
  state.isLoading = true;
  state.list = [];
  state.listTotal = 0;
  if (state.listQuery.pageNo == 1) {
    getList();
  } else {
    state.listQuery.pageNo = 1;
  }
};
const onLoad = () => {
  if (state.list.length == state.listTotal) {
    return false;
  } else if (state.list.length < state.listTotal && !state.loading) {
    state.loading = true;
    state.listQuery.pageNo += 1;
  }
};
async function getList() {
  try {
    let params = {
      productId: route.query.id,
      action: "GetMarketMemberProductList",
      ...state.listQuery,
    };
    const res = await GetMarketMemberProductList(params);
    state.isLoading = false;
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
    state.isLoading = false;
  }
}
const handleTo = async (row) => {
  if (row.Status != 3) {
    return;
  }
  router.push({
    path: "/market/marketList/marketDetail",
    query: {
      id: row.Id,
      type: "GetMarketMemberProductInfo",
    },
  });
};
</script>
<style lang="scss" scoped>
.market {
  padding: 16px 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  // background: #ffffff;
  .market_list {
    padding: 0 16px;
    padding-bottom: 16px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    .market_item {
      position: relative;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .market_top {
        height: 200px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        &.mask {
          &::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.25);
            // backdrop-filter: saturate(120%) blur(1px);
          }
        }
      }
      .market_title {
        padding: 0 10px;
        box-sizing: border-box;
        margin-top: 10px;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: #000000;
      }
      .market_stock {
        padding: 0 10px;
        box-sizing: border-box;
        margin-top: 4px;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        color: #aaaaaa;
      }
      .market_price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px 10px;
        box-sizing: border-box;
        margin-top: 10px;
        font-family: "Roboto";
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: #000000;
        span {
          font-family: "PingFang SC";
          font-size: 15px;
        }
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>
