<template>
  <div class="right-box">
    <h3 class="m-b-15">搜索</h3>
    <global-search/>
    <Navigation v-bind="$attrs" />
  </div>
</template>

<script>
import Navigation from '../components/Navigation'
import GlobalSearch from '../components/GlobalSearch'
export default {
  name: 'RightMenuLayout',
  components: {
    GlobalSearch,
    Navigation
  }
}
</script>

<style scoped>
.right-box {
  padding:  0 20px 20px 20px;
}
.m-b-15 {
  margin-bottom: 15px
}
</style>
