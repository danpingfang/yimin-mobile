<template>
  <div class="search search-white">
    <form action="" class="search-form search-action-form" @submit.prevent="onSubmit">
      <i class="icon icon-search"></i>
      <input type="text" value="" placeholder="输入项目、地点、专家名" v-model="keywords" id="comment-input">
      <button type="button" v-if="keywords !== ''" class="button button-delete"
              @click="onClearKeyword"><i
        class="icon icon-delete"></i></button>
      <button class="button-search-action button-cancel-action" type="button"
              v-if="keywords === ''" @click.prevent="onCancel">取消
      </button>
      <button class="button-search-action button-confirm-action" type="submit"
              v-if="keywords !== ''">搜索
      </button>
    </form>
  </div>
  <div class="section history-section">
    <h3 class="title">
      <span>历史记录</span>
      <button type="button" @click="onClear" v-if="historySearchList.length > 0">清除</button>
    </h3>
    <div class="content">
      <div class="tags tags-medium tags-light" v-if="historySearchList.length > 0">
        <a href="{{searchUrl}}{{item}}" class="tag-item" v-for="item in historySearchList">{{ item
          }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../../../../config';
  import redirectUrl from '../../../../redirectUrl';
  import Toast from 'vue-toast-mobile';
  import Empty from '../../../components/Empty';

  const searchList = JSON.parse(
      localStorage.getItem('historySearchList')) || [];
  export default {
    data() {
      return {
        searchUrl: `${config.domainUrl}/art-cd-/`,
        isEmpty: true,
        keywords: null,
        searchTipText: '还没有相关历史搜索记录哦～！',
        historySearchList: searchList
      };
    },
    components: {
      Empty
    },
    methods: {
      onSubmit() {
        const keywords = this.keywords;
        const historySearchList = this.historySearchList;
        if (!keywords || keywords === '') {
          return;
        }
        if (historySearchList.indexOf(keywords) === -1) {
          historySearchList.push(keywords);
          localStorage.setItem('historySearchList', JSON.stringify(this.historySearchList));
        }
        const url = `${this.searchUrl}${keywords}`;
        redirectUrl(url);
      },
      onCancel() {
        redirectUrl();
      },
      onClearKeyword() {
        this.keywords = null;
        this.isEmpty = true;
      },
      onClear() {
        this.historySearchList = [];
        localStorage.removeItem('historySearchList');
      }
    }
  };
</script>