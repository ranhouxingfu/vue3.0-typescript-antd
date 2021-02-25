import { getGoods } from '@/api/goodsManagement';
const state = {
  goods: []
};
const types = {
  GET_GOODS: 'GET_GOODS'
};
const actions = {
  async getGoods(context: any, params: object) {
    const res = await getGoods(params);
    res && context.commit(types.GET_GOODS, res?.data);
  }
};
const mutations = {
  [types.GET_GOODS](state: any, payload: any) {
    console.log('进入mutation');
    state.goods = payload || [];
  }
};
const getters = {
  goods: (state: any) => state.goods
};
export default {
  state,
  actions,
  mutations,
  getters
}