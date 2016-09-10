import Vue from 'vue';
import config from '../../../config';
import VueInfiniteScroll from 'vue-infinite-scroll';
import Comment from '../../components/Comment.vue';
import MessageBox from '../../components/MessageBox';
import GuideTip from '../../components/GuideTip';
import Loading from '../../components/Loading';

Vue.use(VueInfiniteScroll);

new Vue({
  el: '#app',
  data() {
    return {
      comments: [],
      busy: false,
      isLoading: false,
      startIndex: 20,
      showMessageBox: false,
      showGuideTip: false,
      tipText: null
    };
  },
  components: {
    Comment,
    GuideTip,
    MessageBox,
    Loading
  },
  events: {
    onClose() {
      this.hideGuideTip();
    },
    onMessageCancel() {
      this.showMessageBox = false;
      document.body.classList.remove('ui-overflow-hidden');
    },
    onMessageSend(comment) {
      const href = location.href;
      const self = this;
      self.showMessageBox = false;
      document.body.classList.add('ui-overflow-hidden');
      $.ajax({
        type: 'post',
        url: `${config.authApiUrl}/art/${articleId}/add_comment`,
        data: {
          content: comment
        },
        success(response) {
          const code = response.code;
          if (code === 0) {
            location.href = href;
          } else {
            self.showToast(response.message);
          }
        }
      });
    },
  },
  methods: {
    loadMore() {
      const self = this;
      $.ajax({
        url: `${config.apiUrl}/art/${jsConfig.articleId}/comment_list`,
        data: {
          startIndex: self.startIndex
        },
        dataType: 'json',
        beforeSend() {
          self.busy = true;
          self.isLoading = true;
        },
        success(response) {
          if (response.code > 0) {
            const data = response.data;
            if (data.count > 0) {
              self.comments = self.comments.concat(data.list);
              self.startIndex = data.nextIndex;
              self.busy = false;
            }
          }
          self.isLoading = false;
        }
      });
    },
    hideGuideTip() {
      this.showGuideTip = false;
      this.tipText = null;
    },
    openGuideTip(tipText) {
      this.showGuideTip = true;
      this.tipText = tipText;
    },
    onBack() {
      history.go(-1);
    }
  }
});