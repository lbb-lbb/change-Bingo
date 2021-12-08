<template>
  <el-container>
    <el-header>
      <div class="header-left" @click="$router.push('/')">
        图标
      </div>
     <div>
       <router-link class="link" to="/home" exact replace>首页</router-link>
       <router-link class="link" to="/home/blog" exact replace>分类</router-link>
       <router-link class="link" to="/home/openSource" exact replace>归档</router-link>
       <router-link class="link" to="/home/wiki" exact replace>联系/留言</router-link>
       <router-link class="link" to="/home/about" exact replace>关于</router-link>
     </div>
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
export default {
  name: 'BaseLayout',
  methods: {
    goPath(path) {
      this.$router.push(path)
    }
  },

}
</script>

<style lang="less" scoped>
@media screen and (min-width:300px){
  a{
    text-decoration: none;
    color: black;
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
  .el-header .header-left{
    flex: 0 0 20vw;
    align-items: center;
    display: flex;
    cursor:pointer
  }
  .el-main{
    flex: 1 1 100%;
    background-color: #ffffff;
  }
  .el-footer{
    background-color: #ffffff;
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
