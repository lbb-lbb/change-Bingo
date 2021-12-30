<template>
 <div id="content" v-html="html"></div>
</template>

<script>
import { marked } from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
export default {
  name: "MarkedView",
  props: {
    markDown:{
      type: String,
      default: ""
    }
  },
  computed: {
    html() {
      return marked(this.markDown)
    }
  },
  watch: {
    markDown: function() {
      this.$nextTick(() => {
        highlight.highlightAll()
      })
    }
  },
}
</script>

<style scoped>

</style>
<style lang="less">
#content {
  h1, h2 {
    margin: 15px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  h3 {
    margin: 10px 0;
  }
  p {
    margin-bottom: 10px;
    text-indent:2em
  }
  img {
    max-width: 100%;
  }
  code {
    border-radius: 20px
  }
}
</style>