<template>
  <div class="logo">
    <h1>VUE3.0练习</h1>
  </div>
  <a-menu
    theme="dark"
    mode="inline"
    :default-selected-keys="defaultSelectedKeys"
  >
    <template v-for="menu in menus">
      <a-sub-menu
        v-if="menu.children && menu.children.length > 0"
        :key="menu.name"
      >
        <template #title>
          <span class="anticon">
            <Icon :iconClass="menu.icon" />
          </span>
          <span>{{ menu.name }}</span>
        </template>
        <a-menu-item
          v-for="item in menu.children"
          :key="item.path"
          @click="goPage(item)"
        >
          <span class="anticon">
            <Icon :iconClass="item.icon" />
          </span>
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else @click="goPage(menu)" :key="menu.path">
        <span class="anticon">
          <Icon :iconClass="menu.icon" />
        </span>
        <span>{{ menu.name }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>
<script lang="ts">
import Icon from "@/components/common/Icon.vue";
import { reactive, toRefs, computed } from "vue";
//首先的从vue-router中导入useRouter
import { useRouter, useRoute } from "vue-router";
interface RouteInfo {
  path: string;
  name: string;
}
export default {
  name: "sideBar",
  components: {
    Icon,
  },
  setup() {
    const router = useRouter();
    const currentRoute = useRoute();
    const state = reactive({
      menus: [
        {
          name: "数据报表",
          icon: "iconbaobiao",
          children: [
            {
              name: "销售报表",
              path: "/report",
              icon: "iconxiaoshou",
            },
          ],
        },
        {
          name: "订单管理",
          path: "/orders",
          icon: "iconorder",
        },
        {
          name: "商品管理",
          path: "/goods",
          icon: "icongoods",
        },
        {
          name: "关于我们",
          path: "/about",
          icon: "iconabout",
        },
        {
          name: "系统设置",
          path: "/system",
          icon: "iconsetting",
        },
      ],
      defaultSelectedKeys: computed(
        (): Array<string> => {
          return [currentRoute.path];
        }
      ),
    });
    const goPage = (item: RouteInfo) => {
      router.push({ path: item.path });
    };
    return {
      ...toRefs(state),
      currentRoute,
      goPage,
    };
  },
};
</script>
<style lang="less" scoped>
@import "@/assets/css/variable.less";
@import "@/assets/css/mixin.less";
.logo {
  height: (@height-30);
  margin: (@margin-15);
  .border(1px, dotted, @borderColor);
  h1 {
    color: #fff;
    line-height: (@height-30);
  }
}
.anticon {
  color: #fff;
}
</style>