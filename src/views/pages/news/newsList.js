import Vue from 'vue';
import config from '../../../config';
import VueInfiniteScroll from 'vue-infinite-scroll';
import Loading from '../../components/Loading';
import MenuSelect from '../../components/MenuSelect';
import List from '../../components/List';
import LoadEnd from '../../components/LoadEnd';


Vue.use(VueInfiniteScroll);
Vue.transition('slide', {
  enterClass: 'bounceInDown',
  leaveClass: 'bounceOutUp'
});
Vue.transition('fade', {
  enterClass: 'fadeIn',
  leaveClass: 'fadeOut'
});
const apiUrl = config.apiUrl;
window.vm = new Vue({
  el: '#app',
  data: {
    lastSelect: null,
    config: {
      keyword: null,
      project: null,
      country: null,
      category: null
    },
    busy: false,
    isLoading: false,
    startIndex: 20,
    loadEndText: '没有更多了',
    items: []
  },
  components: {
    MenuSelect,
    List,
    LoadEnd,
    Loading
  },
  events: {
    onSelect(item) {
      const currentSelect = this.lastSelect;
      this.config[currentSelect].selectedKey = item.selected ? item.key : null;
      location.href = this.getActionUrl();
    },
    onHide() {
      this.handleSelect(this.lastSelect);
    }
  },
  ready() {
    $(document).on('click', this.hideMenu.bind(this));
    FastClick.attach(document.body);
  },
  methods: {
    loadMore() {
      const self = this;
      const config = this.config;
      $.ajax({
        url: `${apiUrl}/art/search_list`,
        data: {
          keyword: config.keyword,
          country: config.country.selectedKey,
          project: config.project.selectedKey,
          category: config.category.selectedKey,
          startIndex: this.startIndex
        },
        dataType: 'json',
        beforeSend() {
          this.busy = true;
          this.isLoading = true;
        },
        success(response) {
          if (response.code === 0) {
            const data = response.data;
            if (data.count > 0) {
              self.items = self.items.concat(data.list);
            }
            self.busy = false;
            self.startIndex = data.nextIndex;
          }
          self.isLoading = false;
        }
      });
    },
    getActionUrl() {
      const config = this.config;
      let url = '/art-cd-';
      let params = [];
      if (config.project.selectedKey) {
        params.push(`pc${config.project.selectedKey}`);
      }
      if (config.country.selectedKey) {
        params.push(`ct${config.country.selectedKey}`);
      }
      if (config.category.selectedKey) {
        params.push(`cc${config.category.selectedKey}`);
      }
      url = `${url}${params.join('_')}`;
      if (this.config.keyword) {
        url = `${url}/${this.config.keyword}`;
      }
      return `${url}/`;
    },
    removeHiddenClass() {
      document.body.classList.remove('ui-overflow-hidden');
    },
    hideMenu(event) {
      const target = $(event.target).closest('.button-select');
      if (!target.length && this.lastSelect) {
        this.config[this.lastSelect].show = false;
        this.lastSelect = null;
        this.removeHiddenClass();
      }
    },
    handleSelect(selectName) {
      const isHide = this.config[selectName].show;
      if (this.lastSelect && this.lastSelect !== selectName) {
        this.config[this.lastSelect].show = false;
      }
      if (!isHide) {
        document.body.classList.add('ui-overflow-hidden');
      } else {
        this.removeHiddenClass();
      }
      this.config[selectName].show = !isHide;
      this.lastSelect = selectName;
    }
  }
});
