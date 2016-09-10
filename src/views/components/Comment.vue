<template>
  <div class="comment" v-for="comment in comments">
    <div class="author-info">
      <div class="author-avatar"><img class="image"
                                      src=""
                                      alt="{{ comment.commentUser.nickName }}"></div>
      <div class="content">
        <div class="author-header">
          <div class="author-name">{{ comment.commentUser.nickName }}</div>
        </div>
        <time>30分钟前</time>
        <div class="text">{{ comment.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['comments'],
    data() {
      return {}
    }
  };
</script>