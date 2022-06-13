<template>
  <div class="wrapper" ref="wrapper">
    <div class="context">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      Scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.Scroll = new Bscroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      observeDOM: true,
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.Scroll && this.Scroll.scrollTo(x, y, time);
      //当scroll创建实例完成之后，有了实例才会执行scrollTo
    },
    refresh() {
      this.Scroll && this.Scroll.refresh();
      //当scroll创建实例完成之后，有了实例才会执行refresh
    },
    scrollToElement(el, time) {
      this.Scroll && this.Scroll.scrollToElement(el, time);
    },
  },
};
</script>

<style scoped lang="less">
</style>