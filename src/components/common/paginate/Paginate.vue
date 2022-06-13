<template>
  <div class="w">
    <div class="paginate">
      <div
        class="prepage"
        :class="{ firstpage: offset === 0 }"
        @click="prePageClick"
      >
        上一页
      </div>
      <div class="nextpage" @click="nextPageClick">下一页</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    offset: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    prePageClick() {
      this.$emit("prePageClick");
    },
    nextPageClick() {
      this.$emit("nextPageClick");
    },
  },
};
</script>

<style lang="less">
.firstpage {
  cursor: not-allowed !important;
  opacity: 0.5;
}
.paginate {
  display: flex;
  justify-content: center;
  .nextpage,
  .prepage {
    cursor: pointer;
    padding: 10px 12px;
    background-color: #fa2800;
    color: #fff;
    border-radius: 3px;
  }
  .prepage {
    margin-right: 30px;
  }
  .nextpage {
    margin-right: 60px;
  }
}
</style>