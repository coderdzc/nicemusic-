<template>
  <div class="singeritemcontainer" v-if="Singer.length > 1">
    <div
      class="singgerbox"
      v-for="(item, index) in Singer"
      :key="index"
      @click="itemClick(item.id)"
    >
      <div class="imgbox"><img v-lazy="item.img1v1Url" alt="" /></div>
      <div class="name">{{ item.name }}</div>
      <div class="songnum"><span>单曲数</span>{{ item.musicSize }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Singer: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(id) {
      this.$router.push({
        path: "/singerdetail",
        query: {
          id,
        },
      });
      this.$emit("itemClick");
    },
  },
};
</script>

<style scoped lang="less">
.singeritemcontainer {
  display: flex;
  flex-wrap: wrap;
  .singgerbox {
    cursor: pointer;
    width: 10%;
    text-align: center;
    margin-bottom: 30px;
    .imgbox {
      width: 80%;
      height: 65%;
      margin: 0 auto 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .name {
      font-weight: 700;
      color: #000000d9;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .songnum {
      color: #fa2800;
      font-size: 12px;
    }
  }
}
</style>