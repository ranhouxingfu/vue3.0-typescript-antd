import axios from 'axios';
import { message, notification } from 'ant-design-vue';
import nprogress from 'nprogress';
// 请求取消
const CancelToken: any = axios.CancelToken;
const pending: any[] = [];
const removePending: any = (config: any) => {
  pending.forEach((p) => {
    const params = JSON.stringify(config.data) || JSON.stringify(config.params);
    if (p.u === `${config.url}${params}&${config.method}`) {
      p.f();
      pending.splice(p, 1);
    }
  });
};
axios.defaults.baseURL = '';
axios.defaults.timeout = 60000;
const http = axios.create();

http.interceptors.request.use(
  (config) => {
    nprogress.start();
    removePending(config);

    config.cancelToken = new CancelToken((c: any) => {
      const params = JSON.stringify(config.data) || JSON.stringify(config.params);
      pending.push({
        u: `${config.url}${params}&${config.method}`,
        f: c
      });
    });
    return Promise.resolve(config);
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    nprogress.done();
    removePending(response.config);
    if (!response.data.status) {
      switch (response.data.code) {
        case '401':
          return notification.error({
            message: '错误',
            description: response.data.message || '未知异常！',
            duration: 3,
          });
        case '404':
          return notification.error({
            message: '错误',
            description: response.data.message || '未知异常！',
            duration: 3,
          });
        case '500':
          return notification.error({
            message: '错误',
            description: response.data.message || '服务器连接错误！',
            duration: 3,
          });
        default:
      }
    }
    return response.data;
  },
  (error) => {
    const isCancel = error && !error.message;
    const resMessage = !isCancel ? error.response.data.message : '取消上一次请求';
    if (!isCancel) {
      message.error(resMessage ? resMessage : '请求数据失败');
    }
    return Promise.reject(resMessage);
  }
);

export default {
  GET(url: string, params = {}, config = {}) {
    return http.get(url, { params: params, ...config })
  },
  POST(url: string, params = {}, config = {}) {
    return http.post(url, params, { ...config })
  },
  PUT(url: string, params = {}, config = {}) {
    return http.put(url, params, { ...config })
  },
  DELETE(url: string, params = {}, config = {}) {
    return http.delete(url, { data: params, ...config })
  }
};
