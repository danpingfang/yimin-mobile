<template>
  <div class="login">
    <form-tab :tabs="formTabs" :current-type="currentType"></form-tab>
    <form-mobile :current-type="currentType"></form-mobile>
    <form-email :current-type="currentType"></form-email>
  </div>
</template>

<script>
  import FormTab from '../../components/FormTab';
  import FormMobile from '../../components/FormMobile';
  import FormEmail from '../../components/FormEmail';

  export default {
    data() {
      return {
        config: {},
        msg: null,
        showTip: false,
        currentType: parseInt(localStorage.getItem('loginType'), 10) || 1,
        formTabs: [
          {
            type: 1,
            name: '绑定手机'
          },
          {
            type: 2,
            name: '绑定邮箱'
          }
        ]
      };
    },
    components: {
      FormTab,
      FormMobile,
      FormEmail
    },
    events: {
      onChangeFormTab(type) {
        this.currentType = type;
        localStorage.setItem('loginType', type);
      },
      showTipDialog(msg) {
        this.showTip = true;
        this.msg = msg;
      }
    }
  };
</script>