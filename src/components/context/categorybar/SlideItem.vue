<template>
  <div class="slideitem">
    <slot name="title"></slot>
    <div class="subs">
      <div
        class="sub"
        v-for="(item, index) in subs"
        :key="index"
        @click="subClick(item, index)"
        :class="{ subActive: item === headTitle }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subs: {
      type: Array,
      default() {
        return [];
      },
    },
    headTitle: {
      type: String,
      default: "",
    },
  },
  methods: {
    subClick(type) {
      this.$emit("subClick", type);
    },
  },
};
</script>

<style lang="less" scoped>
.subActive {
  background-color: #fa2800 !important;
  color: #fff;
}
.title {
  font-family: "icomoon";
}
.subs {
  display: flex;
  flex-wrap: wrap;
  .sub {
    cursor: pointer;
    transition: all 0.3s;
    padding: 5px;
    font-size: 12px;
    height: 34px;
    line-height: 34px;
    background-color: #f7f7f7;
    padding: 0 15px;
    border-radius: 15px;
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .sub:hover {
    background-color: #fa2800;
    color: #fff;
  }
}
.subtitle {
  margin-bottom: 10px;
}
</style>