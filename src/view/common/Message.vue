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
  background: var(--base-background-color);
  padding: var(--padding);
}
</style>