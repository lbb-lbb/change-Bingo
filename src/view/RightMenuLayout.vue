<template>
    <div>
        <h5>Search</h5>
        <global-search/>
        <h5>菜单推荐</h5>
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

</style>
