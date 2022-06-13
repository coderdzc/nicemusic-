<template>
  <div class="mvbox" v-if="mvs.length > 1">
    <div class="mvitem" v-for="(item, index) in mvs" :key="index">
      <div class="imgbox">
        <div class="playnum">
          <div class="icon"></div>
          <div class="num">{{ item.playCount | playCount }}</div>
        </div>
        <div class="playbtn" @click="enterDetail(item.id)"></div>
        <img v-lazy="item.cover || item.imgurl16v9" alt="" />
        <div class="info">
          <div class="artist">{{ item.artistName || item.artist.name }}</div>
          <div class="time">{{ item.duration | formatTime }}</div>
        </div>
      </div>
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mvs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    enterDetail(id) {
      this.$router.push({
        path: "/mvdetail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.mvbox {
  display: flex;
  flex-wrap: wrap;
  .mvitem {
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
  .mvitem:nth-child(4n) {
    margin-right: 0;
  }
  .mvitem:hover .imgbox .playbtn {
    display: block;
  }
}
</style>