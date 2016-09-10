<template>
  <div class="empty">
    <i class="icon icon-empty"></i>
    <p class="empty-text">{{ text }}</p>
  </div>
</template>

<script>
  export default {
    props: ['text']
  };
</script>

<style>
  .empty {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 90%;
    margin: -61px 0 0 -45%;
    text-align: center;
    color: #ddd;
  }
  .icon-empty {
    font-size: 72px;
    color: #eee;
  }
</style>