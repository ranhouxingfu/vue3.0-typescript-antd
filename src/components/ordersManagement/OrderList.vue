<template>
<div class="content-box">
  <Table :data="orders" :columns="columns">
    <template #switch="{ record }">
      <a-switch
        checked-children="已出库"
        un-checked-children="未出库"
        v-model:checked="record.delivery"
      />
    </template>
    <template #operation="{ record }">
      <a-button type="link" @click="edit(record)">编辑</a-button>
      <a-button
        type="link"
        class="delete-text-button"
        @click="deleteOne(record)"
        >删除</a-button
      >
    </template>
  </Table>
  </div>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs } from "vue";
import Table from "@/components/common/Table.vue";
import { getOrders } from "@/api/ordersManagement";
import { message } from "ant-design-vue";
import { warningConfirm } from "@/global/warningConfirm";
export default {
  name: "order-list",
  components: {
    Table,
  },
  setup() {
    const state = reactive({
      orders: [],
      columns: [
        {
          title: "订单编号",
          key: "code",
          dataIndex: "code",
        },
        {
          title: "下单人",
          key: "name",
          dataIndex: "name",
        },
        {
          title: "订单地址",
          key: "address",
          dataIndex: "address",
        },
        {
          title: "下单时间",
          key: "orderTime",
          dataIndex: "orderTime",
        },
        {
          title: "是否出库",
          key: "delivery",
          dataIndex: "delivery",
          fixed: "right",
          width: "200",
          slots: { customRender: "switch" },
        },
        {
          title: "操作",
          key: "action",
          dataIndex: "action",
          fixed: "right",
          width: "200",
          slots: { customRender: "action" },
        },
      ],
    });
    onMounted(() => {
      getOrders()
        .then((res: any) => {
          state.orders = res.data;
        })
        .catch((err) => {
          message.error(err || "获取数据失败");
        });
    });
    const edit = (): void => {
      console.log('编辑');
    };
    const deleteOne = (): void => {
      warningConfirm("提示", "该订单删除后将无法恢复，确认删除？")
        .then(() => {
          message.success("删除成功");
        });
    };
    return {
      ...toRefs(state),
      edit,
      deleteOne,
    };
  },
};
</script>