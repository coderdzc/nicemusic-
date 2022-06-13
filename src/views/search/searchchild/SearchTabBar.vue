<template>
  <div class="searchtab">
    <div class="tabtitle">搜索结果</div>
    <div
      class="tablist"
      v-for="(item, index) in listitem"
      :key="index"
      :class="{ active: index === currentIndex }"
      @click="itemclick(index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listitem: ["单曲", "歌手", "专辑", "视频", "歌单"],
      currentIndex: 0,
    };
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index;
      this.$emit("itemclick", index);
    },
  },
};
</script>

<style lang="less">
.active {
  border-bottom: 5px solid #fd9480;
}
.searchtab {
  padding: 50px 0;
  display: flex;
  .tabtitle {
    font-size: 22px;
    color: #4a4a4a;
    font-weight: 700;
    margin-right: 40px;
  }
  .tablist {
    line-height: 20px;
    margin-right: 30px;
    color: #333333;
    cursor: pointer;
  }
}
</style>