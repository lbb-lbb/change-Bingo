<template>
  <div class="container">
    <div class="main">
      <div class="title"><span style="color: red" class="icon iconfont icon-xingzhuang-yunduo"></span>Login</div>
      <el-form :model="formData" :rules="rules" size="small" ref="from">
        <el-form-item prop="name">
          <el-input v-model="formData.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <el-button round size="small" type="primary" @click="login">Sign In</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      formData: {
        name: '',
        password: '',
      },
      rules: {
        name: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      }
    }
  },
  methods: {
    ...mapActions(['setUser', 'setToken', 'setLogin']),
    login() {
      this.$refs.from.validate(async valid => {
        if (valid) {
          const { success, result, token } = await this.$dao.Login(this.formData)
          if (success) {
            this.setUser(result)
            this.setToken(token)
            this.setLogin(true)
            this.$router.push('/user')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6699CC;
  width: 100%;
  height: 100vh;
}
.main {
  width: 300px;
  height: 300px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 1px 1px 6px #ccc;
}
</style>
