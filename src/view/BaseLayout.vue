<template>
  <el-container>
    <el-header>
      <div class="header-left" @click="$router.push('/')">
        图标
      </div>
      <i v-if="getIsPhone" class="el-icon-s-fold" @click="drawer = !drawer" />
     <div v-else>
       <router-link class="link" to="/home" exact replace>首页</router-link>
       <router-link class="link" to="/home/blog" exact replace>分类</router-link>
       <router-link class="link" to="/home/openSource" exact replace>归档</router-link>
       <router-link class="link" to="/home/wiki" exact replace>联系/留言</router-link>
       <router-link class="link" to="/home/about" exact replace>关于</router-link>
     </div>
      <el-drawer
          custom-class="right-drawer"
          wrapperClosable
          size="40%"
          :modal="false"
          title="我是标题"
          :visible.sync="drawer"
          :with-header="false"
      >
        <div class="right-menu">
          <router-link class="link" to="/home" exact replace>首页</router-link>
          <router-link class="link" to="/home/blog" exact replace>分类</router-link>
          <router-link class="link" to="/home/openSource" exact replace>归档</router-link>
          <router-link class="link" to="/home/wiki" exact replace>联系/留言</router-link>
          <router-link class="link" to="/home/about" exact replace>关于</router-link>
        </div>
      </el-drawer>
    </el-header>
    <el-main>
      <transition name="fade-slide" mode="out-in" appear>
        <router-view/>
      </transition>
    </el-main>
    <el-footer>
      <div class="footer"><a href="http://beian.miit.gov.cn">津ICP备2020008713号</a></div>
    </el-footer>
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
    background: #6699CC;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    color: #ffffff;

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
      background-color: rgba(255, 255, 255, 0.2);
    }

    .router-link-active {
      color: #ffffff;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  .el-header .header-left {
    flex: 0 0 20vw;
    align-items: center;
    display: flex;
    cursor: pointer
  }

  .el-header {
    /deep/ .el-drawer__body{
    background: #6699CC;
    }
  }
  .el-header .right-menu {
    background: #6699CC;
    height: 400px;
    .link {
      display: block;
      padding: 10px;
      margin-left: 0;
    }
  }
  .el-main{
    min-height: calc(100vh - 120px);
    margin-top: 60px !important;
  }
  .el-footer{
    background-color: #ffffff;
    font-size: 12px;
    color: #86909c;
  }
  .footer{
    text-align: center;
    margin-top: 20px;
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
