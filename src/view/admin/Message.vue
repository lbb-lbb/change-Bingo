<template>
  <div class="card">
    <el-tabs v-model="activeName">
      <el-tab-pane label="信息审核" name="first" lazy>
        <MessageInfo :type="0" />
      </el-tab-pane>
      <el-tab-pane label="未读信息" name="second" lazy>
        <MessageInfo :type="1" />
      </el-tab-pane>
      <el-tab-pane label="已读信息" name="fourth" lazy>
        <MessageInfo :type="2" />
      </el-tab-pane>
      <el-tab-pane label="点赞信息" name="third" lazy>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MessageInfo from '../../components/MessageInfo'
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
  background: var(--base-background-color);
  padding: var(--padding);
}
</style>
