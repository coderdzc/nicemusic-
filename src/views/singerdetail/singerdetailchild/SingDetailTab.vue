<template>
  <div class="singertab">
    <div
      class="tab"
      v-for="(item, index) in title"
      :key="index"
      :class="{ active: index === currentIndex }"
      @click="tabClick(index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ["作品", "专辑", "MV", "歌手详情", "相似歌手"],
      currentIndex: 0,
    };
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style lang="less" scoped>
.singertab {
  display: flex;
  justify-content: center;
  margin: 30px 0;
  .tab {
    cursor: pointer;
    color: #4a4a4a;
    margin-right: 50px;
    font-weight: 700;
  }
  .tab:last-child {
    margin-right: 0;
  }
}
.active {
  color: #fa2800 !important;
}
</style>