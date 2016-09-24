import Vue from 'vue';
import Toast from 'vue-toast-mobile';
import config from '../../../config';
import SurveyForm from '../../components/SurveyForm';

new Vue({
  el: 'body',
  components: {
    SurveyForm
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const survey = this.$refs.survey.valid();
      if (survey) {
        $.ajax({
          url: `${config.apiUrl}/cis/open/api/v1/item/order_consult`,
          data: {
            itemId: jsConfig.itemId,
            name: survey.name,
            mobile: survey.mobile,
            verifyCode: survey.verifyCode
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
});
