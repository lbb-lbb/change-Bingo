<template>
  <div>
    <div>
      <div>头像</div>
      <div>
        <div>内容</div>
        <div>标题</div>
      </div>
      <div>
        <div>时间</div>
        <div>通过/回复</div>
      </div>
    </div>
    <div v-if="pages.count > pages.pageSize * pages.pageNo" class="page">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :page-count="pages.pageSize"
        :current-page.sync="pages.pageNo"
        @current-change="getComment()">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageInfo',
  props: {
    type: {
      type: Number,
      required: true
    },
    dateList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      pages: {
        pageNo: 1,
        pageSize: 10,
        count: 0
      },
      dataList: []
    }
  },
  methods: {
    async getComment () {
      let { success, result } = await this.$dao.changeComment({...this.pages, status: this.type})
      if (success) {
        this.dataList = result
      }
    }
  },
  mounted () {
    this.getComment()
  }
}
</script>

<style scoped>
.page {
  text-align: center;
}
</style>
