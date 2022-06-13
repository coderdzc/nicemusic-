export default {
    currentSong(state) {
        return state.currentSong
    },
    audio(state) {
        return state.audio
    },
    audioCurrentTime(state) {
        if (state.audio !== null) {
            return state.audio.currentTime
        } else {
            return "00:00"
        }
    },
    isPlay(state) {
        return state.isPlay
    },
    isHistoryShow(state) {
        return state.isHistoryShow
    },
    historyList(state) {
        return state.historyList
    },
    isLyricShow(state) {
        return state.isLyricShow
    },
    isLogin(state) {
        return state.isLogin
    },
    profile(state) {
        return state.profile
    },
    profileUid(state) {
        return state.profile.userId
    },
    isDailySigin(state) {
        return state.isDailySigin
    }
}