<template>
  <div class="user-card">
    <div class="introduction">
      <el-avatar :size="50" shape="square" alt="头像" :src="getCommonUser.head"></el-avatar>
      <div>早上好，我是<strong>{{getCommonUser.name}}</strong>欢迎来到我的<strong>个人博客</strong></div>
    </div>
    <div class="message">
      <el-popover
          placement="top-start"
          title="标题"
          width="200"
          trigger="hover"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <span class="icon iconfont icon-github-fill" slot="reference"></span>
      </el-popover>
      <el-popover
          placement="top-start"
          title="标题"
          width="200"
          trigger="hover"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <span class="icon iconfont icon-QQ-circle-fill" slot="reference"></span>
      </el-popover>
      <el-popover
          placement="top-start"
          title="标题"
          width="200"
          trigger="hover"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <span class="icon iconfont icon-weixin" slot="reference"></span>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "userCard",
  computed: {
    ...mapGetters(['getCommonUser'])
  }
}
</script>

<style scoped lang="less">
.user-card {
  border-radius: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  background: rgba(35,35,44,0.7);
  padding: 20px;
}
.introduction {
  display: flex;
  .el-avatar {
    flex: 0 0 50px;
  }
}
.message {
  display: flex;
  justify-content: space-around;
  align-items: end;
  .icon {
    font-size: 35px;
    padding:5px;
    cursor: pointer;
  }
  .icon:hover {
    background-color: #6193BB;
    border-radius: 15px;
  }
}
</style>