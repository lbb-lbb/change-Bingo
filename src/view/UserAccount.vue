<template>
  <div style="padding: 20px">
    <h2>个人资料</h2>
    <el-form :model="formData" :rules="rules" ref="form">
      <el-form-item label=旧密码 prop="oldPassword">
        <el-input type="password" maxlength="16" v-model="formData.oldPassword" placeholder="请输入原密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" maxlength="16" v-model="formData.password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="password1">
        <el-input type="password" v-model="formData.password1" placeholder="请再次输入新密码"/>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" size="small" @click="submit">确认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAccount',
  components: {
  },
  data () {
    const checkPassword = (rule, value, callback) => {
      if (value !== this.formData.password) {
        callback(new Error('前后密码输入不一致'))
      }
      callback()
    }
    return {
      formData: {},
      rules: {
        oldPassword: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        password1: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: checkPassword, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    async submit() {
      let { success, message } = await this.$dao.setUserPassword(this.formData)
      if (success) {
        this.$message.success('修改成功, 退出登录生效')
      } else {
        this.$message.error(message || '修改失败')
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
