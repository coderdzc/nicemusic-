<template>
  <div class="singerdesc">
    <h2 class="title">歌手简介</h2>
    <div class="content">
      {{ desc.briefDesc }}
    </div>
    <div class="checkinfo" v-if="desc.introduction">
      <div class="info" v-for="(item, index) in desc.introduction" :key="index">
        <div class="title">{{ item.ti }}</div>
        <div class="content">{{ item.txt }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    desc: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="less" scoped>
.singerdesc {
  padding-top: 20px;
  text-align: center;
  color: #4a4a4a;
  .title {
    position: relative;
    padding-bottom: 5px;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .title::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 580px;
    width: 40px;
    height: 1.5px;
    background-color: #fa2800;
  }
  .content {
    line-height: 25px;
    margin-bottom: 30px;
    white-space: pre-wrap;
    text-align: left;
  }
}
</style>