<template>
  <el-tabs :tab-position="tabPosition">
    <el-tab-pane label="个人资料">
      <UserInformation />
    </el-tab-pane>
    <el-tab-pane label="账号设置">
      <UserAccount />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import UserInformation from './UserInformation'
import UserAccount from './UserAccount'
export default {
  name: 'Setting',
  components: {
    UserInformation,
    UserAccount
  },
  data () {
    return {
      tabPosition: 'left'
    }
  }
}
</script>

<style scoped>

</style>
