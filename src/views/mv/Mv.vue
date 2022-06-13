<template>
  <div class="mv w">
    <MvCategory
      @cate1Click="cate1Click"
      @cate2Click="cate2Click"
      @cate3Click="cate3Click"
    />
    <MvBox :mvs="mvs" />
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
import MvCategory from "./mvchild/MvCategory.vue";
import MvBox from "components/context/mv/MvBox.vue";
import { getMv } from "network/mv.js";
export default {
  data() {
    return {
      mvs: [],
      area: "全部",
      type: "全部",
      order: "上升最快",
      limit: 12,
      offset: 0,
    };
  },
  components: {
    MvCategory,
    MvBox,
  },
  created() {
    this.getMv();
  },
  methods: {
    //事件监听
    pagechange(index) {
      this.offset = (index - 1) * 12;
      this.getMv();
    },
    cate1Click(index) {
      switch (index) {
        case 0:
          this.area = "全部";
          break;
        case 1:
          this.area = "内地";
          break;
        case 2:
          this.area = "港台";
          break;
        case 3:
          this.area = "欧美";
          break;
        case 4:
          this.area = "日本";
          break;
        case 5:
          this.area = "韩国";
          break;
        default:
          break;
      }
      this.getMv();
    },
    cate2Click(index) {
      switch (index) {
        case 0:
          this.type = "全部";
          break;
        case 1:
          this.type = "官方版";
          break;
        case 2:
          this.type = "现场版";
          break;
        case 3:
          this.type = "网易出品";
          break;
        default:
          break;
      }
      this.getMv();
    },
    cate3Click(index) {
      switch (index) {
        case 0:
          this.order = "";
          break;
        case 1:
          this.order = "最热";
          break;
        case 2:
          this.order = "最新";
          break;
        default:
          break;
      }
      this.getMv();
    },
    //网络请求
    getMv() {
      getMv(12, this.area, this.type, this.order, this.offset).then((res) => {
        this.mvs = res.data;
      });
    },
  },
};
</script>

<style lang="less">
.mv {
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