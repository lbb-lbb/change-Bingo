<template>
  <div class="card">
    <div class="list animate__animated animate__slideInLeft">
      <div class="head">
        <el-avatar shape="square" alt="头像" :src="article.head"></el-avatar>
        <div class="message">
          <div>
            <div><el-tag type="danger" size="mini" effect="plain">作者</el-tag> {{article && article.userName}}</div>
            <div>{{article && article.introduction}}</div>
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
          <div style="visibility: hidden">评论：{{article.commentCount}}  阅读：{{article.readCount}}  喜欢：{{article.likeCount}}</div>
          <div>{{article.creatTime}}</div>
        </div>
        <div>
          <MarkedView :mark-down="html"/>
        </div>
        <div class="end-tip">文章已经结束了</div>
        <div class="tag">
          <span style="background-color: #6193BB" @click="goWatch(article.category)">{{article.category}}</span>
          <span v-for="item in tag" :key="item" @click="goWatch(item)">{{item}}</span>
        </div>
        <div>
          <CommentGroup :is-user="getLogin" :id="this.$route.query.id" />
        </div>
      </div>
    </div>
    <right-menu-layout class="right-menu-layout animate__animated animate__slideInRight">
      <page-catalog :page-title="needList" />
    </right-menu-layout>
  </div>
</template>

<script>
import RightMenuLayout from '../common/RightMenuLayout'
import Comment from '../../components/comment/comment.vue'
import CommentGroup from '../../components/comment/commentGroup.vue'
import PageCatalog from "../../components/rightCard/PageCatalog";
import MarkedView from "../../components/MarkedView";
import { mapGetters } from 'vuex'
export default {
  name: 'ViewLayout',
  components: {
    RightMenuLayout,
    Comment,
    CommentGroup,
    PageCatalog,
    MarkedView
  },
  data() {
    return {
      article: '',
      articleId: this.$route.query.id,
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
      const { success, result } = await this.$dao.fontArticle.getArticleInfo({id: this.articleId})
      if (success) {
        this.article = result
        this.html = result.content
        this.tag = result.tag.replace(/，/ig,',').split(',')
        this.$nextTick(() => {
          this.list = document.querySelector('.MARKDOWN-CONTENT').children
        })
      }
    },
    editArticle() {
      this.$router.push({path: '/user/write', query: {id: this.$route.query.id}})
    },
    async deleteArticle() {
      let res = await this.$dao.adminArticle.changeArticle({ status: 3, id: this.$route.query.id })
      if (res.success) {
        this.$message.success('删除成功')
      }
    },
    goWatch(name) {
      this.$router.push({
        path: '/home/article',
        name: 'article',
        params: { tag: name },
      })
    }
  },
  activated() {
    if (this.articleId !== this.$route.query.id) {
      this.articleId = this.$route.query.id
      this.getArticleInfo()
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
  margin-top: 20px;
}
.head {
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  .el-avatar {
    float: left;
  }
  .message {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-min);
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
  .title {
    text-align: center;
    color: #6699CC;
    margin-bottom: 15px;
    margin-top: 15px;
  }
  .title:hover {
    color: #16a085
  }
  .message {
    font-size: var(--font-min);
    color: #999999;
    margin-bottom: 15px;
  }
}
.list{
  box-sizing: border-box;
  flex: 1 1 70%;
  margin: 0 auto;
  padding: var(--padding);
  border-radius: 20px;
  overflow: hidden;
  background: var(--base-background-color);
  color: #dfdfdf;
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
  border-bottom-width: 5px;
  height: 1px;
}.end-tip:after {
   flex: 1;
   display: flex;
   content: " ";
   border-top: 1px dashed #ccc;
   height: 1px;
 }
.tag {
  span{
    margin: 0 5px 20px 0;
    display: inline-block;
    cursor: pointer;
    background-color: #13131A;
    padding: 10px;
    border-radius: 10px;
    font-size: var(--font-min);
  }
}
</style>
