<template>
  <div class="right-box">
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
  margin-top: 20px;
}
</style>
