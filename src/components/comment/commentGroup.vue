<template>
  <div class="top">
    <div class="m-b-20 space name border-bottom">
      <div>{{pages.count}}条评论</div>
      <div v-if="!isUser" class="add-comment" @click="addComment">添加新评论</div>
    </div>
    <div class="m-b-20" v-for="item in commentGroup" :key="item.id">
      <div class="m-b-20">
        <div class="comment-space">
          <el-avatar :size="50" shape="square" alt="头像" :src="item.head || defaultHead"></el-avatar>
          <div class="main">
            <div class="name">
              <strong>{{item.name}}</strong>
              <span class="time">{{item.creatTime}}</span>
            </div>
            <div class="comment">{{item.comment}}</div>
            <div>
              <div class="reply-button" @click="replyComment(item.id)">
                <span class="icon iconfont icon-xiaohuifu" style="font-size: 12px"></span>
                {{showComment === item.id ? '取消回复' : '回复'}}
              </div>
              <div v-if="isUser" class="reply-button" @click="deleteComment(3, item.id)">
                <span class="icon iconfont icon-shanchu1" style="font-size: 12px;"></span>
                删除
              </div>
            </div>
          </div>
        </div>
        <Comment :is-user="isUser" v-if="showComment === item.id" :title-id="id" :pid="item.id" @submit="submit" />
      </div>
      <div class="reply m-b-20" v-for="reply in item.reply" :key="reply.id">
        <div class="comment-space">
          <el-avatar :size="50" shape="square" alt="头像" :src="reply.userHead || reply.head || defaultHead"></el-avatar>
          <div class="main">
            <div class="name">
              <strong>{{reply.userName || reply.name}}</strong>
              <span class="userTag" v-if="reply.userHead ">博主</span>
              <span class="time">{{reply.creatTime}}</span>
            </div>
            <div class="comment">
              <div>{{reply.comment}}</div>
              <div v-if="reply.replyGroup" class="comment reply-comment">
                {{reply.replyGroup[0].name}}：“{{reply.replyGroup[0].comment.length> 20 ?
                reply.replyGroup[0].comment.substr(0, 20) + '...'
                : reply.replyGroup[0].comment}}”
              </div>
            </div>
            <div>
              <div class="reply-button" @click="replyComment(reply.id)">
                <span class="icon iconfont icon-xiaohuifu" style="font-size: 12px"></span>
                {{showComment === reply.id ? '取消回复' : '回复'}}
              </div>
              <div v-if="isUser" class="reply-button" @click="deleteComment(3, reply.id)">
                <span class="icon iconfont icon-shanchu1" style="font-size: 12px;"></span>
                删除
              </div>
            </div>
          </div>
        </div>
        <Comment :is-user="isUser" v-if="showComment === reply.id" :title-id="id" :pid="item.id" :reply-id="reply.id" @submit="submit" />
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
    <div v-if="!isUser">
      <Comment :title-id="id" ref="comment" @submit="submit" />
    </div>
  </div>
</template>

<script>
import Comment from './comment.vue'
export default {
  name: 'commentGroup',
  components: {
    Comment
  },
  props: {
    id: {
      type: String,
      required: true
    },
    isUser: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pages: {
        pageNo: 1,
        pageSize: 10,
        count: 0
      },
      commentGroup: [],
      showComment: '',
      defaultHead: require('../../public/images/head.jpeg').default
    }
  },
  methods: {
    async getComment() {
      if (!this.id) {
        this.$message.error('文章id不存在')
        return false
      }
      let params = {
        ...this.pages,
        id: this.id
      }
      let { success, result, count } = await this.$dao.fontComment.getComment(params)
      if (success) {
        this.commentGroup = result
        this.pages.count = count
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
    addComment() {
      this.$refs.comment.focus()
    },
    async deleteComment(status, id) {
      let params = {
        status: status,
        titleId: this.id,
        id: id
      }
      let {success} = await this.$dao.adminComment.changeComment(params)
      if (success) {
        this.$message.success('删除成功')
        await this.getComment()
      } else {
        this.$message.error('删除失败')
      }
    }
  },
  mounted () {
    this.getComment()
  }
}
</script>

<style scoped lang="less">
.top {
  padding: 20px 0;
}
.name {
  font-weight: 500;
  font-size: 14px;
  padding: 5px 10px;
  .userTag {
    font-size: 12px;
    padding: 5px;
    background-color: #6193BB;
    border-radius: 5px;
    margin-right: 10px;
  }
  strong {
    margin-right: 10px;
  }
}
.comment {
  font-size: 14px;
  font-weight: normal;
  background-color: #13131A;
  padding: 20px;
  border-radius: 10px;
}
.time {
  font-size: 14px;
  color: #86909c;
  font-weight: normal;
}
.reply-comment {
  color: #86909c;
}
.space {
  display: flex;
  justify-content: space-between;
}
.add-comment:hover {
  cursor: pointer;
}
.comment-space {
  display: flex;
  justify-items: center;
  .el-avatar {
    flex: 0 0 50px;
  }
  .main {
    margin-left: 10px;
    flex: 1 1 auto;
  }
  .reply-button {
    display: inline-block;
    margin-right: 16px;
    max-width: 70px;
    line-height: 20px;
    font-size: 12px;
    cursor: pointer;
    padding: 3px;
  }
  .reply-button:hover {
    background-color: rgba(35,35,44,1);
    border-radius: 5px;
  }
}
.reply {
  margin-left: 40px;
}
.m-b-20 {
  margin-bottom: 20px
}
.border-bottom {
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
  padding: 5px 0;
}

.page {
  text-align: center;
}
.end-tip {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
}
.end-tip:after {
   flex: 1;
   display: flex;
   content: " ";
   height: 1px;
   border-top: 1px dashed #ccc;
 }
</style>
