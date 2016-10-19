<template>
  <validator name="loginform">
    <form class="form login-form" @submit="onSubmit" v-show="currentType === 1">
      <div
        class="form-field{{($loginform.mobile.touched || $loginform.mobile.modified) && $loginform.mobile.invalid ? ' form-field-error' : '' }}">
        <div class="form-select-container">
          <select class="form-select" v-model="areaCode">
            <option value="86" selected="selected">+86</option>
          </select>
        </div>
        <input class="form-input" type="tel" minlength="11" maxlength="11"
               name="mobile"
               v-model="mobileNumber"
               placeholder="请输入手机号"
               v-validate:mobile="['mobileNumber']">
        <verify-code :disable="$loginform.mobile.invalid"
                     :config="config"></verify-code>
      </div>
      <div
        class="form-field{{($loginform.vertify.touched || $loginform.vertify.modified) && $loginform.vertify.invalid ? ' form-field-error' : '' }}">
        <i class="icon icon-message-code"></i>
        <input class="form-input" type="tel" value="" minlength="4"
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
</template>

<script>
  import config from '../../config';
  import getParameterByName from '../../utils/getParameterByName';
  import Toast from 'vue-toast-mobile';
  import redirectUrl from '../../redirectUrl';
  import VerifyCode from './VerifyCode';

  export default {
    props: ['currentType'],
    data() {
      return {
        isInit: false,
        areaCode: null,
        config: config.loginConfig,
        mobileNumber: null,
        messageCode: null,
        imageCode: null,
        error: false,
        errorTip: null,
        isValid: false,
        weixinCode: getParameterByName('weixinCode')
      };
    },
    components: {
      VerifyCode
    },
    events: {
      setImageCode(imageCode) {
        this.imageCode = imageCode;
      },
      getMessageCodeParams(cb) {
        const self = this;
        cb({
          account: self.mobileNumber
        });
      },
      onCheckFiledValue(fn) {
        if (this.$loginform.mobile.valid) {
          fn();
        }
      }
    },
    validators: {
      mobileNumber(val) {
        return /^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/
          .test(val);
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
              account: this.mobileNumber,
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
