<template>
  <el-container>
    <el-header>
      <div class="header-left">
        <span
          class="icon iconfont icon-shouye link"
          style="font-size: 25px; margin-left: 0"
          @click="$router.push('/user')" />
        <div v-if="!getIsPhone" class="header-right">
          <router-link class="link" to="/user" exact replace>首页</router-link>
          <router-link class="link" to="/user/articleList" exact replace>文章</router-link>
          <router-link class="link" to="/user/write" exact replace>创作</router-link>
          <router-link class="link" to="/user/manageProject" exact replace>作品管理</router-link>
          <router-link class="link" to="/user/notification" exact replace>评论管理</router-link>
          <router-link class="link" to="/user/manageFriendLink" exact replace>友链</router-link>
          <router-link class="link" to="/user/setting" exact replace>个人设置</router-link>
          <router-link v-if="!getLogin" class="link" to="/login">登录</router-link>
          <div v-else class="user-btn">
            <el-avatar shape="square" :src="getUser.head"></el-avatar>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">{{getUser.name}}<i class="el-icon-arrow-down el-icon--right"/></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="loginOut">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <span v-if="getIsPhone" class="icon iconfont icon-liebiao link" style="font-size: 25px" @click="drawer = !drawer" />
      </div>
      <el-drawer
          custom-class="right-drawer"
          wrapperClosable
          size="40%"
          :modal="false"
          :visible.sync="drawer"
          :with-header="false"
      >
        <router-link v-if="!getLogin" class="link" to="/login">登录</router-link>
        <div v-else>
          <div class="head">
            <el-avatar shape="square" :src="getUser.head"></el-avatar>
            <div><strong>{{getUser.name}}</strong></div>
          </div>
        </div>
        <router-link class="link" to="/user" exact replace>首页</router-link>
        <router-link class="link" to="/user/articleList" exact replace>文章</router-link>
        <router-link class="link" to="/user/write" exact replace>创作</router-link>
        <router-link class="link" to="/user/manageProject" exact replace>作品管理</router-link>
        <router-link class="link" to="/user/notification" exact replace>评论管理</router-link>
        <router-link class="link" to="/user/manageFriendLink" exact replace>友链</router-link>
        <router-link class="link" to="/user/setting" exact replace>个人设置</router-link>
        <div class="link" @click="handleCommand('loginOut')">注销</div>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'userLayout',
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapGetters(['getLogin', 'getUser', 'getIsPhone'])
  },
  watch: {
    'getIsPhone': function (val) {
      if (!val){
        this.drawer = false
      }
    }
  },
  methods: {
    ...mapActions(['setLogin', 'setToken', 'setUser']),
    goPath(path) {
      this.$router.push(path)
    },
    handleCommand(command) {
      switch (command) {
        case 'loginOut':
          this.setToken('')
          this.setUser({})
          this.setLogin(false)
          break
        case 'setting':
          this.$router.push('/user/setting')
      }
    }
  },

}
</script>

<style lang="less" scoped>
@media screen and (min-width:300px){
  a{
    text-decoration: none;
  }
  h1{
    margin-left: 3px;
  }
  .el-container{
    margin: 0 auto;
  }
  .el-header{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    background: #23232C;
    color: #ffffff;
    position: fixed;
    width: 100%;
    z-index: 100;
    top: 0;
  }
  .el-header .header-right {
    display: flex;
    align-items: center;
  }
  .el-header .header-left{
    align-items: center;
    flex: 1 1 auto;
    display: flex;
    cursor:pointer;
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
  .link{
    display: flex;
    align-items: center;
    padding: 6px;
    border-radius: 2px;
    align-self: center;
    margin-left: 10px;
    color: #ffffff;
    cursor: pointer;
  }
  .link:hover {
    color: #ffffff;
    background-color: #6193BB;
    border-radius: 13px;
  }
  .user-btn {
    display: flex;
    align-items: center;
    padding: 6px;
    border-radius: 2px;
    align-self: center;
    margin-left: 10px;
    color: #ffffff;
    cursor: pointer;
    .el-dropdown-link {
      margin-left: 5px;
      color: #ffffff;
    }
  }
  .router-link-active {
    color: #ffffff;
    background-color: #6193BB;
    border-radius: 13px;
  }
  .head {
    margin: 10px;
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
  .el-header{
    padding: 0 calc((100% - 1200px)/2);
  }
  .el-footer, .el-main {
    margin: 0 calc((100% - 1200px)/2);
  }
}

@media screen and (min-width:1200px){

}
</style>
