<template>
  <div class="video w">
    <VideoCategory
      :sortTitle="sortTitle"
      :allType="allType"
      @btnClick="btnClick"
      @allClick="allClick"
      @subClick="subClick"
    />
    <VideoItem :videos="videos" />
    <Paginate
      @nextPageClick="nextPageClick"
      :offset="offset"
      @prePageClick="prePageClick"
    />
  </div>
</template>

<script>
import VideoCategory from "./videochild/VideoCategory.vue";
import VideoItem from "components/context/videoitem/VideoItem.vue";
import Paginate from "components/common/paginate/Paginate.vue";
import {
  getSortTitle,
  getAllSort,
  getAllVideo,
  getTypeVideo,
} from "network/video.js";
import { mapGetters } from "vuex";
export default {
  name: "Video",
  data() {
    return {
      sortTitle: [],
      allType: [],
      currentTypeId: 0,
      videos: [],
      offset: 0,
      isAll: true,
    };
  },
  computed: {
    ...mapGetters(["profile"]),
  },
  components: {
    VideoCategory,
    VideoItem,
    Paginate,
  },
  created() {
    if (Object.keys(this.profile).length == 0) {
      this.$message({
        message: "请先登录",
        type: "warning",
      });
      this.$router.push("/");
      this.$router.push("/login");
    } else {
      this.getSortTitle();
      this.getAllSort();
      this.getAllVideo();
    }
  },
  methods: {
    //事件监听
    btnClick(id) {
      this.currentTypeId = id;
      this.getTypeVideo();
    },
    allClick() {
      this.getAllVideo();
    },
    subClick(id) {
      this.currentTypeId = id;
      this.getTypeVideo();
    },
    nextPageClick() {
      this.offset = this.offset + 1;
      if (this.isAll) {
        console.log(this.offset);
        this.getAllVideo();
      } else {
        this.getTypeVideo();
      }
    },
    prePageClick() {
      if (this.offset !== 0) {
        this.offset = this.offset - 1;
        if (this.isAll) {
          console.log(this.offset);
          this.getAllVideo();
        } else {
          this.getTypeVideo();
        }
      }
    },
    //网络请求
    getSortTitle() {
      getSortTitle().then((res) => {
        this.sortTitle = res.data;
      });
    },
    getAllSort() {
      getAllSort().then((res) => {
        this.allType = res.data;
      });
    },
    getAllVideo() {
      this.isAll = true;
      getAllVideo(this.offset).then((res) => {
        if (res) {
          this.videos = [];
          for (const item of res.datas) {
            this.videos.push(item.data);
          }
        }
      });
    },
    getTypeVideo() {
      this.isAll = false;
      getTypeVideo(this.currentTypeId, this.offset).then((res) => {
        if (res) {
          this.videos = [];
          for (const item of res.datas) {
            this.videos.push(item.data);
          }
        }
      });
    },
  },
};
</script>

<style lang="less">
.video {
  padding-top: 100px;
}
</style>