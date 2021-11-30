<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="信息审核" name="first">
        <MessageInfo :type="0" />
      </el-tab-pane>
      <el-tab-pane label="评论信息" name="second">
        <MessageInfo :type="1" />
      </el-tab-pane>
      <el-tab-pane label="点赞信息" name="third">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MessageInfo from './MessageInfo'
export default {
  name: 'message',
  components: {
    MessageInfo
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
