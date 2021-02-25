<template>
<div class="breadcrumb-box">
  <a-breadcrumb>
    <a-breadcrumb-item href="">
      <home-outlined />
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      <span>{{currentRouteTitle}}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
  </div>
</template>
<script lang="ts">
import { computed } from "vue";
import { HomeOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
export default {
  name: "breadcrumb",
  components: {
    HomeOutlined
  },
  setup(){
    const currentRoute = useRoute();
    const currentRouteTitle = computed((): string => currentRoute?.meta?.title);
    return {
      currentRouteTitle
    }
  }
}
</script>
<style lang="less" scoped>
.breadcrumb-box{
  height: 30px;
  background: #fff;
  text-align: left;
  padding: 0 15px;
}
</style>