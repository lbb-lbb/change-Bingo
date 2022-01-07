<template>
  <div class="card">
    <h3>{{ PageTitle ? '文章目录': ''}}</h3>
    <ul>
      <li v-for="(item, index) in PageTitle" :class="item.nodeName" :key="index">
        <a class="" :title="item.innerText" :href="'#'+item.id">{{item.innerText}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PageCatalog',
  props: {
    ListTitle: {
      type: Object,
      default: undefined
    },
    PageTitle: {
      type: Array,
      default: undefined
    }
  }
}
</script>

<style scoped>
h3 {
  width: 100%;
  margin-bottom: 10px;
  font-size: var(--font-title);
}
a{
  display: block;
  text-decoration: none;
  color: #dfdfdf;
  font-size: var(--font-page);
}
a:hover {
  color: #4183c4;
  text-decoration: underline;
}
ul {
  margin-top: 10px;
  width: 100%;
}
li {
  list-style-type:none;
  margin-bottom: 10px;
}
.card {
  border-radius: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  background: var(--base-background-color);
  padding: 20px !important;
}
.H1 {
  margin-top: 10px;
}
.H2 {
  margin-top: 10px;
  margin-left: 15px;
  position: relative;
}
.H3{
  margin-top: 10px;
  margin-left: 30px;
  position: relative;
}
</style>
