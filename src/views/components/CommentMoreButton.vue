<template>
  <div class="comment-more" v-if="commentCount >= 10 || comments.length >= 10"><a class="comment-more-link"
                               href="/art/{{ commentId }}/comment">更多评论</a>
  </div>
</template>

<script>
  export default {
    props: ['commentId', 'commentCount', 'comments']
  }
</script>