<template>
  <el-dialog :visible.sync="visible" append-to-body custom-class="modal-body" :close-on-click-modal="false">
    <div>
      <el-form :model="formData" :rules="rules" ref="form" hide-required-asterisk>
        <el-form-item prop="name">
          <el-input maxlength="50" v-model="formData.name" placeholder="网站名称">
            <template v-if="!getIsPhone" slot="prepend">昵称</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="link">
          <el-input maxlength="255" v-model="formData.link" placeholder="网站地址">
            <template v-if="!getIsPhone" slot="prepend">网站地址</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="head">
          <el-input maxlength="255" v-model="formData.head" placeholder="头像地址">
            <template v-if="!getIsPhone" slot="prepend">头像地址</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="remark">
          <el-input type="textarea" maxlength="500" :autosize="{minRows: 3, minRows: 6}" v-model="formData.remark" placeholder="描述">
            <template v-if="!getIsPhone" slot="prepend">描述</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button round size="mini" @click="close">取消</el-button>
        <el-button round type="primary" size="mini" @click="submit">确认</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "LinkForm",
  data() {
    return {
      formData: {},
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        head: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      visible: false,
    }
  },
  computed: {
    ...mapGetters(['getIsPhone'])
  },
  methods: {
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let { success, message } = await this.$dao.adminLink.createLink(this.formData)
          if (success) {
            this.$message.success('提交成功')
            this.close()
          } else {
            this.$message.error(message || '提交失败')
          }
        }
      })
    },
    add() {
      this.visible = true
      this.$nextTick(() => {
        this.formData = {}
        this.$refs.form.resetFields()
      })
    },
    edit(value) {
      this.visible = true
      this.$nextTick(() => {
        this.formData = {}
        this.$refs.form.resetFields()
        this.formData = Object.assign({}, value)
      })
    },
    close() {
      this.visible = false
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
</style>
<style>
.modal-body {
  background: var(--base-background-color);
  border-radius: 20px;
}
</style>
