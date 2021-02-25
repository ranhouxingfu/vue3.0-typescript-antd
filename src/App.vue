<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <Sidebar></Sidebar>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <Header @change-menu-width='changeMenuWidth'></Header>
      </a-layout-header>
      <a-layout-content>
        <Breadcrumb></Breadcrumb>
        <div class="content">
        <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue";
import Header from "@/components/layout/Header.vue"; // @ is an alias to /src
import Sidebar from '@/components/layout/SideBar.vue';
import Breadcrumb from '@/components/layout/Breadcrumb.vue';
export default{
  name: "Home",
  components: {
    Header,
    Sidebar,
    Breadcrumb
  },
  setup() {
    const state = reactive({
      collapsed: false
    });
    const changeMenuWidth = () => {
      state.collapsed = !state.collapsed;
    }
    return {
      ...toRefs(state),
      changeMenuWidth
    }
  }
};
</script>
<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/deep/ .ant-layout-header{
  height: 50px;
  line-height: 50px;
  background: #fff !important;
   padding: 0;
   border-bottom: 1px solid  #e2e5e8;
}
.content {
  height: calc(100vh - 82px);
  background: #e2e5e8;
  padding: 15px;
  overflow: auto;
}
</style>
