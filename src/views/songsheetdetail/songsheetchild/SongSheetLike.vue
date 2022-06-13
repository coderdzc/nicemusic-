<template>
  <div class="sheetlike" v-if="person.length > 1">
    <ThemeBox>
      <div slot="title">喜欢这个歌单的人</div>
      <div slot="content" class="content">
        <div class="userimg" v-for="(item, index) in person" :key="index">
          <img v-lazy="item.avatarUrl" alt="" />
        </div>
      </div>
    </ThemeBox>
  </div>
</template>

<script>
import ThemeBox from "components/context/themebox/ThemeBox.vue";
export default {
  components: {
    ThemeBox,
  },
  props: {
    person: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style  lang="less">
.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .userimg {
    cursor: pointer;
    flex: 11%;
    margin-right: 10px;
    margin-bottom: 10px;
    img {
      width: 100%;
      border-radius: 5px;
    }
  }
  .userimg:nth-child(7n) {
    margin-right: 0;
  }
  .userimg:nth-child(n + 20) {
    margin-bottom: 0;
  }
}
</style>