<template>
  <div class="link-card">
    <div class="add-button">
      <el-button v-if="getLogin" type="text" @click="add">新增</el-button>
    </div>
    <el-row :gutter="10">
      <el-col :xs="24" :md="12" v-for="item in LinkList" :key="item.id">
        <div class="link-main">
          <div class="right-box">
            <div class="name" :title="item.name" @click="goLink(item.link)"><strong>{{item.name}}</strong></div>
            <div  class="remark" :title="item.remark">{{item.remark}}</div>
          </div>
          <el-dropdown class="action-button" v-if="getLogin" trigger="click">
            <span class="el-dropdown-link"><i class="icon iconfont icon-liebiao"/></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="edit(item)">编辑</el-dropdown-item>
              <el-dropdown-item @click.native="deleteLink(item.id)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
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
import LinkForm from "../../components/form/ProjectForm";
import {mapGetters} from "vuex";
export default {
  name: "ProjectLayout",
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
  computed: {
    ...mapGetters(['getLogin'])
  },
  methods: {
    async getLinkList() {
      let { success, result, count } = await this.$dao.fontProject.getProjectList(this.pages)
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
    goLink(val) {
      window.open(val)
    },
    async deleteLink(val) {
      let { success } = await this.$dao.adminProject.deleteProject({id: val})
      if (success) {
        this.$Message.success('删除成功')
        await this.getLinkList()
      }
    }
  },
  mounted() {
    this.getLinkList()
  }
}
</script>

<style scoped lang="less">
.link-card {
  border-radius: 20px;
  overflow: hidden;
  background: rgba(35,35,44,0.7);
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
}
.add-button {
  text-align: right;
}
.link-main {
  background: #13131A;
  margin-bottom: 20px;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  position: relative;
  .right-box {
    flex: 1 1 auto;
    margin-left: 10px;
    overflow: hidden;
  }
  .name {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap;
    cursor: pointer;
  }
  .name:hover {
    text-decoration: underline;
    text-decoration-color: #6193BB;
  }
  .remark {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    word-break:break-all;
    -webkit-box-orient: vertical;
  }
  .action-button {
    align-self: end;
    justify-self: end;
    cursor: pointer;
  }
}
.page {
  text-align: center;
}
</style>
