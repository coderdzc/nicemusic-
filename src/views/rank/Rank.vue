<template>
  <div class="rank w">
    <SongSheetBox>
      <h2 slot="title" class="title">云音乐特色榜</h2>
      <SongSheetItem
        :songSheet="specialRank"
        slot="itemcontainer"
      ></SongSheetItem>
    </SongSheetBox>
    <SongSheetBox>
      <h2 slot="title" class="title">全球媒体榜</h2>
      <SongSheetItem
        :songSheet="globalRank"
        slot="itemcontainer"
      ></SongSheetItem>
    </SongSheetBox>
  </div>
</template>

<script>
import SongSheetBox from "components/context/songsheetbox/SongSheetBox.vue";
import SongSheetItem from "components/context/songsheetbox/SongSheetItem.vue";

import { getRankData } from "network/rank.js";
export default {
  data() {
    return {
      specialRank: [],
      globalRank: [],
    };
  },
  components: {
    SongSheetBox,
    SongSheetItem,
  },
  created() {
    this.getRankData();
  },
  methods: {
    getRankData() {
      getRankData().then((res) => {
        this.globalRank = res.list;
        this.specialRank = this.globalRank.splice(0, 4);
      });
    },
  },
};
</script>

<style scoped lang="less">
.rank {
  padding-top: 100px;
  .title {
    border-left: 3px solid #fa2800;
    padding-left: 10px;
    font-size: 16px;
    font-weight: 400;
    color: #000000d9;
  }
}
</style>