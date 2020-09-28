<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="javascript:void(0)" @click="searchOne('')">全部</a>
                </li>
                <li v-for="(subject,index) in subjectNestedList" :key="index" :class="{active:oneIndex==index}">
                  <a :title="subject.title" href="javascript:void(0)" @click="searchOne(subject.id, index)">{{ subject.title }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"/>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(subject, index) in subSubjectList" :key="index" :class="{active:twoIndex==index}">
                  <a :title="subject.title" href="javascript:void(0);" @click="searchTwo(subject.id, index)">{{ subject.title }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"/>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange': buyCountSort != ''}">
                <a title="销量" href="javascript:void(0)" @click="searchBuyCount()">销量
                  <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtmodifiedSort!=''}">
                <a title="最新" href="javascript:void(0)" @click="searchGmtModified()">最新
                  <span :class="{hide:gmtmodifiedSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0)" @click="searchPirce()">价格&nbsp;
                  <span :class="{hide: priceSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section v-if="!data.total" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul id="bna" class="of">
              <li v-for="subject in data.items" :key="subject.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="subject.cover" :alt="subject.title" class="img-responsive">
                    <div class="cc-mask">
                      <a :href="'/course/' + subject.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/' + subject.id" title="subject.title" class="course-title fsize18 c-333">{{ subject.title }}</a>
                  </h3>
                  <section v-if="Number(subject.price) === 0" class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ subject.viewCount }}人学习</i>
                      |
                      <i class="c-999 f-fA">9634评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"/>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <a :class="{undisable: !data.hasPrevious}" href="#" title="首页" @click.prevent="goPage(1)">首</a>
            <a :class="{undisable: !data.hasPrevious}" href="#" title="前一页" @click.prevent="goPage(data.current-1)">&lt;</a>
            <a v-for="page in data.pages" :key="page" :class="{current: data.current == page, undisable: data.current == page}" :title="'第' + page + '页'" href="#" @click.prevent="goPage(page)">{{ page }}</a>
            <a :class="{undisable: !data.hasNext}" href="#" title="后一页" @click.prevent="goPage(data.current+1)">&gt;</a>
            <a :class="{undisable: !data.hasNext}" href="#" title="末页" @click.prevent="goPage(data.pages)">末</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>

<script>
import course from '@/api/course'

export default {
  data() {
    return {
      page: 1,
      data: {},
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      courseQuery: {}, // 查询表单对象
      oneIndex: -1,
      twoIndex: -1,
      buyCountSort: '',
      gmtmodifiedSort: '',
      priceSort: ''
    }
  },
  created() {
    this.initCourse()
    this.initSubject()
  },
  methods: {
    // 查询课程列表
    initCourse() {
      course.pageListWeb(1, 8).then(response => {
        this.data = response.data.data
        // console.log(this.data)
      })
    },
    // 查询一级分类 内包含二级分类
    initSubject() {
      course.nestedList().then(response => {
        this.subjectNestedList = response.data.data.items
      })
    },
    // 点击一级分类，显示对应的二级分类
    searchOne(subjectParentId, index) {
      this.oneIndex = index
      this.twoIndex = -1
      this.courseQuery.subjectId = ''
      this.subSubjectList = []
      this.courseQuery.subjectParentId = subjectParentId
      this.goPage(this.page)
      // 解析二级分类
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        if (this.subjectNestedList[i].id === subjectParentId) {
          this.subSubjectList = this.subjectNestedList[i].children
        }
      }
    },
    // 点击二级分类，查询数据
    searchTwo(subjectId, index) {
      this.twoIndex = index
      this.courseQuery.subjectId = subjectId
      this.goPage(this.page)
    },
    // 购买量查询
    searchBuyCount() {
      //  3选1 重置其他两个条件
      this.buyCountSort = '降序'
      this.gmtmodifiedSort = ''
      this.priceSort = ''
      // 赋值
      this.courseQuery.buyCountSort = this.buyCountSort
      this.courseQuery.gmtmodifiedSort = this.gmtmodifiedSort
      this.courseQuery.priceSort = this.priceSort
      this.goPage(this.page)
    },
    // 更新时间查询
    searchGmtModified() {
      //  3选1 重置其他两个条件
      this.buyCountSort = ''
      this.gmtmodifiedSort = '降序'
      this.priceSort = ''
      // 赋值
      this.courseQuery.buyCountSort = this.buyCountSort
      this.courseQuery.gmtmodifiedSort = this.gmtmodifiedSort
      this.courseQuery.priceSort = this.priceSort
      this.goPage(this.page)
    },
    // 价格查询
    searchPirce() {
      //  3选1 重置其他两个条件
      this.buyCountSort = ''
      this.gmtmodifiedSort = ''
      this.priceSort = '降序'
      // 赋值
      this.courseQuery.buyCountSort = this.buyCountSort
      this.courseQuery.gmtmodifiedSort = this.gmtmodifiedSort
      this.courseQuery.priceSort = this.priceSort
      this.goPage(this.page)
    },
    // 分页查询
    goPage(page) {
      this.page = page
      course.pageListWeb(page, 8, this.courseQuery).then(response => {
        console.log(this.courseQuery)
        this.data = response.data.data
      })
    }
  }
}
</script>

<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>
