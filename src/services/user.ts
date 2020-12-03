/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string;
  password: string;
}
export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // 如果data是普通对象，则Content-type是application/json
    // 如果data是qs.stringify(data)转换之后的数据：key=value&key=value,则Content-Type会被设置为application/x-www-form-urlencoded
    // 如果data是FormData对象，则Content-type是multipart/form-data
    data: qs.stringify(data) // axios默认发送的是 application/json格式的数据
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

export const getUserPages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}
