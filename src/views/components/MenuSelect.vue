<template>
  <div class="ui-menu animated" transition="slide" v-if="show">
    <a class="ui-menu-item{{ item.selected ? ' active' : '' }}"
       v-for="item in menuItems"
       @click.prevent="onMenuItemSelect(item)" href="">
      <span class="ui-menu-item-text">{{ item.name }}</span>
      <i class="icon icon-ok" v-if="item.selected"></i>
    </a>
  </div>
</template>

<script>
  import indexOf from '../../utils/indexOf';

  export default {
    props: ['menuItems', 'show'],
    data() {
      return {
        show: false
      }
    },
    methods: {
      unSelected(item) {
        for (let i = 0; i < this.menuItems.length; i++) {
          let menuItem = this.menuItems[i];
          if (menuItem.selected && item.key !== menuItem.key) {
            menuItem.selected = false;
          }
        }
      },
      onMenuItemSelect(item) {
        this.unSelected(item);
        item.selected = !item.selected;
        this.$dispatch('onSelect', item);
      }
    }
  };
</script>

<style>
  .ui-menu {
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    margin-top: 44px;
    padding: 10PX 0;
    background: rgba(255,255,255,.95);
  }

  .ui-menu-item {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    padding: 12px 26px;
    border-bottom: 1px solid #f5f5f5;
    color: #525252;
    line-height: 21px;
  }

  .ui-menu-item.active .ui-menu-item-text,
  .ui-menu-item.active .icon-ok {
    color: #e2694f;
  }

  .ui-menu-item-text {
    flex: 1;
    -webkit-flex: 1;
    font-size: 15px;
  }
</style>