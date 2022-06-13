<template>
  <div class="playbar">
    <div class="w">
      <div class="playbutton">
        <div class="back" @click="BackSong"></div>
        <div class="play" v-show="!isPlay" @click="playClick"></div>
        <div class="pause" v-show="isPlay" @click="pauseClick"></div>
        <div class="next" @click="NextSong"></div>
      </div>
      <div class="playview">
        <div class="imgbox">
          <img :src="picUrl" alt="" />
        </div>
        <div class="view">
          <div class="msg">
            <div class="info">
              <div class="name">{{ currentSong.name }}</div>
              <div class="artists">
                <div
                  class="artist"
                  v-for="(item, index) in artists"
                  :key="index"
                >
                  {{ item.name | complex(index, artists.length) }}
                </div>
              </div>
            </div>
            <div class="time" v-if="Object.keys(currentSong).length !== 0">
              <div class="nowtime">{{ currentTime | setTime }} /</div>
              <div class="durationtime">
                {{ duration | formatTime }}
              </div>
            </div>
          </div>
          <div class="progress">
            <el-slider
              v-model="currentTime"
              :max="dMax"
              :format-tooltip="formatTooltip"
              @change="progressChange"
            ></el-slider>
          </div>
        </div>
      </div>
      <div class="playselect">
        <div class="volumebar">
          <i class="iconfont" v-if="!volumeOn" @click="volumeClick">&#xeca9;</i>
          <i class="iconfont" v-if="volumeOn" @click="volumeClick">&#xe8b8;</i>
          <div class="volume">
            <el-slider v-model="volume" @change="volumeChange"></el-slider>
          </div>
        </div>
        <div class="select">
          <div class="model">
            <i class="iconfont" v-if="model === 1" @click="nextModel"
              >&#xea75;</i
            >
            <i class="iconfont" v-if="model === 2" @click="nextModel"
              >&#xea77;</i
            >
            <i class="iconfont" v-if="model === 3" @click="nextModel"
              >&#xe68c;</i
            >
          </div>
          <div class="lyric">
            <i class="iconfont" @click="setLyricShow">&#xe727;</i>
          </div>
          <div class="sheet">
            <i class="iconfont last" @click="historyClick">&#xea71;</i>
          </div>
        </div>
      </div>
      <audio :src="songUrl" ref="audio" @ended="audioEnd"></audio>
      <PlayHistory />
      <transition name="el-zoom-in-bottom">
        <div class="lyricbox" v-show="isLyricShow">
          <div class="lyrichead">歌词</div>
          <Scroll class="lyric" ref="scroll">
            <div
              class="text"
              v-if="currentLyric && currentLyric.lines.length > 0"
            >
              <div
                class="lyricLine"
                ref="lyricLine"
                v-for="(item, index) in currentLyric.lines"
                :key="index"
                :class="{ lyricActive: index === currentLyricNum }"
              >
                {{ item.txt }}
              </div>
            </div>
          </Scroll>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import PlayHistory from "components/context/playhistory/PlayHistory.vue";
