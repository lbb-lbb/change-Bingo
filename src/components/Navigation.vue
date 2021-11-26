<template>
  <div>
    <h3>{{ ListTitle ? '分类目录': ''}}</h3>
    <ul>
      <li class="classify" v-for="(item, index) in ListTitle" :key="index">
        <a :title="index" :href="'#'+index">{{index}}</a>
        <div class="badge">{{item.length}}</div>
      </li>
    </ul>
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
  name: 'Navigation',
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
a{
  display: block;
  text-decoration: none;
  color: #4183c4;
}
a:hover {
  color: #4183c4;
  text-decoration: underline;
}
ul {
  margin-top: 10px;
}
li {
  list-style-type:none;
  margin-bottom: 10px;
}
.H1 {
  margin-top: 10px;
}
.H2 {
  margin-top: 10px;
  margin-left: 15px;
  position: relative;
}
.H2:before {
  content: '';
  position: absolute;
  top: 10px;
  left: -13px;
  border: 1px solid #000;
  background-color: #000;
  width: 3px;
  height: 3px;
  border-radius: 50%;
}
.H3{
  margin-top: 10px;
  margin-left: 30px;
  position: relative;
}
.H3:before {
  content: '';
  position: absolute;
  top: 10px;
  left: -13px;
  border: 1px solid #000;
  width: 3px;
  height: 3px;
  border-radius: 50%;
}
.classify {
  border: 1px solid #ccc;
  position: relative;
  padding: 10px 15px;
  margin-bottom: -1px;
  display: flex;
  justify-content: space-between;
  border-radius: 3px
}
.badge {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: #777;
  border-radius: 10px;
}
</style>
