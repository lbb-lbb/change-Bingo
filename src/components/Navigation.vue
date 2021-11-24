<template>
    <div>
        <ul>{{ ListTitle ? 'Blog Categories': ''}}
            <li v-for="(item, index) in ListTitle" :key="index">
                <a :title="index" :href="'#'+index">{{index}} (<span>{{item.length}}</span>)</a>
            </li>
        </ul>
        <ul>{{ PageTitle ? '文章目录': ''}}
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
  margin-top: 20px;
}
li {
  list-style-type:none;
  margin-bottom: 10px;

}
.H2{
  margin-left: 15px;
}

.H3{
  margin-left: 25px;
}

</style>
