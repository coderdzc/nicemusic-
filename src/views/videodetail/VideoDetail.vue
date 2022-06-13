<template>
  <div class="videodetail w">
    <div class="leftbox">
      <VideoContent
        :videodetail="videodetail"
        :videoinfo="videoinfo"
        :videourl="videourl"
      />
      <CommentBox v-if="Object.keys(profile).length > 0" />
      <VideoComment :hotComments="hotComments" :newComments="newComments" />
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100"
        @current-change="pagechange"
      >
      </el-pagination>
    </div>
    <div class="rightbox">
      <div class="videodesc" v-if="videodesc">
        <div class="title">视频简介</div>
        <div class="text">{{ videodesc }}</div>
      </div>
      <VideoRelate :relates="relates" @enterDetail="enterDetail" />
    </div>
    <GoTop />
  </div>
</template>

<script>
import VideoContent from "./videochild/VideoContent.vue";
import VideoComment from "./videochild/VideoComment.vue";
import VideoRelate from "./videochild/VideoRelate.vue";
import GoTop from "components/common/gotop/GoTop.vue";
import CommentBox from "components/context/commentbox/CommentBox.vue";

import {
  getVideoDetail,
  getVideoInfo,
  getVideoUrl,
  getVideoComment,
  getVideoRelate,
} from "network/videodetail.js";
import { mapState } from "vuex";
export default {
  name: "VideoDetail",
  data() {
    return {
      videodetail: {},
      videodesc: "",
      videoinfo: {},
      videourl: "",
      offset: 0,
      newComments: [],
      hotComments: [],
      relates: [],
    };
  },
  components: {
    VideoContent,
    VideoComment,
    VideoRelate,
    GoTop,
    CommentBox,
  },
  watch: {
    $route() {
      this.getVideoDetail();
      this.getVideoInfo();
      this.getVideoUrl();
      this.getVideoComment();
      this.getVideoRelate();
    },
  },
  created() {
    this.getVideoDetail();
    this.getVideoInfo();
    this.getVideoUrl();
    this.getVideoComment();
    this.getVideoRelate();
  },
  computed: {
    ...mapState(["profile"]),
  },
  methods: {
    //事件监听
    pagechange(index) {
      this.offset = (index - 1) * 20;
      this.getVideoComment();
    },
    enterDetail(id) {
      this.$router.push({
        path: "/videodetail",
        query: {
          id,
        },
      });
      this.getVideoDetail();
      this.getVideoInfo();
      this.getVideoUrl();
      this.getVideoComment();
      this.getVideoRelate();
    },
    //网络请求
    getVideoDetail() {
      getVideoDetail(this.$route.query.id).then((res) => {
        this.videodetail = res.data;
        this.videodesc = res.data.description || res.data.title;
      });
    },
    getVideoInfo() {
      getVideoInfo(this.$route.query.id).then((res) => {
        this.videoinfo = res;
      });
    },
    getVideoUrl() {
      getVideoUrl(this.$route.query.id).then((res) => {
        for (const item of res.urls) {
          this.videourl = item.url;
        }
      });
    },
    getVideoComment() {
      getVideoComment(this.$route.query.id, this.offset).then((res) => {
        this.hotComments = res.hotComments;
        this.newComments = res.comments;
      });
    },
    getVideoRelate() {
      getVideoRelate(this.$route.query.id).then((res) => {
        console.log(res);
        this.relates = res.data;
      });
    },
  },
};
</script>

<style lang="less">
.el-pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #fa2800;
}
.videodetail {
  padding-top: 100px;
  display: flex;
  .leftbox {
    flex: 70%;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  }
  .rightbox {
    flex: 30%;
    margin-left: 20px;
    .videodesc {
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
      margin-bottom: 20px;
      .title {
        padding-left: 15px;
        color: #000;
        font-weight: 700;
        border-left: 3px solid #fa2800;
        margin-bottom: 20px;
      }
      .text {
        line-height: 22px;
      }
    }
  }
}
</style>