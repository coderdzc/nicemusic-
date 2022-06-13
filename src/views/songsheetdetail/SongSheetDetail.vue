<template>
  <div class="sheetdetail w">
    <div class="leftbox boxstyle shadow">
      <SongSheetInfo :sheetInfo="sheetInfo"></SongSheetInfo>
      <PlayAndLike :playList="songInfo"></PlayAndLike>
      <SongList :songs="songInfo" />
    </div>
    <div class="rightbox">
      <SongSheetLike class="shadow" :person="person" />
      <SongSheetRecommend
        class="shadow"
        :relate="relate"
        @itemClick="itemClick"
      />
      <SongSheetComment class="shadow" :comments="comments" />
    </div>
    <GoTop />
  </div>
</template>

<script>
import SongSheetInfo from "./songsheetchild/SongSheetInfo.vue";
import PlayAndLike from "components/context/playandlike/PlayAndLike.vue";
import SongList from "components/context/songlist/SongList.vue";
import GoTop from "components/common/gotop/GoTop.vue";
import SongSheetLike from "./songsheetchild/SongSheetLike.vue";
import SongSheetRecommend from "./songsheetchild/SongSheetRecommend.vue";
import SongSheetComment from "./songsheetchild/SongSheetComment";

import {
  songSheetInfo,
  getSongSheetInfo,
  getSongSheetSong,
  getSongSheetPerson,
  getSongSheetRelate,
  getSongSheetComment,
} from "network/songsheetdetail.js";
export default {
  name: "SongSheetDetail",
  data() {
    return {
      sheetInfo: {},
      songInfo: [],
      person: [],
      relate: [],
      comments: [],
    };
  },
  components: {
    SongSheetInfo,
    PlayAndLike,
    SongList,
    GoTop,
    SongSheetLike,
    SongSheetRecommend,
    SongSheetComment,
  },
  watch: {
    $route() {
      this.getSongSheetInfo();
      this.getSongSheetSong();
      this.getSongSheetPerson();
      this.getSongSheetRelate();
      this.getSongSheetComment();
    },
  },
  created() {
    this.getSongSheetInfo();
    this.getSongSheetSong();
    this.getSongSheetPerson();
    this.getSongSheetRelate();
    this.getSongSheetComment();
  },
  methods: {
    //事件监听
    itemClick(id) {
      this.$router.push({
        path: "/songsheetdetail",
        query: {
          id,
        },
      });
    },
    //网络请求
    getSongSheetInfo() {
      getSongSheetInfo(this.$route.query.id).then((res) => {
        this.sheetInfo = new songSheetInfo(res.playlist, res.playlist.creator);
      });
    },
    getSongSheetSong() {
      getSongSheetSong(this.$route.query.id).then((res) => {
        this.songInfo = res.songs;
      });
    },
    getSongSheetPerson() {
      getSongSheetPerson(this.$route.query.id, 28).then((res) => {
        this.person = res.subscribers;
      });
    },
    getSongSheetRelate() {
      getSongSheetRelate(this.$route.query.id).then((res) => {
        this.relate = res.playlists;
      });
    },
    getSongSheetComment() {
      getSongSheetComment(this.$route.query.id, 2).then((res) => {
        this.comments = res.data.comments;
      });
    },
  },
};
</script>

<style scoped lang="less">
.sheetdetail {
  padding-top: 100px;
  display: flex;
  .leftbox {
    flex: 70%;
    margin-right: 20px;
    padding: 15px;
  }
  .rightbox {
    flex: 30%;
  }
}
.boxstyle {
  padding: 15px;
  border-radius: 8px;
}
.shadow {
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  border-radius: 8px;
}
</style>