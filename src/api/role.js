import request from '@/utils/request'
// 角色列表
export const getRoles = (params) => {
  return request({
    url: '/roles',
    params
  })
}
