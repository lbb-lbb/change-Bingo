<template>
    <el-container>
        <el-header>
            <div class="header-left">
                <el-avatar alt="头像" src="./public/头像.jpg"></el-avatar>
                <h2>Lbb</h2>
            </div>
            <el-menu mode="horizontal" router background-color="red" text-color="#ffffff">
                <el-menu-item index="home">首页</el-menu-item>
                <el-menu-item index="blog">博客</el-menu-item>
                <el-menu-item index="openSource">随笔</el-menu-item>
                <el-menu-item index="wiki">常用工具</el-menu-item>
                <el-menu-item index="about">关于</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <router-view/>
        </el-main>
        <el-footer>
            <div><a href="http://beian.miit.gov.cn">津ICP备2020008713号</a> </div>
        </el-footer>
    </el-container>
</template>

<script>
export default {
  name: 'BaseLayout'
}
</script>

<style>
    *{
        margin: 0;
        padding: 0;
    }
</style>
<style scoped>
    .el-container{
        margin: 0 auto;
        background: #ffffff;
    }
    .el-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #6699CC;
        color: #ffffff;
    }
    .el-header .header-left{
        flex: 0 0 20vw;
        display: flex;
        align-items: center;
    }
    .el-header .el-menu{
        flex: 1 1 auto;
        justify-self: end;
    }
    a{
        text-decoration: none;
        color: black;
        opacity: 0.5;
    }
</style>
