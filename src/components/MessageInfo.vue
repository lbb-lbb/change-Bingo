<template>
  <div>
    <div class="container" v-for="item in dataList" :key="item.id">
      <el-avatar :size="50" shape="square" class="head" alt="头像" :src="item.head || defaultHead"></el-avatar>
      <div class="main">
        <div class="content">
          <div class="message">
            <div><strong>{{item.name}}</strong></div>
            <div class="comment">{{item.comment}}</div>
            <div class="reply-comment" v-if="item.replyGroup">{{item.replyGroup.name}}：“{{item.replyGroup.comment}}”</div>
          </div>
          <div class="title" :title="item.title" @click="goWatch(item.titleId)">{{item.title}}</div>
        </div>
        <div class="action">
          <div>{{item.creatTime}}</div>
          <div>
            <div v-if="type === 0" class="action-button" @click="submitComment(1, item.id, item.titleId)">审核通过</div>
            <div v-if="type === 1 || type === 2" class="action-button" @click="replyComment(item.id)">
              {{showComment === item.id ? '取消回复' : '回复'}}
            </div>
            <div v-if="type === 1" class="action-button" @click="submitComment(2, item.id, item.titleId)">标记为已读</div>
            <div class="action-button" @click="submitComment(3, item.id, item.titleId)">删除</div>
          </div>
        </div>
        <Comment
          :is-user="true"
          v-if="showComment === item.id"
          :title-id="item.titleId"
          :pid="item.pid ? item.pid : item.id"
          :reply-id="item.id"
          @submit="submit"/>
      </div>
    </div>
    <div v-if="pages.count > pages.pageSize * pages.pageNo" class="page">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :page-count="pages.pageSize"
        :current-page.sync="pages.pageNo"
        @current-change="getComment()">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Comment from './comment/comment.vue'
export default {
  name: 'MessageInfo',
  components: {Comment},
  props: {
    type: {
      type: Number,
      required: true
    },
    dateList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      pages: {
        pageNo: 1,
        pageSize: 10,
        count: 0
      },
      showComment: '',
      dataList: [],
      defaultHead: require('../public/images/head.jpeg').default
    }
  },
  methods: {
    async getComment () {
      let { success, result } = await this.$dao.adminComment.commentList({...this.pages, status: this.type})
      if (success) {
        this.dataList = result
      } else {
        this.$message.error('获取列表失败')
      }
    },
    async submitComment(status, id, titleId) {
      let params = {
        status: status,
        titleId: titleId,
        id: id
      }
      let {success} = await this.$dao.adminComment.changeComment(params)
      if (success) {
        this.$message.success('提交成功')
        await this.getComment()
      } else {
        this.$message.error('提交失败')
      }
    },
    replyComment(val) {
      if (this.showComment === val) {
        this.showComment = ''
      } else {
        this.showComment = val
      }
    },
    submit() {
      this.showComment = ''
      this.getComment()
    },
    goWatch(id) {
      this.$router.push({
        path: '/home/view',
        query: { id: id }
      })
    }
  },
  mounted () {
    this.getComment()
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  padding: 0 20px 10px 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  .head {
    flex: 0 0 50px;
    margin-right: 10px;
  }
  .main {
    flex: 1 1 auto;
    .content {
      display: flex;
      justify-content: space-between;
      .message {
        flex: 1 1 auto;
        margin: 8px 10px 0 0;
        .comment {
          font-size: 15px;
          font-weight: 400;
          padding: 10px;
          margin-top: 8px;
          border-radius: 3px;
        }
        .reply-comment {
          display: flex;
          border-radius: 2px;
          padding: 0 12px;
          line-height: 34px;
          height: 34px;
          font-size: 12px;
        }
      }
      .title {
        padding: 6px;
        border-radius: 2px;
        flex: 0 0 75px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
      }
    }
    .action {
      display: flex;
      font-size: 12px;
      justify-content: space-between;
      margin-top: 8px;
      .action-button {
        cursor: pointer;
        margin-right: 10px;
        display: inline-block;
      }
      .action-button:hover {
        color: #1e80ff;
      }
    }
  }
}
.page {
  text-align: center;
}
</style>
