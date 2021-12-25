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
          <router-link class="link" to="/home/blog" exact replace>分类</router-link>
          <router-link class="link" to="/home/openSource" exact replace>归档</router-link>
          <router-link class="link" to="/home/wiki" exact replace>联系/留言</router-link>
          <router-link class="link" to="/home/wiki" exact replace>友链</router-link>
          <router-link class="link" to="/home/wiki" exact replace>作品</router-link>
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
      <div class="footer"><a href="http://beian.miit.gov.cn">津ICP备2020008713号</a></div>
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
          <el-avatar shape="square" alt="头像" src="./public/头像.jpg"></el-avatar>
        </div>
        <router-link class="link" to="/home" exact replace>首页</router-link>
        <router-link class="link" to="/home/blog" exact replace>分类</router-link>
        <router-link class="link" to="/home/openSource" exact replace>归档</router-link>
        <router-link class="link" to="/home/wiki" exact replace>联系/留言</router-link>
        <router-link class="link" to="/home/wiki" exact replace>友链</router-link>
        <router-link class="link" to="/home/wiki" exact replace>作品</router-link>
        <router-link class="link" to="/home/about" exact replace>关于</router-link>
      </div>
    </el-drawer>
  </el-container>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'BaseLayout',
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapGetters(['getIsPhone'])
  },
  watch: {
    'getIsPhone': function (val) {
      if (!val){
        this.drawer = false
      }
    }
  },
  methods: {
    goPath(path) {
      this.$router.push(path)
    },
    login() {
      window.open(`${location.origin}/login`)
    }
  },

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
    background: rgba(35,35,44,0.7);
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
    background: rgba(35,35,44,0.7);
    opacity: 0.7;
    font-size: 12px;
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
