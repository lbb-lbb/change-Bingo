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
      <div class="page">
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
    <RightMenuLayout/>
  </div>
</template>

<script>
import { getHomeData } from '../api'
import RightMenuLayout from './RightMenuLayout'

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
        title: ''
      },
      data: []
    }
  },
  methods: {
    async getPageData() {
      let { result, success, total } = await getHomeData(this.pages)
      if (success) {
        this.data = result
      }
    },
    goWatch(id) {
      this.$router.push({
        path: '/view',
        query: { id: id }
      })
    }
  },
  created() {
    this.getPageData(this.pages)
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
        margin: 20px auto 0 auto;
        flex: 1 1 70%;
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
