<template>
  <div class="search">
    <div class="topbar">
      <el-input
        suffix-icon="iconfont icon-sousuo"
        placeholder="搜索音乐/MV/歌单/歌手"
        v-model="input"
        @change="inputChange"
      ></el-input>
    </div>
    <div class="w">
      <SearchTabBar @itemclick="itemclick" />
      <div class="songs" v-if="currentIndex === 0">
        <div class="playbox">
          <div class="left"></div>
          <PlayAll />
        </div>
        <Songlist :songs="songs"></Songlist>
      </div>
      <SingerItem :Singer="Singer" v-if="currentIndex === 1" />
      <AlbumItem :albums="albums" v-if="currentIndex === 2" />
      <VideoItem :videos="videos" v-if="currentIndex === 3" />
      <SongSheetItem :songSheet="songsheets" v-if="currentIndex === 4" />
    </div>
    <GoTop />
  </div>
</template>

<script>
import SearchTabBar from "./searchchild/SearchTabBar.vue";
import { getSearch } from "network/search.js";
import PlayAll from "components/context/playall/PlayAll.vue";
import Songlist from "components/context/songlist/SongList.vue";
import SingerItem from "components/context/singerbox/SingerItem.vue";
import AlbumItem from "components/context/albumitem/AlbumItem.vue";
import VideoItem from "components/context/videoitem/VideoItem.vue";
import SongSheetItem from "components/context/songsheetbox/SongSheetItem.vue";

import GoTop from "components/common/gotop/GoTop.vue";
import { getHistory } from "common/localhistory.js";
export default {
  name: "Search",
  data() {
    return {
      input: "",
      songs: [],
      Singer: [],
      albums: [],
      videos: [],
      songsheets: [],
      currentIndex: 0,
      history: [],
    };
  },
  components: {
    SearchTabBar,
    PlayAll,
    Songlist,
    GoTop,
    SingerItem,
    AlbumItem,
    VideoItem,
    SongSheetItem,
  },
  created() {
    this.getSearch();
    this.history = getHistory();
  },
  methods: {
    //事件监听
    itemclick(index) {
      this.currentIndex = index;
    },
    inputChange() {
      if (this.input !== "" || this.input !== " ") {
        this.history.push(this.input);
        localStorage.setItem("history", JSON.stringify(this.history));
        this.$router.push({
          path: "/search",
          query: {
            keywords: this.input,
          },
        });
        this.getSearch();
      }
    },
    //网络请求
    getSearch() {
      getSearch(this.$route.query.keywords, 1).then((res) => {
        this.songs = res.result.songs;
      });
      getSearch(this.$route.query.keywords, 100).then((res) => {
        this.Singer = res.result.artists;
      });
      getSearch(this.$route.query.keywords, 10).then((res) => {
        this.albums = res.result.albums;
      });
      getSearch(this.$route.query.keywords, 1014).then((res) => {
        this.videos = res.result.videos;
      });
      getSearch(this.$route.query.keywords, 1000).then((res) => {
        this.songsheets = res.result.playlists;
      });
    },
  },
};
</script>

<style lang="less">
.search {
  padding-top: 70px;
  .topbar {
    position: relative;
    height: 250px;
    background-color: #ccc;
    background-image: url("~assets/img/personal.jpg");
    background-size: cover;
    background-position: 0 -150px;
    background-repeat: no-repeat;
    //背景不随缩放滚动
    background-attachment: fixed;
    .el-input {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 720px;
      height: 62px;
      .el-input__inner {
        height: 100%;
        color: #4a4a4a;
      }
      .el-input__suffix {
        width: 50px;
        height: 100%;
        .el-input__suffix-inner {
          display: block;
          height: 100%;
          line-height: 70px;
        }
        .iconfont {
          font-size: 25px;
          color: #4a4a4a;
          cursor: pointer;
        }
      }
    }
  }
  .topbar::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(150, 0, 100, 0.7);
    opacity: 0.5;
  }
  .w {
    .playbox {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
}
</style>