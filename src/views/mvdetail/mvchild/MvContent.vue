<template>
  <div class="mvcontent" v-if="Object.keys(mvdetail).length > 0">
    <video :src="mvurl" class="video" controls="controls"></video>
    <div class="name">
      <i class="iconfont">&#xe62c;</i>
      {{ mvdetail.name }}
    </div>
    <div class="tagbox">
      <div
        class="tagitem"
        v-for="(item, index) in mvdetail.videoGroup"
        :key="index"
      >
        {{ "#" + item.name }}
      </div>
    </div>
    <div class="info">
      <div class="time">{{ "发布:" + mvdetail.publishTime }}</div>
      <div class="playcount">播放次数:{{ mvdetail.playCount | playCount }}</div>
    </div>
    <div class="lcs">
      <div class="like">
        <i class="iconfont">&#xe661;</i>
        {{ mvinfo.likedCount }}
      </div>
      <div class="collect">
        <i class="iconfont">&#xe601;</i>
        {{ mvdetail.subCount }}
      </div>
      <div class="share">
        <i class="iconfont">&#xebab;</i>
        {{ mvdetail.shareCount }}
      </div>
    </div>
    <div class="comments">
      <i class="iconfont">&#xe7bf;</i> Comments |
      {{ mvdetail.commentCount }}条评论
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mvdetail: {
      type: Object,
      default() {
        return {};
      },
    },
    mvinfo: {
      type: Object,
      default() {
        return {};
      },
    },
    mvurl: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="less">
.mvcontent {
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