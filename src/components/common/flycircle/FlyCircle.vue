<template>
  <div class="circle"></div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.circle {
  position: fixed;
  pointer-events: none;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: rgba(235, 230, 255);
  opacity: 0.5;
  animation: fly 4s linear infinite;
  z-index: -1;
}

@keyframes fly {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(25px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>