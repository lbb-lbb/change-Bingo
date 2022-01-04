<template>
  <div class="about-card">
    <el-switch
      style="display: block"
      v-model="value"
      active-text="关于我"
      inactive-text="关于本站">
    </el-switch>
    <div v-if="value" class="animate__animated animate__bounceInRight">
      <MarkedView :mark-down="getCommonUser.longIntroduction" />
    </div>
    <div v-else class="animate__animated animate__bounceInLeft">
      <MarkedView :mark-down="getCommonUser.blogIntroduction" />
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
  background: rgba(35,35,44,1);
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
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
.el-switch__label * {
  font-size: 20px !important;
}
/deep/.el-switch__label.is-active {
  color: #ffffff;
}
</style>
