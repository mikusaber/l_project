<template>
  <div class="realView">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="state.username"
          name="姓名"
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="state.card"
          name="身份证"
          label="身份证"
          placeholder="身份证"
          :rules="[{ required: true, message: '请填写身份证号码' }]"
        />
      </van-cell-group>
      <div v-if="state.isSubmit" style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import { Toast } from "vant";
import { reactive, onMounted, watch } from "vue";
import { UserAuthorizeIdCard } from "@/httpAction/real";
import { Storage } from "@/utils/help";
import { getUserInfo } from "@/httpAction/login";
const state = reactive({
  username: "", //姓名
  card: "", //身份证号码
  isSubmit:true
});

onMounted(() => {
  onGetUserInfo();
});
const onSubmit = async () => {
  try {
    let params = {
      action: "UserAuthorizeIdCard",
      IdCardName: state.username,
      IdCardNo: state.card,
    };
    if (params.IdCardName.includes("*") || params.IdCardNo.includes("*")) {
      Toast("请填写正确的实名认证信息~");
      return false;
    }
    const res = await UserAuthorizeIdCard(params);
    state.isLoading = false;
    if (res.code != 0) {
      Toast(res.message);
      return false;
    }
    Toast("认证成功~");
    history.back();
  } catch (e) {
    state.isLoading = false;
  }
};
const onGetUserInfo = async () => {
  try {
    const res = await getUserInfo({ action: "GetMemberInfo" });
    if (res.code != 0) {
      Toast(res.message);
      return false;
    }
    let data = {
      type: "L",
      data: {
        action: "add",
        name: "UserInfo",
        value: res.data,
      },
    };
    Storage(data);
    state.userInfo = res.data;
    let { IdCardName, IdCardNo } = res.data;
    state.username = IdCardName;
    state.card = IdCardNo;
    if (IdCardName && IdCardNo) {
      state.isSubmit = false;
    }
    console.log(res.data);
  } catch (e) {
    console.log(e);
  }
};
</script>
<style lang="scss" scoped>
.realView {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
