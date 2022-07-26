import request from '@/utils/request'
// 角色列表
export const getRoles = (params) => {
  return request({
    url: '/roles',
    params
  })
}
// 删除角色

export const delRoles = (id) => {
  return request({
    method: 'DELETE',
    url: `roles/${id}`
  })
}
