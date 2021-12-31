<template>
  <div class="project-card">
    <div class="page">
      <el-pagination
        small
        background
        color="#13131a"
        layout="prev, pager, next"
        :page-count="pages.pageSize"
        :current-page.sync="pages.pageNo"
        @current-change="getProjectList()">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectLayout",
  data() {
    return {
      projectList: [],
      pages: {
        pageNo: 1,
        pageSize: 10,
        name: '',
        count: 0
      },
    }
  },
  methods: {
    async getProjectList() {
      let { success, result, count } = await this.$dao.fontProject.getProjectList(this.pages)
      if (success) {
        this.projectList = result
        this.pages.count = count
      }
    }
  },
  mounted() {
    this.getProjectList()
  }
}
</script>

<style scoped>
.project-card {
  border-radius: 20px;
  overflow: hidden;
  background: rgba(35,35,44,0.7);
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
}
</style>
