<template>
<div>
  <comment-group id="liuYanBan" :is-user="getLogin" />
</div>
</template>

<script>
import commentGroup from "../../components/comment/commentGroup";
import {mapGetters} from "vuex";
export default {
  name: "Message",
  components: { commentGroup },
  computed: {
    ...mapGetters(['getLogin'])
  }
}
</script>

<style scoped>

</style>