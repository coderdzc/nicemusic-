<template>
  <div class="sheetcomment">
    <ThemeBox>
      <div slot="title">精彩评论</div>
      <div slot="content">
        <div class="commentitem" v-for="(item, index) in comments" :key="index">
          <div class="leftbox">
            <img v-lazy="item.user.avatarUrl" alt="" />
          </div>
          <div class="rightbox">
            <div class="topbox">
              <div class="commentname">{{ item.user.nickname }}</div>
              <div class="commenttime">{{ item.timeStr }}</div>
            </div>
            <div class="commenttext">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </ThemeBox>
  </div>
</template>

<script>
import ThemeBox from "components/context/themebox/ThemeBox.vue";
export default {
  components: {
    ThemeBox,
  },
  props: {
    comments: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less">
.commentitem {
  display: flex;
  margin-bottom: 15px;
  .leftbox {
    flex: 13%;
    margin-right: 15px;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .rightbox {
    flex: 80%;
    .topbox {
      display: flex;
      margin-bottom: 15px;
      .commentname {
        margin-right: 15px;
        font-size: 15px;
        color: #000000d9;
      }
      .commenttime {
        font-size: 12px;
        color: #a5a5c1;
        line-height: 17px;
      }
    }
    .commenttext {
      padding: 5px 10px;
      background-color: #f5f5f5;
      border-radius: 3px;
      font-size: 13px;
    }
  }
}
.commentitem:last-child {
  margin-bottom: 0;
}
</style>