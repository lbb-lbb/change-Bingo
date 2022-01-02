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
  font-family: FiraCode, -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,
  "Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  margin: 0;
  padding: 0;
  line-height: 1.5715;
}
body{
  min-width: 300px;
  background-image: url("./public/images/mainBg.jpg");
  background-size:cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: #dfdfdf;
}
strong {
  color: #6193BB;
}
.icon {
  color: #ffffff;
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
  color: #fff !important;
  border: none !important;
}
.el-tabs__item {
  color: #dfdfdf !important;
}
.el-tabs__item:hover {
  color: #6193BB !important;
}
.el-tabs__item.is-active {
  color: #6193BB !important;
}
.el-tabs__nav-wrap::after {
  width: 0 !important;
}
.el-tabs__active-bar {
  background-color: #6193BB !important;
}
</style>
