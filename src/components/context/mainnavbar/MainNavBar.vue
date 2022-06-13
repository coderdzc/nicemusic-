<template>
  <div class="mainnav">
    <NavBar>
      <div slot="left" class="left" @click="logoClick"></div>
      <div slot="center" class="center">
        <router-link to="/home" tag="a" class="navitem">发现音乐</router-link>
        <router-link to="/rank" tag="a" class="navitem">排行榜</router-link>
        <router-link to="/songsheet" tag="a" class="navitem">歌单</router-link>
        <router-link to="/singer" tag="a" class="navitem">歌手</router-link>
        <router-link to="/video" tag="a" class="navitem">视频</router-link>
        <router-link to="/mv" tag="a" class="navitem">MV</router-link>
        <div class="navitem gitee">
          <a href="https://gitee.com/deng-zhongchang">GITEE</a>
        </div>
      </div>
      <div slot="right" class="right">
        <div class="navitem search" @click="searchClick"></div>
        <div class="login" v-if="!isLogin">
          <router-link to="/login" class="navitem">登录</router-link>
        </div>
        <div class="profile" v-if="isLogin">
          <div class="headimg">
            <img :src="profile.avatarUrl" alt="" />
          </div>
          <div class="username">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                {{ profile.nickname
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="iconfont icon-gerenzhongxinhui"
                  command="enterProfile"
                  >个人主页</el-dropdown-item
                >
                <el-dropdown-item icon="iconfont icon-tuichu" command="quit"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </NavBar>
    <SearchBox
      v-if="isShowSearch"
      @closeBox="closeBox"
      @entersearch="entersearch"
    />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import SearchBox from "components/common/searchbox/SearchBox.vue";
import { mapGetters, mapMutations } from "vuex";
import { quitLogin } from "network/login.js";
export default {
  data() {
    return {
      isShowSearch: false,
    };
  },
  components: {
    NavBar,
    SearchBox,
  },
  computed: {
    ...mapGetters(["isLogin", "profile"]),
  },
  methods: {
    logoClick() {
      this.$router.push("/home");
    },
    searchClick() {
      this.isShowSearch = true;
    },
    closeBox() {
      this.isShowSearch = false;
    },
    entersearch() {
      this.isShowSearch = false;
    },
    handleCommand(command) {
      if (command === "quit") {
        this.quitLogin();
        quitLogin();
        this.$router.push("/login");
      } else if (command === "enterProfile") {
        this.$router.push("/profile");
        console.log(111);
      }
    },
    ...mapMutations(["quitLogin"]),
  },
};
</script>

<style lang="less" scoped>
.el-dropdown-menu {
  padding: 10px 0;
}
.el-dropdown-menu__item {
  padding: 0 15px;
  line-height: 36px;
  text-align: center;
}
.el-dropdown-menu__item:hover {
  background-color: rgba(255, 0, 0, 0.5) !important;
  color: #fff !important;
}
.el-popper {
  top: 40px !important;
}
.mainnav {
  line-height: 64px;
  .left {
    width: 146px;
    margin-right: 30px;
    background: url("~assets/img/logo.png") no-repeat;
    background-position: 0 center;
    background-size: 146px 26px;
    cursor: pointer;
  }
  .center {
    flex: 1;
    display: flex;
    .router-link-active {
      color: #fa2800;
    }
    .gitee {
      a:hover {
        color: #fa2800;
      }
    }
  }
  .navitem {
    padding: 0 15px;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .navitem:hover {
    color: #fa2800;
  }
  .right {
    display: flex;
    .search {
      position: relative;
      font-family: "icomoon";
      cursor: pointer;
      font-size: 16px;
      color: #161e27;
    }
    .search:hover {
      color: #161e27;
    }
    .search::after {
      content: "";
      position: absolute;
      top: 20px;
      right: 0px;
      width: 0.5px;
      height: 25px;
      background-color: #ddd;
    }
    .profile {
      display: flex;
      margin-left: 15px;
      .headimg {
        width: 40px;
        height: 40px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        margin-right: 15px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>