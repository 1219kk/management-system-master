// // 模块化vuex
import { login } from '@/api/user'
// import { Message } from 'element-ui'
import { setToken, getToken } from '@/utils/auth'
const state = {
  // 防止刷新页面token没了
  token: getToken() || ''
}
const mutations = {
  setToken (state, token) {
    state.token = token
  }
}
const actions = {
  // context-->$store data --->外面传进来的数据
  async login (context, data) {
    try {
      const res = await login(data)
      if (res.data.meta.status === 200) {
        context.commit('setToken', res.data.data.token)
        // 数据持久化
        setToken(res.data.data.token)
      } else {
        // Message.error(res.data.meta.msg)
        return Promise.reject(new Error(res.data.meta.msg))
      }
    } catch (err) {
      // Message.error('登录失败')
      return Promise.reject(new Error('登录失败，请重新登录'))
    }
  }
}
export default {
  // 开启命名空间 上锁
  namespaced: true,
  state,
  mutations,
  actions
}
// 数据持久化 原生麻烦

// import { Login, getInfo, getUserDetailById } from '@/api/user'
// // 持久化
// import { setToken, getToken, removeToken, setTime } from '@/utils/auth'
// const state = {
//   token: getToken(),
//   userInfo: {}
// }
// const mutations = {
//   setToken (state, payload) {
//     state.token = payload
//   },
//   setUserInfo (state, payload) {
//     state.userInfo = payload
//   },
//   removeToken (state) {
//     state.token = null
//     removeToken()
//   },
//   removeUserInfo (state) {
//     state.userInfo = {}
//   }
// }
// const actions = {
//   async login (context, data) {
//     console.log(res)
//     const res = await Login(data)
//     context.commit('setToken', res)
//     setToken(res)
//     setTime(Date.now())
//   },
//   async getInfo (context) {
//     const res = await getInfo(context)
//     const res1 = await getUserDetailById(res.userId)
//     console.log(res)
//     console.log(res1)
//     context.commit('setUserInfo', { ...res, ...res1 })
//   },
//   logout (context) {
//     context.commit('removeToken')
//     context.commit('removeUserInfo')
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }

