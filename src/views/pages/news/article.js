import Vue from 'vue';
import config from '../../../config';
import checkLogin from '../../../checkLogin';
import Toast from 'vue-toast-mobile';
import Comment from '../../components/Comment.vue';
import MessageBox from '../../components/MessageBox';
import GuideTip from '../../components/GuideTip';
import MessageBoxDialog from '../../components/MessageBoxDialog';
import AudioEx from '../../components/AudioEx';
import Loading from '../../components/Loading';

$(function() {
  const articleId = jsConfig.articleId;
  const commentCount = jsConfig.commentCount;

  new Vue({
    el: '#app',
    data() {
      return {
        comments: [],
        busy: false,
        isLoading: false,
        startIndex: 20,
        showMessageBox: false,
        config: {
          hideMaskEnable: true
        },
        showGuideTip: false,
        tipText: null
      };
    },
    components: {
      Comment,
      MessageBox,
      AudioEx,
      Loading,
      GuideTip,
      MessageBoxDialog
    },
    events: {
      onInputTouch() {
        this.onWrite();
      },
      onConfirm() {
        location.href = config.authUrl;
      },
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
              localStorage.setItem('isScroll', true);
              location.href = href;
            } else {
              self.showToast(response.message);
            }
          }
        });
      }
    },
    ready() {
      if (localStorage.getItem('isScroll')) {
        $('html, body').animate({
          scrollTop: $('.comment-container').offset().top
        });
        localStorage.removeItem('isScroll');
      }
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
        if (history.length === 1) {
          location.href = `${config.domainUrl}/art/index`;
        } else {
          history.go(-1);
        }
      },
      onWrite() {
        checkLogin().done((response) => {
          if (response.code === 0) {
            this.showMessageBox = true;
            document.body.classList.add('ui-overflow-hidden');
          } else {
            this.openGuideTip('绑定帐号后可以评论你喜欢的内容');
          }
        });
      },
      onIconClickWrite() {
        checkLogin().done((response) => {
          if (response.code === 0) {
            if (commentCount === 0) {
              this.showMessageBox = true;
              document.body.classList.add('ui-overflow-hidden');
            } else {
              location.href = `/art/${articleId}/comment`;
            }
          } else {
            this.openGuideTip('绑定帐号后可以评论你喜欢的内容');
          }
        });
      },
      onVote() {
        const self = this;
        const buttonFav = $('.button-fav');
        $.ajax({
          type: 'post',
          url: `${config.authApiUrl}/art/${articleId}/add_upvote`,
          success(response) {
            const code = response.code;
            if (code === 0) {
              buttonFav
                .find('.icon').addClass('icon-fav-select');
              buttonFav
                .addClass('active')
                .find('span').text(response.data.upvoteCount);
            } else if (code > 0) {
              self.showToast(response.message);
            } else {
              self.openGuideTip('绑定帐号后可以点赞你喜欢的内容');
            }
          }
        });
      },
      showToast(message) {
        Toast({
          message: message,
          position: 'bottom',
          duration: 3000,
          className: 'toast-wrap'
        });
      },
      onAudioTouchStart() {
        this.$refs.audio.showToolBar();
      }
    }
  });
});
