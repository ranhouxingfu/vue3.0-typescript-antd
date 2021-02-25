import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
export const warningConfirm = (title = '提示', content = '该条数据删除后将无法恢复，确认删除？') => {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        title,
        icon: createVNode(ExclamationCircleOutlined),
        content,
        okText: '确定',
        cancelText: '取消',
        onOk() {
          resolve(true);
        },
        onCancel() {
          reject(false);
         },
      })
    });
  };