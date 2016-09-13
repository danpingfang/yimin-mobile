<template>
  <div class="audio" @click.prevent.stop="onAudioContainerTouch">
    <div class="audio-content animated" v-if="isShowToolBar" transition="fade">
      <div class="audio-current-time">{{ currentTime }}</div>
      <button v-if="!loading" type="button" class="audio-button"
              @click="onPlay"><i
        class="icon {{ isPlay ? 'icon-pause' : 'icon-play' }}"></i>
      </button>
      <div class="audio-time">{{ duration }}</div>
    </div>
    <div class="audio-progress" @click="onStart">
      <div class="audio-progress-current"
           :style="{ width: progress + '%'}"></div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  Vue.transition('fade', {
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut'
  });

  const isIOS = navigator.userAgent.toLowerCase().indexOf('iphone') !== -1;
  export default {
    props: ['autoplay'],
    data() {
      return {
        timer: null,
        isPlay: false,
        paused: false,
        isShowToolBar: false,
        progress: 0,
        duration: '00:00:00',
        currentTime: '00:00:00'
      };
    },
    ready() {
      this.$audio = document.querySelector('audio');
      if (this.$audio) {
        this.$progress = document.querySelector('.audio-progress');
        this.$currentProgress = document.querySelector('.audio-progress-current');
        this.$audio.addEventListener('timeupdate', this.updateTime, false);
        this.$audio.addEventListener('timeupdate', this.updateTime, false);
        this.$audio.addEventListener('loadedmetadata', this.updateDuration, false);
      }
      if (this.autoplay && !isIOS) {
        this.onPlay();
      } else {
        this.isShowToolBar = true;
      }
    },
    methods: {
      showToolBar() {
        if (this.isPlay) {
          this.isShowToolBar = !this.isShowToolBar;
        } else {
          this.isShowToolBar = true;
        }
        this.autoHideToolBar();
      },
      autoHideToolBar() {
        if (this.isShowToolBar && this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        if (this.isPlay) {
          this.timer = setTimeout(() => {
            this.isShowToolBar = false;
          }, 3000);
        }
      },
      onPlay() {
        if (!this.isPlay) {
          this.$audio.play();
          this.isPlay = true;
          this.paused = false;
        } else {
          this.paused = true;
          this.$audio.pause();
          this.isPlay = false;
        }
        this.autoHideToolBar();
      },
      onAudioContainerTouch() {},
      updateDuration() {
        this.duration = this.formatTime(this.$audio.duration);
      },
      formatTime(secs) {
        const times = [3600, 60, 1];
        let time = '';
        let tmp;
        for (let i = 0; i < times.length; i++) {
          tmp = Math.floor(secs / times[i]);
          if (tmp < 1) {
            tmp = '00';
          } else if (tmp < 10) {
            tmp = `0${tmp}`;
          }
          time += tmp;
          if (i < 2) {
            time += ':';
          }
          secs = secs % times[i];
        }
        return time;
      },
      onStart(event) {
        event.preventDefault();
        event.stopPropagation();
        this.updateProgress(event);
        this.$audio.currentTime = this.$audio.duration * (
          (event.touches[0].pageX - this.$progress.getBoundingClientRect().left)
          / this.$progress.offsetWidth);
      },
      updateTime() {
        const audio = this.$audio;
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        if (duration <= currentTime) {
          this.isPlay = false;
          audio.pause();
        }
        this.progress = 100 * (currentTime / duration);
        this.currentTime = this.formatTime(duration - currentTime);
      },
      updateProgress(event) {
        const progress = this.$progress;
        const currentProgress = this.$currentProgress;
        const newSize = event.touches[0].pageX -
          progress.getBoundingClientRect().left;
        if (newSize >= 0 && newSize <= progress.offsetWidth) {
          currentProgress.style.width = `${newSize}px`;
        }
        if (newSize < 0) {
          currentProgress.style.width = '0px';
        }
        if (newSize > progress.offsetWidth) {
          currentProgress.style.width = `${progress.offsetWidth}px`;
        }
      }
    }
  };
</script>
