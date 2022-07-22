import request from '@/utils/request'
// 订单数据列表

export const getMyList = ({ query, pagenum, pagesize, user_id, pay_status, is_send, order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr }) => {
  return request({
    url: '/orders',
    data: {
      query, pagenum, pagesize, user_id, pay_status, is_send, order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr
    }
  })
}
