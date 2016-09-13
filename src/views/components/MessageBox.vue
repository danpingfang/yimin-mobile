<template>
  <div class="message-box">
    <div class="comment-focus">
      <slot name="icon"></slot>
    <button type="button" v-if="comment !== ''" class="button-delete"
            @click="onClear"><i
      class="icon icon-delete"></i></button>
      <input id="comment-input" type="text" value=""
             v-model="comment" placeholder="写回复" @click="onTouchStart"
             v-el:comment-input></div>
    <button class="button button-cancel"
            v-if="hasCancelButton && (comment === '')"
            @click.prevent.stop="onCancel">取消
    </button>
    <button class="button button-send" v-if="comment !== ''"
            @click.prevent="onSend">发送
    </button>
  </div>
</template>

<script>
  export default {
    props: ['autoFocus', 'hasCancelButton'],
    data() {
      return {
        comment: ''
      };
    },
    methods: {
      onTouchStart() {
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