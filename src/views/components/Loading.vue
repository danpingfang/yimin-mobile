<template>
  <div class="loading" v-if="isLoading">数据加载中...</div>
</template>

<script>
  import config from '../../config';

  export default {
    props: ['isLoading']
  };
</script>
