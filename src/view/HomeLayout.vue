<template>
<div>
    <el-col v-for="(item, index) in data.data" :key="index">
        <h2>{{item.title}}</h2>
        <div>{{item.content}}</div>
        <el-tag type="success">{{item.time}}</el-tag>
        <el-tag type="success">{{item.classify}}</el-tag>
    </el-col>
    <el-col>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-count="pages.pageCount"
                :current-page.sync="pages.currentPage"
                @current-change="getPageData(pages)">
        </el-pagination>
    </el-col>
</div>
</template>

<script>
import { getHomeData } from '../api'

export default {
  name: 'HomeLayout',
  data() {
    return {
      pages: {
        currentPage: 1,
        pageCount: 10
      },
      data: []
    }
  },
  methods: {
    async getPageData(data) {
      this.data = await getHomeData(this.pages)
    }
  },
  created() {
    this.getPageData(this.pages)
  }
}
</script>

<style scoped>

</style>
