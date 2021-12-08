<template>
    <div>
      <transition name="fade-slide" mode="out-in" appear>
        <router-view/>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>

</style>
<style>
*{
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
    Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
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
