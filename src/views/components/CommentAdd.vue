<template>
  <comment :comments="addComments"></comment>
</template>

<script>
  import Comment from './Comment';

  export default {
    props: ['addComments'],
    components: {
      Comment
    }
  };
</script>