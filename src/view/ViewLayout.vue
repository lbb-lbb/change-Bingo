<template>
    <div>
        <div class="content">
            <h1 id="我是第一个H1">我是第一个H1</h1>
            <h2 id="我是第一个H1的H2">我是第一个H1的H2</h2>
            <h3>fsahioj</h3>
            <p>fsagsa</p>
            <h2 id="我是第一个H1的H21">我是第一个H1的H21</h2>
            <h2 id="我是第一个H1的H22">我是第一个H1的H22</h2>
            <p>gadsf</p>
            <h1 id="我是第二个H1">我是第二个H1</h1>
            <h2 id="我是第二个H1的H2">我是第二个H1的H2</h2>
            <p>gasdfgd</p>
            <h2 id="我是第二个H1的H21">我是第二个H1的H21</h2>
            <h2 id="我是第二个H1的H22">我是第二个H1的H22</h2>
        </div>
        <right-menu-layout />
    </div>
</template>

<script>
import RightMenuLayout from './RightMenuLayout'
export default {
  name: 'ViewLayout',
  components: {
    RightMenuLayout
  },
  data() {
    return {
      list: ''
    }
  },
  computed: {
    needList: function() {
      const arr = []
      for (const i in this.list) {
        if (this.list[i].nodeName === 'H1' || this.list[i].nodeName === 'H2') {
          arr.push(this.list[i].id)
        }
      }
      console.log(arr)
      return arr
    }
  },
  mounted() {
    console.log(document.getElementsByClassName('content')[0].children)
    this.list = document.getElementsByClassName('content')[0].children
  }

}
</script>

<style scoped>

</style>
