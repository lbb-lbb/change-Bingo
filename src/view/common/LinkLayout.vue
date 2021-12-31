<template>
  <div class="link-card">
    <el-button type="text" @click="add">新增</el-button>
    <div>
      <div v-for="item in LinkList" :key="item.id">
        <div>
          <el-avatar shape="square" alt="头像" :src="item.head"></el-avatar>
          <div>
            <div>{{item.name}}</div>
            <div>{{item.dec}}</div>
          </div>
        </div>
        <div>
          <el-button type="text" @click="edit(item)">编辑</el-button>
          <el-button type="text" @click="deleteLink(item.id)">删除</el-button>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination
        small
        background
        color="#13131a"
        layout="prev, pager, next"
        :page-count="pages.pageSize"
        :current-page.sync="pages.pageNo"
        @current-change="getLinkList()">
      </el-pagination>
    </div>
    <LinkForm ref="linkForm" @close="getLinkList" />
  </div>
</template>

<script>
import LinkForm from "../../components/form/LinkForm";
export default {
  name: "LinkLayout",
  components: {
    LinkForm
  },
  data() {
    return {
      LinkList: [],
      pages: {
        pageNo: 1,
        pageSize: 10,
        name: '',
        count: 0
      },
    }
  },
  methods: {
    async getLinkList() {
      let { success, result, count } = await this.$dao.fontLink.getLinklist(this.pages)
      if (success) {
        this.LinkList = result
        this.pages.count = count
      }
    },
    add() {
      this.$refs.linkForm.add()
    },
    edit(val) {
      this.$refs.linkForm.edit(val)
    },
    async deleteLink(val) {
      let { success } = await this.$dao.adminLink.deleteLink({id: val})
      if (success) {
        this.$Message.success('删除成功')
      }
    }
  },
  mounted() {
    this.getLinkList()
  }
}
</script>

<style scoped>
.link-card {
  border-radius: 20px;
  overflow: hidden;
  background: rgba(35,35,44,0.7);
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
}
</style>
