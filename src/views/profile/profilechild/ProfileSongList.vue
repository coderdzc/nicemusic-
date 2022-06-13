<template>
  <div class="profilesonglist">
    <div class="listtitle">
      <div class="ranktitle">
        听歌排行 <span class="listennum">(累计听歌8735首)</span>
      </div>
      <div class="ranktime">
        <div
          class="timelist"
          v-for="(item, index) in timelist"
          :key="index"
          :class="{ listenActive: currentIndex === index }"
          @click="timeClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="playbtnbox">
      <div></div>
      <PlayAll :playList="songList" />
    </div>
    <SongList :songs="songList" />
  </div>
</template>

<script>
import PlayAll from "components/context/playall/PlayAll.vue";
import SongList from "components/context/songlist/SongList.vue";
export default {
  data() {
    return {
      timelist: ["最近一周", "所有时间"],
      currentIndex: 0,
    };
  },
  props: {
    songList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    PlayAll,
    SongList,
  },
  methods: {
    timeClick(index) {
      this.currentIndex = index;
      this.$emit("timeClick", index);
    },
  },
};
</script>

<style lang="less">
.listenActive {
  color: #fa2800;
}
.profilesonglist {
  .listtitle {
    display: flex;
    justify-content: space-between;
    .ranktitle {
      color: #4a4a4a;
      padding-left: 15px;
      border-left: 3px solid #fa2800;
      font-weight: 700;
      .listennum {
        font-size: 12px;
        color: #666;
        font-weight: 400;
      }
    }
    .ranktime {
      display: flex;
      font-size: 12px;
      .timelist {
        cursor: pointer;
        position: relative;
        padding-right: 10px;
        margin-left: 10px;
        line-height: 15px;
      }
      .timelist:first-child::before {
        content: "";
        position: absolute;
        right: 0;
        width: 0.5px;
        height: 12px;
        top: 0;
        background-color: #999;
      }
      .timelist:last-child {
        padding-right: 0;
      }
    }
  }
  .playbtnbox {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
  }
}
</style>