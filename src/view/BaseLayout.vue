<template>
    <el-container>
        <el-header>
            <div class="header-left" @click="$router.push('/')">
                show something
            </div>
            <el-menu mode="horizontal" router background-color="#6699CC" text-color="rgba(255, 255, 255, .5)" :default-active="activeRouter" active-text-color="#ffffff">
                <el-menu-item index="/home">首页</el-menu-item>
                <el-menu-item index="/blog">博客</el-menu-item>
                <el-menu-item index="/openSource">随笔</el-menu-item>
                <el-menu-item index="/wiki">常用工具</el-menu-item>
                <el-menu-item index="/about">关于</el-menu-item>
            </el-menu>
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
export default {
  name: 'BaseLayout',
  computed: {
    activeRouter: function() {
      return this.$route.path
    }
  }
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
            background: #ffffff;
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
            height: auto !important;
            padding: 0 0 0 10px;
        }
        .el-header .header-left{
            flex: 0 0 20vw;
            align-items: center;
            display: flex;
            cursor:pointer
        }
        .el-header .el-menu{
            flex: 0 1 auto;
            margin-left: 10px;
        }
        .el-main{
            flex: 1 1 100%;
        }
        .el-footer{
            background: #6699CC;
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
        .el-header, .el-main, .el-footer{
            padding: 0 calc((100% - 992px)/2);
        }
    }

    @media screen and (min-width:1200px){

    }
</style>
