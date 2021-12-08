<template>
  <div class="card">
    <div class="list">
      <el-card v-for="(item, index) in data" shadow="hover" :key="index">
        <h2 slot="header" @click="goWatch(item.id)">{{item.title}}</h2>
        <div class="message">{{item.userName}}</div>
        <div class="message">评论：{{item.commentCount}}  阅读：{{item.readCount}}  喜欢：{{item.likeCount}}</div>
        <p>{{item.abstract}}</p>
        <div class="tag-message message">
          <i class="el-icon-date"></i>
          <el-tag type="info" size="mini" effect="plain">{{item.creatTime}}</el-tag>
          <i class="el-icon-bank-card"></i>
          <el-tag type="info" size="mini" effect="plain">{{item.category}}</el-tag>
        </div>
      </el-card>
      <div class="page" v-if="pages.count > pages.pageSize * pages.pageNo">
        <el-pagination
            small
            background
            layout="prev, pager, next"
            :page-count="pages.pageSize"
            :current-page.sync="pages.pageNo"
            @current-change="getPageData()">
        </el-pagination>
      </div>
    </div>
    <RightMenuLayout class="right-menu-layout"/>
  </div>
</template>

<script>
import RightMenuLayout from './RightMenuLayout'
import { mapGetters } from 'vuex'
export default {
  name: 'HomeLayout',
  components: {
    RightMenuLayout
  },
  data() {
    return {
      pages: {
        pageNo: 1,
        pageSize: 10,
        title: '',
        count: 0
      },
      data: []
    }
  },
  computed: {
    ...mapGetters(['getLogin'])
  },
  methods: {
    async getPageData() {
      let { result, success, count } = await this.$dao.getHomeData(this.pages)
      if (success) {
        this.data = result
        this.count = count
      }
    },
    async getUserPageData() {
      let { result, success, count } = await this.$dao.getUserHomeData(this.pages)
      if (success) {
        this.data = result
        this.count = count
      }
    },
    goWatch(id) {
      this.$router.push({
        path: '/home/view',
        query: { id: id }
      })
    }
  },
  mounted() {
    if (this.getLogin) {
      this.getUserPageData()
    } else {
      this.getPageData(this.pages)
    }
  }
}
</script>

<style lang="less" scoped>
h2 {
  font-weight: bold;
  color: #4183c4;
  font-size: 18px;
  cursor: pointer;
}

h2:hover {
  text-decoration: underline;
}

p {
  color: #666;
  font-size: 14px;
}

.card {
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
}

.list {
  box-sizing: border-box;
  margin: 20px auto 0 auto;
  flex: 1 1 70%;
}
.right-menu-layout {
  flex: 0 0 300px;
}
.message {
  font-size: 12px;
  color: #999999;
  margin-bottom: 10px;
}
.page{
  margin: 10px auto;
  text-align: center;
}
.el-card {
  /deep/ .el-card__body {
    padding: 10px 10px 20px 10px;
  }
  /deep/ .el-card__header {
    padding: 10px 0 0 10px;
    border-bottom: none;
  }
  margin-right: 1vw;
}
.tag-message{
  margin-top: 10px;
}
</style>
