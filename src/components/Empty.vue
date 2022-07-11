<template>
  <div class="empty">
    <!-- <video :src="image" autoplay loop alt="" /> -->
    <img :src="image" alt="" />
    <p v-if="text" class="tips">{{ text }}</p>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from "vue";
import defaultImage from "@/assets/common/empty.png";
const props = defineProps({
  image: {
    type: String,
    default: defaultImage,
  },
  text: {
    type: String,
    default: "暂时没有数据哦~",
  },
});
</script>

<style lang="scss" scoped>
.empty {
  padding: 21px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  > img {
    width: 140px;
    height: 140px;
  }
  > video {
    width: 240px;
    height: 256px;
  }
  .tips {
    margin-top: 5px;
    font-size: 13px;
    color: #333333;
  }
  .custom {
  }
}
</style>
