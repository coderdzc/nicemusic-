<template>
  <div class="profileInfo">
    <div class="infobg">
      <img :src="profile.backgroundUrl" alt="" />
      <div class="infobox">
        <div class="infoheadimg">
          <img :src="profile.avatarUrl" alt="" />
        </div>
        <div class="namebox">
          <div class="infoname">{{ profile.nickname }}</div>
          <div class="signinbtn" v-if="!isDailySigin" @click="dailySiginClick">
            签到
          </div>
          <div class="signinedbtn" v-else>已签到</div>
        </div>
        <div class="infomsg">
          <div class="rank infoitem">
            <div class="infocirle"></div>
            <div>
              等级：<i class="ranktext">v{{ rank }}</i>
            </div>
          </div>
          <div class="age infoitem">
            <div class="infocirle"></div>
            <div class="">年龄：{{ profile.birthday | birth }}</div>
          </div>
          <div class="infoitem">
            <div class="infocirle"></div>
            <div class="signa">签名：{{ profile.signature }}</div>
          </div>
          <div class="themenum">
            <div class="themebox">
              <div class="activetext">动态</div>
              <div class="activecount">{{ profile.eventCount }}</div>
            </div>
            <div class="themebox">
              <div class="activetext">关注</div>
              <div class="activecount">{{ profile.follows }}</div>
            </div>
            <div class="themebox">
              <div class="activetext">粉丝</div>
              <div class="activecount">{{ profile.followeds }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setDailySign } from "network/profile.js";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    rank: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    ...mapGetters(["profile", "isDailySigin"]),
  },
  methods: {
    //事件监听
    dailySiginClick() {
      this.setDailySign();
    },
    //网络请求
    setDailySign() {
      setDailySign(1).then((res) => {
        if (res && res.code === 200) {
          this.$message.success("签到成功，经验+2");
          this.setDailyStatus(true);
        }
      });
    },
    ...mapMutations(["setDailyStatus"]),
  },
};
</script>

<style lang="less">
.profileInfo {
  position: relative;
  width: 100%;
  height: 360px;
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  .infobg {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .infobox {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 70%;
    background-color: #fff;
    .infoheadimg {
      position: absolute;
      left: 30px;
      top: -20px;
      img {
        width: 64px;
        height: 64px;
        border-radius: 5px;
      }
    }
    .namebox {
      display: flex;
      margin-top: 10px;
      .infoname {
        padding-left: 100px;
        flex: 1;
        font-size: 16px;
        color: #000;
        font-weight: 700;
      }
      .signinbtn {
        cursor: pointer;
        margin-right: 20px;
        width: 56px;
        height: 25px;
        color: #fff;
        border-radius: 15px;
        text-align: center;
        line-height: 25px;
        background-color: #fa2800;
        font-size: 12px;
      }
      .signinedbtn {
        margin-right: 20px;
        width: 56px;
        height: 25px;
        color: #fff;
        border-radius: 15px;
        text-align: center;
        line-height: 25px;
        background-color: rgba(2, 10, 18, 0.2);
        font-size: 12px;
      }
    }
    .infomsg {
      margin-top: 30px;
      padding: 0 30px 0 30px;
      .infocirle {
        padding-left: 6px;
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #fa2800;
        padding-bottom: 5px;
        margin-right: 10px;
      }
      .infoitem {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        color: #4a4a4a;
        .signa {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .ranktext {
          font-weight: 700;
        }
      }
      .infoitem:nth-child(3) {
        padding-bottom: 20px;
        border-bottom: 0.5px solid #eee;
      }
      .themenum {
        display: flex;
        .themebox {
          text-align: center;
          flex: 1;
          color: #958ebb;
          font-size: 15px;
          .activetext {
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style>