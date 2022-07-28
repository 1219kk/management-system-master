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

// 编辑角色
export const editRoles = ({ id, roleName, roleDesc }) => {
  return request({
    method: 'PUT',
    url: `roles/${id}`,
    data: {
      roleName, roleDesc
    }
  })
}

// 添加角色
export const addRoles = ({ roleName, roleDesc }) => {
  return request({
    method: 'POST',
    url: 'roles',
    data: {
      roleName, roleDesc
    }
  })
}
