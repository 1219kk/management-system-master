import request from '@/utils/request'

// 左侧菜单权限
export const getMenus = (params) => {
  return request({
    url: '/menus',
    params
  })
}

export const getList = () => {
  return request({
    url: '/rights/list'
  })
}
