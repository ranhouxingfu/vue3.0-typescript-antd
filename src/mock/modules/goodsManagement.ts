import Mock from 'mockjs';
Mock.mock('/api/goods/types', 'get', () => {
  return [
    {
      value: "downJacket",
      label: "羽绒服",
    },
    {
      value: "down&wadded",
      label: "羽绒棉服",
    },
  ]
});
const data = Mock.mock({
  "data|100": [ //生成100条数据 数组
      {
          "key|+1": 1,//生成商品id，自增1
          "code": /^[a-z]{2}[A-Z]{2}[0-9]$/,
          "desc": "@ctitle(10)", //生成商品信息，长度为10个汉字
          "name": "@cname",//生成商品名 ， 都是中国人的名字
          "shopTel": /^1(5|3|7|8)[0-9]{9}$/,//生成随机电话号
          "address": "@county(true)", //随机生成地址
          "star|1-5": "★", //随机生成1-5个星星
          'stock|0-1000': 0,
          "perPrice|30-1000": 30, //随机生成商品价格 在30-1000之间
      }
  ]
})
Mock.mock(RegExp('/api/goods' + ".*"), 'get', (options: any) => {
  return data;
})