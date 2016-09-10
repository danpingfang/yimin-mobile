<template>
  <div class="search search-white">
    <form action="" class="search-form search-action-form" @submit.prevent="onSubmit">
      <i class="icon icon-search"></i>
      <input type="text" value="" placeholder="输入项目、地点、专家名" v-model="keywords" autofocus id="comment-input"
             @input="onInput">
      <button type="button" v-if="!isEmpty" class="button button-delete"
              @touchstart="onClearKeyword"><i
        class="icon icon-delete"></i></button>
      <button class="button-search-action button-cancel-action" type="button"
              v-if="isEmpty" @touchstart.prevent="onCancel">取消
      </button>
      <button class="button-search-action button-confirm-action" type="submit"
              v-if="!isEmpty">搜索
      </button>
    </form>
  </div>
  <div class="section history-section">
    <h3 class="title">
      <span>历史记录</span>
      <button type="button" @touchstart="onClear" v-if="historySearchList.length > 0">清除</button>
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
      onInput() {
        if (this.keywords !== '') {
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }
      },
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