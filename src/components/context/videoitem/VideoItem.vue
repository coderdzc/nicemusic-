<template>
  <div class="videobox" v-if="videos.length > 1">
    <div class="videoitem" v-for="(item, index) in videos" :key="index">
      <div class="imgbox">
        <div class="playnum">
          <div class="icon"></div>
          <div class="num">{{ item.playTime | playCount }}</div>
        </div>
        <div class="playbtn" @click="enterDetail(item.vid)"></div>
        <img v-lazy="item.coverUrl" alt="" />
        <div class="info">
          <div class="artist"></div>
          <div class="time">{{ item.durationms | formatTime }}</div>
        </div>
      </div>
      <div class="name">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videos: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    enterDetail(id) {
      let reg = /^\d+$/;
      if (reg.test(id)) {
        this.$router.push({
          path: "/mvdetail",
          query: {
            id,
          },
        });
      } else {
        this.$router.push({
          path: "/videodetail",
          query: {
            id,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.videobox {
  display: flex;
  flex-wrap: wrap;
  .videoitem {
    width: 22%;
    margin-right: 30px;
    margin-bottom: 30px;
    .imgbox {
      position: relative;
      width: 100%;
      height: 155px;
      color: #fff;
      .playnum {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 9;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 3px 5px;
        font-size: 12px;
        display: flex;
        border-radius: 5px;
        .icon {
          font-family: "icomoon";
        }
      }
      .playbtn {
        display: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #fa2800;
        font-family: "icomoon";
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 30px;
      }
      .info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        padding: 10px;
        justify-content: space-between;
        background-color: rgba(0, 0, 0, 0.6);
        .artist {
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      margin-top: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      color: #000000d9;
    }
  }
  .videoitem:nth-child(4n) {
    margin-right: 0;
  }
  .videoitem:hover .imgbox .playbtn {
    display: block;
  }
}
</style>