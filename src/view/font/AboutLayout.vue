<template>
  <div class="about-card">
    <el-switch
      style="display: block"
      v-model="value"
      active-text="关于我"
      inactive-text="关于本站">
    </el-switch>
    <div v-show="value" class="animate__animated animate__bounceInRight">
      <MarkedView :mark-down="getCommonUser.longIntroduction" />
      <div>
        <h2 class="m-b-10">本站链接</h2>
        <p class="m-b-10">如果想与我交换友链，可以在留言板给我留言哦😀😀</p>
        <p class="m-b-10">我的友链</p>
        <div class="link">
          <p>昵称：<strong>{{getCommonUser.name}}</strong></p>
          <p>网站链接：<strong>https://lxtlbb.top</strong></p>
          <p>头像：<strong>{{getCommonUser.head}}</strong></p>
          <p>描述：<strong>{{getCommonUser.introduction}}</strong></p>
        </div>
      </div>
    </div>
    <div v-show="!value" class="animate__animated animate__bounceInLeft">
      <MarkedView :mark-down="getCommonUser.blogIntroduction" />
      <div>
        <h2 class="m-b-10">本站链接</h2>
        <p class="m-b-10">如果想与我交换友链，可以在留言板给我留言哦😀😀</p>
        <p class="m-b-10">我的友链</p>
        <div class="link">
          <p>昵称：<strong>{{getCommonUser.name}}</strong></p>
          <p>网站链接：<strong>https://lxtlbb.top</strong></p>
          <p>头像：<strong>{{getCommonUser.head}}</strong></p>
          <p>描述：<strong>{{getCommonUser.introduction}}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkedView from "../../components/MarkedView";
import {mapGetters} from "vuex";
export default {
  name: 'AboutLayout',
  components: {
    MarkedView
  },
  data () {
    return {
      value: false
    }
  },
  computed: {
    ...mapGetters(['getCommonUser'])
  }
}
</script>

<style scoped lang="less">
.about-card {
  border-radius: 20px;
  overflow: hidden;
  background: var(--base-background-color);
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
}
.el-switch {
  margin-bottom: 20px;
}
.m-b-10 {
  margin-bottom: 10px;
}
.link {
  font-size: var(--font-min);
  word-break: break-all;
  padding: var(--padding);
  background-color: #13131A;
  border-radius: 20px;
}
/deep/.el-switch__core:after {
  background-color: #454558;
}
/deep/.el-switch__core {
  border-color: #13131A !important;
  background-color: #13131A !important;
  transform: scale(1.3) !important;
}
/deep/.el-switch__label {
  color: #696969;
}
/deep/.el-switch__label *{
  font-size: 20px !important;
}
/deep/.el-switch__label.is-active {
  color: #ffffff;
}
</style>
