<template>
  <div class="videocategory">
    <div class="leftbtn" @click="slideClick">
      <div class="sort">{{ headTitle }}</div>
      <div class="icon"></div>
    </div>
    <div class="centerbar">
      <div class="hot">热门标签:</div>
      <div
        class="sortbtn"
        v-for="(item, index) in sortTitle"
        :key="index"
        @click="btnClick(item.name, item.id)"
        :class="{ btnActive: headTitle === item.name }"
      >
        {{ item.name }}
      </div>
    </div>
    <div
      class="rightbtn"
      :class="{ allActive: headTitle === '全部' }"
      @click="allClick"
    >
      全部
    </div>
    <slot name="slidebar">
      <SlideBar ref="slideBar">
        <div slot="categories" class="contextbox">
          <SlideItem
            :subs="subs"
            @subClick="subClick"
            :headTitle="headTitle"
          ></SlideItem>
        </div>
      </SlideBar>
    </slot>
  </div>
</template>

<script>
import SlideBar from "components/context/categorybar/SlideBar.vue";
import SlideItem from "components/context/categorybar/SlideItem.vue";
export default {
  data() {
    return {
      headTitle: "全部",
      subs: [],
      alltype: [],
    };
  },
  components: {
    SlideBar,
    SlideItem,
  },
  computed: {
    isAll() {
      return this.headTitle === "全部" ? true : false;
    },
  },
  props: {
    sortTitle: {
      type: Array,
      default() {
        return [];
      },
    },
    allType: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  watch: {
    allType() {
      if (this.allType.length > 0) {
        for (const type of this.allType) {
          this.subs.push(type.name);
          this.alltype.push({
            name: type.name,
            id: type.id,
          });
        }
      }
    },
  },
  methods: {
    btnClick(name, id) {
      this.headTitle = name;
      this.$emit("btnClick", id);
    },
    allClick() {
      this.headTitle = "全部";
      this.$emit("allClick", "全部");
    },
    slideClick() {
      this.$refs.slideBar.isSlide = !this.$refs.slideBar.isSlide;
    },
    subClick(type) {
      this.currentIndex = -1;
      this.headTitle = type;
      let thatType = this.alltype.find((item) => item.name == type);
      this.$emit("subClick", thatType.id);
    },
  },
};
</script>

<style lang="less" scoped>
.videocategory {
  position: relative;
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  border-radius: 8px;
  color: #4a4a4a;
  margin-bottom: 20px;
  .leftbtn {
    cursor: pointer;
    text-align: left;
    display: flex;
    color: #fff;
    background-color: #fa2800;
    border-radius: 8px;
    .sort {
      padding-left: 20px;
      flex-shrink: 0;
    }
    .icon {
      font-family: "icomoon";
      font-size: 18px;
      padding-right: 15px;
    }
  }
  .centerbar {
    display: flex;
    flex: 88%;
    padding-left: 15px;
    background-color: #fff;
    .hot {
      margin-right: 15px;
    }
    .sortbtn {
      margin-right: 15px;
      cursor: pointer;
    }
    .sortbtn:hover {
      color: #fa2800;
    }
  }
  .rightbtn {
    border-radius: 4px;
    background-color: #f7f7f7;
    line-height: 30px;
    color: #4a4a4a;
    margin: 5px 20px;
    cursor: pointer;
    font-size: 12px;
    flex: 4%;
  }
}
.allActive {
  color: #fff !important;
  background-color: #fa2800 !important;
}
.btnActive {
  color: #fa2800;
}
</style>