<template>
  <div class="sheetbox w">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="itemcontainer">
      <slot name="itemcontainer"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.sheetbox {
  width: 100%;
  .title {
    width: 100%;
    color: #000;
    margin-bottom: 20px;
    margin-left: 5px;
  }
}
</style>