import { getLyric } from "network/lyric.js";
import Scroll from "components/common/scroll/Scroll.vue";
import Lyric from "lyric-parser";
export default {
  components: {
    PlayHistory,
    Scroll,
  },
  data() {
    return {
      progress: 0,
      volume: 30,
      volumeOn: true,
      model: 1,
      currentTime: 0,
      dMax: 0,
      PlayHistory,
      currentLyric: null,
      currentLyricNum: 0,
    };
  },
  computed: {
    songUrl() {
      return `https://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3 `;
    },
    duration() {
      return this.currentSong.dt || this.currentSong.song.duration;
    },
    artists() {
      return this.currentSong.ar || this.currentSong.song.artists;
    },
    picUrl() {
      return this.currentSong.picUrl || this.currentSong.al.picUrl;
    },
    ...mapGetters(["currentSong", "audio", "isPlay", "isLyricShow"]),
  },
  watch: {
    duration() {
      this.getDuration();
    },
    currentSong() {
      // 当前歌曲变化，先停止当前歌曲，然后重新获取歌词之后调用getlyric（）
      // 之后getlyric（）里面有lyricplay（）就可以播放歌词
      this.currentLyric.stop();
      this.getLyric();
    },
    isPlay() {
      if (this.currentLyric !== null) {
        this.currentLyric.togglePlay();
      }
    },
  },
  created() {
    //之前是在mounted之后再获取的歌词会有延迟，要在created的时候就获取歌词并且播放延迟就低
    this.getLyric();
  },
  mounted() {
    this.getAudio(this.$refs.audio);
    this.setVolume(this.volume);
    setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);
    this.getDuration();
  },
  methods: {
    //事件监听
    playClick() {
      this.play();
    },
    pauseClick() {
      this.pause();
    },
    volumeChange() {
      if (this.volume === 0) {
        this.volumeOn = false;
        this.setVolume(this.volume);
      } else {
        this.volumeOn = true;
        this.setVolume(this.volume);
      }
    },
    nextModel() {
      if (this.model === 3) {
        this.model = 1;
      } else {
        this.model++;
      }
    },
    volumeClick() {
      if (this.volume === 0) {
        this.volume = 30;
        this.volumeChange();
        this.setMuted();
      } else {
        this.volume = 0;
        this.volumeChange();
        this.setMuted();
      }
    },
    getCurrentTime() {
      if (this.audio !== null) {
        return parseInt(this.audio.currentTime);
      }
    },
    getDuration() {
      let time = new Date(this.duration);
      let sec = time.getSeconds();
      let min = time.getMinutes();
      this.dMax = sec + 60 * min;
    },
    formatTooltip(time) {
      //格式化歌曲时间
      let min = parseInt(time / 60);
      min = min < 10 ? "0" + min : min;
      let sec = parseInt(time % 60);
      sec = sec < 10 ? "0" + sec : sec;
      return `${min}:${sec}`;
    },
    //改变当前歌曲进度
    progressChange() {
      //当进度条改变的时候首先需要改变当前时间
      //再就是如果有歌词则跳转到当前时间的毫秒处seek跳转
      this.audio.currentTime = this.currentTime;
      if (this.currentLyric) {
        this.currentLyric.seek(this.currentTime * 1000);
      }
    },
    historyClick() {
      this.setHistoryShow();
    },
    NextSong() {
      this.toNextSong();
      this.setHistoryList(this.currentSong);
      setTimeout(() => {
        this.play();
      }, 200);
    },
    BackSong() {
      this.toBackSong();
      setTimeout(() => {
        this.play();
      }, 200);
    },
    //通过歌曲结束后的mode来判断播放模式
    audioEnd() {
      if (this.model === 1) {
        //列表循环
        this.NextSong();
      } else if (this.model === 3) {
        //随机播放
        this.setRandomCurrentSong();
        this.setHistoryList(this.currentSong);
        setTimeout(() => {
          this.play();
        }, 200);
      } else if (this.model === 2) {
        //单曲循环
        this.currentLyric.stop();
        this.play();
        this.currentLyric.play();
      }
    },
    //当lyric的lineNum改变后的回调函数
    lyricHandle({ lineNum, txt }) {
      if (!this.$refs.lyricLine) {
        return;
      }
      this.currentLyricNum = lineNum;
      if (lineNum > 7) {
        let el = this.$refs.lyricLine[lineNum - 7];
        this.$nextTick(() => {
          this.$refs.scroll.scrollToElement(el, 1000);
        });
      } else {
        this.$nextTick(() => {
          this.$refs.scroll.scrollTo(0, 0, 1000);
        });
      }
    },
    ...mapMutations([
      "getAudio",
      "play",
      "pause",
      "setMuted",
      "setVolume",
      "setHistoryShow",
      "toNextSong",
      "toBackSong",
      "setLyricShow",
      "setRandomCurrentSong",
      "setHistoryList",
    ]),
    //网络请求
    getLyric() {
      getLyric(this.currentSong.id).then((res) => {
        this.currentLyric = res.lrc.lyric;
        this.currentLyric = new Lyric(this.currentLyric, this.lyricHandle);
        this.currentLyric.play();
        console.log(this.currentLyric);
      });
    },
  },
};
</script>

<style lang="less" >
.iconfont {
  font-family: "iconfont" !important;
  font-size: 23px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  line-height: 79px;
}
.lyricActive {
  color: #fa2800;
  font-size: 18px;
  margin: 10px 0 !important;
}
.lyricbox {
  width: 354px;
  height: 550px;
  position: absolute;
  bottom: 82px;
  right: 30px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.97);
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  border-radius: 8px;
  .lyrichead {
    color: #4a4a4a;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 15px;
  }
  .lyric {
    white-space: pre-wrap;
    overflow: hidden;
    height: 95%;
    .text {
      text-align: center;
      .lyricLine {
        margin: 5px 0;
        line-height: 24px;
      }
    }
  }
}
.el-slider__bar {
  background-color: #fa2800 !important;
  height: 2.5px !important;
}
.el-slider__button {
  border: 2px solid #fa2800 !important;
  width: 12px !important;
  height: 12px !important;
}
.el-slider__runway {
  height: 2.5px !important;
}
.playbar {
  position: absolute;
  width: 100%;
  height: 72px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 999;
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);

  .w {
    display: flex;
    justify-content: space-between;
    .playbutton {
      display: flex;
      align-items: center;
      font-family: "icomoon";
      line-height: 72px;
      .back,
      .next {
        cursor: pointer;
        color: #fa2800;
        font-size: 23px;
      }
      .play,
      .pause {
        cursor: pointer;
        width: 43px;
        height: 43px;
        border-radius: 50%;
        background: linear-gradient(110deg, #fa2800, #fb8974);
        font-size: 30px;
        color: #fff;
        line-height: 45px;
        text-align: center;
        margin: 0 25px;
      }
    }
    .playview {
      flex: 1;
      padding: 10px 30px 0;
      display: flex;
      .imgbox {
        width: 50px;
        height: 50px;

        img {
          width: 50px;
          height: 50px;
          border-radius: 5px;
        }
      }
      .view {
        width: 100%;
        margin-left: 15px;
        padding-top: 5px;
        .msg {
          width: 100%;
          display: flex;
          justify-content: space-between;
          .info {
            .name {
              margin-right: 10px;
              font-weight: 700;
              color: #000000d9;
              font-size: 13px;
            }
            .artists {
              font-size: 12px;
              display: flex;
            }
          }
        }
        .info,
        .time {
          display: flex;
        }
        .progress {
          padding: 0 10px;
        }
      }
    }
    .playselect {
      display: flex;
      .volumebar {
        display: flex;
        align-items: center;
        margin-right: 25px;
        .iconfont {
          margin-right: 10px;
          cursor: pointer;
          font-size: 22px;
        }
        .volume {
          position: relative;
          width: 120px;
        }
      }
      .select {
        display: flex;
        .iconfont {
          cursor: pointer;
          font-size: 18px;
          margin-right: 30px;
        }
        .last {
          margin-right: 0;
        }
      }
    }
  }
}
</style>