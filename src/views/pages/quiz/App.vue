<template>
  <form class="quiz" @submit="onSubmit">
    <div class="quiz-select-box">
      <div class="quiz-header">
        <h3 class="quiz-title"><span class="quiz-num">1.</span> 意向国家<span
          class="quiz-select-tip">最多选择3个</span></h3>
        <span class="quiz-error-tip" v-if="cError"><i
          class="icon icon-warning"></i>{{ cErrorTip }}</span>
      </div>
      <div class="quiz-content">
        <chips :chips="countries" :on-select="onSelectCountry"
               :limit="3"></chips>
      </div>
    </div>
    <div class="space"></div>
    <div class="quiz-select-box">
      <div class="quiz-header">
        <h3 class="quiz-title"><span class="quiz-num">2.</span> 移民目的<span
          class="quiz-select-tip">最多选择3个</span></h3>
        <span class="quiz-error-tip" v-if="tError"><i
          class="icon icon-warning"></i>{{ tErrorTip }}</span>
      </div>
      <div class="quiz-content">
        <chips :chips="reasons" :on-select="onSelectReason" :limit="3"></chips>
      </div>
    </div>
    <div class="quiz-contact-box">
      <h3 class="quiz-contact-title">联系人</h3>
      <div class="quiz-content">
        <div class="form-field{{ nameTipError ? ' form-field-error' : '' }}">
          <input v-if="isDisableNameInput" readonly class="form-input disabled" type="text" value="{{ name }}(不可更改)">
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
          class="form-field{{ verifyCodeTipError ? ' form-field-error' : '' }}" v-if="!isDisableMobileInput">
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

        cError: false,
        cErrorTip: null,
        cErrorEmptyTip: '请选择意向国家',
        cErrorLimitTip: '意向国家最多选择3个',

        tError: false,
        tErrorTip: null,
        tErrorEmptyTip: '请选择移民目的',
        tErrorLimitTip: '意向国家最多选择3个',

        errorTip: null,

        isDisableNameInput: false,
        name: null,
        nameTipError: false,

        isDisableMobileInput: false,
        mobile: null,
        mobileTipError: false,

        verifyCode: null,
        verifyCodeTipError: false,

        imageCode: null,
        countries: jsConfig.countryList,
        reasons: jsConfig.projectList,
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
    ready() {
      const nickname = jsConfig.nickname || null;
      const mobile = jsConfig.mobile || null;
      this.name = nickname;
      this.mobile = mobile;
      this.isDisableNameInput = nickname !== '';
      this.isDisableMobileInput = mobile !== '';
    },
    methods: {
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
      getSelects(selects, key) {
        let results = [];
        for (let i = 0; i < selects.length; i++) {
          results.push(selects[i][key]);
        }
        return results;
      },
      onSelectCountry(countries) {
        const selectedCountries = this.getSelects(countries, 'code');
        const len = selectedCountries.length;
        if (len > 0 && this.cError) {
          this.cError = false;
        }
        this.selectedCountries = selectedCountries;
      },
      onSelectReason(selectReasons) {
        const reasons = this.getSelects(selectReasons, 'code');
        if (reasons.length > 0 && this.tError) {
          this.tError = false;
        }
        this.selectedReasons = reasons;
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
      },
      valid() {
        let valid = false;
        const selectedCountries = this.selectedCountries;
        const selectedReasons = this.selectedReasons;
        if (selectedCountries.length < 1) {
          this.cError = true;
          this.cErrorTip = this.cErrorEmptyTip;
          $('html, body').animate({scrollTop: 0});
        } else if (selectedReasons.length < 1) {
          this.tError = true;
          this.tErrorTip = this.tErrorEmptyTip;
        } else if (this.name === '') {
          this.errorTip = '请填写用户姓名';
          this.nameTipError = true;
        } else if (!this.validMobile()) {
          if (this.mobile === '') {
            this.errorTip = '请输入手机号码';
          } else {
            this.errorTip = '手机号码输入有误，请重试';
          }
          this.mobileTipError = true;
        } else if (!this.isDisableMobileInput && !this.validVerifyCode()) {
          if (this.verifyCode === '') {
            this.errorTip = '手机验证码不能为空';
          } else {
            this.errorTip = '手机验证码输入有误，请重试';
          }
          this.verifyCodeTipError = true;
        } else {
          valid = true;
        }
        return valid;
      },
      onSubmit(event) {
        event.preventDefault();
        const valid = this.valid();
        if (!valid) {
          const errorTip = this.errorTip;
          if (errorTip) {
            Toast({
              message: this.errorTip,
              position: 'bottom',
              duration: 1000,
              className: 'toast-wrap'
            });
          }
          return;
        }
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
  };
</script>