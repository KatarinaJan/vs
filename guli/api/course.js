import request from '@/utils/request'

export default {
  pageListWeb(page, limit, courseQuery) {
    return request({
      url: `/eduservice/course/front/${page}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },
  nestedList() {
    return request({
      url: `/eduservice/subject`,
      method: 'get'
    })
  },
  selectWebInfoById(courseId) {
    return request({
      url: `/eduservice/course/front/${courseId}`,
      method: 'get'
    })
  }
  // getCourseInfo(courseId) {
  //   return request({
  //     url: `/eduservice/course/front/getCourseInfo/${courseId}`,
  //     method: 'get'
  //   })
  // }
}
