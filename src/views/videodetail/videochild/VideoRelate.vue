<template>
  <div class="mvrelate">
    <div class="relatetitle">相关推荐</div>
    <div class="relateitem" v-for="(item, index) in relates" :key="index">
      <div class="coverimg">
        <img :src="item.coverUrl" alt="" />
        <div class="videoplaybtn" @click="enterDetail(item.vid)"></div>
      </div>
      <div class="name">{{ item.title }}</div>
      <div class="artist">By. {{ item.creator[0].userName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    relates: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    enterDetail(id) {
      this.$emit("enterDetail", id);
    },
  },
};
</script>

<style lang="less">
.relateitem:hover .coverimg .videoplaybtn {
  display: block;
}
.videoplaybtn {
  cursor: pointer;
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
.mvrelate {
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  .relatetitle {
    padding-left: 15px;
    border-left: 3px solid #fa2800;
    color: #000;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .relateitem {
    margin-bottom: 20px;
    .coverimg {
      position: relative;
      width: 100%;
      height: 180px;
      margin-bottom: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      margin-bottom: 15px;
      color: #000;
    }
    .artist {
      font-size: 12px;
      color: #999;
    }
    .iconfont {
      line-height: 16px;
      color: #fa2800;
      margin-right: 10px;
    }
  }
}
</style>