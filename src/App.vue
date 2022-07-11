<template>
  <div class="app-con">
    <NavBar />
    <div id="scrollCon" ref="scrollCon" class="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component
            :is="Component"
            :key="$route.name"
            v-if="$route.meta.keepAlive"
          />
        </keep-alive>
        <component
          :is="Component"
          :key="$route.name"
          v-if="!$route.meta.keepAlive"
        />
      </router-view>
    </div>
    <TabBar />
  </div>
</template>
<script setup>
import NavBar from "./layout/NavBar.vue";
import TabBar from "./layout/TabBar.vue";
import { nextTick, ref, watch } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute();
let scrollCon = ref(null);
watch(
  () => router.currentRoute.value,
  (val) => {
    nextTick(() => {
      console.log("route", val);
    });
  },
  {
    immediate:true
  }
);
</script>
<style lang="scss" scoped>
.app-con {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  transition: 0.3s;

  .content {
    height: calc(100vh - 96px);
    overflow: auto;
  }
}
@media screen and (min-width: 576px) {
  .app-con {
    padding: 0 4%;
  }
}
@media screen and (min-width: 768px) {
  .app-con {
    padding: 0 8%;
  }
}
@media screen and (min-width: 992px) {
  .app-con {
    padding: 0 16%;
  }
}
</style>
