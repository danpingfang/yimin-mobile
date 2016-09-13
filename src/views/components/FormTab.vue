<template>
  <nav class="form-tab-nav">
    <span class="form-tab-item{{ item.type === currentType ? ' active' : '' }}"
          v-for="item in tabs" @click="onTabClick(item.type)">{{ item.name }}</span>
  </nav>
</template>

<script>
  export default {
    props: ['tabs', 'currentType'],
    methods: {
      onTabClick(type) {
        this.currentType = type;
        this.$dispatch('onChangeFormTab', type);
      }
    }
  }
</script>
