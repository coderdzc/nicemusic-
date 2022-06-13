<template>
  <div class="swiperbox" v-if="banners">
    <swiper class="swiper" ref="mySwiper" :options="SwiperOptions">
      <swiper-slide v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" class="swiperImg" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      SwiperOptions: {
        init: false,
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 18,
        loop: true,
        slideClass: "custom-slide-class",
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.$refs.mySwiper.swiper.init();
    }, 200);
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
};
</script>

<style lang="less">
.swiperbox {
  position: relative;
  .swiper {
    height: 143px;
    position: static;
    cursor: grab;
    .custom-slide-class {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
      text-align: center;
      font-weight: bold;
      transition-property: transform;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
  }
  .swiper-pagination {
    bottom: -20px;
    .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
    .swiper-pagination-bullet-active {
      width: 15px;
      background-color: #fa2800;
      border-radius: 15px;
    }
  }
}
</style>