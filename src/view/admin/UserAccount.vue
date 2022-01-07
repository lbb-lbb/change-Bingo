<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="form" hide-required-asterisk>
      <el-form-item prop="oldPassword">
        <el-input type="password" maxlength="16" v-model="formData.oldPassword" placeholder="请输入原密码">
          <template v-if="!getIsPhone" slot="prepend">旧密码</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" maxlength="16" v-model="formData.password" placeholder="请输入新密码">
          <template v-if="!getIsPhone" slot="prepend">新密码</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password1">
        <el-input type="password" v-model="formData.password1" placeholder="请再次输入新密码">
          <template v-if="!getIsPhone" slot="prepend">确认新密码</template>
        </el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" size="small" @click="submit">确认</el-button>
    </div>
  </div>
</template>

<script>
import {Encrypt} from "../../utils/secret";
import {mapActions, mapGetters} from 'vuex'
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
  computed: {
    ...mapGetters(['getIsPhone'])
  },
  methods: {
    ...mapActions(['setUser']),
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let params = {
            oldPassword : Encrypt(this.formData.oldPassword),
            password : Encrypt(this.formData.password)
          }
          let { success, message } = await this.$dao.adminUser.setUserPassword(params)
          if (success) {
            this.$message.success('修改成功, 3s后退出到登录页')
            this.setUser({})
            setTimeout(()  => {
              this.$router.push({path: '/login'})
            },3000)
          } else {
            this.$message.error(message || '修改失败')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
