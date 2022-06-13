<template>
  <div class="singerbox">
    <div class="title"><slot name="title"></slot></div>
    <div class="item"><slot name="item"></slot></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.title {
  margin-bottom: 20px;
}
</style>