<template>
  <div class="categorybar">
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
        @click="btnClick(item.name)"
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
          <SlideItem :subs="subs[0]" @subClick="subClick" :headTitle="headTitle"
            ><div class="title" slot="title"> 语种</div></SlideItem
          >
          <SlideItem :subs="subs[1]" @subClick="subClick" :headTitle="headTitle"
            ><div class="title" slot="title"> 风格</div></SlideItem
          >
          <SlideItem :subs="subs[2]" @subClick="subClick" :headTitle="headTitle"
            ><div class="title" slot="title"> 场景</div></SlideItem
          >
          <SlideItem :subs="subs[3]" @subClick="subClick" :headTitle="headTitle"
            ><div class="title" slot="title"> 情感</div></SlideItem
          >
          <SlideItem :subs="subs[4]" @subClick="subClick" :headTitle="headTitle"
            ><div class="title" slot="title"> 主题</div></SlideItem
          >
        </div>
      </SlideBar>
    </slot>
  </div>
</template>

<script>
import SlideBar from "./SlideBar.vue";
import SlideItem from "./SlideItem.vue";
export default {
  data() {
    return {
      headTitle: "全部",
      subs: [],
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
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    allType() {
      if (Object.keys(this.allType) !== 0) {
        for (const type in this.allType.categories) {
          let arr = [];
          for (const sub of this.allType.sub) {
            if (sub.category == type) {
              arr.push(sub.name);
            }
          }
          this.subs.push(arr);
        }
      }
    },
  },
  methods: {
    btnClick(name) {
      this.headTitle = name;
      this.$emit("btnClick", name);
    },
    allClick() {
      this.headTitle = "全部";
      this.$emit("allClick", "全部");
    },
    slideClick() {
      this.$refs.slideBar.isSlide = !this.$refs.slideBar.isSlide;
    },
    subClick(type) {
      this.headTitle = type;
      this.$emit("subClick", type);
    },
  },
};
</script>

<style lang="less" scoped>
.categorybar {
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