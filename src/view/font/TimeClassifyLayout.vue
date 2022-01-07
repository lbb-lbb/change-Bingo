<template>
  <div class="card">
    <div class="list animate__animated animate__slideInLeft">
      <div class="m-b-15" v-for="(item1, index1) in this.filterData" :key="index1">
        <h2 class="m-b-5" :id="index1">{{index1}}</h2>
        <div class="content m-b-5" v-for="(item2, index2) in item1" :key="index2">
          <p>{{item2.creatTime.substring(8,11)}}</p>
          <p class="title" @click="goWatch(item2.id)">{{item2.title}}</p>
        </div>
      </div>
    </div>
    <RightMenuLayout class="right-menu-layout animate__animated animate__slideInRight">
      <classify-card :list-title="filterData" />
    </RightMenuLayout>
  </div>
</template>

<script>
import RightMenuLayout from '../common/RightMenuLayout'
import classifyCard from "../../components/rightCard/classifyCard";
export default {
  name: 'TimeClassifyLayout',
  components: { RightMenuLayout, classifyCard },
  data() {
    return {
      data: ''
    }
  },
  computed: {
    filterClassify: function() {
      if (this.data) {
        let filter = []
        filter = [...new Set(this.data.map(v => v.creatTime.substring(0,8)))]
        return filter
      } else {
        return []
      }
    },
    filterData: function() {
      const data = {}
      this.filterClassify.forEach(val => {
        data[val] = this.data.filter(v => v.creatTime.indexOf(val) > -1)
      })
      return data
    }
  },
  methods: {
    goWatch(id) {
      this.$router.push({
        path: '/home/view',
        query: { id: id }
      })
    }
  },
  async created() {
    const { success, result } = await this.$dao.fontArticle.getHomeData()
    if (success) {
      this.data = result
    }
  }
}
</script>

<style lang="less" scoped>
h2 {
  font-size: var(--font-title);
}
p {
  font-size: var(--font-page);
}
.card {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}
.m-b-15 {
  margin-top: 15px;
}
.m-b-5 {
  margin-top: 5px
}
.list {
  box-sizing: border-box;
  flex: 1 1 70%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 20px;
  overflow: hidden;
  background: var(--base-background-color);
  color: #dfdfdf;
}
.right-menu-layout{
  flex: 0 0 300px;
  box-sizing: border-box;
  margin-left: 20px;
}
.content {
  display: flex;
  position: relative;
  align-items: baseline;
  border-bottom: 1px dashed #ccc;
  padding: 10px 10px 5px 0;
  margin-left: 30px;
}
.content:before {
  content: '';
  position: absolute;
  top: 19px;
  left: -13px;
  border: 1px solid #dfdfdf;
  background-color: #dfdfdf;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  margin-right: 12px;
}
.title {
  margin-left: 10px;
  color: #4183c4;
  cursor: pointer;
}

.title:hover {
  text-decoration: underline;
}
</style>
