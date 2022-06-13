<template>
  <div class="newsong" v-if="newSong.length > 1">
    <div class="title">推荐新歌</div>
    <div class="container">
      <div class="songbox" v-for="(item, index) in newSong" :key="index">
        <div class="imgbox">
          <img v-lazy="item.picUrl" alt="" />
          <PlayBtn class="playbtn" :playList="newSong" :item="item" />
          <PlayAnimate class="playanimate" :item="item"></PlayAnimate>
        </div>
        <div class="songinfo">
          <div class="songname">{{ item.name }}</div>
          <div class="artists">
            <span v-for="(artist, indey) in item.song.artists" :key="indey">
              {{ artist.name | complex(indey, item.song.artists.length) }}
            </span>
          </div>
        </div>
        <div class="songtime">{{ item.song.duration | formatTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayBtn from "components/context/playbtn/PlayBtn.vue";
import PlayAnimate from "components/context/playanimate/PlayAnimate.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    PlayBtn,
    PlayAnimate,
  },
  computed: {
    ...mapGetters(["isPlay"]),
  },
  props: {
    newSong: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {},
};
</script>

<style  lang="less">
.imgbox:hover .playbtn {
  display: block;
}
.imgbox:hover .playanimate {
  display: none !important;
}
.newsong {
  .title {
    font-size: 16px;
    color: #000000d9;
    margin-bottom: 20px;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    .songbox {
      display: flex;
      margin: 0 0 20px 0;
      position: relative;
      flex: 50%;
      .imgbox {
        position: relative;
        border-radius: 3px;
        overflow: hidden;
        width: 12%;
        img {
          width: 100%;
          height: 100%;
        }
        .playanimate {
          display: none;
        }
      }
      .imgbox::before {
        transition: all 0.3s;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        content: "";
        text-align: center;
        line-height: 75px;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
      }
      .imgbox:hover::before {
        opacity: 1;
      }
      .songinfo {
        flex: 1;
        padding: 10px 20px;
        .songname {
          font-weight: 700;
          color: #000000d9;
          margin-bottom: 20px;
        }
        .artists {
          font-size: 12px;
          width: 70%;
          display: -webkit-box;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .songtime {
        position: absolute;
        right: 50px;
        line-height: 75px;
        font-weight: 700;
        color: #000000d9;
      }
    }
  }
}
</style>