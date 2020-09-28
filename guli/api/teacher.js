import request from '@/utils/request'

const api_name = '/eduservice/teacher'

export default {
  pageListWeb(page, limit) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get'
    })
  },
  selectByTeacherId(id) {
    return request({
      url: `${api_name}/front/${id}`,
      method: 'get'
    })
  }
}
