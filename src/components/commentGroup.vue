<template>
  <div class="top">
    <div class="m-b-20" style="border-bottom: 1px solid #eee;">{{}}条评论</div>
    <div class="m-b-20" v-for="item in commentGroup" :key="item.id">
      <div class="m-b-20">
        <div class="space">
          <el-avatar alt="头像" src="./public/头像.jpg"></el-avatar>
          <div class="main">
            <div>{{item.name}}<el-divider direction="vertical"></el-divider><span>{{item.creatTime}}</span></div>
            <div>{{item.comment}}</div>
            <div class="reply-button">
              <el-button size="small" type="primary" @click="replyComment(item.id)">{{showComment === item.id ? '取消回复' : '回复'}}</el-button>
            </div>
          </div>
        </div>
        <Comment v-if="showComment === item.id" :title-id="id" :pid="item.id" @submit="submit" />
      </div>
      <div class="reply m-b-20" v-for="reply in item.reply" :key="reply.id">
        <div class="space">
          <el-avatar alt="头像" src="./public/头像.jpg"></el-avatar>
          <div class="main">
            <div v-if="reply.replyGroup">
              <div>{{reply.name}}回复{{reply.replyGroup[0].name}}<el-divider direction="vertical"></el-divider><span>{{item.creatTime}}</span></div>
              <div>{{reply.replyGroup[0].comment.length> 20 ? reply.replyGroup[0].comment.substr(0, 20) + '...' : reply.replyGroup[0].comment}}</div>
            </div>
            <div v-else>{{reply.name}}<el-divider direction="vertical"></el-divider><span>{{item.creatTime}}</span></div>
            <div>{{reply.comment}}</div>
            <div class="reply-button">
              <el-button size="small" type="primary" @click="replyComment(reply.id)">{{showComment === reply.id ? '取消回复' : '回复'}}</el-button>
            </div>
          </div>
        </div>
        <Comment v-if="showComment === reply.id" :title-id="id" :pid="item.id" :reply-id="reply.id" @submit="submit" />
      </div>
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
    }
  },
  data () {
    return {
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
      let { success, result } = await this.$dao.getComment( {id: this.id})
      if (success) {
        this.commentGroup = result
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
  padding: 20px;
}
.space {
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
    text-align: right;
  }
}
.reply {
  margin-left: 40px;
}
.m-b-20 {
  margin-bottom: 20px
}
</style>
