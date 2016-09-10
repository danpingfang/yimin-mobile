<template>
  <ul class="chips">
    <li class="chip{{ selectedIndex.indexOf($index) !== -1 ? ' active' : (selectedIndex.length === limit ? ' disable' : '') }}"
        v-for="chip in chips"
        @click="onSelectChip(chip, $index)">{{ chip | getChipName }}
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['chips', 'limit', 'onSelect'],
    data() {
      return {
        selectedIndex: [],
        selectedChips: []
      }
    },
    filters: {
      getChipName() {
        if (typeof this.chip !== 'string') {
          return this.chip.name;
        }
        return this.chip;
      }
    },
    methods: {
      onSelectChip(chip, index) {
        const pos = this.selectedIndex.indexOf(index);
        if (pos !== -1) {
          this.selectedIndex.splice(pos, 1);
          this.selectedChips.splice(pos, 1);
          this.onSelect(this.selectedChips);
        } else if (this.selectedIndex.length < this.limit) {
          this.selectedIndex.push(index);
          this.selectedChips.push(chip);
          this.onSelect(this.selectedChips);
        } else {
          this.$dispatch('onSelectedLimit')
        }
      }
    }
  };
</script>

<style>
  .chips {
    overflow: hidden;
    margin-right: -4%;
  }

  .chip {
    overflow: hidden;
    float: left;
    width: 29.333%;
    height: 36px;
    margin: 0 4% 10px 0;
    padding: 8px;
    border: 1px solid #a2aeb8;
    border-radius: 36px;
    font-size: 15px;
    text-align: center;
    line-height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #889198;
    -webkit-transition: background  0.35s ease 50ms, color  0.35s ease 50ms, border 0.35s ease 50ms;
    transition: background  0.35s ease 50ms, color  0.35s ease 50ms, border 0.35s ease 50ms;
  }

  .chip.active {
    border-color: #e2694f;
    color: #fff;
    background-color: #e2694f;
  }
  .chip.disable {
    opacity: .5;
  }
</style>