<template>
  <div class="card">
    <h3 class="m-b-15">搜索</h3>
    <el-autocomplete
        v-model="data"
        size="small"
        style="width: 100%"
        popper-class="search-card"
        placeholder="搜索文章..."
        value-key="title"
        :fetch-suggestions="goSearch"
        @select="goWatch"
    />
  </div>
</template>

<script>
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
        const { result } = await this.$dao.fontArticle.getGlobalSearchData({title: str})
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

<style scoped lang="less">
.card {
  border-radius: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  background: var(--base-background-color);
  padding: 20px;
  height: 100px;
}
.m-b-15 {
  margin-bottom: 15px
}
/deep/.el-input .el-input__inner {
  border-radius: 14px !important;
  background-color: #13131A !important;
  color: #dfdfdf !important;
  border: none !important;
}
</style>
<style>
.search-card {
  color: #4183c4 !important;
  font-weight: bold !important;
  background-color: #13131A !important;
  border: none;
}
</style>
