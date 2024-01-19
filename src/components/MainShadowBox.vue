<template>
  <div class="overlay fixed -top-16 z-10 h-16 w-full bg-white"></div>
  <div class="overlay fixed -bottom-16 z-10 h-16 w-full bg-white"></div>
</template>

<style scoped>
.overlay {
  box-shadow:
    0 25px 25px rgba(249, 250, 251, 1),
    0 -25px 25px rgba(249, 250, 251, 1);
}

/* style="box-shadow: 0 0 0 9999px rgba(100, 100, 100, 0.5)" */
</style>
