import Vue from 'vue';
import config from '../../../config';
import platform from '../../../utils/platform';
import VueInfiniteScroll from 'vue-infinite-scroll';
import checkLogin from '../../../checkLogin';
import Toast from 'vue-toast-mobile';
import Comment from '../../components/Comment';
import CommentAdd from '../../components/CommentAdd';
import CommentEmpty from '../../components/CommentEmpty';
import CommentMoreButton from '../../components/LoadEnd';
import MessageBox from '../../components/MessageBox';
import GuideTip from '../../components/GuideTip';
import MessageBoxDialog from '../../components/MessageBoxDialog';
import AudioEx from '../../components/AudioEx';
import Loading from '../../components/Loading';
import LoadEnd from '../../components/LoadEnd';


Vue.use(VueInfiniteScroll);

$(function() {
  const articleId = jsConfig.articleId;
  const commentCount = jsConfig.commentCount;
  const isOverseaApp = platform.isOverseaApp;

  new Vue({
    el: '#app',
    data() {
      return {
        isLogin: false,
        addComments: [],
        comments: [],
        busy: false,
        isLoading: false,
        startIndex: 20,
        loadEndText: '没有更多了',
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
      CommentAdd,
      CommentMoreButton,
      CommentEmpty,
      LoadEnd,
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
        this.hideMessageBox();
      },
      onMessageSend(content) {
        this.sendMessage(content);
      },
      onWrite() {
        this.onWrite();
      }
    },
    ready() {
      if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
        const imgs = [];
        $('.article-content img').map(function (i, item) {
          imgs.push(item.src);
        });
        $(document).on('click', function (e) {
          const target = $(e.target);
          if (target.closest('.article-content').length && target[0].nodeName.toLowerCase() === 'img') {
            wx.previewImage({
              current: target.attr('src'),
              urls: imgs
            });
          }
        });
      }
    },
    created() {
      checkLogin().done((response) => {
        if (response.code === 0) {
          this.isLogin = true;
        }
      });
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
            if (response.code === 0) {
              const data = response.data;
              const count = data.count;
              if (count > 0) {
                self.comments = self.comments.concat(data.list);
                self.busy = false;
              } else if (count === 0) {
                self.busy = true;
              }
              self.startIndex = data.nextIndex;
            }
            self.isLoading = false;
          }
        });
      },
      hideMessageBox() {
        this.showMessageBox = false;
        document.getElementById('comment-input').value = '';
        document.getElementById('comment-input').blur();
        document.body.classList.remove('ui-overflow-hidden');
      },
      sendMessage(content) {
        const self = this;
        this.hideMessageBox();
        $.ajax({
          type: 'post',
          url: `${config.authApiUrl}/art/${articleId}/add_comment`,
          data: {
            content: content
          },
          success(response) {
            const code = response.code;
            if (code === 0) {
              self.addComment(response.data);
            } else {
              self.showToast(response.message);
            }
          }
        });
      },
      addComment(comment) {
        this.addComments = [comment].concat(this.addComments);
        this.setScroll();
      },
      setScroll() {
        $('html, body').animate({
          scrollTop: $('.comment-container').offset().top
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
          location.href = `${config.domainUrl}/index/index`;
        } else {
          history.go(-1);
        }
      },
      onWrite() {
        if (this.isLogin) {
          this.showMessageBox = true;
          document.body.classList.add('ui-overflow-hidden');
        }
        else {
          if (!isOverseaApp) {
            this.openGuideTip('绑定帐号后可以评论你喜欢的内容');
          }
        }
      },
      onIconClickWrite() {
        if (this.isLogin) {
          if (commentCount === 0) {
            this.showMessageBox = true;
            document.body.classList.add('ui-overflow-hidden');
          } else {
            this.setScroll();
          }
        } else {
          if (!isOverseaApp) {
            this.openGuideTip('绑定帐号后可以评论你喜欢的内容');
          }
        }
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
              if (!isOverseaApp) {
                self.openGuideTip('绑定帐号后可以点赞你喜欢的内容');
              }
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
