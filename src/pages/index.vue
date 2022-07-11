<!--
 * @Author: xueyang xueyang_xyy@163.com
 * @Date: 2022-05-17 21:22:02
 * @LastEditors: Zhengzq zhengzq@zzjgtl.com
 * @LastEditTime: 2022-06-19 22:03:10
 * @FilePath: /Collection/src/pages/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="s-home">
    <van-pull-refresh
      style="height: 100%"
      v-model="state.isLoading"
      @refresh="onRefresh"
    >
      <van-search
        value="{{ state.search }}"
        placeholder="搜索商品、藏品、专辑"
        @click="state.SearchShow = true"
        disabled
      />
      <div class="header">
        <van-swipe
          class="my-swipe"
          :autoplay="3000"
          :touchable="true"
          indicator-color="white"
        >
          <van-swipe-item v-for="item in state.banners">
            <img :src="item.Image" v-lazy="item.Image" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="noticeBar">
        <div class="left-icon">
          <van-icon name="volume-o" />
        </div>
        <van-swipe
          class="notice-swipe"
          :autoplay="3000"
          vertical
          :show-indicators="false"
        >
          <template v-for="(item, index) in state.noticeList" :key="index">
            <van-swipe-item @click="reviewNotice('single', item.Id)">{{
              item.Title || "-"
            }}</van-swipe-item>
          </template>
        </van-swipe>
        <div class="right-icon" @click="reviewNotice('more')">
          <van-icon name="wap-nav" />
        </div>
        <!-- <NoticeBar /> -->
      </div>
      <div class="shopList">
        <div
          class="market_item"
          v-for="(item, index) in state.list"
          :key="index"
          @click="handleTo(item.ProductId)"
        >
          <div class="market_top">
            <!-- 商品售罄 -->
            <div class="status" v-if="!item.IsHasStock">
              <div>首发</div>
              <div>售罄</div>
            </div>
            <img :src="item.ProductImage" v-lazy="item.ProductImage" alt="" />
          </div>
          <div class="market_title">{{ item.ProductName }}</div>
          <div class="flex-between">
            <span class="market_price price-c">¥{{ item.SalePrice }}</span>
            <span class="market_stock">剩余{{ item.NftMintNum }}件</span>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <PopSearch
      :show.sync="state.SearchShow"
      @cancel="state.SearchShow = false"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Storage } from "../utils/help";
import {
  GetProductList,
  GetNoticeList,
  GetIndexBanners,
} from "@/httpAction/index";
import PopSearch from "../components/PopSearch.vue";
const router = useRouter();
let state = reactive({
  banners: [],
  search: "",
  list: [], //藏品列表
  noticeList: [],
  userInfo: null,
  loading: false,
  finished: false, // 是否已加载完成，加载完成后不再触发load事件
  refreshing: false, // 下拉状态
  listQuery: {
    page: 1, // 当前页码数
    limit: 10, // 一页显示10条
  },
  SearchShow: false,
});
onMounted(() => {
  getBanners();
  UserInfo();
  list();
  getNotice();
});
const onRefresh = () => {
  state.isLoading = true;
  list();
};
const onSearch = (e) => {
  console.log(e);
};
const getBanners = async () => {
  try {
    let params = {
      action: "GetIndexBanners",
    };
    const res = await GetIndexBanners(params);
    if (res.code != 0) {
      return false;
    }
    state.banners = res.data;
  } catch (e) {
    console.log(e);
  }
};
// const onLoad = () => {
//   list();
// };
// 获取藏品列表
const list = async () => {
  try {
    let params = {
      pageNo: state.listQuery.page,
      pageSize: state.listQuery.limit,
      action: "GetProductList",
    };
    const res = await GetProductList(params);
    state.isLoading = false;
    if (res.code != 0) {
      return false;
    }
    state.list = res.data;
  } catch (e) {
    state.isLoading = false;
  }
};
const getNotice = async () => {
  try {
    let params = {
      action: "GetNoticeList",
      pageNo: "1",
      pageSize: "10",
    };
    const res = await GetNoticeList(params);
    if (res.code == 0) {
      state.noticeList = res.data;
    }
  } catch (e) {
    console.log(e);
  }
};
const UserInfo = async () => {
  let data = await Storage({
    type: "L",
    data: { action: "review", name: "UserInfo" },
  });
  state.userInfo = data;
};
const reviewNotice = (type, id) => {
  let row = { path: "", query: {} };
  if (type == "more") {
    row.path = "/notice-list";
  } else if (type == "single") {
    row.path = `/notice`;
    row.query.id = id;
  }
  router.push(row);
};
const handleTo = async (id) => {
  router.push({
    path: "/consignment",
    query: {
      id: id,
      type: "GetProductInfoV2",
    },
  });
};
</script>

<style lang="scss" scoped>
#s-home {
  background-color: #fff;
  // height: 100%;
  > h3 {
    margin: 15px 0;
    text-align: center;
  }
  .header {
    min-height: 204px;
    // background-image: url("@/assets/home/header-bg.png");
    background-size: 100% 100%;
    // margin-top: 10px;
    .my-swipe {
      width: 100%;
      height: 222px;
      // border-radius: 16px;
      // height: 4.25rem;
      // max-height: 272px;

      .van-swipe-item {
        color: #fff;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.091);
        // border-radius: 16px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
  .noticeBar {
    margin: 20px 0;
    padding: 0 12px;
    overflow: hidden;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    .left-icon {
      font-size: 18px;
      margin-right: 8px;
    }
    .right-icon {
      display: flex;
      align-items: center;
      font-size: 24px;
      margin: 0 8px;
    }
    .notice-swipe {
      flex: 1;
      font-size: 14px;
      height: 40px;
      .van-swipe-item {
        // padding: 8px 0;
        max-height: 40px !important;
        line-height: 40px;
        overflow: hidden; //超出隐藏
        text-overflow: ellipsis; // 超出显示省略号
        -webkit-line-clamp: 1; // 显示行数
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
  }
  .shopList {
    padding: 0 16px 0;
    padding-bottom: 60px;
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
        .status {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          font-size: 14px;
          color: #ffffff;
          background: rgba($color: #000, $alpha: 0.5);
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          // border-radius: 20px 20px 0 0;
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
        padding: 0 10px 10px;
        box-sizing: border-box;
        margin-top: 10px;
        font-family: "Roboto";
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        span {
          font-family: "PingFang SC";
          font-size: 15px;
        }
      }
    }
  }
}
</style>
