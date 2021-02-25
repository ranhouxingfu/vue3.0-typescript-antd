import { createRouter, createWebHistory } from 'vue-router';
import LazyLoad from '@/helpers/lazyLoad';
import lazyLoad from '@/helpers/lazyLoad';
const routes = [
  {
    path: '/',
    redirect: '/about',
  },
  {
    path: '/home',
    name: 'Home',
    component: LazyLoad('Home'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: LazyLoad('About'),
    meta: {
      title: '关于我们'
    }
  },
  {
    path: '/goods',
    name: 'Goods',
    component: LazyLoad('GoodsManagement'),
    meta: {
      title: '商品管理'
    },
    children: []
  },
  {
    path: '/goods/detail',
    name: 'goodsDetail',
    component: lazyLoad('GoodsDetail'),
    meta: {
      title: '商品详情'
    },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: LazyLoad('OrdersManagement'),
    meta: {
      title: '订单管理'
    }
  },
  {
    path: '/report',
    name: 'Report',
    component: LazyLoad('ReportManagement'),
    meta: {
      title: '销售报表'
    }
  },
  {
    path: '/system',
    name: 'System',
    component: LazyLoad('SystemSet'),
    meta: {
      title: '系统设置'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
