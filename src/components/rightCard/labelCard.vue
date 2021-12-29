<template>
<div class="card">
  <ul>
    <li v-for="item in labels" :key="item">{{item}}</li>
  </ul>
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
    }
  },
  mounted() {
    this.getLabels()
  }
}
</script>

<style scoped>
li {
  display: inline-block;
  padding:5px;
  cursor: pointer;
}
li:hover {
  color: #ffffff;
  background-color: #6193BB;
  border-radius: 15px;
}
.card {
  border-radius: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  background: rgba(35,35,44,0.7);
  padding: 20px;
}
</style>