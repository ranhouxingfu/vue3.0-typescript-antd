<template>
  <a-modal :visible="visible" title="商品管理" @cancel="handleCancel">
    <template #footer>
      <a-button key="back" @click="handleCancel"> 关闭 </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
      >
        保存
      </a-button>
    </template>
    <a-form
      :model="form"
      :ref="formDOM"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="商品名称" name="name">
        <a-input v-model:value="form.name"></a-input>
      </a-form-item>
      <a-form-item label="商品类别" name="type">
        <a-select v-model:value="form.type" :options="typeOptions"> </a-select>
      </a-form-item>
      <a-form-item label="商品库存" name="stock">
        <a-input-number
          v-model:value="form.stock"
          :min="0"
          :step="1"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="商品单价" name="perPrice">
        <a-input-number
          v-model:value="form.perPrice"
          :min="0"
          :step="0.5"
        ></a-input-number>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  name: "goodsDialog",
  props: {
    visible: {
      default: false,
      type: Boolean,
    }
  },
  setup(props: any, context: any) {
    /** ref和reactive有什么区别 */
    const state = reactive({
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      typeOptions: [],
      form: {
        name: "",
        type: "",
        stock: "",
        perPrice: "",
      },
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择商品类别", trigger: "change" },
        ],
        stock: [
          {
            required: true,
            message: "请输入商品库存",
            type: "number",
            trigger: "blur",
          },
        ],
        perPrice: [
          {
            required: true,
            message: "请输入商品单价",
            type: "number",
            trigger: "blur",
          },
        ],
      },
    });
    // 获取组件实例ref
    let refs: any = null;
    const formDOM = (el: object) => {
      refs = el;
    };
    const store = useStore();
    // methods
    const handleOk = () => {
      state.loading = true;
      refs
        .validate()
        .then(() => {
          store.dispatch("getGoods");
          context.emit("update:visible");
        })
        .catch((err: object) => {
          console.log(err);
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const handleCancel = () => {
      refs.resetFields();
      context.emit("update:visible");
    };
    return {
      ...toRefs(state),
      handleOk,
      handleCancel,
      formDOM,
    };
  },
};
</script>