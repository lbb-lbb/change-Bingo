<template>
  <div>
    <transition name="fade-slide" mode="out-in" appear>
      <router-view/>
    </transition>
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
      if (document.body.offsetWidth < 475) {
        this.setIsPhone(true)
      } else {
        this.setIsPhone(false)
      }
    }, 300))
    if (document.body.offsetWidth < 475) {
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
.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-slide-leave-to {
  opacity: 0
}
.el-input {
  /deep/.el-input__inner {
    border-radius: 14px !important;
    background-color: #13131A !important;
    color: #dfdfdf !important;
  }
}
</style>
