<template>
  <div class="singercategory">
    <div class="language">
      <div
        class="item1"
        v-for="(item, index) in lTitle"
        :key="index"
        :class="{ singerActive: index === currentIndex1 }"
        @click="cate1Click(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="male">
      <div
        class="item1"
        v-for="(item, index) in mTitle"
        :key="index"
        :class="{ singerActive: index === currentIndex2 }"
        @click="cate2Click(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="firstword">
      <div
        class="item2"
        v-for="(item, index) in fTitle"
        :key="index"
        :class="{ singerActive: index === currentIndex3 }"
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
      lTitle: ["全部", "华语", "欧美", "日本", "韩国", "其他"],
      mTitle: ["全部", "男歌手", "女歌手", "乐队"],
      fTitle: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "其他",
      ],
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
.singerActive {
  background-color: #fa2800;
  color: #fff !important;
  font-weight: 700;
}
.singercategory {
  .language {
    margin-bottom: 20px;
    display: flex;
  }
  .male {
    margin-bottom: 20px;
    display: flex;
  }
  .firstword {
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
  .item2 {
    width: 28px;
    height: 28px;
    line-height: 28px;
    font-size: 13px;
    text-align: center;
    border-radius: 50%;
    margin-right: 6px;
    color: #4a4a4a;
    cursor: pointer;
  }
  .item2:last-child,
  .item2:first-child {
    padding: 7px 15px;
    width: auto;
    height: auto;
    line-height: 13px;
    border-radius: 15px;
    color: #4a4a4a;
    font-size: 13px;
  }
}
</style>