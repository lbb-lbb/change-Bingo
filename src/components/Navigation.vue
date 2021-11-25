<template>
  <div>
    <h3>{{ ListTitle ? '分类目录': ''}}</h3>
    <ul>
      <li v-for="(item, index) in ListTitle" :key="index">
        <a :title="index" :href="'#'+index">{{index}} (<span>{{item.length}}</span>)</a>
      </li>
    </ul>
    <h3>{{ PageTitle ? '文章目录': ''}}</h3>
    <ul>
      <li v-for="(item, index) in PageTitle" :class="item.nodeName" :key="index">
        <a :title="item.innerText" :href="'#'+item.id">{{item.innerText}}</a>
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
H3{
  margin-top: 10px;
}

</style>
