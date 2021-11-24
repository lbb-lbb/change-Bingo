<template>
  <div class="card">
    <div class="list">
      <div class="head">
        <el-avatar alt="头像" src="./public/头像.jpg"></el-avatar>
        <div class="message">
          <div><el-tag type="danger" size="mini" effect="plain">作者</el-tag> 再回首恍然如梦</div>
          <div>写了多少篇文章的人，回复了多少人</div>
        </div>
      </div>
      <div class="main">
        <h2 class="title">{{ article && article.title }}</h2>
        <div class="message" style="display: flex; justify-content: space-between">
          <div>评论：{{article.commentCount}}  阅读：{{article.readCount}}  喜欢：{{article.likeCount}}</div>
          <div>{{article.creatTime}}</div>
        </div>
        <div id="content" v-html="html"></div>
        <div class="end-tip">文章已经结束了</div>
        <div class="tag">
          标签：<el-tag v-for="item in tag" :key="item" type="danger" size="mini" effect="plain">{{item}}</el-tag>
        </div>
        <div>
          <Comment :title-id="this.$route.query.id" />
          <CommentGroup :id="this.$route.query.id" />
        </div>
      </div>
    </div>
    <right-menu-layout class="right-menu-layout" :page-title="needList"/>
  </div>
</template>

<script>
import RightMenuLayout from './RightMenuLayout'
import Comment from '../components/comment.vue'
import CommentGroup from '../components/CommentGroup.vue'
import { marked } from 'marked'
export default {
  name: 'ViewLayout',
  components: {
    RightMenuLayout,
    Comment,
    CommentGroup
  },
  data() {
    return {
      article: '',
      tag: [],
      list: '',
      html: ''
    }
  },
  computed: {
    needList: function() {
      const arr = []
      for (let i in this.list) {
        if (this.list[i].nodeName === 'H1' || this.list[i].nodeName === 'H2' || this.list[i].nodeName === 'H3') {
          this.list[i].setAttribute('id', this.list[i].innerText)
          const { id, innerText, nodeName } = this.list[i]
          arr.push({ id, innerText, nodeName })
        }
      }
      return arr
    }
  },
  methods: {
    async getArticleInfo () {
      const { success, result } = await this.$dao.getArticleInfo({id: this.$route.query.id})
      if (success) {
        this.article = result
        this.html = marked(result.content)
        this.tag = result.tag.replace(/，/ig,',').split(',')
        this.$nextTick(() => {
          this.list = document.getElementById('content').children
        })
      }
    }
  },
  mounted() {
    this.getArticleInfo()
  }

}
</script>

<style lang="less" scoped>
.card {
  display: flex;
  flex-wrap: wrap;
}
.head {
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  .el-avatar {
    float: left;
  }
  .message {
    font-size: 12px;
    color: #999999;
    margin-left: 50px;
  }
}
.main {
  .title {
    color: #6699CC;
    margin-bottom: 15px;
    margin-top: 15px;
  }
  .title:hover {
    color: #16a085
  }
  .message {
    font-size: 12px;
    color: #999999;
    margin-bottom: 15px;
  }
}
.list{
  flex: 1 1 70%;
  margin-right: 20px;
  box-shadow: 1px 1px 6px #ccc;
  padding: 20px 20px 0 35px ;
}
.right-menu-layout{
  box-shadow: 1px 1px 6px #ccc;
  padding: 20px;
}
.end-tip {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
}
.end-tip:before {
  flex: 1;
  display: flex;
  content: " ";
  border-top: 1px dashed #ccc;
  height: 1px;
}.end-tip:after {
   flex: 1;
   display: flex;
   content: " ";
   border-top: 1px dashed #ccc;
   height: 1px;
 }
.tag {
  border: 1px dashed #ccc;
  padding: 20px 20px 20px 35px ;
}
</style>
