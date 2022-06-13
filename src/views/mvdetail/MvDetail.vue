<template>
  <div class="mvdetail w">
    <div class="leftbox">
      <MvContent :mvdetail="mvdetail" :mvinfo="mvinfo" :mvurl="mvurl" />
      <CommentBox v-if="Object.keys(profile).length > 0" />
      <MvComment
        :hotComments="hotComments"
        :newComments="newComments"
        @likeClick="likeClick"
      />
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100"
        @current-change="pagechange"
      >
      </el-pagination>
    </div>
    <div class="rightbox">
      <div class="mvdesc" v-if="mvdesc">
        <div class="title">视频简介</div>
        <div class="text">{{ mvdesc }}</div>
      </div>
      <MvRelate :relates="relates" @enterDetail="enterDetail" />
    </div>
    <GoTop />
  </div>
</template>

<script>
import MvContent from "./mvchild/MvContent.vue";
import MvComment from "./mvchild/MvComment.vue";
import MvRelate from "./mvchild/MvRelate.vue";
import GoTop from "components/common/gotop/GoTop.vue";
import CommentBox from "components/context/commentbox/CommentBox.vue";
import {
  getMvDetail,
  getMvInfo,
  getMvUrl,
  getMvComment,
  getMvRelate,
  setCommentLike,
} from "network/mvdetail.js";
import { mapState } from "vuex";
export default {
  name: "MvDetail",
  data() {
    return {
      mvdetail: {},
      mvdesc: "",
      mvinfo: {},
      mvurl: "",
      offset: 0,
      newComments: [],
      hotComments: [],
      relates: [],
      cid: "",
      type: 1,
      t: 1,
    };
  },
  components: {
    MvContent,
    MvComment,
    MvRelate,
    GoTop,
    CommentBox,
  },
  created() {
    this.getMvDetail();
    this.getMvInfo();
    this.getMvUrl();
    this.getMvComment();
    this.getMvRelate();
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
  computed: {
    ...mapState(["profile"]),
  },
  methods: {
    //事件监听
    pagechange(index) {
      this.offset = (index - 1) * 20;
      this.getMvComment();
    },
    enterDetail(id) {
      this.$router.push({
        path: "/mvdetail",
        query: {
          id,
        },
      });
      this.getMvDetail();
      this.getMvInfo();
      this.getMvUrl();
      this.getMvComment();
      this.getMvRelate();
    },
    likeClick(cid) {
      console.log(cid);
      if (Object.keys(this.profile).length === 0) {
        this.$message.error("请先登录");
      } else {
        this.cid = cid;
        this.setCommentLike();
      }
    },
    //网络请求
    getMvDetail() {
      getMvDetail(this.$route.query.id).then((res) => {
        this.mvdetail = res.data;
        this.mvdesc = res.data.desc;
      });
    },
    getMvInfo() {
      getMvInfo(this.$route.query.id).then((res) => {
        this.mvinfo = res;
      });
    },
    getMvUrl() {
      getMvUrl(this.$route.query.id).then((res) => {
        this.mvurl = res.data.url;
      });
    },
    getMvComment() {
      getMvComment(this.$route.query.id, this.offset).then((res) => {
        this.hotComments = res.hotComments;
        this.newComments = res.comments;
      });
    },
    getMvRelate() {
      getMvRelate(this.$route.query.id).then((res) => {
        this.relates = res.mvs;
      });
    },
    setCommentLike() {
      let timestamp = new Date().getTime();
      setCommentLike(
        this.$route.query.id,
        this.cid,
        this.t,
        this.type,
        timestamp
      ).then((res) => {
        console.log(res);
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
.mvdetail {
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
    .mvdesc {
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