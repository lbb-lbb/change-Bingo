<template>
<div class="message-card">
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
.message-card {
  border-radius: 20px;
  margin: 20px auto;
  overflow: hidden;
  background: rgba(35,35,44,0.7);
  padding: 20px;
}
</style>