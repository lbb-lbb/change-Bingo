<template>
    <div>
        <ul>Blog Categories
            <li v-for="(item, index) in ListTitle" :key="index"><a :title="item" :href="'#'+item">{{item}}</a></li>
        </ul>
        <a v-for="(item, index) in PageTitle" :key="index" :title="item" :href="'#'+item">{{item}}</a>
    </div>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    ListTitle: {
      type: Array,
      default: () => []
    },
    PageTitle: {
      type: Array,
      default: () => []
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

</style>
