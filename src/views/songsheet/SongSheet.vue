<template>
  <div class="songsheet w">
    <CategoryBar
      :sortTitle="sortTitle"
      :allType="allType"
      @btnClick="btnClick"
      @allClick="allClick"
      @subClick="subClick"
    />
    <SongSheetBox>
      <SongSheetItem
        :songSheet="songSheet"
        slot="itemcontainer"
      ></SongSheetItem>
    </SongSheetBox>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="320"
      @current-change="pagechange"
    >
    </el-pagination>
  </div>
</template>

<script>
import CategoryBar from "components/context/categorybar/CategoryBar.vue";
import SongSheetBox from "components/context/songsheetbox/SongSheetBox.vue";
import SongSheetItem from "components/context/songsheetbox/SongSheetItem.vue";
import {
  getHotSortTitle,
  getSongSheet,
  getAllSheetCategory,
} from "network/category.js";

export default {
  data() {
    return {
      sortTitle: [],
      songSheet: [],
      sheetType: "全部",
      pageOffset: 0,
      allType: {},
    };
  },
  components: {
    CategoryBar,
    SongSheetBox,
    SongSheetItem,
  },
  created() {
    this.getHotSortTitle();
    this.getSongSheet();
    this.getAllSheetCategory();
  },
  methods: {
    //事件监听
    pagechange(index) {
      this.pageOffset = (index - 1) * 40;
      this.getSongSheet();
    },
    btnClick(name) {
      this.sheetType = name;
      this.getSongSheet();
    },
    allClick(name) {
      this.sheetType = name;
      this.getSongSheet();
    },
    subClick(type) {
      this.sheetType = type;
      this.getSongSheet();
    },
    //网络请求
    getHotSortTitle() {
      getHotSortTitle().then((res) => {
        this.sortTitle = res.tags;
      });
    },
    getSongSheet() {
      getSongSheet(this.sheetType, 40, this.pageOffset).then((res) => {
        this.songSheet = res.playlists;
      });
    },
    getAllSheetCategory() {
      getAllSheetCategory().then((res) => {
        this.allType = res;
      });
    },
  },
};
</script>

<style lang="less">
.songsheet {
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