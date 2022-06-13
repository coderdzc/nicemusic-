<template>
  <div class="playbtn" :class="{ playing: thatPlay }">
    <div class="play" @click="startPlay(item)" ref="play"></div>
    <div class="pausebtn" ref="pause" @click="pausePlay">
      <i class="iconfont1">&#xe600;</i>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    playList: {
      type: Array,
      default() {
        return [];
      },
    },
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    thatPlay() {
      return this.currentSong.id === this.item.id && this.isPlay ? true : false;
    },
    ...mapGetters(["isPlay", "currentSong"]),
  },
  methods: {
    startPlay(item) {
      //设置当前播放歌曲
      this.setCurrentSong(item);
      //将当前播放歌曲放入播放列表中
      this.setHistoryList(item);
      //设置当前播放列表
      this.setPlayList(this.playList);
      setTimeout(() => {
        //获取媒体后进行播放
        this.play();
      }, 20);
    },
    pausePlay() {
      this.pause();
    },
    ...mapMutations([
      "setCurrentSong",
      "play",
      "pause",
      "setHistoryList",
      "setPlayList",
    ]),
  },
};
</script>

<style lang="less">
.playing {
  .play {
    display: none;
  }
  .pausebtn {
    display: block;
  }
}
.iconfont1 {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.8px;
  -moz-osx-font-smoothing: grayscale;
}
.playbtn,
.pausebtn {
  cursor: pointer;
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: "icomoon";
  color: #fa2800;
  font-size: 18px;
}
</style>