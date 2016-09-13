<template>
  <div
    class="ui-dialog-mask {{ config.dialogClassName || '' }}"
    v-if="show" transition="ui-dialog" @click="onMaskHide">
    <div class="ui-dialog">
      <div class="ui-dialog-container">
        <div class="ui-dialog-header">
          <slot name="header"></slot>
        </div>
        <div class="ui-dialog-body">
          <slot name="body"></slot>
        </div>
        <div class="ui-dialog-footer">
          <slot name="footer">
            <button type="button" class="ui-dialog-button ui-button-confirm"
                    @click="onConfirm" v-if="config.confirmText">{{
              config.confirmText }}
            </button>
            <button type="button" class="ui-dialog-button ui-button-cancel"
                    @click="onCancel" v-if="config.cancelText">{{
              config.cancelText }}
            </button>
          </slot>
        </div>
        <button type="button"
                class="ui-dialog-close"
                @click.prevent.stop="onClose"><i class="icon icon-close"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['show', 'config'],
    methods: {
      onMaskHide() {
        if (this.config.hideMaskEnable) {
          this.onCancel();
        }
      },
      onConfirm() {
        this.$dispatch('onConfirm');
      },
      onCancel() {
        this.$dispatch('onCancel');
      },
      onClose() {
        this.$dispatch('onClose');
      }
    }
  };
</script>