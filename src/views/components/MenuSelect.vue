<template>
  <div class="ui-menu-container">
    <div class="ui-menu animated" transition="slide" v-if="show">
      <a class="ui-menu-item{{ item.selected ? ' active' : '' }}"
         v-for="item in menuItems"
         @click.prevent="onMenuItemSelect(item)" href="">
        <span class="ui-menu-item-text">{{ item.name }}</span>
        <i class="icon icon-ok" v-if="item.selected"></i>
      </a>
    </div>
    <div class="ui-menu-overlay animated" transition="fade" v-if="show" @click="onTouchOverlay"></div>
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
      },
      onTouchOverlay() {
        this.$dispatch('onHide');
      }
    }
  };
</script>

<style>
  .ui-menu-container {
    position: fixed;
    left: 0;
    top: 0;
  }

  .ui-menu {
    z-index: 1000;
    position: fixed;
    left: 0;
    top: 104px;
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    max-height: 60%;
    padding: 14px 0;
    background-color: #fff;
  }

  .ui-menu-item {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    padding: 14px 26px;
    line-height: 21px;
    background-color: #fff;
    color: #525252;
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

  .ui-menu-overlay {
    z-index: 998;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
  }
</style>