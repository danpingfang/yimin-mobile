<template>
  <li class="news-item{{ item.coverImageUrl !== '' ? ' news-item--image' : '' }}" v-for="item in items">
    <a class="news-container" href="/art/{{ item.articleId }}.htm">
      <div class="content">
        <h3 class="news-title">{{ item.title }}</h3>
        <ul class="tags tags-small">
          <li class="tag-item" v-for="tag in item.tags">{{ tag }}</li>
        </ul>
        <div class="extra-info">
          <span class="author">{{ item.authorUser.nickname }}</span>
          <time class="update-time">{{ item.publisherTimeText }}</time>
          <span class="view-count">浏览量{{ item.viewCount }}</span>
        </div>
      </div>
      <div class="image-container" v-if="item.coverImageUrl !== ''">
        <img class="image lazyload"
             :src="{{ imageUrl }}"
             :alt="{{ item.title }}" data-src="{{ item.coverImageUrl }}">
      </div>
    </a>
  </li>
</template>

<script>
  import config from '../../config';

  export default {
    props: ['items'],
    data() {
      return {
        imageUrl: `${config.staticUrl}/static/yimin/images/default.png`
      };
    }
  };
</script>