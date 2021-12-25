<template>
  <div class="card">
    <el-tabs v-model="activeName">
      <el-tab-pane label="信息审核" name="first">
        <MessageInfo :type="0" />
      </el-tab-pane>
      <el-tab-pane label="未读信息" name="second">
        <MessageInfo :type="1" />
      </el-tab-pane>
      <el-tab-pane label="已读信息" name="fourth">
        <MessageInfo :type="2" />
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
.card {
  border-radius: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  background: rgba(35,35,44,0.7);
  padding: 20px;
}
</style>
