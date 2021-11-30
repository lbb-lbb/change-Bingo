<template>
  <el-container>
    <el-header>
      <div class="header-left" @click="$router.push('/')">
        show something
      </div>
      <div>
        <div class="link" @click="goPath('/home')">写文章</div>
        <div class="link" @click="goPath('/user/notification')">通知</div>
        <div v-if="!getLogin" class="link" @click="goPath('/login')">登录</div>
        <div v-else class="link">
          <el-avatar alt="头像" src="./public/头像.jpg"></el-avatar>
           <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">名称</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="loginOut">推出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-main>
      <router-view/>
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
  computed: {
    ...mapGetters(['getLogin'])
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
      }
    }
  },

}
</script>

<style lang="less" scoped>
@media screen and (min-width:300px){
  a{
    text-decoration: none;
    color: black;
    opacity: 0.5;
  }
  h1{
    margin-left: 3px;
  }
  .el-container{
    margin: 0 auto;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  .el-header{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    background: #6699CC;
    color: #ffffff;
    .link{
      flex: 0 1 auto;
      display: inline-block;
      margin-left: 10px;
      color: rgba(255,255,255,.5);
      cursor: pointer;
      vertical-align: middle;
      .el-dropdown-link {
        vertical-align: middle;
      }
    }
    .link:hover {
      color: #ffffff;
    }
  }
  .el-header .header-left{
    flex: 0 0 20vw;
    align-items: center;
    display: flex;
    cursor:pointer
  }
  .el-main{
    flex: 1 1 100%;
  }
  .el-footer{
    border-top: 1px solid #ccc;
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
