<template>
  <div class="card">
    <div class="cardList">
      <van-radio-group v-model="state.checked">
        <van-swipe-cell
          class="van-swipe-cell"
          v-for="(item, index) in state.list"
          :key="index"
        >
          <div class="card_item" @click="state.checked = item.Id">
            <div v-if="props.type == 'Component'" class="component-radio">
              <van-radio
                :name="item.Id"
                clickable
                @click="state.checked = item.Id"
              />
            </div>
            <img src="@/assets/common/card.png" alt="" />
            <div>
              <div class="name">{{ item.BankName }}</div>
              <div class="cardNum">{{ item.BankCardNo }}</div>
            </div>
          </div>
          <template v-if="props.type !== 'Component'" #right>
            <van-button
              square
              type="danger"
              text="删除"
              class="btn"
              style="height: 80px"
              @click="handleDel(item.Id)"
            />
          </template>
        </van-swipe-cell>
      </van-radio-group>
    </div>
    <div style="padding: 0 10px; box-sizing: border-box">
      <div class="addCard" @click="handleTo">
        <van-icon name="plus" />
        <div>添加银行卡</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Toast, Dialog } from "vant";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { GetBankCardList, DeleteBankCard } from "@/httpAction/card";

const router = useRouter();

const props = defineProps({
  type: {
    type: String,
    default: "NoComponent",
  },
});

const state = reactive({
  list: [],
  isLoading: false,
  checked: "",
});

onMounted(() => {
  list();
});
const list = async () => {
  try {
    let params = {
      action: "GetBankCardList",
    };
    const res = await GetBankCardList(params);
    state.isLoading = false;
    if (res.code != 0) {
      return false;
    }
    state.list = res.data;
  } catch (e) {
    state.isLoading = false;
  }
};
const handleTo = () => {
  router.push({
    path: "/my/card/cardAdd",
  });
};
const handleDel = (id) => {
  Dialog.confirm({
    title: "提示",
    message: "确定要删除该银行卡吗？",
  })
    .then(() => {
      try {
        let params = {
          action: "DeleteBankCard",
          Id: id,
        };
        const res = DeleteBankCard(params);
        state.isLoading = false;
        if (res.code != 0) {
          return false;
        }
        Toast("删除成功~");
        list();
      } catch (e) {}
    })
    .catch(() => {
      // on cancel
    });
};
</script>
<style lang="scss" scoped>
.card {
  width: 100%;
  .cardList {
    width: 100%;
    padding: 0 10px;
    margin-top: 10px;
    box-sizing: border-box;
    .van-swipe-cell {
      width: 100%;
      height: 80px;
      margin-bottom: 10px;
      background: #ffffff;
      border-radius: 10px;
      box-sizing: border-box;
      // background: rgba($color: #202125, $alpha: 0.9);
      .card_item {
        width: 100%;
        height: 80px;
        box-sizing: border-box;
        padding: 0 15px;
        display: flex;
        align-items: center;
        .component-radio {
          margin-right: 12px;
        }
        img {
          width: 45px;
          margin-right: 16px;
        }
        > div {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .name {
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          color: rgba(0, 0, 0, 0.9);
          // color: #ffffff;
        }
        .cardNum {
          margin-top: 12px;
          font-family: "Alibaba PuHuiTi";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          color: #4e5969;
          letter-spacing: 1px;
          // color: #ffffff;
        }
      }
    }
  }
  .addCard {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid #ececec;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 30px 15px;
    box-sizing: border-box;
    box-shadow: 10px 4px 10px rgba(78, 89, 105, 0.06);
    font-style: normal;
    font-weight: 500;
    color: #434343;
    display: flex;
    justify-content: center;
    div {
      font-weight: 400;
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>
