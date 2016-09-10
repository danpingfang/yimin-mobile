<template>
  <base-dialog :show="showMessageBox" :config="dialogConfig"></base-dialog>
</template>

<script>
  import BaseDialog from './BaseDialog';

  export default {
    props: ['showMessageBox', 'hasCancelButton'],
    data() {
      return {
        dialogConfig: {
          dialogClassName: 'messageBoxDialog'
        }
      };
    },
    components: {
      BaseDialog
    }
  };
</script>