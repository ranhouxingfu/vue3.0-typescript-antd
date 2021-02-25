import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './mock/index';
import antD from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/css/main.less';
import { warningConfirm } from "@/global/warningConfirm";
import { WARNING_CONFIRM } from '@/symbol'; 
const vm = createApp(App);
vm.provide(WARNING_CONFIRM, warningConfirm);
vm.use(store).use(router).use(antD).mount('#app')
