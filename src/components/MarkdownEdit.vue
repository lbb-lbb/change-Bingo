<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="form">
      <el-form-item prop="title">
        <el-input
          v-model="formData.title"
          placeholder="请输入标题"
          maxlength="50"
        />
      </el-form-item>
      <el-form-item prop="abstract">
        <el-input
          type="textarea"
          maxlength="500"
          :autosize="{minRows:3, minRows:6}"
          v-model="formData.abstract"
          placeholder="请输入摘要"
        />
      </el-form-item>
      <el-form-item prop="category">
        <el-select
          style="width: 100%"
          v-model="formData.category"
          placeholder="请选择或创建一个分类"
          filterable
          default-first-option
          allow-create
        >
          <el-option
            v-for="item in category"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="tag">
        <el-select
          style="width: 100%"
          v-model="formData.tag"
          placeholder="请选择或创建标签"
          filterable
          multiple
          default-first-option
          allow-create
        >
          <el-option
            v-for="item in tags"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
          </el-select>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button v-if="this.$route.query.id" type="primary" size="small" @click="createArticle">创建新文章</el-button>
        <el-button type="primary" size="small" @click="submit(0)">保存为草稿</el-button>
        <el-button type="primary" size="small" @click="submit(1)">提交</el-button>
        <el-button type="primary" size="small" @click="submit(2)">提交并发布</el-button>
      </el-form-item>
      <el-form-item prop="content">
        <mavon-editor class="editor" ref="editor" v-model="formData.content" @save="submit" @imgAdd="uploadImage" @imgDel="removeImage" />
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
      },
      tags: [],
      category: [],
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
    submit (status) {
      this.$refs.form.validate(async valid => {
        if(valid) {
          let params = {
            ...this.formData,
            status: status,
            tag: this.formData.tag.join(','),
            category: this.formData.category,
            id: this.$route.query.id ? this.$route.query.id : ''
          }
          let res = await this.$dao.createArticle(params)
          if (res.success) {
            if(res.id) {
              await this.$router.replace({path: '/user/write', query: {id: res.id}})
            }
            this.$message.success('成功')
          }
        }
      })
    },
    async getArticleMessage () {
      let res = await this.$dao.articleClassify()
      if(res.success) {
        this.tags = res.result.tags
        this.category = res.result.category
      }
    },
    async getArticleInfo () {
      if (this.$route.query.id) {
        const { success, result } = await this.$dao.getArticleInfo({id: this.$route.query.id})
        if (success) {
          this.formData.content = result.content
          this.formData.abstract = result.abstract
          this.formData.tag = result.tag.split(',')
          this.formData.category = result.category.split(',')
          this.formData.title = result.title
        }
      } else {
        console.log(this.$options.data())
        this.formData = this.$options.data().formData
      }
    },
    createArticle() {
      this.$router.push('/user/write')
      this.getArticleInfo()
    }
  },
  mounted () {
    this.getArticleMessage()
    this.getArticleInfo()
  }

}
</script>

<style scoped>
.editor {
  min-height:600px;
}
</style>
