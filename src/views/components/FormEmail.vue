<template>
  <validator name="loginform">
    <form class="form login-form" @submit="onSubmit" v-show="currentType === 2">
      <div
        class="form-field{{($loginform.email.touched || $loginform.email.modified) && $loginform.email.invalid ? ' form-field-error' : '' }}">
        <i class="icon icon-email"></i>
        <input class="form-input"
               v-validate:email="['email']"
               type="email" value="" placeholder="请输入邮箱地址" v-model="email">
        <verify-code :disable="$loginform.email.invalid" :config="config"></verify-code>
      </div>
      <div
        class="form-field{{($loginform.vertify.touched || $loginform.vertify.modified) && $loginform.vertify.invalid ? ' form-field-error' : '' }}">
        <i class="icon icon-message-code"></i>
        <input class="form-input" type="tel" value="" minlength="4" required
               maxlength="4"
               v-validate:vertify="['vertifyMessageCode']"
               placeholder="请输入验证码" v-model="messageCode" name="messageCode">
      </div>
      <div class="extra-field">
        <button type="submit"
                class="button button-primary button-full button-medium{{ $loginform.valid ? '' : ' button-disable' }}">
          确定
        </button>
        <div class="agreement-text">点击确定即表示您同意<a
          href="/cis/open/web/account/agreement.htm">《漂洋海外用户协议》</a>
        </div>
      </div>
    </form>
  </validator>
  <message-code-dialog
    :show-message-code="showMessageCode" :config="config.imageCode"></message-code-dialog>
</template>

<script>
  import config from '../../config';
  import getParameterByName from '../../utils/getParameterByName';
  import redirectUrl from '../../redirectUrl';
  import Toast from 'vue-toast-mobile';
  import VerifyCode from './VerifyCode';
  import MessageCodeDialog from '../components/MessageCodeDialog';

  export default {
    props: ['currentType'],
    data() {
      return {
        areaCode: null,
        email: null,
        config: config.loginConfig,
        messageCode: null,
        imageCode: null,
        isValid: false,
        weixinCode: getParameterByName('weixinCode'),
        showMessageCode: false
      };
    },
    components: {
      VerifyCode,
      MessageCodeDialog
    },
    events: {
      onCheckFiledValue(fn) {
        if (this.$loginform.email.valid) {
          fn();
        }
      },
      setImageCode(imageCode) {
        this.imageCode = imageCode;
      },
      getMessageCodeParams(cb) {
        const self = this;
        cb({
          account: self.email
        });
      }
    },
    validators: {
      email(val) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(val);
      },
      vertifyMessageCode(val) {
        return val !== '' && val.length === 4;
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        if (this.$loginform.valid) {
          $.ajax({
            url: `${config.apiUrl}/account/login`,
            data: {
              account: this.email,
              verifyCode: this.messageCode,
              imageCode: this.imageCode,
              weixinCode: this.weixinCode
            },
            dataType: 'json',
            success(response) {
              if (response.code === 0) {
                redirectUrl(true);
              } else {
                Toast({
                  message: response.message,
                  position: 'middle',
                  duration: 5000,
                  className: 'toast-wrap'
                });
              }
            }
          });
        }
      }
    }
  };
</script>
