<template>
  <div>
    <global-search/>
    <slot />
  </div>
</template>

<script>
import GlobalSearch from '../../components/rightCard/GlobalSearch'
export default {
  name: 'RightMenuLayout',
  components: {
    GlobalSearch
  }
}
</script>

<style scoped>
</style>
