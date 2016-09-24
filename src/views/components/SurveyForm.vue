<template>
  <div class="survey-form">
    <div class="form-field{{ nameTipError ? ' form-field-error' : '' }}">
      <input v-if="isDisableNameInput" readonly class="form-input disabled"
             type="text" value="{{ name }}(不可更改)">
      <template v-if="!isDisableNameInput">
        <input class="form-input" type="text" value="" placeholder="姓名(必填)"
               v-model="name" @input="onNameInput">
        <button type="button" v-if="name !== ''" class="button button-delete"
                @click="onClear('name')"><i class="icon icon-delete"></i>
        </button>
      </template>
    </div>
    <div class="form-field{{ mobileTipError ? ' form-field-error' : '' }}">
      <input class="form-input disabled" type="tel" value="{{ mobile }}(不可更改)"
             placeholder="手机号" v-if="isDisableMobileInput" readonly>
      <template v-if="!isDisableMobileInput">
        <input class="form-input" type="tel" placeholder="手机号(必填)"
               v-model="mobile" @input="onMobileInput" minlength="11"
               maxlength="11">
        <button type="button" v-if="mobile !== ''"
                class="button button-delete" @click="onClear('mobile')">
          <i class="icon icon-delete"></i></button>
        <verify-code :disable="isDisable"
                     :config="config"></verify-code>
      </template>
    </div>
    <div
      class="form-field{{ verifyCodeTipError ? ' form-field-error' : '' }}"
      v-if="!isDisableMobileInput">
      <input class="form-input" type="tel" value=""
             placeholder="请输入手机验证码(必填)"
             v-model="verifyCode" @input="onVerifyCodeInput" minlength="4"
             maxlength="4">
      <button type="button" v-if="verifyCode !== ''"
              class="button button-delete"
              @click="onClear('verifyCode')"><i
        class="icon icon-delete"></i></button>
    </div>
  </div>
</template>

<script>
  import config from '../../config';
  import redirectUrl from '../../redirectUrl';
  import Toast from 'vue-toast-mobile';
  import VerifyCode from './VerifyCode';

  export default {
    data() {
      return {
        config: config.quizConfig,
        isDisable: true,

        name: null,
        isDisableNameInput: false,
        nameTipError: false,

        mobile: null,
        isDisableMobileInput: false,
        mobileTipError: false,

        verifyCode: null,
        verifyCodeTipError: false,

        imageCode: null,
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
        cb({
          mobile: this.mobile
        });
      }
    },
    ready() {
      const nickname = jsConfig.nickname;
      const mobile = jsConfig.mobile;
      this.name = nickname;
      this.mobile = mobile;
      this.isDisableNameInput = nickname !== '';
      this.isDisableMobileInput = mobile !== '';
    },
    methods: {
      valid() {
        let valid = false;
        let message = null;
        if (this.name === '') {
          message = '请填写用户姓名';
          this.nameTipError = true;
        } else if (!this.validMobile()) {
          if (this.mobile === '') {
            message = '请输入手机号码';
          } else {
            message = '手机号码输入有误，请重试';
          }
          this.mobileTipError = true;
        } else if (!this.isDisableMobileInput && !this.validVerifyCode()) {
          if (this.verifyCode === '') {
            message = '手机验证码不能为空';
          } else {
            message = '手机验证码输入有误，请重试';
          }
          this.verifyCodeTipError = true;
        } else {
          return {
            name: this.name,
            mobile: this.mobile,
            verifyCode: this.verifyCode
          };
        }
        if (!valid) {
          Toast({
            message: message,
            position: 'bottom',
            duration: 1000,
            className: 'toast-wrap'
          });
          return false;
        }
      },
      onClear(key) {
        this[key] = '';
        switch (key) {
          case 'name':
            this.nameTipError = null;
            break;
          case 'mobile':
            this.mobileTipError = null;
            this.isDisable = true;
            break;
          case 'verifyCode':
            this.verifyCodeTipError = null;
            break;
          default:
            break;
        }
      },
      validMobile() {
        return /^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/
          .test(this.mobile);
      },
      validVerifyCode() {
        return /^\d{4}$/.test(this.verifyCode);
      },
      onNameInput() {
        this.nameTipError = false;
      },
      onMobileInput() {
        this.isDisable = !this.validMobile();
        this.mobileTipError = false;
      },
      onVerifyCodeInput() {
        this.verifyCodeTipError = false;
      }
    }
  };
</script>