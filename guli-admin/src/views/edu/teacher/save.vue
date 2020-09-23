<template>
  <div class="app-container">
    <!-- 讲师添加/修改表单 -->
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>

      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right"/>
      </el-form-item>

      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>

      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item label="讲师头像">
        <!-- 头像缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更新头像</el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from '@/api/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        // 可以不写
        id: '',
        name: '',
        intro: '',
        career: '',
        level: 0,
        avatar: process.env.OSS_PATH + '/avatar/ironman.jpg'
      },
      BASE_API: process.env.BASE_API, // 接口API地址
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0, // 上传组件id
      // 保存按钮默认禁用
      saveBtnDisabled: false
    }
  },
  // 监听路由变化
  watch: {
    $route(to, from) { // 路由变化方式
      console.log('watch $route')
      this.init()
    }
  },
  created() {
    console.log('created')
    this.init()
  },
  methods: {
    init() {
      // 判断路径是否有id值
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        // 调用根据id查询的方法
        this.getInfo(id)
      } else {
        // 如果没有id值
        this.teacher = {}
        this.teacher.avatar = process.env.OSS_PATH + '/avatar/default.jpg'
      }
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.teacher.id) {
        this.saveData()
      } else {
        this.editData()
      }
    },
    // 保存
    saveData() {
      teacher.addTeacher(this.teacher)
        .then(response => {
          // 提示信息
          return this.$message({
            type: 'success',
            message: '保存成功！'
          })
        }).then(response => {
          // 回到讲师列表页面
          this.$router.push({ path: '/teacher/list' })
        }).catch((response) => {
          console.log(response)
          this.$message({
            type: 'error',
            message: '保存失败！'
          })
        })
    },
    // 编辑-回显
    getInfo(id) {
      teacher.getTeacherById(id).then(response => {
        this.teacher = response.data.item
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: '获取数据失败'
        })
      })
    },
    // 编辑-修改
    editData() {
      // this.saveBtnDisabled = true
      teacher.amendTeacher(this.teacher).then(response => {
        // 提示信息
        this.$message({
          type: 'success',
          message: '修改成功！'
        })
        // 回到列表页面
        this.$router.push({ path: '/teacher/list' })
      })
    },

    // 上传成功后的回调函数
    cropSuccess(data) {
      console.log(data)
      this.imagecropperShow = false
      this.teacher.avatar = data.url
      // 上传成功后,重新打开上传组件时初始化组件,否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    },
    // 关闭组件
    close() {
      this.imagecropperShow = false
      // 上传失败后,重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    }
  }
}
</script>
