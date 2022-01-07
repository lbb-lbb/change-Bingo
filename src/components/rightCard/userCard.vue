<template>
  <div class="user-card">
    <div class="introduction">
      <el-avatar :size="50" shape="square" alt="头像" :src="getCommonUser.head"></el-avatar>
      <div>{{ greetings }}，我是<strong>{{getCommonUser.name}}</strong>欢迎来到我的<strong>个人博客</strong></div>
    </div>
    <div class="message">
      <el-popover>
        <span slot="reference" class="icon iconfont icon-github-fill" @click="goLink(getCommonUser.github)"></span>
      </el-popover>
      <el-popover
          placement="top"
          popper-class="POPOVER_IMG"
          :visible-arrow="false"
          trigger="hover"
      >
        <el-avatar :size="100" slot shape="square" alt="头像" :src="getCommonUser.qq"></el-avatar>
        <span class="icon iconfont icon-QQ-circle-fill" slot="reference"></span>
      </el-popover>
      <el-popover
          placement="top"
          popper-class="POPOVER_IMG"
          :visible-arrow="false"
          trigger="hover"
      >
        <el-avatar :size="100" slot shape="square" alt="头像" :src="getCommonUser.vx"></el-avatar>
        <span class="icon iconfont icon-weixin" slot="reference"></span>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "userCard",
  data () {
    return {
      hour: new Date().getHours()
    }
  },
  computed: {
    ...mapGetters(['getCommonUser']),
    greetings() {
      return this.hour < 6 ? '凌晨好'
        : this.hour < 9 ? '早上好'
          : this.hour < 11 ? '上午好'
            : this.hour < 13 ? '中午好'
              : this.hour < 17 ? '下午好'
                : this.hour < 19 ? '傍晚好'
                  : '晚上好';
    }
  },
  methods: {
    goLink(link) {
      window.open(link);
    }
  }
}
</script>

<style scoped lang="less">
.user-card {
  border-radius: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  background: var(--base-background-color);
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
    font-size: 50px;
    padding:5px;
    cursor: pointer;
  }
  .icon:hover {
    background-color: #6193BB;
    border-radius: 15px;
  }
}
</style>
<style>
.POPOVER_IMG {
  width: 100px;
  min-width: auto !important;
  padding: 10px;
  border-radius: 5px;
  background-color: #6193BB;
  margin: 0;
}
</style>