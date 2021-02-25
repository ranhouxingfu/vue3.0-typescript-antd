import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
export const warningConfirm = (title: string, content: string) => {
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