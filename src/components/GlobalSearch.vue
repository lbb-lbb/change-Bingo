<template>
    <el-autocomplete v-model="data" placeholder="请输入搜索关键字" value-key="value" :fetch-suggestions="goSearch" />
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
      const { data } = await getGlobalSearchData(str)
      callback(data)
    }
  }
}
</script>

<style scoped>

</style>
