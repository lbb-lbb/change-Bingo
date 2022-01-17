<template>
 <div id="content" class="MARKDOWN-CONTENT markdown-body" v-html="html"></div>
</template>

<script>
import { marked } from 'marked'
import highlight from 'highlight.js/lib/common'
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
  * {
    font-size: var(--font-page);
  }
  h1, h2 {
    font-size: var(--font-title);
  }
  h3 {
    font-size: var(--font-title-h3);
  }
  code {
    border-radius: 20px
  }
}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>