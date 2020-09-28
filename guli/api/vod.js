import request from '@/utils/request'

export default {
  getVideoPlayAuth(videoId) {
    return request({
      url: `/eduvod/video/${videoId}`,
      method: 'get'
    })
  }
}
