import request from '@/utils/request'

// 商品列表数据
export const getGoods = ({ query, pagenum, pagesize }) => {
  return request({
    url: '/goods',
    params: {
      query, pagenum, pagesize
    }
  })
}

// 添加分类
export const addCategories = (data) => {
  return request({
    method: 'GET',
    url: '/categories',
    data
  })
}
