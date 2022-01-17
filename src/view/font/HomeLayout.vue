<template>
  <div class="card">
    <div class="list">
      <div v-for="item in data" class="card-list animate__animated animate__bounceInLeft" :key="item.id">
        <h2 slot="header" @click="goWatch(item.id)">{{item.title}}</h2>
        <div class="message-left">{{item.userName}}</div>
        <div class="message-right">评论：{{item.commentCount}}  阅读：{{item.readCount}}  喜欢：{{item.likeCount}}</div>
        <p class="abstract">{{item.abstract}}</p>
        <div class="tag-message message">
          <div>
            <i class="el-icon-bank-card"></i>
            <el-tag type="info" size="mini" color="#000" effect="dark">{{item.category}}</el-tag>
          </div>
          <div>
            <i class="el-icon-date"></i>
            <el-tag type="info" size="mini" color="#000" effect="dark">{{item.creatTime}}</el-tag>
          </div>
        </div>
      </div>
      <div class="page">
        <el-pagination
            small
            background
            color="#13131a"
            layout="prev, pager, next"
            :page-count="pages.pageSize"
            :current-page.sync="pages.pageNo"
            @current-change="getList()">
        </el-pagination>
      </div>
    </div>
    <RightMenuLayout class="right-menu-layout animate__animated animate__bounceInRight">
      <user-card />
      <label-card />
    </RightMenuLayout>
  </div>
</template>

<script>
import RightMenuLayout from '../common/RightMenuLayout'
import userCard from '../../components/rightCard/userCard'
import labelCard from "../../components/rightCard/labelCard";
import { mapGetters } from 'vuex'
export default {
  name: 'HomeLayout',
  components: {
    RightMenuLayout,
    userCard,
    labelCard
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
      let { result, success, count } = await this.$dao.fontArticle.getHomeData(this.pages)
      if (success) {
        this.data = result
        this.pages.count = count
      }
    },
    async getUserPageData() {
      let { result, success, count } = await this.$dao.adminArticle.getUserHomeData(this.pages)
      if (success) {
        this.data = result
        this.pages.count = count
      }
    },
    getList(){
      if (this.getLogin) {
        this.getUserPageData()
      } else {
        this.getPageData()
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
    this.getList()
  }
}
</script>

<style lang="less" scoped>
h2 {
  margin: 10px 20px;
  font-size: var(--font-title);
  font-weight: 700;
  color: #fff;
  cursor: pointer;
}

h2:hover {
  text-decoration: underline;
}

p {
  color: #dfdfdf;
  font-size: var(--font-page);
  text-indent:2em;
}

.card {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.list {
  box-sizing: border-box;
  flex: 1 1 70%;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  color: #dfdfdf;
}
.card-list {
  min-height: 200px;
  border-radius: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  background: var(--base-background-color);
}
.right-menu-layout {
  flex: 0 0 300px;
  box-sizing: border-box;
  margin-left: 20px;
}
.abstract {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin: 20px;
}
.message-left {
  display: inline-block;
  text-align: left;
  margin: 5px 20px;
  font-size: var(--font-min);
  color: var(--base-font-color);
}
.message-right {
  display: inline-block;
  text-align: right;
  margin: 5px 20px;
  font-size: 12px;
  color: var(--base-font-color);
}
.page{
  margin: 10px auto;
  text-align: center;
}
.tag-message{
  display: flex;
  justify-content: space-between;
  margin: 10px 20px 20px 20px;
}
</style>
