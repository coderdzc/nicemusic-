<template>
  <div class="singer w">
    <SingerCategory
      @cate1Click="cate1Click"
      @cate2Click="cate2Click"
      @cate3Click="cate3Click"
    />
    <SingerItem :Singer="Singer" />
    <el-pagination
      background
      layout="prev, pager, next"
      :total="100"
      @current-change="pagechange"
    >
    </el-pagination>
  </div>
</template>

<script>
import SingerCategory from "./singerchild/SingerCategory.vue";
import SingerItem from "components/context/singerbox/SingerItem.vue";
import { getSinger } from "network/singer.js";
export default {
  data() {
    return {
      Singer: [],
      type: -1,
      area: -1,
      initail: -1,
      offset: 0,
    };
  },
  components: {
    SingerCategory,
    SingerItem,
  },
  created() {
    this.getSinger();
  },
  methods: {
    //事件监听
    pagechange(index) {
      this.offset = (index - 1) * 50;
      this.getSinger();
    },
    cate1Click(index) {
      switch (index) {
        case 0:
          this.area = -1;
          break;
        case 1:
          this.area = 7;
          break;
        case 2:
          this.area = 96;
          break;
        case 3:
          this.area = 8;
          break;
        case 4:
          this.area = 16;
          break;
        case 5:
          this.area = 0;
        default:
          break;
      }
      this.getSinger();
    },
    cate2Click(index) {
      switch (index) {
        case 0:
          this.type = -1;
          break;
        case 1:
          this.type = 1;
          break;
        case 2:
          this.type = 2;
          break;
        case 3:
          this.type = 3;
          break;
        default:
          break;
      }
      this.getSinger();
    },
    cate3Click(index) {
      switch (index) {
        case 0:
          this.initail = -1;
          break;
        case 1:
          this.initail = "a";
          break;
        case 2:
          this.initail = "b";
          break;
        case 3:
          this.initail = "c";
          break;
        case 4:
          this.initail = "d";
          break;
        case 5:
          this.initail = "e";
          break;
        case 6:
          this.initail = "f";
          break;
        case 7:
          this.initail = "g";
          break;
        case 8:
          this.initail = "h";
          break;
        case 9:
          this.initail = "i";
          break;
        case 10:
          this.initail = "j";
          break;
        case 11:
          this.initail = "k";
          break;
        case 12:
          this.initail = "l";
          break;
        case 13:
          this.initail = "m";
          break;
        case 14:
          this.initail = "n";
          break;
        case 15:
          this.initail = "o";
          break;
        case 16:
          this.initail = "p";
          break;
        case 17:
          this.initail = "q";
          break;
        case 18:
          this.initail = "r";
          break;
        case 19:
          this.initail = "s";
          break;
        case 20:
          this.initail = "t";
          break;
        case 21:
          this.initail = "u";
          break;
        case 22:
          this.initail = "v";
          break;
        case 23:
          this.initail = "w";
          break;
        case 24:
          this.initail = "x";
          break;
        case 25:
          this.initail = "y";
          break;
        case 26:
          this.initail = "z";
          break;
        case 27:
          this.initail = 0;
          break;
        default:
          break;
      }
      this.getSinger();
    },
    //网络请求
    getSinger() {
      getSinger(50, this.type, this.area, this.initail, this.offset).then(
        (res) => {
          this.Singer = res.artists;
        }
      );
    },
  },
};
</script>

<style lang="less">
.singer {
  padding-top: 100px;
}
.el-pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #fa2800;
}
</style>