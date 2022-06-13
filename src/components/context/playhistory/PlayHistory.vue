<template>
  <transition name="el-zoom-in-bottom">
    <div class="playhistory" v-if="isHistoryShow">
      <div class="head">
        <div class="title">播放记录</div>
        <div class="removeall" @click="removeAllHistory">
          <i class="iconfont">&#xe636;</i>
        </div>
      </div>
      <div class="historylist" v-if="historyList">
        <div class="listitem" v-for="(item, index) in historyList" :key="index">
          <div class="index">
            <div class="indexnum">{{ (index + 1) | formatNum }}</div>
            <PlayBtn :item="item" class="playbtn" />
            <PlayAnimate :item="item" class="animate" />
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="remove">
            <i class="iconfont" @click="removeThatHistory(index)">&#xe60e;</i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import PlayBtn from "components/context/playbtn/PlayBtn.vue";
import PlayAnimate from "components/context/playanimate/PlayAnimate.vue";
export default {
  components: {
    PlayBtn,
    PlayAnimate,
  },
  computed: {
    ...mapGetters(["isHistoryShow", "historyList"]),
  },
  methods: {
    ...mapMutations(["removeAllHistory", "removeThatHistory"]),
  },
};
</script>

<style lang="less">
.playhistory {
  width: 354px;
  height: 550px;
  position: absolute;
  bottom: 82px;
  right: 30px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.97);
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  border-radius: 8px;
  .head {
    display: flex;
    justify-content: space-between;
    color: #4a4a4a;
    .title {
      font-size: 16px;
    }
    .removeall {
      cursor: pointer;
      .iconfont {
        line-height: 0px !important;
      }
    }
  }
  .historylist {
    margin-top: 10px;
    height: 90%;
    overflow: auto;
    .listitem {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      .index {
        position: relative;
        margin-right: 20px;
        .animate {
          left: -10px;
          display: none;
        }
      }
      .name {
        flex: 1;
      }
      .remove {
        margin-left: 10px;
        cursor: pointer;
        .iconfont {
          line-height: 0px !important;
        }
      }
    }
    .listitem:hover .playbtn {
      display: block;
      left: 60%;
    }
    .listitem:hover .animate {
      display: none !important;
    }
    .listitem:hover .indexnum {
      opacity: 0;
    }
  }
}
</style>