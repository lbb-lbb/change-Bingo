<template>
  <div class="comment-form">
    <el-avatar shape="square" alt="头像" :src="headPath"></el-avatar>
    <el-form :model="formData" :rules="rules" ref="ruleForm" size="small" hide-required-asterisk>
      <el-row :gutter="20">
        <el-col :sm="8" :xs="24">
          <el-form-item v-if="!isUser" prop="name">
            <el-input
              style="width: 100%"
              v-model="formData.name"
              maxlength="20"
              placeholder="尊姓大名~"
            >
              <template v-if="!getIsPhone" slot="prepend">称呼</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="8" :xs="24">
          <el-form-item v-if="!isUser" prop="head">
            <el-input
              style="width: 100%"
              v-model="formData.head"
              maxlength="50"
              placeholder="输入正确qq号可自动获取邮箱和头像哦~"
            >
              <template v-if="!getIsPhone" slot="prepend">qq</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="8" :xs="24">
          <el-form-item v-if="!isUser" prop="email" >
            <el-input
              style="width: 100%"
              v-model="formData.email"
              maxlength="50"
              placeholder="输入邮箱以便回复时邮件通知哦~"
            >
              <template v-if="!getIsPhone" slot="prepend">邮箱</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="" prop="comment">
        <el-input
          style="width: 100%"
          v-model="formData.comment"
          ref="comment"
          type="textarea"
          placeholder="如评论不显示，请等候管理员人工审核"
          maxlength="400"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
      </el-form-item>
      <el-form-item label="">
        <div style="text-align: right">
          <el-button round type="primary" size="mini" @click="submitForm">发表评论</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: 'comment',
  props: {
    pid: {
      type: String,
      default: ''
    },
    titleId: {
      type: String,
      default: ''
    },
    replyId: {
      type: String,
      default: ''
    },
    isUser:{
      type: Boolean,
      default: false
    }
  },
  data () {
    const isHead = (rule, value, callback) => {
      const regExp = new RegExp(/^[1-9][0-9]{4,14}$/)
      if (regExp.test(value)) {
        this.formData.email = `${value}@qq.com`
        this.headPath = `https://q1.qlogo.cn/g?b=qq&nk=${value}&s=640`
        callback()
      } else {
        callback(new Error('请输入正确qq号码'));
      }
    }
    const isEmail = (rule, value, callback) => {
      const regExp = new RegExp(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)
      if (regExp.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确邮箱'));
      }
    }
    return {
      formData: {},
      rules: {
        comment: [
          {required: true, message: "评论不能为空", trigger: 'change'},
          {max:400, message: "最多可输入400字"}
        ],
        head: [
          {validator: isHead, trigger: 'blur'}
        ],
        name: [
          {required: true, message: "称呼不能为空", trigger: 'change'},
          {max:20, message: "最多可输入20字"}
        ],
        email: [
          {max:50, message: "最多可输入50字"},
          {validator: isEmail, trigger: 'blur'}
        ]
      },
      headPath: ''
    }
  },
  computed: {
    ...mapGetters(['getIsPhone'])
  },
  methods: {
    submitForm (){
      if (!this.titleId) {
        this.$message.error('提交失败，缺少关联文章Id')
        return;
      }
      this.$refs['ruleForm'].validate( async valid => {
        if (valid) {
          const params = {
            ...this.formData,
            head: this.formData.head ? `https://q1.qlogo.cn/g?b=qq&nk=${this.formData.head}&s=640` : '',
            titleId: this.titleId,
            pid: this.pid,
            replyId: this.replyId
          }
          this.saveUserMessage()
          const replayType = this.isUser ? this.$dao.adminComment.replayComment : this.$dao.fontComment.submitComment
          let { success, message } = await replayType(params)
          if (success) {
            this.$refs['ruleForm'].resetFields()
            this.$emit('submit')
          } else {
            this.$message.error(message || '提交评论失败')
          }
        }
      })
    },
    focus() {
      this.$refs.comment.focus()
    },
    saveUserMessage() {
      let userMessage = JSON.parse(JSON.stringify({...this.formData, headPath: this.headPath}))
      delete userMessage.comment
      this.$util.setLocalStorage('commentUser', userMessage)
    }
  },
  mounted() {
    let commentUser = this.$util.getLocalStorage('commentUser')
    if (commentUser) {
      this.formData = commentUser
      this.headPath = commentUser.headPath
    }
  }
}
</script>

<style scoped lang="less">
.comment-form {
  display: flex;
  .el-avatar {
    height: var(--head-width);
    width: var(--head-width);
    flex: 0 0 var(--head-width);
    margin-right: 10px;
  }
  .el-form {
    flex: 1 1 auto;
  }
}
</style>
