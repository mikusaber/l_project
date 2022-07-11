<template>
  <!-- 我的收藏 -->
  <div class="collection">
    <van-pull-refresh
      style="min-height: 100%"
      v-model="state.isLoading"
      @refresh="onRefresh"
    >
      <van-tabs
        style="height: 100%"
        v-model:active="state.active"
        sticky
        swipeable
        color="#2e2f33"
      >
        <van-tab
          v-for="(item, i) in state.tab"
          :name="item.value"
          :title="item.label"
        >
          <div style="min-height: calc(100vh - 94px); padding-bottom: 50px">
            <van-list
              v-if="state.list.length"
              style="height: 100%"
              v-model="state.loading"
              :finished="state.finished"
              :offset="40"
              finish-text="没有更多了"
              @load="onLoad"
            >
              <template #finished>
                <p>没有更多了</p>
              </template>
              <collection-list
                :type="state.active"
                :list="state.list"
                @getList="getList"
                @resetPage="onResetPage"
                @onSale="onSaleShow"
              ></collection-list>
            </van-list>
            <Empty :text="state.loading ? '数据加载中...' : '暂时没有数据哦~'" v-else />
          </div>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
    <van-dialog
      v-model:show="state.SaleProductShow"
      :title="state.SaleData?.type == 'update' ? '修改藏品售价' : '藏品寄售'"
      show-cancel-button
      @confirm="confirmSale"
    >
      <div class="onSale">
        <van-field
          v-model="state.SalePrice"
          type="number"
          placeholder="请输入寄售的价格"
        />
      </div>
    </van-dialog>
  </div>
</template>
<script setup>
import CollectionList from "./components/CollectionList.vue";
import Empty from "@/components/Empty.vue";
import { ref, reactive, onMounted, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { getMyProduct, OnSaleProduct } from "@/httpAction/collection";
import { Toast } from "vant";
const router = useRouter();
const state = reactive({
  active: "have",
  tab: [
    {
      label: "我的藏品",
      value: "have",
    },
    {
      label: "寄售中",
      value: "onSale",
    },
    {
      label: "已售出",
      value: "sold",
    },
  ],
  list: [],
  isLoading: false,
  SaleProductShow: false,
  SaleData: null,
  SalePrice: "",
  loading: false,
  finished: false,
  listTotal: 0,
  listQuery: {
    pageNo: 1, // 当前页码数
    pageSize: 10, // 一页显示10条
  },
});
onMounted(() => {
  getList();
});
watch(
  () => state.active,
  (e) => {
    onResetPage();
  }
);
watch(
  () => state.listQuery,
  (e) => getList(),
  { deep: true }
);
watch(
  () => state.SalePrice,
  (v) => {
    nextTick(() => {
      let priceLength =
        v && String(v).indexOf(".") > -1 && String(v).split(".")[1].length;
      console.log(priceLength);
      if (priceLength > 2) {
        state.SalePrice = Number(v).toFixed(2);
      }
    });
  }
);
const onResetPage = () => {
  state.loading = true;
  state.finished = false;
  state.listTotal = 0;
  state.list = [];
  if (state.listQuery.pageNo == 1) {
    getList();
  } else {
    state.listQuery.pageNo = 1;
  }
};
const onRefresh = () => {
  state.loading = true;
  state.isLoading = true;
  onResetPage();
};
const onSaleShow = (row) => {
  state.SaleData = row;
  state.SalePrice = row?.type == "update" ? row.SalePrice : "";
  state.SaleProductShow = true;
};
const confirmSale = () => {
  if (!state.SalePrice) {
    Toast("请输入寄售价格哦~");
    return false;
  }
  saleProduct();
};
const onLoad = async () => {
  if (state.list.length >= state.listTotal) {
    return false;
  } else if (state.list.length < state.listTotal && !state.loading) {
    state.loading = true;
    state.listQuery.pageNo += 1;
  }
};
const getList = async () => {
  try {
    let params = {
      action: "GetMyProduct",
      statusKey: state.active,
      ...state.listQuery,
    };
    const res = await getMyProduct(params);
    state.isLoading = false;
    state.loading = false;
    if (res.code != 0) {
      Toast(res.message);
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
};
const saleProduct = async (row = state.SaleData) => {
  try {
    let params = {
      action: row.type == "update" ? "UpdateSaleProductPrice" : "OnSaleProduct",
      id: row.Id,
      salePrice: Number(state.SalePrice),
    };
    const res = await OnSaleProduct(params);
    if (res.code != 0) {
      Toast({ message: res.message });
      return false;
    }
    Toast({ message: row.type == "update" ? "修改成功~" : "寄售成功~" });
    state.SalePrice = "";
    setTimeout(() => {
      onResetPage();
    }, 800);
  } catch (e) {
    console.log(e);
  }
};
</script>
<style lang="scss" scoped>
.collection {
  width: 100%;
  height: 100%;
  .collection_top {
    height: 40px;
    display: flex;
    align-items: center;
    color: #646566;
    font-family: "PingFang SC";
    font-style: normal;
    font-size: 14px;
    font-weight: 400;
    // background: #ffffff;
    div {
      flex: 1;
      text-align: center;
      span {
        display: inline-block;
        line-height: 25px;
      }
      .active {
        font-weight: 500;
        color: #111;
        border-bottom: 2px solid #2e2f33;
      }
    }
  }
  .onSale {
    padding: 10px;
  }
}
</style>
