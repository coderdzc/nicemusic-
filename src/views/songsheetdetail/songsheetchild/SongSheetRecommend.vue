<template>
  <div class="sheetrecommend">
    <ThemeBox>
      <div slot="title">相关推荐</div>
      <div slot="content">
        <div
          class="ralateitem"
          v-for="(item, index) in relate"
          :key="index"
          @click="itemClick(item.id)"
        >
          <div class="leftbox">
            <img v-lazy="item.coverImgUrl" alt="" />
          </div>
          <div class="rightbox">
            <div class="relatename">{{ item.name }}</div>
            <div class="relateperson">{{ "By " + item.creator.nickname }}</div>
          </div>
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
    relate: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(id) {
      this.$emit("itemClick", id);
    },
  },
};
</script>

<style lang="less">
.ralateitem {
  display: flex;
  margin-bottom: 15px;
  cursor: pointer;
  .leftbox {
    width: 18%;
    margin-right: 15px;
    img {
      width: 100%;
      border-radius: 5px;
    }
  }
  .rightbox {
    width: 90%;
    .relatename {
      margin-bottom: 15px;
      color: #000000d9;
    }
    .relateperson {
      font-size: 12px;
      color: #a5a5c1;
    }
  }
}
.ralateitem:last-child {
  margin-bottom: 0;
}
.ralateitem:hover .relatename {
  color: #fa2800;
}
</style>