<template>
  <div class="forget">
    <div class="field-box">
      <Field v-model="state.user" placeholder="请输入学号" clearable />
      <Field v-model="state.userName" placeholder="请输入姓名" clearable />
      <Field
        type="password"
        v-model="state.password"
        placeholder="请输入新密码"
        clearable
      />
      <Field
        type="password"
        v-model="state.password2"
        placeholder="请确认新密码"
        clearable
      />
    </div>

    <van-button
      @click="onSubmit"
      style="margin-top: 40px"
      type="primary"
      round
      >确认</van-button
    >
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
// import { sendCode } from "@/httpAction/login";
import Field from "@/components/Field.vue";
const router = useRouter();
const pageStatus = ref(0);
const state = reactive({
  user: "", // 学号
  userName:'', // 用户名
  password: "", // 密码
  password2:"",
});
const onSubmit = async () => {
    Toast("修改成功~")
};
</script>

<style lang="scss" scoped>
.forget {
  box-sizing: border-box;
  padding: 40px 22px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #f7f7f7;
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
}
</style>
