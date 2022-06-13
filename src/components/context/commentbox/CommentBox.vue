<template>
  <div class="commentbox">
    <div class="commentboxtop">
      <div class="usergreet">
        <div class="icon"><i class="iconfont icon-gerenzhongxinhui"></i></div>
        <div class="greet">{{ profile.nickname }}，你好</div>
      </div>
      <div class="cancelcomment" @click="cancelComment">取消回复</div>
    </div>
    <div class="commentcontainer">
      <div class="commentuserhead">
        <img :src="profile.avatarUrl" alt="" />
      </div>
      <textarea
        name="comment"
        class="commentarea"
        cols="50"
        rows="5"
        placeholder="你想说什么呀？"
        v-model="commentText"
      ></textarea>
    </div>
    <div class="submit">
      <div></div>
      <div class="submitbtn">评论</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      commentText: "",
    };
  },
  computed: {
    ...mapState(["profile"]),
  },
  methods: {
    cancelComment() {
      this.$emit("cancelComment");
    },
  },
};
</script>

<style lang="less">
.commentbox {
  margin-top: 20px;
  color: #4a4a4a;
  margin-bottom: 15px;
  .commentboxtop {
    display: flex;
    justify-content: space-between;
    .usergreet {
      display: flex;
      .icon {
        margin-right: 10px;
      }
    }
    .cancelcomment {
      color: #d9dfff;
      font-size: 12px;
      background: none;
      padding: 6px 10px;
      border-radius: 2px;
      border: 1px solid #dee3ff;
      cursor: pointer;
    }
  }

  .commentcontainer {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    .commentuserhead {
      width: 50px;
      height: 50px;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }
    .commentarea {
      flex: 1;
      resize: none;
      border-radius: 3px;
      outline: none;
      padding: 10px;
      border: 1px solid #eaebff;
      background: #f8f9ff;
      height: 80px !important;
      font-style: 13px;
      color: #666;
    }
  }
  .submit {
    display: flex;
    justify-content: space-between;
    .submitbtn {
      padding: 10px 25px;
      background: linear-gradient(to right, #ff4b2b, #ff416c);
      color: #fff;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
    }
  }
}
</style>