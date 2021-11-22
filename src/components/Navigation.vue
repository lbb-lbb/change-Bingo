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
                <ul>
                    <li v-for="(item2, index2) in item.children" :key="index2" :class="item2.nodeName">
                        <a :title="item2.innerText" :href="'#'+item2.id">{{item2.innerText}}</a>
                    </li>
                </ul>
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
    }
    .H2{
        margin-left: 15px;
    }

    .H3{
        margin-left: 25px;
    }

</style>
