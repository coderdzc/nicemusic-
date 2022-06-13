<template>
  <div class="playandlike">
    <PlayAll :playList="playList" />
    <div class="like"> 收藏</div>
  </div>
</template>

<script>
import PlayAll from "components/context/playall/PlayAll.vue";
export default {
  components: {
    PlayAll,
  },
  props: {
    playList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped lang="less">
.playandlike {
  font-family: "icomoon";
  display: flex;
  justify-content: right;
  margin: 20px 0 15px 0;
  .like {
    cursor: pointer;
    margin-left: 15px;
    padding: 10px 15px;
    border-radius: 20px;
    background-color: #f2f2f2;
  }
}
</style>