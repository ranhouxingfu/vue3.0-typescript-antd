import http from '../http/index';
export const getOrders = () => http.GET('/api/orders');