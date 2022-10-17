<template>
  <editor v-model="html"
          :init="editorConfig" />
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import '/public/tinymce/tinymce.min'
import '/public/tinymce/models/dom/model.min'
import '/public/tinymce/icons/default/icons.min'
import '/public/tinymce/themes/silver/theme.min'
import '/public/tinymce/plugins/image/plugin.min'
export default {
  name: 'Tinymce',
  components: {
    Editor
  },
  data () {
    return {
      html: '',
      editorConfig: {
        relative_urls: false,
        remove_script_host: false,
        plugins: ['image'],
        toolbar: 'image',
        width: '100%',
        height: 600,
        paste_data_images: true,
        images_upload_handler: blobInfo => new Promise((resolve, reject) => {
          resolve('data:image/png;base64,' + blobInfo.base64() )
        })
      }
    }
  },
  created() {
    window.tinyMCE.baseURL = 'tinymce'
  },
  methods: {

  }
}</script>
