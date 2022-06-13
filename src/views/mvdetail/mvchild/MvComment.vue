<template>
  <div class="mvcomment">
    <div class="hottitle" v-if="hotComments.length > 0">精彩评论</div>
    <div class="hotcontainer">
      <div
        class="commentitem"
        v-for="(item, index) in hotComments"
        :key="index"
      >
        <div class="leftitem">
          <div class="headimg">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
        </div>
        <div class="rightitem">
          <div class="info">
            <div class="userinfo">
              <div class="username">{{ item.user.nickname }}</div>
              <div class="time">{{ item.timeStr }}</div>
            </div>
            <div class="commentinfo">
              <div class="likecount">
                <i class="iconfont" @click="likeClick(item.commentId)"
                  >&#xec7f;</i
                >&nbsp;
                {{ "(" + item.likedCount + ")" }}
              </div>
              <div class="comment">
                <i class="iconfont" @click="commentClick(item.commentId)"
                  >&#xe7bf;</i
                >
              </div>
            </div>
          </div>
          <div class="text">{{ item.content }}</div>
          <CommentBox
            v-if="currentCommentId === item.commentId"
            @cancelComment="cancelComment"
          />
        </div>
      </div>
    </div>
    <div class="newtitle">最新评论</div>
    <div class="commentitem" v-for="(item, index) in newComments" :key="index">
      <div class="leftitem">
        <div class="headimg">
          <img :src="item.user.avatarUrl" alt="" />
        </div>
      </div>
      <div class="rightitem">
        <div class="info">
          <div class="userinfo">
            <div class="username">{{ item.user.nickname }}</div>
            <div class="time">{{ item.timeStr }}</div>
          </div>
          <div class="commentinfo">
            <div class="likecount">
              <i class="iconfont" @click="likeClick(item.commentId)">&#xec7f;</i
              >&nbsp;
              {{ "(" + item.likedCount + ")" }}
            </div>
            <div class="comment">
              <i class="iconfont" @click="commentClick(item.commentId)"
                >&#xe7bf;</i
              >
            </div>
          </div>
        </div>
        <div class="text">{{ item.content }}</div>
        <CommentBox
          v-if="currentCommentId === item.commentId"
          @cancelComment="cancelComment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CommentBox from "components/context/commentbox/CommentBox.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentCommentId: "",
    };
  },
  computed: {
    ...mapState(["profile"]),
  },
  components: {
    CommentBox,
  },
  props: {
    hotComments: {
      type: Array,
      default() {
        return [];
      },
    },
    newComments: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    likeClick(cid) {
      this.$emit("likeClick", cid);
    },
    commentClick(cid) {
      if (Object.keys(this.profile).length === 0) {
        this.$message.error("请先登录再评论");
      } else {
        this.currentCommentId = cid;
      }
    },
    cancelComment() {
      this.currentCommentId = "";
    },
  },
};
</script>

<style lang="less">
.mvcomment {
  margin-top: 30px;
  .hottitle,
  .newtitle {
    font-size: 16px;
    color: #000;
    margin-bottom: 30px;
  }
  .commentitem {
    display: flex;
    margin-bottom: 20px;
    .leftitem {
      margin-right: 10px;
      .headimg {
        width: 45px;
        height: 45px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .rightitem {
      flex: 1;
      .info {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        .userinfo {
          display: flex;
          .username {
            margin-right: 10px;
            color: #4a4a4a;
          }
          .time {
            color: #a5a5c1;
            font-size: 12px;
            line-height: 18px;
          }
        }
        .commentinfo {
          display: flex;
          .likecount {
            padding-right: 10px;
            border-right: 1px solid #666;
            margin-right: 10px;
            .iconfont {
              cursor: pointer;
              line-height: 0;
            }
          }
          .comment {
            .iconfont {
              cursor: pointer;
              line-height: 0;
            }
          }
        }
      }
      .text {
        padding: 10px;
        background-color: #f5f5f5;
        width: 100%;
        font-size: 12px;
        color: #4a4a4a;
      }
    }
  }
}
</style>