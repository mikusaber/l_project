<template>
  <div class="market">
    <van-search
      placeholder="搜索商品、藏品、专辑"
      @click="state.SearchShow = true"
      disabled
    ></van-search>
    <van-pull-refresh
      style="min-height: 100%"
      v-model="state.isLoading"
      @refresh="onRefresh"
    >
      <van-tabs
        style="height: 100%"
        class="market-tab"
        v-model:active="state.active"
        sticky
        swipeable
        color="#2e2f33"
      >
        <van-tab
          v-for="(item, i) in state.tabs"
          :name="item.value"
          :title="item.label"
        >
          <van-list
            v-if="state.list.length"
            v-model="state.loading"
            :finished="state.finished"
            :offset="150"
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
                @click="handleLink(item)"
              >
                <div
                  class="market_top"
                  :class="{
                    mask:
                      state.listQuery.action ==
                        'GetMarketMemberProductDefaultList' && item.Status != 3,
                  }"
                >
                  <div
                    class="text-status"
                    v-if="
                      state.listQuery.action ==
                        'GetMarketMemberProductDefaultList' && item.Status != 3
                    "
                  >
                    {{ item.StatusText }}
                  </div>

                  <img :src="item.ProductImage" v-lazy="item.ProductImage" alt="" />
                </div>
                <div class="market_title">{{ item.ProductName }}</div>
                <div class="market_price flex-between">
                  <span class="price-c">¥{{ item.SalePrice }}</span>
                  <template
                    v-if="
                      state.listQuery.action ==
                      'GetMarketMemberProductDefaultList'
                    "
                  >
                    <img
                      class="market_next"
                      src="@/assets/market/next.svg"
                      alt=""
                    />
                  </template>
                  <!-- <span v-else class="market_stock">已售14件</span> -->
                </div>
              </div>
            </div>
          </van-list>
          <Empty :text="state.loading ? '数据加载中...' : '暂时没有数据哦~'" v-else />
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
    <PopSearch :show="state.SearchShow" @cancel="state.SearchShow = false" />
  </div>
</template>
<script setup>
import { Row, Toast } from "vant";
import { reactive, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { getMyMarket } from "@/httpAction/market";
import Empty from "../../components/Empty.vue";
import PopSearch from "../../components/PopSearch.vue";
import _ from "lodash";

const router = useRouter();
const state = reactive({
  list: [], // 请求的列表
  loading: false,
  finished: false, // 是否已加载完成，加载完成后不再触发load事件
  refreshing: false, // 下拉状态
  listQuery: {
    action: "GetMarketMemberProductDefaultList",
    pageNo: 1, // 当前页码数
    pageSize: 10, // 一页显示10条
  },
  listTotal: 0,
  isLoading: false,
  active: 0,
  tabs: [
    { label: "推荐", value: 0 },
    { label: "作品", value: 1 },
  ],
  SearchShow: false,
});
onMounted(() => {
  // getList();
});
watch(
  () => state.active,
  (v) => {
    state.loading = true;
    let params = {
      action: "",
      pageNo: 1,
    };
    if (v == 0) {
      params.action = "GetMarketMemberProductDefaultList";
    } else if (v == 1) {
      params.action = "GetMarketProductList";
    }

    state.list = [];
    state.listTotal = 0;
    state.listQuery = { ...state.listQuery, ...params };
  }
);
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
  if (state.list.length >= state.listTotal) {
    return false;
  } else if (state.list.length < state.listTotal && !state.loading) {
    state.loading = true;
    state.listQuery.pageNo += 1;
  }
};

async function getList() {
  try {
    let params = {
      ...state.listQuery,
    };
    const res = await getMyMarket(params);
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
    state.isLoading = false;
  }
}
const handleLink = (row) => {
  let { action } = state.listQuery;

  if (action == "GetMarketMemberProductDefaultList" && row.Status != 3) {
    return false;
  }
  let query = {
    path: "",
    query: { id: row.ProductId },
  };
  if (action == "GetMarketMemberProductDefaultList") {
    query.path = "/market/marketList/marketDetail";
    query.query = {
      type: "GetMarketMemberProductInfo",
      id: row.Id,
    };
  } else if (action == "GetMarketProductList") {
    query.path = "/market/marketList";
  }
  router.push(query);
};
</script>
<style lang="scss" scoped>
.market {
  padding-bottom: 16px;
  height: 100%;
  min-height: 100%;
  .market-tab {
    margin-bottom: 16px;
  }
  // background: #ffffff;
  .market_list {
    margin-top: 16px;
    min-height: 100%;
    padding: 0 16px;
    padding-bottom: 16px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    .market_item {
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

      .market_price {
        box-sizing: border-box;
        margin-top: 10px;
        padding: 0 10px 10px;
        font-family: "Roboto";
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: #000000;
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
      }
      .market_next {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
