import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import getters from "./getters"
Vue.use(Vuex)

const state = {
  //当前歌曲
  currentSong: {},
  //当前的歌曲的媒体
  audio: null,
  //是否静音
  isMuted: false,
  //是否正在播放
  isPlay: true,
  //是否显示播放历史列表
  isHistoryShow: false,
  //是否显示歌词
  isLyricShow: false,
  //播放历史列表
  historyList: [],
  //当前的播放列表
  playList: [],
  //是否登录
  isLogin: false,
  //用户信息
  profile: {},
  //是否进行过每日签到
  isDailySigin: false
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
