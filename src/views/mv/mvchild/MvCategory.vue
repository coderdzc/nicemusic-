<template>
  <div class="mvcategory">
    <div class="location">
      <div
        class="item1"
        v-for="(item, index) in lTitle"
        :key="index"
        :class="{ mvActive: index === currentIndex1 }"
        @click="cate1Click(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="edition">
      <div
        class="item1"
        v-for="(item, index) in eTitle"
        :key="index"
        :class="{ mvActive: index === currentIndex2 }"
        @click="cate2Click(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="hot">
      <div
        class="item1"
        v-for="(item, index) in hTitle"
        :key="index"
        :class="{ mvActive: index === currentIndex3 }"
        @click="cate3Click(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lTitle: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      eTitle: ["全部", "官方版", "现场版", "网易出品"],
      hTitle: ["上升", "最热", "最新"],
      currentIndex1: 0,
      currentIndex2: 0,
      currentIndex3: 0,
    };
  },
  methods: {
    //事件监听
    cate1Click(index) {
      this.currentIndex1 = index;
      this.$emit("cate1Click", index);
    },
    cate2Click(index) {
      this.currentIndex2 = index;
      this.$emit("cate2Click", index);
    },
    cate3Click(index) {
      this.currentIndex3 = index;
      this.$emit("cate3Click", index);
    },
  },
};
</script>

<style lang="less">
.mvActive {
  background-color: #fa2800;
  color: #fff !important;
  font-weight: 700;
}
.mvcategory {
  .location,
  .edition,
  .hot {
    margin-bottom: 20px;
    display: flex;
  }
  .item1 {
    padding: 7px 15px;
    border-radius: 15px;
    margin-right: 6px;
    color: #4a4a4a;
    font-size: 13px;
    cursor: pointer;
  }
}
</style>