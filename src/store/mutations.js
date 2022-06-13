export default {
    setCurrentSong(state, item) {
        state.currentSong = item
    },
    getAudio(state, audio) {
        state.audio = audio
        console.log(state.audio);
    },
    play(state) {
        state.isPlay = true
        state.audio.play()
    },
    pause(state) {
        state.isPlay = false
        state.audio.pause()
    },
    setMuted(state) {
        state.audio.muted = !state.isMuted;
        state.isMuted = !state.isMuted
    },
    setVolume(state, volume) {
        state.audio.volume = volume / 100
    },
    setHistoryShow(state) {
        state.isHistoryShow = !state.isHistoryShow
    },
    setHistoryList(state, item) {
        state.historyList.unshift(item)
        state.historyList = state.historyList.filter((item, index) => {
            return state.historyList.indexOf(item) === index
        })
    },
    removeAllHistory(state) {
        state.historyList.splice(0)
    },
    removeThatHistory(state, index) {
        state.historyList.splice(index, 1)
    },
    setPlayList(state, list) {
        state.playList = list
    },
    toNextSong(state) {
        if (state.playList.indexOf(state.currentSong) === state.playList.length - 1) {
            state.currentSong = state.playList[0]
        } else {
            state.currentSong = state.playList[state.playList.indexOf(state.currentSong) + 1]
        }
    },
    toBackSong(state) {
        if (state.playList.indexOf(state.currentSong) === 0) {
            state.currentSong = state.playList[state.playList.length - 1]
        } else {
            state.currentSong = state.playList[state.playList.indexOf(state.currentSong) - 1]
        }
    },
    setRandomCurrentSong(state) {
        state.currentSong = state.playList[parseInt(Math.random() * state.playList.length)]
    },
    setLyricShow(state) {
        state.isLyricShow = !state.isLyricShow
    },
    setLogin(state, profile) {
        state.isLogin = true
        state.profile = profile
    },
    quitLogin(state) {
        state.isLogin = false
        state.profile = {}
    },
    setDailyStatus(state, status) {
        state.isDailySigin = status
    }
}