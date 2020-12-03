/**
 * 广告相关接口
 */

import request from '@/utils/request'

export const getAdList = () => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList'
  })
}

export const getAllSpaces = () => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}

export const saveOrUpdateAd = (data: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    data
  })
}

export const uploadImg = (data: any, onUploadProgress?: (progressEvent: ProgressEvent) => void) => {
  return request({
    method: 'POST',
    url: '/front/upload/img',
    data,
    onUploadProgress
  })
}

export const getAdById = (id: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdById',
    params: {
      id
    }
  })
}

export const getSpaceById = (id: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getSpaceById',
    params: {
      id
    }
  })
}

export const saveOrUpdateSpace = (data?: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/space/saveOrUpdate',
    data
  })
}
