import request from '@/utils/request'

const api_name = '/eduservice/video'

export default {
  saveVideoInfo(videoInfo) {
    return request({
      url: `${api_name}/info`,
      method: 'post',
      data: videoInfo
    })
  },
  getVideoInfoById(id) {
    return request({
      url: `${api_name}/info/${id}`,
      method: 'get'
    })
  },
  updateVideoInfoById(videoInfo) {
    return request({
      url: `${api_name}/info/${videoInfo.id}`,
      method: 'put',
      data: videoInfo
    })
  },
  removeVideoInfoByid(id) {
    return request({
      url: `${api_name}/info/${id}`,
      method: 'delete'
    })
  }
}
