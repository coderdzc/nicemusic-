<template>
  <div class="home" ref="home">
    <div class="w">
      <HomeSwiper :banners="banners" />
      <SongSheetBox class="sheetbox">
        <h2 slot="title" class="title">推荐歌单</h2>
        <SongSheetItem
          slot="itemcontainer"
          :songSheet="songSheet"
        ></SongSheetItem>
      </SongSheetBox>
      <HomeNewSong :newSong="newSong" class="newsong" />
      <SingBox>
        <h2 slot="title" class="title">推荐歌手</h2>
        <SingerItem slot="item" :Singer="hotSinger" />
      </SingBox>
      <Gotop />
    </div>
  </div>
</template>

<script>
import HomeSwiper from "./homechild/HomeSwiper.vue";
import SongSheetBox from "components/context/songsheetbox/SongSheetBox.vue";
import SongSheetItem from "components/context/songsheetbox/SongSheetItem.vue";
import HomeNewSong from "./homechild/HomeNewSong.vue";
import SingBox from "components/context/singerbox/SingerBox.vue";
import SingerItem from "components/context/singerbox/SingerItem.vue";
import Gotop from "components/common/gotop/GoTop.vue";

import {
  getHomeSwiper,
  getHomeSongSheet,
  getHomeNewSong,
  getHomeSinger,
} from "network/home.js";
import { refreshLogin } from "network/login.js";
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      songSheet: [],
      newSong: [],
      hotSinger: [],
    };
  },
  components: {
    HomeSwiper,
    SongSheetBox,
    SongSheetItem,
    HomeNewSong,
    SingBox,
    SingerItem,
    Gotop,
  },
  created() {
    this.getHomeSwiper();
    this.getHomeSongSheet();
    this.getHomeNewSong();
    this.getHomeSinger();
  },
  activated() {
    refreshLogin();
    this.getHomeSongSheet();
  },
  methods: {
    getHomeSwiper() {
      getHomeSwiper().then((res) => {
        this.banners = res.banners;
        this.banners.push(this.banners[0]);
        this.banners.push(this.banners[1]);
      });
    },
    getHomeSongSheet() {
      getHomeSongSheet(24).then((res) => {
        this.songSheet = res.result;
      });
    },
    getHomeNewSong() {
      getHomeNewSong().then((res) => {
        this.newSong = res.result;
      });
    },
    getHomeSinger() {
      getHomeSinger(30).then((res) => {
        this.hotSinger = res.artists;
      });
    },
  },
};
</script>

<style lang="less">
.home {
  height: 100%;
  padding-top: 70px;
  .w {
    padding: 20px 0;
    .sheetbox {
      margin-top: 40px;
    }
    .newsong {
      margin-bottom: 30px;
    }
    .title {
      color: #000000d9;
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>