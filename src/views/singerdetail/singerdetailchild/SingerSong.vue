<template>
  <div class="singersong">
    <div class="play">
      <PlayAll :playList="songs" />
    </div>
    <SongList :songs="songs"></SongList>
  </div>
</template>

<script>
import SongList from "components/context/songlist/SongList.vue";
import PlayAll from "components/context/playall/PlayAll.vue";
export default {
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    SongList,
    PlayAll,
  },
};
</script>

<style lang="less" scoped>
.singersong {
  .play {
    display: flex;
    justify-content: right;
    margin-bottom: 15px;
  }
}
</style>