import request from '@/utils/request'

export default {
  countRegisterByDay(day) {
    return request({
      url: '/staservice/daily/' + day,
      method: 'post'
    })
  },
  showChart(searchObj) {
    return request({
      url: `/staservice/daily/${searchObj.begin}/${searchObj.end}/${searchObj.type}`,
      method: 'get'
    })
  }
}
