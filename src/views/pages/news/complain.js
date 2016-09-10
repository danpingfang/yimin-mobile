import Vue from 'vue';
import Toast from 'vue-toast-mobile';
import config from '../../../config';
import GuideTip from '../../components/GuideTip';


new Vue({
  el: '#app',
  data() {
    return {
      reason: '',
      showGuideTip: false,
      tipText: null
    }
  },
  components: {
    GuideTip
  },
  events: {
    onConfirm() {
      location.href = config.authApiUrl;
    },
    onClose() {
      this.hideGuideTip();
    }
  },
  methods: {
    hideGuideTip() {
      this.showGuideTip = false;
      this.tipText = null;
    },
    openGuideTip(tipText) {
      this.showGuideTip = true;
      this.tipText = tipText;
    },
    onSubmit() {
      const self = this;
      $.ajax({
        type: 'post',
        url: `${config.authApiUrl}/art/${jsConfig.articleId}/add_complain`,
        data: {
          reason: this.reason
        },
        success(response) {
          const code = response.code;
          if (code === 0) {
            location.href = `/art/${jsConfig.articleId}`
          } else if (code > 0) {
            self.showToast(response.message);
          } else {
            self.openGuideTip('举报需要绑定账号，点击确定进行绑定～！');
          }
        }
      });
    },
    showToast(message) {
      Toast({
        message: message,
        position: 'middle',
        duration: 3000,
        className: 'toast-wrap'
      });
    }
  }
});
