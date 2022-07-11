<template>
  <div class="field-item">
    <van-cell-group>
      <van-field :border="false" size="large" v-model="value" :="$attrs" />
    </van-cell-group>
  </div>
</template>
<script>
// 使用一个简单的 <script> to declare options
export default {
  inheritAttrs: false,
};
</script>
<script setup>
import { ref } from "vue";
const props = defineProps({
  value: String | Number,
});
const value = ref(props.value);
</script>

<style lang="scss" scoped>
.field-item {
  margin-bottom: 20px;
  ::v-deep .van-cell {
    padding: 17px 15px;
    font-size: 16px;
  }
  ::v-deep .van-cell-group,
  .van-cell {
    background: transparent;
    &::after {
      display: none;
    }
  }
  ::v-deep .van-cell-group {
    border-bottom: 1.5px solid #1989fa5c;
  }
  ::v-deep .van-field__left-icon > i {
    font-size: 30px;
    position: relative;
    left: -10px;
    color: var(--van-primary-color);
  }
  ::v-deep .van-cell-group--inset {
    margin: 0;
  }
}
</style>
