<template>
  <div class="gotop" v-show="isShow" @click="goTopClick">
    <img src="~assets/img/gotop.png" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollIng);
  },
  methods: {
    scrollIng() {
      this.isShow = window.pageYOffset > 700 ? true : false;
    },
    goTopClick() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped lang="less">
.gotop {
  cursor: pointer;
  width: 50px;
  height: 50px;
  position: fixed;
  right: 100px;
  bottom: 100px;
  z-index: 9999;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>