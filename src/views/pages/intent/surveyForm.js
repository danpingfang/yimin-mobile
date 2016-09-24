import Vue from 'vue';
import Toast from 'vue-toast-mobile';
import config from '../../../config';
import SurveyForm from '../../components/SurveyForm';

const itemId = jsConfig.itemId;
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
          url: `${config.apiUrl}/item/order_consult`,
          data: {
            itemId: itemId,
            name: survey.name,
            mobile: survey.mobile,
            verifyCode: survey.verifyCode
          },
          dataType: 'json',
          success(response) {
            Toast({
              message: response.message,
              position: 'middle',
              duration: 5000,
              className: 'toast-wrap'
            });
            location.href = `/item/${itemId}/`;
          }
        });
      }
    }
  }
});
