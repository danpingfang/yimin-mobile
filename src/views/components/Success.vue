<template>
  <div class="success">
    <i class="icon icon-complete"></i>
    <div class="success-text">
      <h3 v-if="title">{{ title }}</h3>
      <p v-if="summary">{{ summary }}</p>
    </div>
    <!--<button type="submit" @click="onConfirm"-->
            <!--class="button button-primary button-full button-medium">确定-->
    <!--</button>-->
  </div>
</template>

<script>
  export default {
    props: ['title', 'summary']
  };
</script>