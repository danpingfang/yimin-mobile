<template>
  <div class="loading" v-if="isLoading"><img
    :src="imageUrl" alt="logo">数据加载中...
  </div>
</template>

<script>
  import config from '../../config';

  export default {
    props: ['isLoading'],
    data() {
      return {
        imageUrl: `${config.staticUrl}/static/yimin/images/spinner-medium-1x-dbb1334f.gif`
      };
    }
  };
</script>

<style>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    color: #999;
  }

  .loading img {
    display: block;
    margin-right: 10px;
  }
</style>