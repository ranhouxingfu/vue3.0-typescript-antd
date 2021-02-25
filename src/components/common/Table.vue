<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #switch="{record}">
      <slot name="switch" :record="record"></slot>
    </template>
    <template #action="{record}">
      <slot name="operation" :record="record"></slot>
    </template>
  </a-table>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue";
export default {
  name: "table",
  props: {
    columns: {
      default: () => [
        {
          title: "名称",
          key: 'name',
          dataIndex: "name",
        },
        {
          title: "库存",
          key: 'stock',
          dataIndex: "stock",
        },
        {
          title: "单价",
          key: 'perPrice',
          dataIndex: "perPrice",
        },
        {
          title: "操作",
          key: "action",
          fixed: 'right',
          width: '200',
          slots: { customRender: "action" },
        },
      ],
      type: Array,
    },
    data: {
      default: () => [],
      type: Array,
    }
  },
  setup() {
    const state = reactive({
      pagination: true,
      loading: false,
    });
    const handleTableChange = () => {
      console.log(123);
    };
    return {
      ...toRefs(state),
      handleTableChange,
    };
  },
};
</script>