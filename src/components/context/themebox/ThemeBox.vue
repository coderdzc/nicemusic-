<template>
  <div class="themebox">
    <div class="title"><slot name="title"></slot></div>
    <div class="content"><slot name="content"></slot></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.themebox {
  padding: 15px;
  margin-bottom: 20px;
  .title {
    font-weight: 700;
    font-size: 14px;
    color: #4a4a4a;
    border-left: 3px solid #fa2800;
    padding-left: 15px;
    margin-bottom: 15px;
  }
}
</style>