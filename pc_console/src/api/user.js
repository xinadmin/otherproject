import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
    baseURL: ''
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function getuserlist() {
  return request({
    // http://nsgoods/select?PageNum=1&pageSize=10
    url: '/nsgoods/select',
    method: 'post',
    // data,
    baseURL: 'http://app.zhonyou.cn'
  })
}
