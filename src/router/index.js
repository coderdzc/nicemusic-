import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import("views/home/Home.vue");
const Rank = () => import("views/rank/Rank.vue");
const SongSheet = () => import("views/songsheet/SongSheet.vue");
const Singer = () => import("views/singer/Singer.vue");
const Video = () => import("views/video/Video.vue");
const Mv = () => import("views/mv/Mv.vue");
const Login = () => import("views/login/Login.vue")
const SongSheetDetail = () => import("views/songsheetdetail/SongSheetDetail.vue")
const SingerDetail = () => import("views/singerdetail/SingerDetail.vue")
const Search = () => import("views/search/Search.vue")
const MvDetail = () => import("views/mvdetail/MvDetail.vue")
const VideoDetail = () => import("views/videodetail/VideoDetail.vue")
const Profile = () => import("views/profile/Profile.vue")

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/rank",
    component: Rank
  },
  {
    path: "/songsheet",
    component: SongSheet
  },
  {
    path: "/singer",
    component: Singer
  },
  {
    path: "/video",
    component: Video
  },
  {
    path: "/mv",
    component: Mv
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/songsheetdetail",
    component: SongSheetDetail
  },
  {
    path: "/singerdetail",
    component: SingerDetail
  },
  {
    path: "/search",
    component: Search
  },
  {
    path: "/mvdetail",
    component: MvDetail
  },
  {
    path: "/videodetail",
    component: VideoDetail
  },
  {
    path: "/profile",
    component: Profile
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
