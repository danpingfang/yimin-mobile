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
        <survey-form v-ref:survey="survey"></survey-form>
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
  import SurveyForm from '../../components/SurveyForm';

  export default {
    data() {
      return {
        cError: false,
        cErrorTip: null,
        cErrorEmptyTip: '请选择意向国家',
        cErrorLimitTip: '意向国家最多选择3个',

        tError: false,
        tErrorTip: null,
        tErrorEmptyTip: '请选择移民目的',
        tErrorLimitTip: '意向国家最多选择3个',

        countries: jsConfig.countryList,
        reasons: jsConfig.projectList,
        selectedCountries: [],
        selectedReasons: []
      };
    },
    components: {
      Chips,
      SurveyForm
    },
    methods: {
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
        } else {
          valid = true;
        }
        return valid;
      },
      onSubmit(event) {
        event.preventDefault();
        const valid = this.valid();
        if (valid) {
          const survey = this.$refs.survey.valid();
          if (survey) {
            $.ajax({
              url: `${config.apiUrl}/user/igr/intent/submit`,
              data: {
                mobile: survey.mobile,
                verifyCode: survey.verifyCode,
                name: survey.name,
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
    }
  };
</script>