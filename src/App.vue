<template>
  <div id="app">
    <MainNavBar v-if="$route.path.indexOf('/login') === -1"></MainNavBar>
    <keep-alive
      exclude="SongSheetDetail,SingerDetail,Search,MvDetail,VideoDetail,Login,Video"
    >
      <router-view></router-view>
    </keep-alive>
    <transition name="el-zoom-in-bottom">
      <PlayBar
        v-if="
          Object.keys($store.state.currentSong).length !== 0 &&
          $route.path.indexOf('/login') === -1
        "
      ></PlayBar>
    </transition>
    <Footer v-if="$route.path.indexOf('/login') === -1"></Footer>
    <FlyCircle class="cirle1" />
    <FlyCircle class="cirle2" />
    <FlyCircle class="cirle3" />
    <FlyCircle class="cirle4" />
  </div>
</template>

<script>
import MainNavBar from "components/context/mainnavbar/MainNavBar.vue";
import FlyCircle from "components/common/flycircle/FlyCircle.vue";
import Footer from "components/common/footer/Footer.vue";
import PlayBar from "components/common/playbar/PlayBar.vue";
export default {
  components: {
    FlyCircle,
    MainNavBar,
    Footer,
    PlayBar,
  },
  created() {
    console.log(this.$route.path.indexOf("/login"));
  },
};
</script>

<style lang="less" scoped>
@import "~assets/css/base.css";
@import "~assets/fonts/style.css";
@import "~assets/fonts/iconfont.css";
.cirle1 {
  top: 80px;
  left: 100px;
}
.cirle2 {
  top: 60%;
  left: 3%;
}
.cirle3 {
  top: 140px;
  right: 2%;
}
.cirle4 {
  top: 60%;
  right: 5%;
}
</style>
