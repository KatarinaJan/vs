import request from '@/utils/request'

export default {
  // 登录
  submitLogin(userInfo) {
    return request({
      url: '/educenter/ucenter/login',
      method: 'post',
      data: userInfo
    })
  },
  // 根据token获取用户信息
  getLoginInfo() {
    return request({
      url: '/educenter/ucenter/auth/getLoginInfo',
      method: 'get'
      // headers: {'token': cookie.get('guli_token')}
    })
  }
}
