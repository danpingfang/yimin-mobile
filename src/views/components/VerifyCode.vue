<template>
  <button type="button" @click="sendVertifyCode"
          class="button-action-vertifycode{{ disable ? ' button-disable' : '' }}">{{ text | getText }}</button>
  <message-code-dialog
    :show-message-code="showMessageCode"
    :config="config.imageCode"></message-code-dialog>
</template>

<script>
  import config from '../../config';
  import MessageCodeDialog from '../components/MessageCodeDialog';

  const TIMER_COUNT = 60;
  export default {
    props: ['disable', 'config'],
    data() {
      return {
        timerStart: false,
        timerCount: TIMER_COUNT,
        showMessageCode: false
      };
    },
    components: {
      MessageCodeDialog
    },
    events: {
      onMessageCodeDialogCallback(imageCode, errorCallback) {
        this.sendMessageCode(imageCode, errorCallback);
      },
      onCancel() {
        this.showMessageCode = false;
      }
    },
    filters: {
      getText() {
        return this.timerStart ? `${this.timerCount}秒后重发` : '发送验证码';
      }
    },
    methods: {
      startTimer() {
        if (this.timerStart || this.disable) {
          return;
        }
        let timer;
        let fn = () => {
          if (this.timerCount === 1) {
            this.timerCount = TIMER_COUNT;
            this.timerStart = false;
            fn = null;
            clearTimeout(timer);
          } else {
            this.timerCount -= 1;
          }
          timer = setTimeout(fn, 1000);
        };
        setTimeout(fn, 1000);
        this.timerStart = true;
      },
      sendVertifyCode() {
        if (!this.disable && !this.timerStart) {
          this.needImageCode().then((response) => {
            if (response.data) {
              this.showMessageCode = true;
            } else {
              this.sendMessageCode();
            }
          });
        }
      },
      needImageCode() {
        const self = this;
        return new Promise((resolve, reject) => {
          $.ajax({
            url: `${config.apiUrl}${self.config.needImage.url}`,
            data: self.config.needImage.params || {},
            dataType: 'json',
            success(response) {
              resolve(response);
            },
            error(response) {
              reject(response);
            }
          });
        });
      },
      sendMessageCode(imageCode, errorCallback) {
        this.startTimer();
        this.$dispatch('getMessageCodeParams', (params) => {
          let self = this;
          let data = Object.assign({}, this.config.messageCode.params, params);
          if (imageCode) {
            data = Object.assign(data, {imageCode: imageCode});
          }
          $.ajax({
            url: `${config.apiUrl}${this.config.messageCode.url}`,
            type: 'post',
            data: data,
            dataType: 'json',
            success(response) {
              if (response.code === 0) {
                self.showMessageCode = false;
                self.$dispatch('setImageCode', imageCode);
              } else {
                if (errorCallback) {
                  errorCallback(response.message);
                }
              }
            }
          });
        });
      }
    }
  };
</script>