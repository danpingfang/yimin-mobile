<template>
  <div class="comment" v-for="comment in comments">
    <div class="author-info">
      <div class="author-avatar"><img class="image"
                                      :src="comment.commentUser.avatar"
                                      alt="{{ comment.commentUser.nickname }}">
      </div>
      <div class="content">
        <div class="author-header">
          <div class="author-name">{{ comment.commentUser.nickname }}</div>
        </div>
        <time>{{ comment.commentTimeText }}</time>
        <div class="text">{{ comment.commentContent }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['comments']
  };
</script>