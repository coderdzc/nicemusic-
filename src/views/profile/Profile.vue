<template>
  <div class="profileview">
    <div class="profilebg"></div>
    <div class="pcontainer">
      <div class="pcontent w">
        <div class="pleft">
          <ProfileSongList :songList="songList" @timeClick="timeClick" />
        </div>
        <div class="pright">
          <ProfileInfo :rank="rank" />
          <SongSheetBox class="profileSheet">
            <div slot="title" class="profileSheetTitle title">我创建的歌单</div>
            <div slot="itemcontainer">
              <ProfileSongSheet :songSheet="createSheet" />
            </div>
          </SongSheetBox>
          <SongSheetBox class="profileSheet">
            <div slot="title" class="profileSheetTitle title">我收藏的歌单</div>
            <div slot="itemcontainer">
              <ProfileSongSheet :songSheet="likeSheet" />
            </div>
          </SongSheetBox>
        </div>
      </div>
    </div>
    <GoTop />
  </div>
</template>

<script>
import ProfileSongList from "./profilechild/ProfileSongList.vue";
import ProfileInfo from "./profilechild/ProfileInfo";
import SongSheetBox from "components/context/songsheetbox/SongSheetBox";
import ProfileSongSheet from "./profilechild/ProfileSongSheet.vue";
import GoTop from "components/common/gotop/GoTop.vue";

import {
  getProfileRecord,
  getProfileRank,
  getProfileSheet,
} from "network/profile.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      type: 1,
      songList: [],
      rank: 1,
      createSheet: [],
      likeSheet: [],
    };
  },
  components: {
    ProfileSongList,
    ProfileInfo,
    SongSheetBox,
    ProfileSongSheet,
    GoTop,
  },
  computed: {
    ...mapGetters(["profileUid", "profile"]),
  },
  watch: {
    profile() {
      this.getProfileRecord();
      this.getProfileRank();
      this.getProfileSheet();
    },
  },
  created() {
    this.getProfileRecord();
    this.getProfileRank();
    this.getProfileSheet();
  },
  methods: {
    //事件监听
    timeClick(index) {
      index === 0 ? (this.type = 1) : (this.type = 0);
      this.getProfileRecord();
    },
    //网络请求
    getProfileRecord() {
      getProfileRecord(this.profileUid, this.type).then((res) => {
        let songs = [];
        if (res) {
          if (this.type === 1) {
            for (const item of res.weekData) {
              songs.push(item.song);
            }
          } else if (this.type === 0) {
            for (const item of res.allData) {
              songs.push(item.song);
            }
          }
          this.songList = songs;
        }
      });
    },
    getProfileRank() {
      getProfileRank().then((res) => {
        console.log(res);
        if (res) {
          this.rank = res.data.level;
        }
      });
    },
    getProfileSheet() {
      getProfileSheet(this.profileUid).then((res) => {
        if (res) {
          this.createSheet = res.playlist.filter(
            (item) => item.creator.userId == this.profileUid
          );
          this.likeSheet = res.playlist.filter(
            (item) => item.creator.userId != this.profileUid
          );
        }
      });
    },
  },
};
</script>

<style lang="less">
.profileview {
  padding-top: 70px;
  // position: relative;
  .profilebg {
    position: fixed;
    width: 100%;
    top: 70px;
    height: 350px;
    background-color: #ccc;
    background-image: url("~assets/img/personal.jpg");
    background-size: cover;
    background-position: 0 -100px;
    background-attachment: fixed;
  }
  .profilebg::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(150, 0, 100, 0.7);
    opacity: 0.5;
  }
  .pcontainer {
    position: absolute;
    width: 100%;
    top: 420px;
    padding-top: 35px;
    background-color: #fff;
    .pcontent {
      display: flex;
      .pleft {
        flex: 70%;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
        margin-bottom: 40px;
      }
      .pright {
        flex: 30%;
        margin-left: 25px;
        .profileSheet {
          box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
          border-radius: 8px;
          overflow: hidden;
          padding: 15px 10px;
          margin-bottom: 20px;
          .profileSheetTitle {
            padding-left: 10px;
            border-left: 3px solid #fa2800;
            color: #000;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>