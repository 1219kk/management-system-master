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
export const getCategories = (params) => {
  return request({
    method: 'GET',
    url: '/categories',
    params
  })
}

// 分类参数管理
// 参数列表

export const getAttributes = ({ id, params }) => {
  return request({
    url: `categories/${id}/attributes`,
    params
  })
}

// 删除商品
export const delGoods = (id) => {
  return request({
    method: 'DELETE',
    url: `goods/${id}`
  })
}

// shop1添加商品
export const addGoods = (data) => {
  return request({
    method: 'POST',
    url: 'post',
    data
  })
}

// shop3添加分类
export const addCategories = (data) => {
  return request({
    method: 'POST',
    url: 'categories',
    data
  })
}

// shop1编辑
export const editGoods = (data) => {
  return request({
    method: 'PUT',
    url: `goods/${data.id}`
  })
}
