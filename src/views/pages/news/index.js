import Vue from 'vue';
import Swiper from 'swiper';
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
    isLoading: true,
    isEnd: false,
    startIndex: 20,
    itemCount: 20,
    loadEndText: '没有更多了',
    items: []
  },
  components: {
    List,
    LoadEnd,
    Loading
  },
  // ready() {
  //   new Swiper('.swiper-container', {
  //     pagination: '.swiper-pagination',
  //     paginationClickable: true,
  //     loop: true
  //   });
  // },
  methods: {
    loadMore() {
      const self = this;
      self.busy = true;
      $.ajax({
        url: `${config.apiUrl}/art/search_list`,
        data: {
          startIndex: this.startIndex,
          itemCount: this.itemCount
        },
        dataType: 'json',
        success(response) {
          if (response.code === 0) {
            const data = response.data;
            const count = data.count;
            const isLast = count < self.itemCount;
            if (count > 0) {
              self.items = self.items.concat(data.list);
            }
            self.startIndex = data.nextIndex;
            self.busy = isLast;
            self.isEnd = isLast;
            self.isLoading = !isLast;
          }
        }
      });
    }
  }
});
