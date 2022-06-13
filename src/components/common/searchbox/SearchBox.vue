<template>
  <div class="searchbox">
    <div class="container">
      <div class="topbox">
        <div class="mask">
          <div class="search">
            <el-input
              v-model="input"
              placeholder="请输入搜索关键词并按回车键..."
              @change="searchKeyUp"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="bottombox">
        <div class="historysearch" v-if="history.length > 0">
          <div class="topcontent">
            <div class="stitle"><i class="iconfont">&#xe61d;</i> 历史搜索</div>
            <div class="clearbtn" @click="clearHistory">清空</div>
          </div>
          <div class="historylist">
            <div
              class="historyitem"
              v-for="(item, index) in history"
              :key="index"
              @click="historyClick(item)"
            >
              {{ item }}
              <i class="iconfont" @click.stop="removeHistory(index)">
                &#xe60e;
              </i>
            </div>
          </div>
        </div>
        <div class="hotsearch">
          <div class="stitle"><i class="iconfont">&#xe647;</i> 热门搜索</div>
          <div class="hotlist">
            <div
              class="hotitem"
              v-for="(item, index) in hotlist"
              :key="index"
              @click="hotClick(item.first)"
            >
              {{ item.first }}
            </div>
          </div>
        </div>
      </div>
      <div class="closebtn" @click="closeBox">
        <i class="iconfont"> &#xe60e; </i>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotSearch } from "network/home.js";
import { getHistory } from "common/localhistory.js";
export default {
  data() {
    return {
      input: "",
      hotlist: [],
      history: [],
    };
  },
  created() {
    this.getHotSearch();
    this.history = getHistory();
  },
  methods: {
    //事件监听
    closeBox() {
      this.$emit("closeBox");
    },
    searchKeyUp() {
      if (this.input !== "" || this.input !== " ") {
        this.$emit("entersearch");
        this.history.push(this.input);
        localStorage.setItem("history", JSON.stringify(this.history));
        this.$router.push({
          path: "/search",
          query: {
            keywords: this.input,
          },
        });
      }
    },
    clearHistory() {
      localStorage.removeItem("history");
      this.history = getHistory();
    },
    removeHistory(index) {
      this.history.splice(index, 1);
      localStorage.setItem("history", JSON.stringify(this.history));
    },
    hotClick(hotitem) {
      this.history.push(hotitem);
      localStorage.setItem("history", JSON.stringify(this.history));
      this.$router.push({
        path: "/search",
        query: {
          keywords: hotitem,
        },
      });
      this.$emit("entersearch");
    },
    historyClick(historyitem) {
      this.$router.push({
        path: "/search",
        query: {
          keywords: historyitem,
        },
      });
      this.$emit("entersearch");
    },
    //网络请求
    getHotSearch() {
      getHotSearch().then((res) => {
        this.hotlist = res.result.hots;
      });
    },
  },
};
</script>

<style lang="less">
.searchbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  backdrop-filter: blur(10px);
  background: rgba(120, 129, 147, 0.22);
  .container {
    position: fixed;
    width: 790px;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    .topbox {
      position: relative;
      background-image: url("~assets/img/personal.jpg");
      background-position: center;
      background-size: cover;
      width: 100%;
      height: 225px;
      border-radius: 10px 10px 0 0;
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        backdrop-filter: blur(3px);
        background-color: rgba(100, 0, 0, 0.3);
        border-radius: 10px 10px 0 0;
        .search {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          .el-input__inner {
            background-color: rgba(255, 255, 255, 0.1);
            color: #fff;
            font-size: 14px;
            padding-left: 35%;
          }
          .el-input__inner:focus {
            border-color: #ccc;
            outline: none;
          }
        }
      }
    }
    .bottombox {
      width: 100%;
      height: 55%;
      padding: 30px 40px;
      color: #4a4a4a;
      .historysearch {
        height: 50%;
        line-height: 14px;
        margin-bottom: 40px;
        .topcontent {
          display: flex;
          justify-content: space-between;
          .stitle {
            margin-bottom: 25px;
            .iconfont {
              line-height: 0;
              color: #fa2800;
            }
          }
          .clearbtn {
            font-size: 13px;
            color: #fa2800;
            cursor: pointer;
          }
        }
        .historylist {
          display: flex;
          .historyitem {
            padding: 5px 10px;
            background-color: #f4f4f5;
            margin-right: 6px;
            font-size: 12px;
            cursor: pointer;

            .iconfont {
              line-height: 0;
              background-color: #666;
              font-size: 12px;
              border-radius: 50%;
              color: #fff;
              -webkit-font-smoothing: antialiased;
              -webkit-text-stroke-width: 0.01px;
              -moz-osx-font-smoothing: grayscale;
              cursor: pointer;
            }
          }
        }
      }
      .hotsearch {
        height: 50%;
        line-height: 14px;
        .stitle {
          margin-bottom: 25px;
          .iconfont {
            line-height: 0;
            color: #fa2800;
          }
        }
        .hotlist {
          display: flex;
          flex-wrap: wrap;
          .hotitem {
            cursor: pointer;
            padding: 5px 10px;
            background-color: #f4f4f5;
            margin-right: 6px;
            font-size: 12px;
            margin-bottom: 10px;
          }
        }
      }
    }
    .closebtn {
      cursor: pointer;
      text-align: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
      bottom: -45px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(255, 255, 255, 0.8);
      line-height: 30px;
      .iconfont {
        line-height: 30px;
        color: #ccc;
      }
    }
  }
}
</style>