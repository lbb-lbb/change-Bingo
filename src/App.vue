<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {
    ...mapActions(['setIsPhone'])
  },
  mounted () {
    window.addEventListener('resize', this.$util.throttle(() => {
      if (document.body.offsetWidth < 600) {
        this.setIsPhone(true)
      } else {
        this.setIsPhone(false)
      }
    }, 300))
    if (document.body.offsetWidth < 600) {
      this.setIsPhone(true)
    } else {
      this.setIsPhone(false)
    }
  },
  destroyed () {
    window.removeEventListener("resize", this.$util.throttle)
  }
}
</script>

<style scoped>

</style>
<style lang="less">
*{
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,
  "Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  margin: 0;
  padding: 0;
}
body{
  min-width: 300px;
  background-image: url("./public/images/mainBg.jpg");
  color: #dfdfdf;
}

// 修改element ui全局的input样式
.el-input .el-input__inner {
  border-bottom-right-radius: 14px !important;
  border-top-right-radius: 14px !important;
  background-color: #13131A !important;
  color: #dfdfdf !important;
  border: none !important;
}
.el-textarea__inner {
  border-radius: 20px !important;
  background-color: #13131A !important;
  color: #dfdfdf !important;
  border: none !important;
}
.el-input-group__append, .el-input-group__prepend {
  border-bottom-left-radius: 14px !important;
  border-top-left-radius: 14px !important;
  background-color: #454558 !important;
  color: #fff;
  border: none !important;
}
</style>
