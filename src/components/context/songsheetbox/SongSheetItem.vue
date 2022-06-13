<template>
  <div class="item" v-if="songSheet.length > 1">
    <div
      class="itembox"
      v-for="(item, index) in songSheet"
      :key="index"
      @click="itemClick(item.id)"
    >
      <div class="imgbox">
        <img v-lazy="item.picUrl || item.coverImgUrl" alt="" />
      </div>
      <h3 class="sheetname">{{ item.name }}</h3>
      <div class="playcount">
        <span class="icon"></span>{{ item.playCount | playCount }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {},
  props: {
    songSheet: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(id) {
      this.$router.push({
        path: "/songsheetdetail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
.item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .itembox {
    cursor: pointer;
    position: relative;
    width: 12.5%;
    margin-bottom: 10px;
    padding: 0px 10px 20px 10px;
    .imgbox {
      width: 90%;
      height: 70%;
      margin-bottom: 15px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .sheetname {
      font-size: 14px;
      color: #000000d9;
      line-height: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .playcount {
      display: flex;
      position: absolute;
      top: 4px;
      right: 30px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 3px;
      padding: 2px 3px;
      font-size: 12px;
      font-weight: 700;
      .icon {
        display: block;
        font-family: "icomoon";
        font-size: 12px;
        transform: scale(0.9);
        -webkit-transform-origin-x: 0; //缩小后文字居左
        -webkit-transform: scale(0.9); //关键
      }
    }
  }
  .imgbox::before {
    content: "";
    position: absolute;
    right: 9%;
    top: 6%;
    border-radius: 3px;
    width: 70%;
    height: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: -1;
    opacity: 0.5;
  }
  .imgbox::after {
    content: "";
    position: absolute;
    right: 12%;
    top: 4%;
    border-radius: 3px;
    width: 70%;
    height: 55%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: -1;
    opacity: 0.5;
  }
}
</style>