<template>
  <div class="playall" @click="PlayAll">
    <div class="icon"></div>
    <div class="text">播放全部</div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    playList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    PlayAll() {
      this.setPlayList(this.playList);
      this.setCurrentSong(this.playList[0]);
      this.setHistoryList(this.playList[0]);
      setTimeout(() => {
        this.play();
      }, 20);
    },
    ...mapMutations([
      "setPlayList",
      "setCurrentSong",
      "play",
      "setHistoryList",
    ]),
  },
};
</script>

<style lang="less" scoped>
.icon {
  font-family: "icomoon";
}
.playall {
  cursor: pointer;
  display: flex;
  padding: 10px 15px;
  background-color: #fa2800;
  color: #fff;
  border-radius: 25px;
  .icon {
    font-family: "icomoon";
    margin-right: 5px;
  }
}
</style>