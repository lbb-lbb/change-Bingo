<template>
  <div class="Mask">
    <div class="container">
      <div class="main">
        <div class="title">
          <h2>Login</h2>
          <div>
            <span class="icon iconfont icon-github-fill"></span>
            <span class="icon iconfont icon-QQ-circle-fill"></span>
            <span class="icon iconfont icon-weixin"></span>
          </div>
        </div>
        <el-form :model="formData" :rules="rules" size="small" ref="from" inline hide-required-asterisk>
          <el-form-item prop="name">
            <template slot="label"><span class="icon iconfont icon-yonghu" /></template>
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="password">
            <template slot="label"><span class="icon iconfont icon-mima" /></template>
            <el-input v-model="formData.password" type="password" placeholder="请输入密码" />
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button round size="middle" type="text" @click="login">Sign In</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Encrypt, Decrypt } from '../utils/secret'
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
          let params = { ...this.formData, password: Encrypt(this.formData.password) }
          const { success, result, token } = await this.$dao.Login(params)
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
}</script>

<style scoped lang="less">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../public/images/login.jpeg");
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center center;
}
.Mask {
  background-color: rgba(0,0, 0, 0.5);
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.main {
  box-sizing: border-box;
  width: 360px;
  height: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 4px 20px 0px rgb(0 0 0 / 14%);
}
.title {
  margin-top: -80px;
  margin-bottom: 20px;
  background: linear-gradient(
      60deg, #ec407a, #d81b60);
  box-shadow: 0 4px 20px 0px rgb(0 0 0 / 14%);
  color: #fff;
  text-align: center;
  border-radius: 3px;
  padding: 15px;
  h2 {
    margin-bottom: 30px;
  }
  .icon {
    padding: 10px;
    font-size: 25px;
    cursor: pointer;
  }
}
.icon {
  font-size: 25px;
  font-weight: 600;
}
.footer {
  text-align: center;
}
/deep/ .el-input {
  width: 265px;
}
</style>
