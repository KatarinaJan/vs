import request from '@/utils/request'

export default {
  // 1、创建订单
  createOrder(cid) {
    return request({
      url: '/eduorder/order/createOrder/' + cid,
      method: 'post'
    })
  },
  // 2、根据订单id获取订单
  getOrderByOrderNo(cid) {
    return request({
      url: '/eduorder/order/' + cid,
      method: 'get'
    })
  },
  // 3、生成微信支付二维码
  generateQrCode(cid) {
    return request({
      url: '/eduorder/pay/generateQrCode/' + cid,
      method: 'get'
    })
  },
  // 4、根据订单id获取订单支付状态
  queryPayStatus(cid) {
    return request({
      url: '/eduorder/pay/queryPayStatus/' + cid,
      method: 'get'
    })
  }
}
