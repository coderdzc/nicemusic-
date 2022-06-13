<template>
  <transition name="el-fade-in-linear">
    <div class="slidebar" v-show="isSlide">
      <div class="categories"><slot name="categories"></slot></div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isSlide: false,
    };
  },
};
</script>

<style lang="less">
.slidebar {
  padding: 10px 15px !important;
  text-align: left;
  left: 0;
  bottom: -410px;
  position: absolute;
  width: 720px;
  height: 400px;
  z-index: 999;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  overflow: auto;
}
</style>