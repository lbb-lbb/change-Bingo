<template>
  <div class="card">
    <div class="list">
      <div class="head">
        <el-avatar alt="头像" :src="article.head"></el-avatar>
        <div class="message">
          <div>
            <div><el-tag type="danger" size="mini" effect="plain">作者</el-tag> {{article && article.userName}}</div>
            <div>写了多少篇文章的人，回复了多少人</div>
          </div>
          <div v-if="getLogin" class="action">
            <div @click="editArticle">
              <span class="icon iconfont icon-bianji" style="font-size: 12px"></span>
              <span>编辑</span>
            </div>
            <div @click="deleteArticle">
              <span class="icon iconfont icon-shanchu1" style="font-size: 12px"></span>
              <span>删除</span>
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <h2 class="title">{{ article && article.title }}</h2>
        <div class="message" style="display: flex; justify-content: space-between">
          <div>评论：{{article.commentCount}}  阅读：{{article.readCount}}  喜欢：{{article.likeCount}}</div>
          <div>{{article.creatTime}}</div>
        </div>
        <div class="abstract">{{article.abstract}}</div>
        <div id="content" v-html="html"></div>
        <div class="end-tip">文章已经结束了</div>
        <div class="tag">
          标签：<el-tag v-for="item in tag" :key="item" type="danger" size="mini" effect="plain">{{item}}</el-tag>
        </div>
        <div>
          <CommentGroup :is-user="getLogin" :id="this.$route.query.id" />
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
import highlight from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { marked } from 'marked'
import { mapGetters } from 'vuex'
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
    ...mapGetters(['getLogin']),
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
          highlight.highlightAll();

        })
      }
    },
    editArticle() {
      this.$router.push({path: '/user/write', query: {id: this.$route.query.id}})
    },
    async deleteArticle() {
      let res = await this.$dao.changeArticle({ status: 3, id: this.$route.query.id })
      if (res.success) {
        this.$message.success('删除成功')
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
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
}
.head {
  padding: 20px;
  border-bottom: 1px solid #eee;
  .el-avatar {
    float: left;
  }
  .message {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999999;
    margin-left: 50px;
    .action {
      align-self: center;
      display: flex;
      span:nth-child(2n+1) {
        margin-left: 10px;
      }
      div:hover {
        cursor: pointer;
        color: #1e80ff;
      }
    }
  }
}
.main {
  padding: 20px;
  .abstract {
    margin-top: 20px;
    margin-bottom: 10px;
    padding: 0 10px 5px 10px;
    color: #dfdfdf;
    border-radius: 10px;
    border-left: 4px solid #dfdfdf;
    border-right: 4px solid #dfdfdf;
    background-color: #13131A;
  }
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
  box-sizing: border-box;
  border-radius: 20px;
  background: #23232C;
}
.right-menu-layout{
  flex: 0 0 300px;
  box-sizing: border-box;
  margin-left: 20px;
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
  .el-tag {
    margin-right: 5px;
  }
}
</style>
<style lang="less">
#content {
  h1, h2 {
    margin: 15px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  h3 {
    margin: 10px 0;
  }
  p {
    margin-bottom: 10x;
  }
  img {
    width: 100%;
  }
  code {
    border-radius: 20px
  }
}
</style>
