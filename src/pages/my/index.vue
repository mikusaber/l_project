<!--
 * @Author: xueyang xueyang_xyy@163.com
 * @Date: 2022-05-09 15:11:04
 * @LastEditors: Zhengzq zhengzq@zzjgtl.com
 * @LastEditTime: 2022-06-22 20:31:51
 * @FilePath: /space-system/src/pages/my/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="my">
    <div class="my_header">
      <div class="autor">
        <img src="@/assets/my/wallet.webp" alt="" />
      </div>
      <div>{{ state.userInfo?.UserName }}</div>
    </div>
    <div class="layout-my">
      <div class="card">
        <van-row class="card-row" gutter="24">
          <van-col span="6" class="item">
            <van-icon name="balance-list-o" />
            <div>我的订单</div>
          </van-col>
          <van-col span="6" class="item" @click="handleLink('balance')">
            <van-icon name="medal-o" />
            <div>账户余额</div>
          </van-col>
          <van-col span="6" class="item">
            <van-icon name="shop-collect-o" />
            <div>我的收藏</div>
          </van-col>
          <van-col span="6" class="item">
            <van-icon name="manager-o" />
            <div>个人资料</div>
          </van-col>
        </van-row>
        <van-row class="card-row" gutter="20">
          <van-col span="6" class="item" @click="handleLink('MyBalance')">
            <van-icon name="paid" />
            <div>我的钱包</div>
          </van-col>
          <van-col span="6" class="item" @click="handleLink('real')">
            <van-icon name="credit-pay" />
            <div>实名认证</div>
          </van-col>
          <van-col span="6" class="item"> </van-col>
          <van-col span="6" class="item"> </van-col>
        </van-row>
      </div>
    </div>
    <div class="btn_bottom">
      <van-button @click="outLogin" class="out-login btn">退出登录</van-button>
    </div>
  </div>
</template>

<script setup>
import { Toast, Dialog } from "vant";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Storage } from "@/utils/help";
import { UserLogout } from "../../httpAction/login";
const router = useRouter();
let state = reactive({
  userInfo: null,
});
onMounted(() => {
  UserInfo();
});
const UserInfo = async () => {
  let data = await Storage({
    type: "L",
    data: { action: "review", name: "UserInfo" },
  });
  state.userInfo = data;
};

const outLogin = async () => {
  const res = await UserLogout({ action: "UserLogout" });
  if (res.code != 0) {
    Toast(res.message);
    return false;
  }
  Storage({
    data: {
      name: "UserInfo",
      action: "remove",
    },
  });
  setTimeout(() => {
    router.replace({
      name: "login",
    });
  }, 300);
};
const handleLink = (val) => {
  if (val == "collection") {
    router.push("/my/collection");
  } else if (val == "real") {
    router.push("/my/RealView");
  } else if (val == "card") {
    router.push("/my/card");
  } else if (val == "balance") {
    router.push("/my/balance");
  } else if (val == "MyBalance") {
    router.push("/my/MyBalance");
  }

  // if(val == 'balance') {
  //   // 余额
  //   Dialog.alert({
  //     title: '账户余额',
  //     message: '账户余额：100元',
  //     theme: 'round-button',
  //     confirmButtonText: '提现',
  //     confirmButtonColor: '#5899f1'
  //   }).then(() => {

  //   });
  // }
};
</script>

<style lang="scss" scoped>
#my {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  position: relative;
  z-index: 1;
  &::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      -30deg,
      #f5f5f5 15%,
      #08dfea4c 40%,
      #08dfea4c 60%,
      #08dfea6d 75%,
      #1296ff 100%
    );
    filter: blur(8px);
    z-index: -1;
    background-size: cover;
  }
  .my_header {
    width: 100%;
    height: 20vh;
    display: flex;
    font-weight: 600;
    font-size: 16px;
    color: #303133;
    padding: 0 18px;
    box-sizing: border-box;
    align-items: center;
    .autor {
      margin-right: 15px;
      // padding: 4px;
      border: 2px solid #ffffff;
      border-radius: 50%;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
  .layout-my {
    border-radius: 15px 15px 0 0;
    position: relative;
    top: -30px;
    flex: 1;
    padding: 15px 10px;
    .card {
      padding: 20px 15px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.04), 0 0 8px rgba(0, 0, 0, 0.04);
      .card-row {
        margin-bottom: 24px;
        &:last-child {
          margin-bottom: 0;
        }
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 14px;
          cursor: pointer;
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
  }
  .my_list {
    box-sizing: border-box;
    // margin-top: 20px;
    .my_item {
      width: 100%;
      height: 50px;
      padding: 0 15px;
      box-sizing: border-box;
      margin-top: 10px;
      border-radius: 10px;
      background: #ffffff;
      box-shadow: 10px 4px 10px rgba(78, 89, 105, 0.06);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #111;
      .left {
        display: flex;
        align-items: center;
      }
    }
  }
  .btn_bottom {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    margin-bottom: 40px;
    .out-login {
      display: block;
      margin: 0 auto;
      width: 100%;
      // background: linear-gradient(to right, #35343e, #2e2f33, #202125);
      background: #f56c6c;
      color: #ffffff;
    }
  }
}
</style>
