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
<style>
*{
    font-family: Arial,"Hiragino Sans GB","冬青黑","Microsoft YaHei","微软雅黑",SimSun,"宋体",Helvetica,Tahoma,Arial sans-serif;
    margin: 0;
    padding: 0;
}
body{
    min-width: 300px;
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
</style>
