import request from '@/utils/request'

/**
 *登录
 * @param {手机号} mobile
 * @param {密码} password
 * @returns
 */
export const login = ({ username, password }) => {
  return request({
    method: 'post',
    url: '/login',
    data: {
      username,
      password
    }
  })
}

export function logout () {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'

  })
}

// 用户数据列表
export const getTableList = ({ pagenum, pagesize, query }) => {
  return request({
    url: '/users',
    params: {
      pagenum, pagesize, query
    }
  })
}

// 添加用户
export const addUsers = ({ username, password, email, mobile }) => {
  return request({
    method: 'POST',
    url: '/users',
    data: { username, password, email, mobile }
  })
}

// . 编辑用户提交
export const editUsers = ({ id, email, mobile }) => {
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data: {
      email, mobile
    }

  })
}

// 根据 ID 查询用户信息

export const queryUsers = (id) => {
  return request({
    url: `users/${id}`,
    params: id
  })
}

// 修改用户状态
export const editType = ({ uId, type }) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`
  })
}
