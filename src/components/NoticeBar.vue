<template>
  <div>
    <div class="textBox">
      <transition name="slide">
        <p class="text" :key="text.id">
          <el-tag type="warning">{{ text.val.tag }}</el-tag>
          {{ text.val.title }}
        </p>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from "vue";
const state = reactive({
  textArr: [],
  number: 0,
});
const text = computed(() => {
  return {
    id: state.number,
    val: state.textArr[state.number],
  };
});
onMounted(() => {
  startMove();
});
const startMove = () => {
  // eslint-disable-next-line
  let timer = setTimeout(() => {
    if (state.number === state.textArr.length) {
      state.number = 0;
    } else {
      state.number += 1;
    }
    startMove();
  }, 3000); // 滚动不需要停顿则将2000改成动画持续时间
};
</script>

<style scoped>
.textBox {
  font-size: 16px;
  width: 100%;
  min-height: 20px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  text-align: center;
  overflow: hidden;
}
.text {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s linear;
}
.slide-enter {
  transform: translateY(20px);
}
.slide-leave-to {
  transform: translateY(-20px);
}
</style>
