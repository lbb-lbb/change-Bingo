<template>
  <el-container>
    <el-header>
      <div class="header-left">
        <span
          class="icon iconfont icon-shouye link"
          style="font-size: 25px; margin-left: 0"
          @click="$router.push('/')" />
        <div v-if="!getIsPhone">
          <router-link class="link" to="/home" exact replace>首页</router-link>
          <router-link class="link" to="/home/article" exact replace>文章</router-link>
          <router-link class="link" to="/home/classification" exact replace>分类</router-link>
          <router-link class="link" to="/home/timeLine" exact replace>归档</router-link>
          <router-link class="link" to="/home/msgCard" exact replace>留言板</router-link>
          <router-link class="link" to="/home/friendLink" exact replace>友链</router-link>
          <router-link class="link" to="/home/project" exact replace>作品</router-link>
          <router-link class="link" to="/home/about" exact replace>关于</router-link>
          <span class="icon iconfont icon-denglu link" style="font-size: 25px" @click="login"></span>
        </div>
        <span v-if="getIsPhone" class="icon iconfont icon-liebiao link" style="font-size: 25px" @click="drawer = !drawer" />
      </div>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer>
      <div class="footer"><a href="http://beian.miit.gov.cn">粤ICP备2022001860号</a></div>
    </el-footer>
    <el-drawer
        custom-class="right-drawer"
        wrapperClosable
        size="40%"
        :modal="false"
        :visible.sync="drawer"
        :with-header="false"
    >
      <div class="right-menu">
        <div class="head">
          <el-avatar shape="square" alt="头像" :src="getCommonUser.head"></el-avatar>
          <div><strong>{{getCommonUser.name}}</strong></div>
        </div>
        <router-link class="link" to="/home" exact replace>首页</router-link>
        <router-link class="link" to="/home/article" exact replace>文章</router-link>
        <router-link class="link" to="/home/classification" exact replace>分类</router-link>
        <router-link class="link" to="/home/timeLine" exact replace>归档</router-link>
        <router-link class="link" to="/home/msgCard" exact replace>留言板</router-link>
        <router-link class="link" to="/home/friendLink" exact replace>友链</router-link>
        <router-link class="link" to="/home/project" exact replace>作品</router-link>
        <router-link class="link" to="/home/about" exact replace>关于</router-link>
        <div class="link" @click="login">登录</div>
      </div>
    </el-drawer>
  </el-container>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  name: 'BaseLayout',
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapGetters(['getIsPhone', 'getCommonUser'])
  },
  watch: {
    'getIsPhone': function (val) {
      if (!val){
        this.drawer = false
      }
    }
  },
  methods: {
    ...mapActions(['setCommonUser']),
    goPath(path) {
      this.$router.push(path)
    },
    login() {
      window.open(`${location.origin}/login`)
    },
    async getCommonUserMessage() {
      let { result, success } = await this.$dao.fontUserMs.getCommonUserMessage()
      if (success) {
        this.setCommonUser(result)
      }
    }
  },
  mounted() {
    this.getCommonUserMessage()
  }

}
</script>

<style lang="less" scoped>
@media screen and (min-width:300px) {
  a {
    text-decoration: none;
  }

  h1 {
    margin-left: 3px;
  }

  .el-container {
    margin: 0 auto;
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    background: #23232C;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    color: #ffffff;
    padding: 0 20px;
  }

  .el-header .header-left {
    flex: 1 1 auto;
    align-items: center;
    display: flex;
    cursor: pointer;
    justify-content: space-between;
  }

  /deep/ .el-drawer__body{
    background: var(--base-background-color);
  }
  .right-menu {
    height: 400px;
    .link {
      display: block;
      padding: 10px;
      margin-left: 0;
    }
  }
  .link {
    padding: 6px;
    border-radius: 2px;
    flex: 0 1 auto;
    display: inline-block;
    margin-left: 10px;
    color: #ffffff;
    cursor: pointer;
  }

  .link:hover {
    color: #ffffff;
    background-color: #6193BB;
    border-radius: 13px;
  }
  .head {
    margin: 10px;
  }
  .router-link-active {
    color: #ffffff;
    background-color: #6193BB;
    border-radius: 13px;
  }
  .el-main{
    min-height: calc(100vh - 60px);
    margin-top: 60px !important;
  }
  .el-footer{
    background: var(--base-background-color);
    opacity: 0.7;
    font-size: var(--font-min);
  }
  .footer{
    text-align: center;
    margin-top: 20px;
    a {
      color: #fff;
    }
  }
  .el-menu {
    /deep/ .el-menu-item {
      padding: 0 6px;
    }
  }
}
@media screen and (min-width:540px) {
  .el-menu {
    /deep/ .el-menu-item {
      padding: 0 20px;
    }
  }
}
@media screen and (min-width:768px) {

}

@media screen and (min-width:992px){
  .el-footer, .el-main, .el-header {
    padding: 0 calc((100% - 1200px)/2);
  }
}

@media screen and (min-width:1200px){

}
</style>
