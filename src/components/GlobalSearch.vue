<template>
    <el-autocomplete
        v-model="data"
        size="small"
        popper-class="search-card"
        placeholder="请输入标题关键字"
        value-key="title"
        :fetch-suggestions="goSearch"
        @select="goWatch"
    />
</template>

<script>
import { getGlobalSearchData } from '../api'
export default {
  name: 'GlobalSearch',
  data() {
    return {
      data: ''
    }
  },
  methods: {
    async goSearch(str, callback) {
      if (str) {
        const { result } = await getGlobalSearchData({title: str})
        callback(result)
      }
    },
    goWatch(val) {
      this.$router.push({
        path: '/view',
        query: { id: val.id }
      })
    }
  }
}
</script>

<style scoped>
</style>
<style>
.search-card {
  color: #4183c4 !important;
  font-weight: bold !important;
}
</style>
