import Vue from 'vue';
import config from '../../../config';
import VueInfiniteScroll from 'vue-infinite-scroll';
import Loading from '../../components/Loading';
import LoadEnd from '../../components/LoadEnd';
import List from '../../components/List';

Vue.use(VueInfiniteScroll);

window.vm = new Vue({
  el: '#app',
  data: {
    busy: false,
    isLoading: false,
    startIndex: 20,
    loadEndText: '没有更多了',
    items: []
  },
  components: {
    List,
    LoadEnd,
    Loading
  },
  methods: {
    loadMore() {
      const self = this;
      $.ajax({
        url: `${config.apiUrl}/art/search_list`,
        data: {
          startIndex: this.startIndex
        },
        dataType: 'json',
        beforeSend() {
          self.busy = true;
          self.isLoading = true;
        },
        success(response) {
          if (response.code === 0) {
            const data = response.data;
            if (data.count > 0) {
              self.items = self.items.concat(data.list);
              self.busy = false;
            }
            self.startIndex = data.nextIndex;
          }
          self.isLoading = false;
        }
      });
    }
  }
});
