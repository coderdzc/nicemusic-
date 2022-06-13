<template>
  <div class="singerdetail">
    <SingerDetailTop :singerInfo="singerInfo"></SingerDetailTop>
    <div class="w">
      <SingerDetailTab @tabClick="tabClick" ref="tab" />
      <SingerSong :songs="songs" v-if="currentIndex === songIndex" />
      <SingerAlbum :albums="albums" v-if="currentIndex === albumIndex" />
      <MvBox :mvs="mvs" v-if="currentIndex === MVIndex" />
      <SingerDesc :desc="desc" v-if="currentIndex === descIndex" />
      <SingerBox v-if="currentIndex === relateIndex" class="singerbox">
        <SingerItem
          slot="item"
          :Singer="relate"
          @itemClick="itemClick"
        ></SingerItem>
      </SingerBox>
    </div>
    <GoTop />
  </div>
</template>

<script>
import SingerDetailTop from "./singerdetailchild/SingerDetailTop.vue";
import SingerDetailTab from "./singerdetailchild/SingDetailTab.vue";
import SingerSong from "./singerdetailchild/SingerSong.vue";
import SingerAlbum from "./singerdetailchild/SingerAlbum.vue";
import MvBox from "components/context/mv/MvBox.vue";
import SingerDesc from "./singerdetailchild/SingerDesc.vue";
import SingerBox from "components/context/singerbox/SingerBox.vue";
import SingerItem from "components/context/singerbox/SingerItem.vue";

import GoTop from "components/common/gotop/GoTop.vue";

import {
  getSingerInfoAndSong,
  getSingerAlbum,
  getSingerMV,
  getSingerDesc,
  getSingerRelate,
} from "network/singerdetail.js";
export default {
  name: "SingerDetail",
  data() {
    return {
      singerInfo: {},
      songs: [],
      albums: [],
      mvs: [],
      desc: {},
      relate: [],
      currentIndex: 0,
      songIndex: 0,
      albumIndex: 1,
      MVIndex: 2,
      descIndex: 3,
      relateIndex: 4,
    };
  },
  components: {
    SingerDetailTop,
    SingerDetailTab,
    SingerSong,
    SingerAlbum,
    MvBox,
    SingerDesc,
    SingerBox,
    SingerItem,
    GoTop,
  },
  created() {
    this.getSingerInfoAndSong();
    this.getSingerAlbum();
    this.getSingerMV();
    this.getSingerDesc();
    this.getSingerRelate();
  },
  watch: {
    $route() {
      this.getSingerInfoAndSong();
      this.getSingerAlbum();
      this.getSingerMV();
      this.getSingerDesc();
      this.getSingerRelate();
      this.currentIndex = 0;
      this.$refs.tab.currentIndex = 0;
    },
  },
  methods: {
    //事件监听
    tabClick(index) {
      this.currentIndex = index;
    },
    itemClick() {
      this.getSingerInfoAndSong();
      this.getSingerAlbum();
      this.getSingerMV();
      this.getSingerDesc();
      this.getSingerRelate();
      this.currentIndex = 0;
      this.$refs.tab.currentIndex = 0;
    },
    //网络请求
    getSingerInfoAndSong() {
      getSingerInfoAndSong(this.$route.query.id).then((res) => {
        this.singerInfo = res.artist;
        this.songs = res.hotSongs;
      });
    },
    getSingerAlbum() {
      getSingerAlbum(this.$route.query.id, 60).then((res) => {
        this.albums = res.hotAlbums;
      });
    },
    getSingerMV() {
      getSingerMV(this.$route.query.id, 40).then((res) => {
        this.mvs = res.mvs;
      });
    },
    getSingerDesc() {
      getSingerDesc(this.$route.query.id).then((res) => {
        this.desc = res;
      });
    },
    getSingerRelate() {
      getSingerRelate(this.$route.query.id).then((res) => {
        this.relate = res.artists;
        console.log(this.relate);
      });
    },
  },
};
</script>

<style lang="less">
.singerdetail {
  padding-top: 70px;
}
.singerbox {
  margin-top: 50px;
}
</style>