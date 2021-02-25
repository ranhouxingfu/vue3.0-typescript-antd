<template>
  <div class="header-content">
    <menu-fold-outlined v-if="!collapsed" @click="collapseOrExpand" />
    <menu-unfold-outlined v-else @click="collapseOrExpand" />
  </div>
</template>
<script lang="ts">
import { toRefs, reactive } from "vue";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
export default {
  name: "header",
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  },
  setup(props: any, context: any ) {
    const state = reactive({
      collapsed: false
    });
    const collapseOrExpand = () => {
      state.collapsed = !state.collapsed;
      context.emit('changeMenuWidth');
    };
    return {
      ...toRefs(state),
      collapseOrExpand
    }
  }
};
</script>
<style lang="less" scoped>
.header-content {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 100%;
  padding: 0 15px;
}
</style>