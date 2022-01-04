<template>
<div class="label-card">
  <div class="label" v-for="item in labels" :key="item" @click="goWatch(item)">{{item}}</div>
</div>
</template>

<script>
export default {
  name: "labelCard",
  data() {
    return {
      labels: []
    }
  },
  methods: {
    async getLabels() {
      let res = await this.$dao.fontArticle.articleClassify()
      if(res.success) {
        this.labels = [...new Set([...res.result.category, ...res.result.tags])]
      }
    },
    goWatch(name) {
      this.$router.push({
        path: '/home/article',
        name: 'article',
        params: { tag: name },
      })
    }
  },
  mounted() {
    this.getLabels()
  }
}
</script>

<style scoped>
.label {
  display: inline-block;
  padding:5px;
  cursor: pointer;
}
.label:hover {
  color: #ffffff;
  background-color: #6193BB;
  border-radius: 15px;
}
.label-card {
  border-radius: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  background: rgba(35,35,44,1);
  padding: 20px;
}
</style>