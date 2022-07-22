import request from '@/utils/request'
// 订单数据列表

export const getMyList = (params) => {
  return request({
    url: '/orders',
    params
  })
}
