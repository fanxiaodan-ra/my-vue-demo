import axios from 'axios'
import store from '@/store'
import qs from 'qs'
// 在单独的js或ts中，要通过编码的方式加载组件
import { Message } from 'element-ui'
import router from '@/router'

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      // refreshtoken只能使用一次
      refreshtoken: store.state.user.refresh_token
    })
  })
}

const request = axios.create({
  // 配置选项
  // baseURL
  // timeout
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 在这里通过改写config配置信息实现业务功能统一处理
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
let isRefreshing = false
// 存储刷新token期间过来的401请求
let requests: any[] = []
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response) {
    const { status } = error.response
    if (status === 400) {
      Message.error('')
    } else if (status === 401) {
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }

      if (!isRefreshing) {
        isRefreshing = true
        refreshToken().then(({ data }) => {
          if (!data.success) {
            throw new Error('token 刷新失败')
          }
          store.commit('setUser', data.content)
          requests.forEach(cb => cb())
          requests = []
          return request(error.config)
        }).catch((err) => {
          redirectLogin()
          store.commit('setUser', null)
          return Promise.reject(err)
        }).finally(() => {
          isRefreshing = false
        })
      }
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('')
    } else if (status === 404) {
      Message.error('')
    } else if (status >= 500) {
      Message.error('')
    }
  } else if (error.request) {
    Message.error('')
  } else {
    Message.error('')
  }
  return Promise.reject(error)
})

// request.interceptors.response.use(function (response) {
//   // 当状态码为2xx 都会进入这里
//   // 如果是自定义错误状态吗，错误处理就写到这里
//   return response
// }, async function (error) {
//   // 查出2xx 状态吗都会执行这里
//   // 如果是http状态吗，错误处理就写到这里
//   if (error.response) {
//     // 请求收到响应，状态码不是2xx, 400|401|403|404|5xx
//     const { status } = error.response
//     if (status === 400) {
//       Message.error('请求参数错误')
//     } else if (status === 401) {
//       // token无效(token过期，token无效，token过期)
//       // 如果有 refresh_token 则尝试使用 refresh_token 获取新的 access_token
//       if (!store.state.user) {
//         redirectLogin()
//         return Promise.reject(error)
//       }
//       // 尝试刷新获取新的 token
//       if (!isRefreshing) {
//         isRefreshing = true
//         return refreshToken().then(({ data }) => {
//           if (!data.success) {
//             throw new Error('刷新token失败')
//           }
//           // 成功了 -> 则把本次失败的请求重新发出去
//           // 把成功刷新拿到的新的access_token更新到容器和本地存储中
//           store.commit('setUser', data.content)
//           // 把requests队列中的请求重新发出去
//           requests.forEach(cb => cb())
//           // 清空requests队列
//           requests = []
//           // 把本次失败的请求重新发送出去
//           return request(error.config)
//         }).catch((err) => {
//           // 清除当前用户的登录状态
//           console.log(err)
//           store.commit('setUser', null)
//           // 失败了 -> 则跳转登录页重新获取新的token
//           redirectLogin()
//           return Promise.reject(error)
//         }).finally(() => {
//           isRefreshing = true
//         })
//       }

//       // 刷新状态下把请求挂起，放到requests数组中
//       return new Promise(resolve => {
//         requests.push(() => {
//           resolve(request(error.config))
//         })
//       })
//       // 如果没有，则直接跳转登录页
//     } else if (status === 403) {
//       Message.error('没有权限，请联系系统管理员')
//     } else if (status === 404) {
//       Message.error('请求资源不存在')
//     } else if (status >= 500) {
//       Message.error('服务端错误，请联系系统管理员')
//     }
//   } else if (error.request) {
//     // 请求已发送，未收到响应，如超时，断开
//     Message.error('请求超时，请刷新重试')
//   } else {
//     // 在设置请求是发生了错误
//     Message.error(`请求失败：${error.message}`)
//   }
//   // 把请求失败的错误对象继续抛出，扔给上一个调用者
//   return Promise.reject(error)
// })

export default request
