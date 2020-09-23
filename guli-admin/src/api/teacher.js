import request from '@/utils/request'

export default {
  // 1讲师列表（条件查询分页）
  // current当前页 limit每页记录数 teacherQuery条件对象
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      // url: '/eduservice/teacher/' + current + '/' + limit,
      url: `/eduservice/teacher/${current}/${limit}`,
      method: 'post',
      // teacherQuery条件对象，后端使用RequestBody获取数据
      // data表示吧对象转换json进行传递到接口里面
      data: teacherQuery
    })
  },
  // 根据ID删除讲师
  removeTeacherById(id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'delete'
    })
  },
  // 新增讲师
  addTeacher(teacher) {
    return request({
      url: '/eduservice/teacher',
      method: 'post',
      data: teacher
    })
  },
  // 按id查询讲师
  getTeacherById(id) {
    return request({
      url: '/eduservice/teacher/' + id,
      method: 'get'
    })
  },

  // 按id修改讲师
  amendTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/${teacher.id}`,
      method: 'put',
      data: teacher
    })
  }
}
