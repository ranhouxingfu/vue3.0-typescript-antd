import http from '../http/index';
export const getGoodsTypes = () => http.GET('/api/goods/types');
export const getGoods = (params: object) => http.GET('/api/goods', params)