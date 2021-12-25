<template>
  <div class="top">
    <div class="m-b-20 space name border-bottom">
      <div>{{pages.count}}条评论</div>
      <div v-if="!isUser" class="add-comment" @click="addComment">添加新评论</div>
    </div>
    <div class="m-b-20" v-for="item in commentGroup" :key="item.id">
      <div class="m-b-20 border-bottom">
        <div class="comment-space">
          <el-avatar shape="square" alt="头像" src="./public/头像.jpg"></el-avatar>
          <div class="main">
            <div class="name">
              {{item.name}}
              <el-divider direction="vertical"></el-divider>
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
      <div class="reply m-b-20 border-bottom" v-for="reply in item.reply" :key="reply.id">
        <div class="comment-space">
          <el-avatar shape="square" alt="头像" src="./public/头像.jpg"></el-avatar>
          <div class="main">
            <div v-if="reply.replyGroup">
              <div class="name">{{reply.name}}  回复  {{reply.replyGroup[0].name}}<el-divider direction="vertical"></el-divider><span class="time">{{item.creatTime}}</span></div>
            </div>
            <div class="name" v-else>{{reply.name}}<el-divider direction="vertical"></el-divider><span class="time">{{item.creatTime}}</span></div>
            <div class="comment">{{reply.comment}}</div>
            <div v-if="reply.replyGroup" class="comment reply-comment">
              “{{reply.replyGroup[0].comment.length> 20 ?
              reply.replyGroup[0].comment.substr(0, 20) + '...'
              : reply.replyGroup[0].comment}}”</div>
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
      showComment: ''
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
      let { success, result, count } = await this.$dao.getComment(params)
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
      let {success} = await this.$dao.changeComment(params)
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
  border-top: 1px dashed #ccc;
  padding: 20px 0;
}
.name {
  font-weight: 500;
  font-size: 14px;
}
.comment {
  font-size: 14px;
  line-height: 22px;
  margin-top: 8px;
  font-weight: normal;
}
.time {
  font-size: 14px;
  color: #86909c;
  font-weight: normal;
}
.reply-comment {
  display: flex;
  border-radius: 2px;
  padding: 0 12px;
  line-height: 34px;
  height: 34px;
  font-size: 14px;
  color: #86909c;
  margin-top: 8px;
}
.space {
  display: flex;
  justify-content: space-between;
}
.add-comment:hover {
  cursor: pointer;
  background-color: rgba(35,35,44,0.7);
  border-radius: 5px;
  padding: 3px;
}
.comment-space {
  display: flex;
  justify-items: center;
  .el-avatar {
    flex: 0 0 40px;
  }
  .main {
    margin-left: 5px;
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
    background-color: rgba(35,35,44,0.7);
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
