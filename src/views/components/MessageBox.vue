<template>
  <div class="message-box">
    <div class="comment-focus">
      <slot name="icon"></slot>
    <button type="button" v-if="comment !== ''" class="button-delete"
            @click="onClear"><i
      class="icon icon-delete"></i></button>
      <input id="comment-input" type="text" value="" v-if="isLogin"
             v-model="comment" placeholder="写回复" @touchend="onTouchEnd"
             v-el:comment-input>
      <input id="comment-input" type="text" value="" readonly v-if="!isLogin" data-client-method-name="login"
             v-model="comment" placeholder="写回复" @touchend="onTouchEnd"
             v-el:comment-input>
    </div>
    <button class="button button-cancel"
            v-if="hasCancelButton && (comment === '')"
            @touchend.prevent.stop="onCancel">取消
    </button>
    <button class="button button-send" v-if="comment !== ''"
            @touchend.prevent="onSend">发送
    </button>
  </div>
</template>

<script>
  export default {
    props: ['isLogin', 'autoFocus', 'hasCancelButton'],
    data() {
      return {
        comment: ''
      };
    },
    methods: {
      onTouchEnd() {
        this.$dispatch('onInputTouch', false);
      },
      onClear() {
        this.$els.commentInput.focus();
        this.comment = '';
      },
      onCancel() {
        this.$els.commentInput.blur();
        this.$dispatch('onMessageCancel');
      },
      onSend() {
        this.$dispatch('onMessageSend', this.comment);
        this.comment = '';
      }
    }
  };
</script>