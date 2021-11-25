<template>
  <div class="card">
    <div class="list">
      <div class="m-b-15" v-for="(item1, index1) in this.filterData" :key="index1">
        <h2 class="m-b-5" :id="index1">{{index1}}</h2>
        <div class="content m-b-5" v-for="(item2, index2) in item1" :key="index2">
          <p>{{item2.creatTime.substring(8,11)}}</p>
          <p class="title" @click="goWatch(item2.id)">{{item2.title}}</p>
        </div>
      </div>
    </div>
    <RightMenuLayout class="right-menu-layout" :list-title="filterData"/>
  </div>
</template>

<script>
import RightMenuLayout from './RightMenuLayout'
export default {
  name: 'TimeClassifyLayout',
  components: { RightMenuLayout },
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
        path: '/view',
        query: { id: id }
      })
    }
  },
  async created() {
    const { success, result } = await this.$dao.getHomeData()
    if (success) {
      this.data = result
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  display: flex;
  flex-wrap: wrap;
}
h2 {
  border-bottom: 1px solid #ccc;
}
.m-b-15 {
  margin-top: 15px;
}
.m-b-5 {
  margin-top: 5px
}
.list {
  flex: 1 1 70%;
  margin: 0 auto;
  padding: 20px
}

.content {
  display: flex;
  align-items: baseline;
}
.content:before {
  content: '';
  border: 1px solid #000;
  vertical-align: middle;
  background-color: #000;
  display: inline-block; // 此句为css样式展示重点🏁
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
.right-menu-layout{
  box-shadow: 1px 1px 6px #ccc;
  padding: 20px;
}
</style>
