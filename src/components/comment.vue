<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" size="small">
      <el-form-item label="评论" prop="comment">
        <el-input
          v-model="formData.comment"
          clearable
          ref="comment"
          type="textarea"
          placeholder="如评论不显示，请等候管理员人工审核"
          maxlength="400"
          show-word-limit
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
      </el-form-item>
      <el-form-item v-if="!isUser" label="称呼" prop="name">
        <el-input
          v-model="formData.name"
          maxlength="20"
          clearable
          show-word-limit
        />
      </el-form-item>
      <el-form-item v-if="!isUser" label="联系邮箱" prop="email">
        <el-input
          v-model="formData.email"
          maxlength="50"
          clearable
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <div style="text-align: right">
      <el-button type="primary" size="small" @click="submitForm">发表评论</el-button>
    </div>
  </div>
</template>

<script>
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
    return {
      formData: {},
      rules: {
        comment: [
          {required: true, message: "评论不能为空", trigger: 'change'},
          {max:400, message: "最多可输入400字"}
        ],
        name: [
          {required: true, message: "称呼不能为空", trigger: 'change'},
          {max:400, message: "最多可输入20字"}
        ],
        email: [
          {max:400, message: "最多可输入50字"}
        ]
      }
    }
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
            titleId: this.titleId,
            pid: this.pid,
            replyId: this.replyId
          }
          const replayType = this.isUser ? this.$dao.replayComment : this.$dao.submitComment
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
    }
  }
}
</script>

<style scoped>

</style>
