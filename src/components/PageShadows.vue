<template>
  <div class="overlay-top fixed -top-16 z-20 h-16 w-full bg-white"></div>
  <div class="overlay-bottom fixed -bottom-16 z-20 h-16 w-full bg-white"></div>
</template>

<style scoped>
.overlay-top {
  box-shadow: 0 25px 25px rgba(249, 250, 251, 1);
}

.overlay-bottom {
  box-shadow: 0 -25px 25px rgba(249, 250, 251, 1);
}
</style>
