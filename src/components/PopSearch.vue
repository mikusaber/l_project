<template>
  <div class="popup-search" :class="!props.show ? 'opacity' : ''">
    <van-popup
      :show="true"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div class="search">
        <van-search
          ref="PopSearch"
          input-align="center"
          show-action
          v-model="state.search"
          placeholder="搜索商品、藏品、专辑"
          @update:model-value="onSearch"
          @search="getList"
          @cancel="onCancel"
          :clearable="true"
        />
        <div v-if="state.tags.length" class="tag-con">
          <template v-for="(item, i) in state.tags" :key="i">
            <span @click="toList(item)" class="btn">{{
              item.ProductName
            }}</span>
          </template>
        </div>
        <Empty v-else />
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, toRefs } from "vue";
import { GetSearch } from "../httpAction";
import Empty from "./Empty.vue";
import _ from "lodash";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  show: {
    type: Boolean,
  },
});
const PopSearch = ref(null);
const emit = defineEmits(["cancel"]);
const state = reactive({
  search: "",
  tags: [],
});
watch(
  () => props.show,
  () => {
    console.log(props.show);
    if (props.show && PopSearch.value) {
      PopSearch.value && PopSearch.value.focus();

      setTimeout(() => {
        PopSearch.value.focus();
      }, 0);
    }
  }
);
onMounted(() => {
  getList();
});
const toList = (row) => {
  router.push(`/market/marketList?id=${row.ProductId}`);
  emit("cancel");
};
const getList = async () => {
  try {
    let params = {
      action: "SearchProduct",
      SearchName: state.search,
    };
    if (!params.SearchName) return;

    const res = await GetSearch(params);
    if (res.code != 0) {
      return false;
    }
    state.tags = res.data;
  } catch (e) {
    console.log(e);
  }
};
const onSearch = _.debounce((v) => {
  getList();
}, 100);
const onCancel = (v) => {
  emit("cancel");
};
</script>

<style lang="scss" scoped>
.popup-search {
  &.opacity {
    position: fixed;
    opacity: 0;
    z-index: -1;
  }
  .tag-con {
    display: flex;
    flex-wrap: wrap;
    span {
      display: inline-block;
      margin: 8px 12px;
      padding: 8px 16px;
      font-size: 14px;
      background-color: #f5f5f5;
      border-radius: 6px;
    }
  }
}
</style>
