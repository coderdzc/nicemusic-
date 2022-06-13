<template>
  <div class="videocontent" v-if="Object.keys(videodetail).length > 0">
    <video :src="videourl" class="video" controls="controls"></video>
    <div class="name">
      {{ videodetail.title || videodetail.description }}
    </div>
    <div class="tagbox">
      <div
        class="tagitem"
        v-for="(item, index) in videodetail.videoGroup"
        :key="index"
      >
        {{ "#" + item.name }}
      </div>
    </div>
    <div class="info">
      <div class="time">
        发布:{{ videodetail.publishTime | filterformatDate }}
      </div>
      <div class="playcount">
        播放次数:{{ videodetail.playTime | playCount }}
      </div>
    </div>
    <div class="lcs">
      <div class="like">
        <i class="iconfont">&#xe661;</i>
        {{ videoinfo.likedCount }}
      </div>
      <div class="collect">
        <i class="iconfont">&#xe601;</i>
        {{ videodetail.subscribeCount }}
      </div>
      <div class="share">
        <i class="iconfont">&#xebab;</i>
        {{ videodetail.shareCount }}
      </div>
    </div>
    <div class="comments">
      <i class="iconfont">&#xe7bf;</i> Comments |
      {{ videodetail.commentCount }}条评论
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videodetail: {
      type: Object,
      default() {
        return {};
      },
    },
    videoinfo: {
      type: Object,
      default() {
        return {};
      },
    },
    videourl: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="less">
.videocontent {
  .video {
    width: 100%;
    height: 450px;
  }
  .name {
    margin: 15px 0px 20px;
    font-size: 16px;
    color: #000;
    .iconfont {
      line-height: 0;
      color: #fa2800;
      font-size: 18px;
    }
  }
  .tagbox {
    display: flex;
    margin-bottom: 15px;
    .tagitem {
      color: #fa2800;
      font-size: 12px;
      margin-right: 8px;
    }
  }
  .info {
    display: flex;
    margin-bottom: 15px;
    font-size: 12px;
    color: #999;
    .time {
      margin-right: 30px;
    }
  }
  .lcs {
    display: flex;
    margin-bottom: 40px;
    div {
      cursor: pointer;
      margin-right: 20px;
      padding: 10px 20px;
      background-color: #f2f2f2;
      color: #000;
      border-radius: 15px;
      .iconfont {
        line-height: 0;
      }
    }
  }
  .comments {
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    color: #4a4a4a;
    .iconfont {
      line-height: 0;
    }
  }
}
</style>