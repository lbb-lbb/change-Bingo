<template>
  <div class="card">
    <el-tabs :tab-position="getIsPhone ? 'top':'left'">
      <el-tab-pane label="个人资料">
        <UserInformation />
      </el-tab-pane>
      <el-tab-pane label="账号设置">
        <UserAccount />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserInformation from './UserInformation'
import UserAccount from './UserAccount'
import {mapGetters} from "vuex";
export default {
  name: 'Setting',
  components: {
    UserInformation,
    UserAccount
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getIsPhone'])
  }
}
</script>

<style scoped>
.card {
  border-radius: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  background: var(--base-background-color);
  padding: 20px;
}
</style>
