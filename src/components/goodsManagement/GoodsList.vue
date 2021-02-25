<template>
  <div class="content-box">
    <a-button type="primary" @click="openDialog">新增</a-button>
    <a-form
      :model="search"
      layout="inline"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="商品名称">
        <a-input
          v-model:value="search.keyword"
          placeholder="请输入商品名称"
        ></a-input
      ></a-form-item>
      <a-form-item label="商品属性">
        <a-select
          v-model:value="search.type"
          :options="goodsTypes"
          placeholder="请选择商品属性"
          style="width: 150px"
        ></a-select>
      </a-form-item>
      <a-form-item>
        <div class="d-flex">
          <a-button type="primary">查询</a-button>
          <a-button type="primary" class="m-left-15">重置查询</a-button>
        </div>
      </a-form-item>
    </a-form>
    <Table
      :data="goods"
      :columns="columns"
      @transformCellText="transformCellText"
    >
      <template #operation="{ record }">
        <a-button type="link" @click="scanDetail(record)">详情</a-button>
        <a-button type="link" @click="openDialog(record)">编辑</a-button>
        <a-button
          type="link"
          class="delete-text-button"
          @click="deleteOne(record)"
          >删除</a-button
        >
      </template>
    </Table>
  </div>
  <goods-dialog
    :visible="visible"
    @update:visible="() => (visible = false)"
  ></goods-dialog>
</template>
<script lang="ts">
import { toRefs, reactive, computed, onMounted, inject } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import Table from "@/components/common/Table.vue";
import { getGoodsTypes } from "@/api/goodsManagement";
import GoodsDialog from "@/components/goodsManagement/GoodsDialog.vue";
import { WARNING_CONFIRM } from "@/symbol";
export default {
  name: "goodsManagement",
  components: {
    Table,
    GoodsDialog,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      visible: false,
      search: {
        keyword: "",
        type: "",
      },
      goodsTypes: [],
      columns: [
        {
          title: "商品编号",
          key: "code",
          dataIndex: "code",
        },
        {
          title: "商品名称",
          key: "name",
          dataIndex: "name",
        },
        {
          title: "商品库存",
          key: "stock",
          dataIndex: "stock",
        },
        {
          title: "商品单价",
          key: "perPrice",
          dataIndex: "perPrice",
        },
        {
          title: "商品等级",
          key: "start",
          dataIndex: "star",
        },
        {
          title: "商品描述",
          key: "desc",
          dataIndex: "desc",
        },
        {
          title: "商品产地",
          key: "address",
          dataIndex: "address",
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: "250",
          slots: { customRender: "action" },
        },
      ],
    });
    const openDialog = () => {
      state.visible = true;
    };
    const $warningConfirm:
      | ((title?: string, content?: string) => any)
      | undefined = inject(WARNING_CONFIRM);
    const deleteOne = () => {
      $warningConfirm &&
        $warningConfirm("提示", "该商品删除后将无法恢复，确认删除？").then(
          () => {
            message.success("删除成功");
          }
        );
    };
    // vuex,获取商品列表数据
    const goods = computed(() => {
      return store.getters.goods;
    });
    onMounted(async () => {
      console.log("进入onMounted周期");
      store.dispatch("getGoods", state.search);
      getGoodsTypes().then((res: any) => {
        state.goodsTypes = res;
        console.log(state.goodsTypes);
      });
    });
    const transformCellText = (cell: object) => {
      console.log("cell", cell);
    };
    const scanDetail = () => {
      router.push({name: 'goodsDetail'});
    }
    return {
      ...toRefs(state),
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
      goods,
      openDialog,
      deleteOne,
      scanDetail,
      transformCellText,
    };
  },
};
</script>