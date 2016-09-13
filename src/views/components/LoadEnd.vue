<template>
  <div class="load-end" v-if="isEnd === 0" :style="styles">{{ text }}</div>
</template>

<script>
  export default {
    props: ['isEnd', 'text', 'styles']
  }
</script>

<style>
  .load-end {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    padding: 14px 0;
    font-size: 14px;
    color: #aaa;
  }
</style>