<template>
  <div class="albumitem">
    <div class="album" v-for="(item, index) in albums" :key="index">
      <div class="imgbox"><img v-lazy="item.picUrl" alt="" /></div>
      <div class="name">{{ item.name }}</div>
      <div class="artist">{{ item.artist.name }}</div>
      <div class="time">{{ item.publishTime | filterformatDate }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    albums: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.albumitem {
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  .album {
    cursor: pointer;
    width: 13%;
    height: 238px;
    margin-right: 40px;
    margin-bottom: 30px;
    .imgbox {
      position: relative;
      width: 100%;
      height: 70%;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .imgbox::after {
      transition: all 0.3s;
      content: "";
      position: absolute;
      width: 80%;
      height: 80%;
      border-radius: 50%;
      background-color: #000;
      top: 10%;
      left: 27%;
      z-index: -1;
    }
    .name {
      font-weight: 700;
      color: #4a4a4a;
      margin-bottom: 10px;
    }
    .artist {
      font-size: 12px;
      color: #999;
      margin-bottom: 5px;
    }
    .time {
      font-size: 12px;
      color: #999;
    }
  }
  .album:nth-child(6n) {
    margin-right: 0;
  }
  .album:hover .imgbox::after {
    transform: translateX(5%);
  }
}
</style>