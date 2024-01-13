<template>
  <div
    class="mx-16 mt-3 rounded-xl bg-rose-100 px-2 py-1 text-center text-rose-600"
    v-if="props.error"
  >
    {{ props.error }}
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: String,
    required: true,
  },
})
</script>
