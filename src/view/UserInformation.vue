<template>
  <div style="padding: 20px">
    <h2>个人资料</h2>
    <div class="container">
      <div class="form">
        <el-form :model="formData" ref="form">
          <el-form-item label="用户名" prop="name">
            <el-input maxlength="20" show-word-limit v-model="formData.name" placeholder="用户名" />
          </el-form-item>
          <el-form-item label="标签" prop="tag">
            <el-input maxlength="100" show-word-limit v-model="formData.tag" placeholder="多个标签请用逗号隔开" />
          </el-form-item>
          <el-form-item label="个人介绍" prop="introduction">
            <el-input
              type="textarea"
              :autosize="{minRows:3, maxRows:6}"
              maxlength="500"
              show-word-limit
              v-model="formData.introduction"
              placeholder="个人简介"
            />
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" size="small" @click="submit">保存修改</el-button>
        </div>
      </div>
      <div class="head">
        <UploadImage @path="getUploadImagePath" :image-url.sync="path" />
      </div>
    </div>
  </div>
</template>

<script>
import UploadImage from '../components/UploadImage'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'UserInformation',
  components: {
    UploadImage
  },
  data () {
    return {
      formData: {},
      path: ''
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    ...mapActions(['setUser']),
    async submit() {
      let params = {
        ...this.formData,
        head: this.path
      }

      let { success, result } = await this.$dao.setUserInfo(params)
      if (success) {
        this.setUser(result)
        this.$message.success('修改成功')
      }
    },
    getUploadImagePath(path) {
      this.formData.head = path
    }
  },
  created() {
    this.formData = this.getUser
    this.path = this.getUser.head
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  .form {
    flex: 1 1 auto;
  }
  .head {
    flex: 0 0 150px;
    text-align: center;
  }
}
</style>
