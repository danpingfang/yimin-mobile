<template>
  <base-dialog :show="showTip" :config="config">
    <div class="ui-tip" slot="content">{{ msg }}</div>
  </base-dialog>
</template>

<script>
  import BaseDialog from '../components/BaseDialog';

  export default {
    props: ['showTip', 'config', 'msg'],
    components: {
      BaseDialog
    },
    created() {
      console.log(this.config);
    },
    events: {
      onClose() {
        this.show = false;
      }
    },
    methods: {}
  };
</script>
