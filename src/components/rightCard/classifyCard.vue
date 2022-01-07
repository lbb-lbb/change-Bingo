<template>
  <div class="card">
    <h3>{{ ListTitle ? '分类目录': ''}}</h3>
    <ul>
      <li class="classify" v-for="(item, index) in ListTitle" :key="index">
        <a :title="index" :href="'#'+index">{{index}}</a>
        <div class="badge">{{item.length}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'classifyCard',
  props: {
    ListTitle: {
      type: Object,
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
  padding: 20px;
}
.classify {
  background-color: #13131a;
  position: relative;
  padding: 10px 15px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  border-radius: 18px
}
.badge {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: var(--font-min);
  font-weight: 700;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: #454558;
  border-radius: 10px;
}
</style>
