<template>
  <div class="navbar">
    <div class="w">
      <slot name="left"></slot>
      <slot name="center"></slot>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.navbar {
  width: 100%;
  background-color: #fff;
  height: 64px;
  position: fixed;
  justify-content: space-between;
  z-index: 999;
  .w {
    display: flex;
  }
}
</style>