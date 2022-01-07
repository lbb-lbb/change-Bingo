<template>
  <div>
    <div class="container">
      <div class="form">
        <el-form :model="formData" ref="form">
          <el-form-item prop="name">
            <el-input maxlength="20" v-model="formData.name" placeholder="用户名">
              <template v-if="!getIsPhone" slot="prepend">用户名</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="tag">
            <el-input maxlength="100" v-model="formData.tag" placeholder="多个标签请用逗号隔开">
              <template v-if="!getIsPhone" slot="prepend">标签</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="github">
            <el-input maxlength="100" v-model="formData.github" placeholder="个人github网址">
              <template v-if="!getIsPhone" slot="prepend">github</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="introduction">
            <el-input
              type="textarea"
              :autosize="{minRows:3, maxRows:6}"
              maxlength="500"
              v-model="formData.introduction"
              placeholder="个人简介"
            >
              <template v-if="!getIsPhone" slot="prepend">个人介绍</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="longIntroduction">
            <el-input
                type="textarea"
                :autosize="{minRows:3}"
                v-model="formData.longIntroduction"
                placeholder="个人简介"
            >
              <template v-if="!getIsPhone" slot="prepend">个人介绍（长）</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="blogIntroduction">
            <el-input
                type="textarea"
                :autosize="{minRows:3}"
                v-model="formData.blogIntroduction"
                placeholder="个人简介"
            >
              <template v-if="!getIsPhone" slot="prepend">关于博客</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" size="small" @click="submit">保存修改</el-button>
        </div>
      </div>
      <div class="head">
        <UploadImage @path="getUploadImagePath" :image-url.sync="headPath" />
        <div class="tip">头像</div>
        <UploadImage @path="getUploadImagePath" :image-url.sync="vxPath" />
        <div class="tip">QQ</div>
        <UploadImage @path="getUploadImagePath" :image-url.sync="qqPath" />
        <div class="tip">微信</div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadImage from '../../components/UploadImage'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'UserInformation',
  components: {
    UploadImage
  },
  data () {
    return {
      formData: {},
      headPath: '',
      vxPath: '',
      qqPath: ''
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getIsPhone'])
  },
  methods: {
    ...mapActions(['setUser']),
    async submit() {
      let params = {
        ...this.formData,
        head: this.headPath,
        vx: this.vxPath,
        qq: this.qqPath
      }

      let { success, result } = await this.$dao.adminUser.setUserInfo(params)
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
    this.headPath = this.getUser.head
    this.qqPath = this.getUser.qq
    this.vxPath = this.getUser.vx
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  .form {
    flex: 1 1 auto;
    margin-right: var(--margin-right);
  }
  .head {
    flex: 0 0 var(--head-width);
    text-align: center;
  }
  .tip {
    font-size: var(--font-min);
    margin-bottom: 2px;
  }
}
</style>
