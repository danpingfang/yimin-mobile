<template>
  <div class="load-end" v-if="isEnd" :style="styles">{{ text }}</div>
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
    font-size: 14px;
    color: #aaa;
  }
</style>