<template>
    <div class="card">
        <div class="list">
            <el-card v-for="(item, index) in data.data" shadow="hover" :key="index">
                <h2 slot="header" @click="goWatch(item.id)">{{item.title}}</h2>
                <p>{{item.content}}</p>
                <i class="el-icon-date"></i>
                <el-tag type="info" size="small" effect="plain">{{item.time}}</el-tag>
                <i class="el-icon-bank-card"></i>
                <el-tag type="info" size="small" effect="plain">{{item.classify}}</el-tag>
            </el-card>
            <div class="page">
                <el-pagination
                        small
                        background
                        layout="prev, pager, next"
                        :page-count="pages.pageCount"
                        :current-page.sync="pages.currentPage"
                        @current-change="getPageData(pages)">
                </el-pagination>
            </div>
        </div>
        <RightMenuLayout/>
    </div>
</template>

<script>
import { getHomeData } from '../api'
import RightMenuLayout from './RightMenuLayout'

export default {
  name: 'HomeLayout',
  components: {
    RightMenuLayout
  },
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
    },
    goWatch(id) {
      this.$router.push({
        path: '/view',
        query: { id: id }
      })
    }
  },
  created() {
    this.getPageData(this.pages)
  }
}
</script>

<style scoped>
    h2 {
        font-weight: 400;
        color: #4183c4;
        font-size: 20px;
        cursor: pointer;
    }

    h2:hover {
        text-decoration: underline;
    }

    p {
        color: #666;
        font-size: 14px;
    }

    .card {
        display: flex;
        flex-wrap: wrap;
    }

    .list {
        margin: 0 auto;
        flex: 0 0 70%;
    }
    .page{
        margin: 10px auto;
    }
</style>
