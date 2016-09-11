<template>
  <div class="comment-empty" v-if="commentCount === 0 && comments.length === 0">
    <i class="icon icon-pen"></i>
    <p class="comment-empty-text">智慧如你，不如<a href=""
                                            @touchstart.prevent="onWrite">发表一点想法</a>吧！
    </p>
  </div>
</template>

<script>
  export default {
    props: ['commentCount', 'comments'],
    methods: {
      onWrite() {
        this.$dispatch('onWrite');
      }
    }
  }
</script>