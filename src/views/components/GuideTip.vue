<template>
  <base-dialog :show="showGuideTip" :config="dialogConfig">
    <div class="guide-tip" slot="body">
      <i class="sprite-icon sprite-icon-cat"></i>
      <p>{{ tipText }}</p>
    </div>
  </base-dialog>
</template>

<script>
  import BaseDialog from './BaseDialog';

  export default {
    props: ['tipText', 'showGuideTip'],
    data() {
      return {
        dialogConfig: {
          dialogClassName: 'guideTipDialog',
          confirmText: '确定'
        }
      };
    },
    components: {
      BaseDialog
    }
  };
</script>