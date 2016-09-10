<template>
  <div class="message-tip" v-if="show" transition="message-tip">
    <div class="message-tip-text">{{ tipText }}</div>
  </div>
</template>

<script>
  export default {
    props: ['show', 'tipText'],
    created() {
      setTimeout(() => {
        this.show = false;
      }, 3000);
    }
  };
</script>
