<template>
  <div class="message-box">
    <div class="comment-focus">
      <slot name="icon"></slot>
    <button type="button" v-if="comment !== ''" class="button-delete"
            @touchstart="onClear"><i
      class="icon icon-delete"></i></button>
      <input id="comment-input" type="text" value=""
             v-model="comment" placeholder="写回复" @touchstart="onTouchStart"
             v-el:comment-input></div>
    <button class="button button-cancel"
            v-if="hasCancelButton && comment === ''"
            @touchstart.prevent.stop="onCancel">取消
    </button>
    <button class="button button-send" v-if="comment !== ''"
            @touchstart.prevent="onSend">发送
    </button>
  </div>
</template>

<script>
  export default {
    props: ['autoFocus', 'hasCancelButton'],
    data() {
      return {
        comment: null
      };
    },
    methods: {
      onTouchStart() {
        this.$dispatch('onInputTouch', false);
      },
      onClear() {
        this.$els.commentInput.focus();
        this.comment = null;
      },
      onCancel() {
        this.$els.commentInput.blur();
        this.$dispatch('onMessageCancel');
      },
      onSend() {
        this.$dispatch('onMessageSend', this.comment);
      }
    }
  };
</script>