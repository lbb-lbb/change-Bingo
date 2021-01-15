<template>
    <div class="card">
        <div class="list">
            <el-card v-for="(item1, index1) in this.filterData" shadow="hover" :key="index1">
                <h2 slot="header" :id="index1">{{index1}}</h2>
                <div class="content" v-for="(item2, index2) in item1" :key="index2">
                    <p>{{item2.time}}</p>
                    <p class="title" @click="goWatch(item2.id)">{{item2.title}}</p>
                </div>
            </el-card>
        </div>
        <RightMenuLayout :list-title="filterClassify" />
    </div>
</template>

<script>
import { getBingoData } from '../api'
import RightMenuLayout from './RightMenuLayout'
export default {
  name: 'BlogLayout',
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
        filter = [...new Set(this.data.map(v => v.classify))]
        return filter
      } else {
        return []
      }
    },
    filterData: function() {
      const data = {}
      this.filterClassify.forEach(val => {
        data[val] = this.data.filter(v => v.classify === val)
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
    const { data } = await getBingoData()
    this.data = data
  }
}
</script>

<style scoped>
.card{
    display: flex;
    flex-wrap: wrap;
}
.list{
    flex: 1 1 70%;
    margin: 0 auto;
}
.content{
    display: flex;
    align-items: baseline;
}
p{
    font-size: 15px;
}
.title{
    margin-left: 10px;
    color: #4183c4;
    cursor:pointer;
}
.title:hover{
    text-decoration: underline;
}
</style>
