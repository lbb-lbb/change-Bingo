<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="action"
      :headers="headers"
      :show-file-list="false"
      accept="image/jpeg,png"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div v-if="isShow" class="remove" @click="removeImage">点击移除上传图片</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import request from '../utils/request.js'

export default {
  name: 'UploadImage',
  props: {
    imageUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      action: `${request.defaults.baseURL}/user/upload`,
      isShow: false,
    };
  },
  computed: {
    ...mapGetters(['getToken', 'getUser']),
    headers() {
      return {
        'Authorization': `Bearer ${this.getToken}`
      }
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      this.$emit('update:imageUrl', res.path)
      this.isShow = true
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    removeImage() {
      console.log(this.getUser.head);
      this.$emit('update:imageUrl', this.getUser.head)
      this.isShow = false
    }
  },
  mounted() {
  }

}
</script>

<style scoped lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #ffffff;
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  border-radius: 50%;
  background-color: #8c939d;
}
.avatar-uploader-icon:hover {
  background-color: #8c939d;
}
.avatar {
  width: 90px;
  height: 90px;
  display: block;
  border-radius: 50%;
}
.remove {
  cursor: pointer;
  font-size: 12px;
  color: #999999;
}
</style>
