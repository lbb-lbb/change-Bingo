<template>
    <el-container>
        <el-header>
            <div class="header-left" @click="$router.push('/')">
                <el-avatar alt="头像" src="./public/头像.jpg"></el-avatar>
                <h2>Lbb</h2>
            </div>
            <el-menu mode="horizontal" router background-color="#6699CC" text-color="rgba(255, 255, 255, .5)" active-text-color="#ffffff">
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
            <div class="footer"><a href="http://beian.miit.gov.cn">津ICP备2020008713号</a></div>
        </el-footer>
    </el-container>
</template>

<script>
export default {
  name: 'BaseLayout'
}
</script>

<style scoped>
    @media screen and (min-width:300px){
        h2{
            color: blue;
        }
        a{
            text-decoration: none;
            color: black;
            opacity: 0.5;
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
            flex-wrap: wrap;
            align-items: center;
            background: #6699CC;
            color: #ffffff;
            height: auto !important;
            padding: 10px 0 0 10px;
        }
        .el-header .header-left{
            flex: 0 0 20vw;
            align-items: center;
            display: flex;
            cursor:pointer
        }
        .el-header .el-menu{
            flex: 1 1 auto;
        }
        .el-main{
            flex: 1 1 100%;
        }
        .el-footer{
            background: #6699CC;
        }
        .footer{
            text-align: center;
            margin: 0;
        }
    }

    @media screen and (min-width:768px) {
        h2{
            color: violet;
        }
    }

    @media screen and (min-width:992px){
        h2{
            color: chartreuse;
        }
    }

    @media screen and (min-width:1200px){
        h2{
            color: gold;
        }
    }
</style>
