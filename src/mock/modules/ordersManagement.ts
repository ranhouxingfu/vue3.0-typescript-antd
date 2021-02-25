import Mock from 'mockjs';
const data = Mock.mock({
  "data|100": [ //生成100条数据 数组
      {
          "key|+1": 1,//生成商品id，自增1
          "code": /^[a-z]{2}[A-Z]{2}[0-9]$/,
          "name": "@cname",//生成商品名 ， 都是中国人的名字
          "address": "@county(true)", //随机生成地址
          "orderTime": "@date('yyyy-MM-dd hh:mm:ss')",
          "delivery|1": true
      }
  ]
})
Mock.mock(RegExp('/api/orders' + ".*"), 'get', (options: any) => {
  return data;
})