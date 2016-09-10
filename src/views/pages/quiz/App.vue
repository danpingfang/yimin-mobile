<template>
  <form class="quiz" @submit="onSubmit">
    <div class="quiz-select-box">
      <h3 class="quiz-title">意向国家 <span
        class="quiz-select-tip">最多选择3个</span></h3>
      <div class="quiz-content">
        <chips :chips="countries" :on-select="onSelectCountry"
               :limit="3"></chips>
      </div>
    </div>
    <div class="space"></div>
    <div class="quiz-select-box">
      <h3 class="quiz-title">移民目的 <span
        class="quiz-select-tip">最多选择3个</span></h3>
      <div class="quiz-content">
        <chips :chips="reasons" :on-select="onSelectReason" :limit="3"></chips>
      </div>
    </div>
    <div class="quiz-contact-box">
      <h3 class="quiz-contact-title">联系人</h3>
      <div class="quiz-content">
        <div class="form-field{{ nameTipError ? ' form-field-error' : '' }}">
          <input class="form-input" type="text" value="" placeholder="姓名"
                 v-model="name" @input="onNameInput">
          <span class="form-field-tip" v-if="name === ''">必填</span>
          <button type="button" v-if="name !== ''" class="button button-delete"
                  @touchstart="onClear('name')"><i class="icon icon-delete"></i>
          </button>
        </div>
        <div class="form-field{{ mobileTipError ? ' form-field-error' : '' }}">
          <input class="form-input" type="tel" value="" placeholder="手机号"
                 v-model="mobile" @input="onMobileInput" minlength="11"
                 maxlength="11">
          <span class="form-field-tip" v-if="mobile === ''">必填</span>
          <button type="button" v-if="mobile !== ''"
                  class="button button-delete" @touchstart="onClear('mobile')">
            <i class="icon icon-delete"></i></button>
          <verify-code :disable="isDisable"
                       :config="config"></verify-code>
        </div>
        <div
          class="form-field{{ verifyCodeTipError ? ' form-field-error' : '' }}">
          <input class="form-input" type="tel" value="" placeholder="请输入手机验证码"
                 v-model="verifyCode" @input="onVerifyCodeInput" minlength="4"
                 maxlength="4">
          <span class="form-field-tip" v-if="verifyCode === ''">必填</span>
          <button type="button" v-if="verifyCode !== ''"
                  class="button button-delete"
                  @touchstart="onClear('verifyCode')"><i
            class="icon icon-delete"></i></button>
        </div>
      </div>
    </div>
    <button type="submit"
            class="button button-primary button-full button-medium">提交
    </button>
  </form>
</template>

<script>
  import config from '../../../config';
  import redirectUrl from '../../../redirectUrl';
  import Toast from 'vue-toast-mobile';
  import VerifyCode from '../../components/VerifyCode';
  import Chips from '../../components/Chips';

  export default {
    data() {
      return {
        isDisable: true,
        config: config.quizConfig,
        nameTipError: false,
        mobileTipError: false,
        verifyCodeTipError: false,
        name: null,
        mobile: null,
        imageCode: null,
        verifyCode: null,
        countries: jsConfig.countryList,
        reasons: ["子女教育", "海外生育", "养老储备", "出行便利", "海外置业", "居住环境", "投资理财", "旅游度假"],
        selectedCountries: [],
        selectedReasons: []
      };
    },
    components: {
      VerifyCode,
      Chips
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
    methods: {
      onClear(key) {
        this[key] = null;
      },
      validMobile() {
        return /^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/
          .test(this.mobile);
      },
      validVerifyCode() {
        return /^\d{4}$/.test(this.verifyCode);
      },
      onSelectCountry(countries) {
        let selectedCountries = [];
        for (let i = 0; i < countries.length; i++) {
          selectedCountries.push(countries[i].code);
        }
        this.selectedCountries = selectedCountries;
      },
      onSelectReason(reasons) {
        this.selectedReasons = reasons;
      },
      onNameInput() {
        this.nameTipError = false;
      },
      onMobileInput() {
        if (this.validMobile()) {
          this.isDisable = false;
        } else {
          this.isDisable = true;
        }
        this.mobileTipError = false;
      },
      onVerifyCodeInput() {
        this.verifyCodeTipError = false;
      },
      onSubmit(event) {
        event.preventDefault();
        let message;
        let valid = false;
        const selectedCountries = this.selectedCountries;
        const selectedReasons = this.selectedReasons;
        if (selectedCountries.length < 1) {
          message = '请选择意向国家';
          $('html, body').animate({scrollTop: 0});
        } else if (selectedReasons.length < 1) {
          message = '请选择移民目的';
        } else if (this.name === '') {
          message = '请填写用户姓名';
          this.nameTipError = true;
        } else if (!this.validMobile()) {
          if (this.mobile === '') {
            message = '请输入手机号码';
          } else {
            message = '手机号码输入有误，请重试';
          }
          this.mobileTipError = true;
        } else if (!this.validVerifyCode()) {
          if (this.verifyCode === '') {
            message = '手机验证码不能为空';
          } else {
            message = '手机验证码输入有误，请重试';
          }
          this.verifyCodeTipError = true;
        } else {
          valid = true;
        }
        if (!valid) {
          Toast({
            message: message,
            position: 'bottom',
            duration: 1000,
            className: 'toast-wrap'
          });
        } else {
          $.ajax({
            url: `${config.apiUrl}/user/igr/intent/submit`,
            data: {
              mobile: this.mobile,
              verifyCode: this.verifyCode,
              name: this.name,
              countrys: this.selectedCountries.join(","),
              reason: this.selectedReasons.join(",")
            },
            dataType: 'json',
            success(response) {
              if (response.data) {
                location.href = '/cis/open/web/user/igr/intent/success'
              } else {
                Toast({
                  message: response.message,
                  position: 'bottom',
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