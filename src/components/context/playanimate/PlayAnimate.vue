<template>
  <div class="playanimate" :class="{ playmove: isPlaymove }">
    <div class="re re1"></div>
    <div class="re re2"></div>
    <div class="re re3"></div>
    <div class="re re4"></div>
    <div class="re re5"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  computed: {
    isPlaymove() {
      return this.item.id === this.currentSong.id && this.isPlay ? true : false;
    },
    ...mapGetters(["currentSong", "isPlay"]),
  },
};
</script>

<style lang="less">
.playmove {
  display: flex !important;
}
.playanimate {
  position: absolute;
  left: 35%;
  top: 40%;
  transform: translate(-50%, -50%);
  height: 16px;
  display: flex;
  transform: rotate(180deg);
  .re {
    height: 100%;
    width: 2px;
    background-color: red !important;
    margin-right: 2px;
  }
  .re1 {
    animation: move 1s linear 0s infinite;
  }
  .re2 {
    animation: move 0.8s linear 0s infinite;
  }
  .re3 {
    animation: move 0.7s linear 0s infinite;
  }
  .re4 {
    animation: move 0.6s linear 0s infinite;
  }
  .re5 {
    animation: move 1s linear 0s infinite;
  }
  @keyframes move {
    0% {
      height: 1%;
    }
    50% {
      height: 100%;
    }
    100% {
      height: 0%;
    }
  }
}
</style>