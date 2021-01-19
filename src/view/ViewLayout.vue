<template>
    <div class="card">
        <div class="list">
            <el-card>
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
            </el-card>
        </div>
        <right-menu-layout :page-title="needList"/>
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
      const result = []
      let status = ''
      for (const i in this.list) {
        if (this.list[i].nodeName === 'H1' || this.list[i].nodeName === 'H2') {
          const { id, innerText, nodeName } = this.list[i]
          arr.push({ id, innerText, nodeName })
        }
      }
      arr.forEach(v => {
        if (v.nodeName === 'H1') {
          result.push(status)
          status = v
          status.children = []
        }
        if (v.nodeName === 'H2') {
          status.children.push(v)
        }
      })
      result.push(status)
      result.shift()
      return result
    }
  },
  mounted() {
    this.list = document.getElementsByClassName('content')[0].children
  }

}
</script>

<style lang="less" scoped>
    .card {
        display: flex;
        flex-wrap: wrap;
    }

    .list{
        margin: 0 auto;
        flex: 1 1 70%;
    }

    .el-card {
        /deep/ .el-card__body {
            padding: 10px 0 20px 10px;
        }

        /deep/ .el-card__header {
            padding: 10px 0 0 10px;
            border-bottom: none;
        }

        margin-bottom: 2vh;
        margin-right: 1vw;
    }
</style>
