<template>
  <div>
    <el-form :model="formData" :rules="rules">
      <el-form-item prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item prop="abstract">
        <el-input v-model="formData.abstract" placeholder="请输入摘要" />
      </el-form-item>
      <el-form-item prop="category">
        <el-input v-model="formData.category" placeholder="请输入分类" />
      </el-form-item>
      <el-form-item prop="category">
        <el-input v-model="formData.tag" placeholder="请输入标签" />
      </el-form-item>
      <el-form-item prop="content">
        <mavon-editor ref="editor" v-model="formData.content" @save="submit" @imgAdd="uploadImage" @imgDel="removeImage" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
export default {
  name: 'MarkdownEdit',
  components: {
    mavonEditor
  },
  data () {
    return {
      formData: {
        title: '',
        abstract: '',
        category: '',
        tag: '',
        content: ''
      },
      rules: {
        title: [{ required: true, message: '必填', trigger: 'blur' }],
        abstract: [{ required: true, message: '必填', trigger: 'blur' }],
        tag: [{ required: true, message: '必填', trigger: 'blur' }],
        category: [{ required: true, message: '必填', trigger: 'blur' }],
        content: [{ required: true, message: '必填', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async uploadImage (pos, file) {
      console.log(pos, file)
      let formData = new FormData();
      formData.append('file', file)
      let res = await this.$dao.getUpload(formData)
      if (res.success) {
        this.$refs.editor.$img2Url(pos, res.path)
      } else {
        this.$message.error('图片上传失败')
      }
    },
    removeImage () {

    },
    submit () {

    }
  },
  mounted () {
  }

}
</script>

<style scoped>

</style>
