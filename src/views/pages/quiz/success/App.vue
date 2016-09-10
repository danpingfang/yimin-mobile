<template>
  <success :title="title" :summary="summary"></success>
</template>

<script>
  import config from '../../../../config';
  import redirectUrl from '../../../../redirectUrl';
  import Success from '../../../components/Success';

  export default {
    data() {
      return {
        title: '提交成功！',
        summary: '24小时内会有专人与您联系请保持手机畅通。'
      };
    },
    components: {
      Success
    },
    events: {
      onConfirm() {
      }
    }
  };
</script>