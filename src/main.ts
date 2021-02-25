import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './mock/index';
import antD from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/css/main.less';
createApp(App).use(store).use(router).use(antD).mount('#app')
