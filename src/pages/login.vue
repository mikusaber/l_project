<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div class="field-box">
      <Field
        left-icon="phone-circle-o"
        v-model="state.mobile"
        type="number"
        maxlength="11"
        placeholder="请输入手机号"
        clearable
      />
      <div class="code-box">
        <Field
          left-icon="comment-circle-o"
          v-model="state.code"
          type="number"
          maxlength="6"
          placeholder="请输入验证码"
          clearable
        />
        <van-button
          :disabled="state.mobile.length !== 11 || state.verifyInfo.downTime"
          @click="sendCode"
          type="primary"
          size="mini"
          class="sendText"
          >{{
            state.verifyInfo.downTime !== 0
              ? `${state.verifyInfo.downTime}s 重新获取`
              : "获取验证码"
          }}</van-button
        >
      </div>
    </div>
    <div style="margin: 15px 0; position: inherit" id="slider"></div>
    <!-- <van-button @click="getInfo">获取按钮</van-button> -->
    <van-button
      :disabled="state.code.length != 6"
      @click="onSubmit"
      style="margin-top: 20px"
      type="primary"
      round
      >登录</van-button
    >
    <!-- <p @click="onForget" class="forget">忘记密码？</p> -->
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { login, getUserInfo, getCode, VerUserLogin } from "@/httpAction/login";
import Field from "@/components/Field.vue";
import { Storage, initNVC } from "@/utils/help.js";
const router = useRouter();

const state = reactive({
  nvcType: "nvc_message_h5",
  isNVC_SUCCESS: "false",
  mobile: "", // 手机号
  code: "", // 验证码
  verifyInfo: {
    timer: null,
    threshold: 60,
    downTime: 0,
  },
});

onMounted(() => {
  initNVC(state.nvcType, filterNvcInfo);
});

function yourRegisterRequest(json) {
  if (json.code === 800 || json.code === 900 || json.code === 500) {
    Toast(json.message || "验证失败~");
  } else if (json.code === 400) {
    document.getElementById("slider").innerHTML = "";
    window.nvc.getNC({
      renderTo: "slider",
    });
    if (state.nvcType == "nvc_message_h5") {
      state.isNVC_SUCCESS = "message_padding";
    } else if (state.nvcType == "nvc_login_h5") {
      state.isNVC_SUCCESS = "login_padding";
    }
  }
}
const filterNvcInfo = (data) => {
  console.log(data);
  let { type } = data;
  if (type == "success" && state.nvcType == "nvc_message_h5") {
    state.isNVC_SUCCESS = "message_success";
    sendCode();
  } else if (type == "success" && state.nvcType != "nvc_login_h5") {
    state.isNVC_SUCCESS = "login_success";
  }
};
const getNVCVal = () => {
  return new Promise((resolve, reject) => {
    window.nvc.getNVCValAsync(function (nvcVal) {
      resolve(nvcVal);
    });
  });
};

const getInfo = async () => {
  try {
    let params = {
      action: "UserLogin",
      userName: "f0508crm",
      password: "a123456",
    };
    params.CaptchaParm = await getNVCVal();
    const res = await VerUserLogin(params);
    yourRegisterRequest(res);
  } catch (e) {
    console.log(e);
  }
};

const onTimeDown = () => {
  let { timer, threshold } = state.verifyInfo;
  if (!timer) {
    state.verifyInfo.downTime = threshold;
    state.verifyInfo.timer = setInterval(() => {
      state.verifyInfo.downTime -= 1;
      if (state.verifyInfo.downTime <= 0) {
        state.verifyInfo.downTime = 0;
        clearInterval(state.verifyInfo.timer);
        state.verifyInfo.timer = null;
      }
    }, 1000);
  }
};
const sendCode = async () => {
  try {
    let reg = /^1[3456789]\d{9}$/;
    let params = {
      action: "SendMobileVCode_Login",
      Mobile: state.mobile,
    };
    if (!reg.exec(params.Mobile)) {
      Toast("请输入正确的手机号码~");
      return false;
    }
    if (state.isNVC_SUCCESS == "message_padding") {
      Toast("请通过滑块验证~");
      return false;
    }
    params.CaptchaParm = await getNVCVal();
    const res = await getCode(params);
    if (res.code != 0) {
      // Toast(res.message);
      yourRegisterRequest(res);
      return false;
    }
    Toast("获取成功~");
    state.nvcType = "nvc_login_h5";
    initNVC(state.nvcType, filterNvcInfo);
    onTimeDown();
  } catch (e) {
    console.log(e);
  }
};
const onSubmit = async () => {
  if (state.nvcType != "nvc_login_h5") {
    Toast("请获取验证码~");
    return false;
  } else if (state.isNVC_SUCCESS == "login_padding") {
    Toast("请通过滑块验证~");
    return false;
  }
  let params = {
    action: "UserLoginByMobileVCode",
    Mobile: state.mobile,
    VCode: state.code,
  };
  if (!params.Mobile) {
    Toast("请填写手机号~");
    return false;
  } else if (!params.VCode) {
    Toast("请填写验证码~");
    return false;
  }
  params.CaptchaParm = await getNVCVal();
  const res = await login(params);
  if (res.code != 0) {
    // Toast(res.message);
    yourRegisterRequest(res);
    return false;
  }
  let data = {
    type: "L",
    data: {
      action: "add",
      name: "Token",
      value: res.data.token,
    },
    isJson: false,
  };
  Storage(data);
  onGetUserInfo();
};
const onForget = () => {
  router.push({
    name: "forget",
  });
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
    Toast("登录成功~");
    setTimeout(() => {
      router.replace({
        name: "home",
      });
    }, 200);
  } catch (e) {
    console.log(e);
  }
};
</script>
<style>
.nc_wrapper {
  width: 100% !important;
  height: 48px !important;
  line-height: 48px !important;
}
.nc_scale,
.nc-lang-cnt,
.nc-lang-cnt {
  height: 48px !important;
  line-height: 48px !important;
}
.btn_slide {
  height: 46px !important;
  line-height: 46px !important;
}
.nc-container .nc_scale .btn_ok {
  height: 46px !important;
  line-height: 46px !important;
}
</style>
<style lang="scss" scoped>
.login {
  box-sizing: border-box;
  padding: 0 22px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-image: linear-gradient(150deg, #ffffff 30%, #dfd7f6 100%);
  .logo {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    margin: 50px auto;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .field-box {
    .doubt {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: var(--van-primary-color);
      > img {
        width: 14px;
        height: 14px;
        margin-right: 5px;
      }
    }
  }
  .forget {
    margin-top: 15px;
    font-size: 15px;
    font-weight: 400;
    color: #666;
    text-align: center;
  }
  .code-box {
    position: relative;
    ::v-deep .field-item .van-cell {
      padding-right: 160px;
    }
    .sendText {
      position: absolute;
      right: 16px;
      top: calc(50% - 12px);
      font-size: 14px;
      font-weight: 500;
      padding: 8px 6px;
      color: var(--van-primary-color);
      background-color: #fff;
      border: none;
      cursor: pointer;
      user-select: none;
      transition: 0.15s;
      &:active {
        transform: scale(0.9);
      }
    }
  }
}
</style>
