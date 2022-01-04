<template>
  <div class="article-card">
    <el-row :gutter="12">
      <el-col :xs="22" :sm="23">
        <el-input style="width: 100%" v-model="pages.title" @change="getPageData" placeholder="搜索文章..." />
      </el-col>
      <el-col :xs="2" :sm="1">
        <span class="icon iconfont icon-liebiao" style="font-size: 25px" @click="resetPage" />
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-select style="width: 100%" v-model="pages.category" @change="getPageData" placeholder="请选择分类">
          <el-option
            v-for="item in categoryList"
            :key="item"
            :value="item"
            :label="item"
          />
        </el-select>
      </el-col>
      <el-col :span="16">
        <el-select style="width: 100%" v-model="pages.tag" multiple @change="getPageData" placeholder="请选择标签">
          <el-option
            v-for="item in tagList"
            :key="item"
            :value="item"
            :label="item"
          />
        </el-select>
      </el-col>
    </el-row>
    <div>
      <div
        class="article animate__animated animate__bounceInLeft"
        v-for="item in dataList" :key="item.id" @click="goWatch(item.id)">
        <div class="title">{{item.title}}</div>
        <div v-if="!getIsPhone" class="time">{{item.creatTime}}</div>
      </div>
      <div class="page">
        <el-pagination
          small
          background
          color="#13131a"
          layout="prev, pager, next"
          :page-count="pages.pageSize"
          :current-page.sync="pages.pageNo"
          @current-change="getPageData()">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ArticleLayout',
  data () {
    return {
      tagList: [],
      categoryList: [],
      dataList: [],
      pages: {
        pageNo: 1,
        pageSize: 10,
        title: '',
        tag: '',
        category: '',
        count: 0
      }
    }
  },
  computed: {
    ...mapGetters(['getIsPhone'])
  },
  methods: {
    async getPageData() {
      let params = {
        ...this.pages,
        tag: this.pages.tag && this.pages.tag.join(',')
      }
      let { result, success, count } = await this.$dao.fontArticle.getHomeData(params)
      if (success) {
        this.dataList = result
        this.pages.count = count
      }
    },
    async getArticleMessage () {
      let res = await this.$dao.fontArticle.articleClassify()
      if(res.success) {
        this.tagList = res.result.tags
        this.categoryList = res.result.category
      }
    },
    resetPage() {
      this.pages = this.$options.data().pages
      this.getPageData()
    },
    goWatch(id) {
      this.$router.push({
        path: '/home/view',
        query: { id: id }
      })
    }
  },
  async mounted() {
    await this.getArticleMessage()
    if (this.categoryList.indexOf(this.$route.params.tag) > -1) {
      this.pages.category = this.$route.params.tag
    } else if(this.tagList.indexOf(this.$route.params.tag) > -1) {
      this.pages.tag = [this.$route.params.tag]
    }
    await this.getPageData()
  }
}
</script>

<style scoped lang="less">
/deep/.el-input .el-input__inner {
  border-radius: 14px !important;
  background-color: #13131A !important;
  color: #dfdfdf !important;
  border: none !important;
}
.article-card {
  border-radius: 20px;
  margin: 20px auto;
  overflow: hidden;
  background: rgba(35,35,44,1);
  padding: 20px;
  max-width: 800px;
}
.el-row {
  margin-bottom: 10px;
}
.article {
  display: flex;
  padding: 10px 20px;
  background-color: #13131A;
  margin: 10px 0;
  border-radius: 20px;
  cursor: pointer;
  .title {
    color: #fff;
    justify-self: center;
    flex: 1 1 auto;
    text-align: center;
  }
  .time {
    justify-self: end;
    background-color: #454558;
    padding: 0 10px;
    border-radius: 10px;
  }
}

.page{
  margin: 10px auto;
  text-align: center;
}
</style>
